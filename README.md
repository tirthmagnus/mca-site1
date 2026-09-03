# MCAREVIVE website

Custom Next.js 16 marketing and intake site for a business-focused merchant cash advance support brand. The site is designed to work as both a lead funnel and a credible company web presence.

## Included

- Responsive premium homepage and mobile conversion bar
- iPhone-safe floating chat using dynamic viewport units and safe-area insets
- Multi-step confidential case-review form
- Short callback modal
- Rule-based guided intake chat with no AI API or per-message cost
- Cash-flow pressure calculator based only on visitor-entered numbers
- Resource center and draft legal/compliance pages
- Site-wide business-services disclaimer
- Zod server-side validation, honeypot protection, security headers, and rate limiting
- Consent-gated GA4 and Meta Pixel support plus lead conversion events
- Generic CRM webhook adapter
- Supabase/Postgres-ready durable lead storage
- Source-domain and landing-page attribution for future sister sites

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The guided chat works without any AI key or external chat service.

## Lead capture behavior

### Local development
Leads are written to `data/leads.json` if Supabase is not configured.

### Vercel Preview / staging
For real persistence, connect Supabase or a confirmed CRM webhook. Until that is connected, preview submissions are emitted as `[MCAREVIVE_STAGING_LEAD]` records in Vercel function logs with the IP redacted. This gives the staging client a recoverable test submission instead of silently writing to an ephemeral serverless file.

### Vercel Production
A production deployment will not report a lead as successfully saved unless Supabase or a confirmed CRM webhook receives it. This prevents real leads from being silently lost.

## Recommended durable inbox: Supabase

Create a Supabase project, run `supabase/schema.sql`, then set:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

The service-role key stays server-side and must never use a `NEXT_PUBLIC_` prefix.

## Optional CRM / automation webhook

```text
CRM_PROVIDER=webhook
CRM_WEBHOOK_URL=https://...
```

This can point to a secure Zapier, Make, n8n, or internal CRM endpoint. Zoho, GoHighLevel, and HubSpot remain explicit placeholders until the client selects a CRM and provides credentials.

## Public company identity

Set the approved client details before production:

```text
NEXT_PUBLIC_PHONE_DISPLAY=
NEXT_PUBLIC_PHONE_TEL=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_COMPANY_LEGAL_NAME=
NEXT_PUBLIC_COMPANY_ADDRESS=
```

There is intentionally no fake public contact fallback.

## Analytics and cookies

Optional:

```text
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

If neither ID is configured, those third-party tracking tools do not load. If an ID is configured, the site first shows a privacy choice notice and keeps optional analytics/advertising scripts off until the visitor accepts.

## Before production launch

- Replace staging story/testimonial content with verified, client-approved material.
- Add the client's approved public company information.
- Connect Supabase or a confirmed CRM/webhook.
- Add analytics IDs only if the client actually wants those tools.
- Have counsel review the legal and consent wording against the exact service model, jurisdictions, fees, referral relationships, and communications practices.
- Consider shared rate limiting such as Upstash/Redis before meaningful paid traffic.

## GoDaddy domain later

GoDaddy can remain the registrar while Vercel hosts the application. After client approval, point the GoDaddy DNS records to the Vercel project. The application does not need to be rewritten because the domain is registered at GoDaddy.
