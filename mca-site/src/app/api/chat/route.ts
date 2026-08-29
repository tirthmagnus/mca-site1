import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { chatMessageSchema, leadSchema } from "@/lib/schema";
import { saveLead } from "@/lib/lead-store";
import { pushLeadToCRM } from "@/lib/crm";
import { rateLimit, clientIpFrom } from "@/lib/rate-limit";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Chat history lives in memory per conversationId for this demo. It's
// enough to hold a live conversation across a few requests. For real
// multi-instance deployment, move this to Redis or your DB keyed by
// conversationId (same idea as rate-limit.ts).
const conversations = new Map<string, { role: "user" | "assistant"; content: string }[]>();

const SYSTEM_PROMPT = `You are the intake assistant on a merchant cash advance (MCA) debt relief company's website. Your one job: have a short, empathetic, natural conversation with a business owner who is struggling with MCA payments, and collect their info so a consultant can call to schedule their free case review.

These people are often stressed and dealing with real financial pressure. Be calm, direct, and reassuring without over-promising specific outcomes.

Collect, over the course of the conversation, in whatever order comes up naturally:
- First and last name
- Business name
- Phone number
- Email
- State
- Approximate outstanding MCA balance (bucket: under $25,000 / $25,000-$50,000 / $50,000-$100,000 / $100,000-$250,000 / $250,000+)
- Number of active MCAs (1 / 2 / 3 / 4+)
- Payment frequency (daily / weekly / other)
- Approximate monthly business revenue (bucket: under $10k / $10k-$25k / $25k-$50k / $50k-$100k / over $100k)

Rules:
- Ask ONE question at a time. Never dump a form's worth of questions at once.
- Keep every message short, 1-3 sentences, plain conversational English. No corporate tone, no bullet lists in the chat itself.
- If someone asks a factual question about how debt restructuring works (settlements, credit impact, timeline, fees, UCC filings, MCA stacking), answer it briefly and accurately, then steer back to the next piece of info you need.
- Never invent specific settlement percentages, guaranteed savings, or timelines for their specific case. Use conditional language ("may help", "potential options", "subject to your funder's agreement"), never "guaranteed" or "we will eliminate."
- If someone mentions they're facing a lawsuit or have received legal papers, treat that as urgent: acknowledge it plainly and let them know a consultant will prioritize their case, but do not give legal advice.
- Never ask for sensitive info like SSNs, bank account numbers, or bank statements in this chat. That happens later, with a human, over a secure channel. If asked, say so plainly.
- Once you have ALL of the fields above, thank them and let them know a consultant will call to schedule their free case review. Then, and ONLY then, append a final line to your message in EXACTLY this format (it will be hidden from the user, so it's fine for it to look technical):
LEAD_JSON:{"firstName":"...","lastName":"...","businessName":"...","phone":"...","email":"...","state":"...","balanceRange":"under_25k|25k_50k|50k_100k|100k_250k|250k_plus","numberOfMcas":"1|2|3|4_plus","paymentFrequency":"daily|weekly|other","monthlyRevenue":"under_10k|10k_25k|25k_50k|50k_100k|over_100k"}
- Do not emit LEAD_JSON until every required field (all except weeklyPayment) is actually known from the conversation. Never guess or fill in a field the user hasn't told you.`;

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);

  // Tighter limit than the form: each chat turn is an LLM call and costs
  // real money, so cap it harder against abuse/scripted hammering.
  const { ok } = rateLimit(`chat:${ip}`, { limit: 20, windowMs: 10 * 60 * 1000 });
  if (!ok) {
    return NextResponse.json(
      { error: "Too many messages. Please slow down and try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = chatMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const { message, conversationId } = parsed.data;
  const history = conversations.get(conversationId) ?? [];
  history.push({ role: "user", content: message });

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Chat is not configured yet. Set ANTHROPIC_API_KEY in the environment." },
      { status: 503 }
    );
  }

  let raw: string;
  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    });
    raw = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n");
  } catch (err) {
    console.error("[chat] anthropic call failed", err);
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try the form instead." },
      { status: 502 }
    );
  }

  // Strip the hidden LEAD_JSON marker out before it ever reaches the
  // visitor, and try to save it as a real lead if present and valid.
  const [visibleReply, jsonLine] = splitOnLeadMarker(raw);
  let leadCaptured = false;

  if (jsonLine) {
    try {
      const candidate = JSON.parse(jsonLine);
      const withDefaults = {
        ...candidate,
        consentToContact: true, // implicit: they engaged in a chat to get funding info
        source: "chatbot" as const,
      };
      const validated = leadSchema.safeParse(withDefaults);
      if (validated.success) {
        const stored = await saveLead(validated.data, { ip });
        await pushLeadToCRM(stored).catch((e) =>
          console.error("[chat] CRM push failed", e)
        );
        leadCaptured = true;
      } else {
        console.warn("[chat] model emitted LEAD_JSON that failed validation", validated.error.flatten());
      }
    } catch (e) {
      console.warn("[chat] failed to parse LEAD_JSON from model output", e);
    }
  }

  history.push({ role: "assistant", content: raw });
  conversations.set(conversationId, history);

  return NextResponse.json({ reply: visibleReply, leadCaptured });
}

function splitOnLeadMarker(raw: string): [string, string | null] {
  const idx = raw.indexOf("LEAD_JSON:");
  if (idx === -1) return [raw.trim(), null];
  const visible = raw.slice(0, idx).trim();
  const jsonPart = raw.slice(idx + "LEAD_JSON:".length).trim();
  return [visible, jsonPart];
}
