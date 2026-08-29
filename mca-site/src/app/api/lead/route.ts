import { NextRequest, NextResponse } from "next/server";
import { leadSchema, quickLeadSchema } from "@/lib/schema";
import { saveLead } from "@/lib/lead-store";
import { pushLeadToCRM } from "@/lib/crm";
import { rateLimit, clientIpFrom } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);

  // 5 submissions per IP per 10 minutes. Generous enough for a real
  // visitor retrying a typo, tight enough to stop scripted spam.
  const { ok, remaining } = rateLimit(`lead:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Two valid shapes can land here: the full 5-step case review form, or
  // the short "just call me" quick-capture modal. Try the full schema
  // first (it's the more common path), fall back to the quick one, and
  // only reject if neither validates.
  const fullParsed = leadSchema.safeParse(body);
  const quickParsed = fullParsed.success ? null : quickLeadSchema.safeParse(body);

  if (!fullParsed.success && !quickParsed?.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: fullParsed.error.flatten() },
      { status: 400 }
    );
  }

  const parsedData = fullParsed.success
    ? fullParsed.data
    : (quickParsed as { success: true; data: import("@/lib/schema").QuickLead }).data;

  // Honeypot: a real visitor never sees or fills this field. If it's
  // non-empty, silently pretend success so the bot doesn't learn its
  // submission was rejected, but never store or forward it.
  if (parsedData.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const stored = await saveLead(parsedData, { ip });

  // CRM push happens after the lead is already safely stored. If this
  // throws (no CRM configured yet, or a network blip), we don't fail
  // the visitor's submission, we log it and move on.
  try {
    await pushLeadToCRM(stored);
  } catch (err) {
    console.error("[lead] CRM push failed", err);
  }

  return NextResponse.json({ ok: true, remaining }, { status: 201 });
}
