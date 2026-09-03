import { NextRequest, NextResponse } from "next/server";
import { leadSchema, quickLeadSchema } from "@/lib/schema";
import { saveLead } from "@/lib/lead-store";
import { pushLeadToCRM } from "@/lib/crm";
import { rateLimit, clientIpFrom } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);
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

  const fullParsed = leadSchema.safeParse(body);
  const quickParsed = fullParsed.success ? null : quickLeadSchema.safeParse(body);

  if (!fullParsed.success && !quickParsed?.success) {
    return NextResponse.json(
      { error: "Please check the information and try again." },
      { status: 400 }
    );
  }

  const parsedData = fullParsed.success
    ? fullParsed.data
    : (quickParsed as { success: true; data: import("@/lib/schema").QuickLead }).data;

  // Honeypot: silently accept bot-filled submissions without storing them.
  if (parsedData.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const siteHost = req.headers.get("x-forwarded-host") || req.headers.get("host") || "unknown";

  let storageResult;
  try {
    storageResult = await saveLead(parsedData, { ip, siteHost });
  } catch (err) {
    console.error("[lead] storage failed", err);
    return NextResponse.json(
      { error: "We could not save your request. Please try again." },
      { status: 503 }
    );
  }

  let crmDelivered = false;
  try {
    crmDelivered = await pushLeadToCRM(storageResult.lead);
  } catch (err) {
    console.error("[lead] CRM delivery failed", err);
  }

  const durable = storageResult.durable || crmDelivered;
  const vercelEnvironment = process.env.VERCEL_ENV;
  const isVercelPreview = Boolean(vercelEnvironment && vercelEnvironment !== "production");

  if (!durable && isVercelPreview) {
    // Preview-only safety net. Vercel retains function logs, so a client's
    // staging test submission is recoverable even before Supabase/CRM is
    // connected. Do not use this as a production lead database.
    console.info(
      `[MCAREVIVE_STAGING_LEAD] ${JSON.stringify({ ...storageResult.lead, ip: "redacted" })}`
    );

    return NextResponse.json(
      {
        ok: true,
        remaining,
        leadId: storageResult.lead.id,
        captureMode: "vercel_preview_log",
      },
      { status: 201 }
    );
  }

  if (!durable && process.env.VERCEL) {
    // Never tell a production visitor their lead was saved when there is no
    // durable destination. Connect Supabase or a confirmed CRM webhook first.
    console.error("[lead] production lead destination is not configured");
    return NextResponse.json(
      {
        error: "Online intake is temporarily unavailable. Please use the contact information shown on the site.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      remaining,
      leadId: storageResult.lead.id,
      captureMode: storageResult.durable ? storageResult.storage : "crm",
    },
    { status: 201 }
  );
}
