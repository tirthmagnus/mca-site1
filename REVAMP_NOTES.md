# MCAREVIVE final staging notes

## Completed

- Rebuilt the visual system with a more premium financial-services identity.
- Fixed mobile overlap between the floating chat and fixed mobile conversion bar.
- Added safe-area and dynamic viewport handling for modern iPhones and mobile Safari.
- Replaced the AI/Claude chatbot with a deterministic guided intake flow. No AI API key or per-message cost is required.
- Chat now validates phone/email, uses structured answer buttons, requires explicit contact consent, and submits through the same lead endpoint as the main form.
- Removed the Anthropic dependency and `/api/chat` route.
- Added source-domain and landing-page metadata to lead records for future multi-domain attribution.
- Added Supabase REST storage support and a Postgres schema for durable Vercel lead capture.
- Added a Vercel-preview safety net: if no durable destination is connected yet, staging test leads are emitted to Vercel function logs with the IP redacted so client test submissions can be recovered.
- Production Vercel deployments refuse to report success if neither durable Supabase storage nor a confirmed CRM webhook is available.
- Added generic CRM webhook delivery support with success/failure confirmation.
- Added GA4 and Meta lead-conversion event hooks.
- Added consent-gated analytics: GA4/Meta remain off until the visitor accepts optional tracking.
- Added a footer Cookie Choices control when optional tracking is configured.
- Strengthened the site-wide footer disclaimer and added the same footer to legal pages.
- Reworked Cookie Policy around the site's actual consent behavior.
- Removed fake phone/contact details and kept public company identity environment-driven.
- Kept staging testimonial/story content clearly identified for replacement before production.
- Retained comprehensive draft Privacy, Terms, Communication Consent, Business Debt Services Disclaimer, Legal Disclaimer, Cookie Policy, and Accessibility pages.

## Before production launch

1. Add the client's approved phone, email, legal entity name, and mailing address.
2. Replace staging story/testimonial copy with verified client-approved material.
3. Connect Supabase or a confirmed CRM/webhook before using a production Vercel deployment.
4. Add GA4 and/or Meta IDs only if the client actually wants those tracking tools.
5. Have counsel review legal/consent wording against the exact service model, jurisdictions, fee structure, referral relationships, and communication practices.
6. Consider shared rate limiting such as Upstash/Redis before meaningful paid traffic.

## Final presentation fix pass
- Name and phone are the only required lead-contact fields across the full form, quick modal, and guided chat.
- Optional intake details can be skipped without blocking submission.
- Quick review modal and chat use fully opaque foreground surfaces and stronger contrast to avoid blending into page content.
- Mobile chat teaser is hidden on small screens to prevent content overlap; the launcher remains available.
- Successful submissions stay visible with a clear thank-you and callback confirmation.
- Business story cards now open detailed story panels rather than acting as static images.
- Removed visitor-facing staging photography/source copy.
- Until durable storage is connected, Vercel submissions are retained in function logs as a staging safety net. Configure Supabase or CRM storage before final public launch.
