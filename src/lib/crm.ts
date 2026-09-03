import type { StoredLead } from "./lead-store";

type CrmProvider = "none" | "zoho" | "gohighlevel" | "hubspot" | "webhook";

const PROVIDER = (process.env.CRM_PROVIDER as CrmProvider) || "none";

/**
 * Attempts to deliver a lead to the configured CRM destination.
 * Returns true only when a real remote destination confirms receipt.
 */
export async function pushLeadToCRM(lead: StoredLead): Promise<boolean> {
  switch (PROVIDER) {
    case "none":
      return false;

    case "webhook": {
      const url = process.env.CRM_WEBHOOK_URL;
      if (!url) return false;

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`CRM webhook failed with ${res.status}`);
        return true;
      } finally {
        clearTimeout(timer);
      }
    }

    // These providers remain explicit placeholders until the client selects
    // a CRM and supplies credentials. They intentionally return false so the
    // API never mistakes an unconfigured stub for successful delivery.
    case "zoho":
    case "gohighlevel":
    case "hubspot":
      console.warn(`[crm] ${PROVIDER} selected but direct integration is not configured yet`);
      return false;
  }
}
