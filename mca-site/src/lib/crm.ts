import type { StoredLead } from "./lead-store";

// ---------------------------------------------------------------------
// CRM ADAPTER
// ---------------------------------------------------------------------
// No CRM has been picked yet. Every lead is already safely stored in
// your own database via lead-store.ts before this function is ever
// called, so nothing is lost if this step fails or does nothing.
//
// When a CRM is chosen, implement ONE of the branches below (they're
// stubbed with the real shape most CRMs expect) and set CRM_PROVIDER
// in your environment. That's the entire integration, nothing else
// in the app needs to change.
// ---------------------------------------------------------------------

type CrmProvider = "none" | "zoho" | "gohighlevel" | "hubspot" | "webhook";

const PROVIDER = (process.env.CRM_PROVIDER as CrmProvider) || "none";

export async function pushLeadToCRM(lead: StoredLead): Promise<void> {
  switch (PROVIDER) {
    case "none":
      console.log(`[crm] no provider configured, skipping push for lead ${lead.id}`);
      return;

    case "webhook": {
      // Generic webhook, works for Zapier/Make.com/n8n if you want a
      // no-code bridge to whatever CRM you land on.
      const url = process.env.CRM_WEBHOOK_URL;
      if (!url) return;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      return;
    }

    case "zoho": {
      // Zoho CRM REST API v6, "Leads" module.
      // Needs ZOHO_ACCESS_TOKEN (refreshed via OAuth) and ZOHO_API_DOMAIN.
      // const res = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v6/Leads`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     data: [{
      //       Company: lead.businessName,
      //       Last_Name: lead.contactName,
      //       Phone: lead.phone,
      //       Email: lead.email,
      //       Description: `Funding requested: $${lead.fundingAmount}, industry: ${lead.industry}`,
      //     }],
      //   }),
      // });
      console.log("[crm] zoho not yet wired, add credentials in .env and uncomment");
      return;
    }

    case "gohighlevel": {
      // GoHighLevel v2 API, "contacts" endpoint. Common CRM in the
      // MCA/broker space if that's the direction you land on.
      console.log("[crm] gohighlevel not yet wired, add credentials in .env and uncomment");
      return;
    }

    case "hubspot": {
      console.log("[crm] hubspot not yet wired, add credentials in .env and uncomment");
      return;
    }
  }
}
