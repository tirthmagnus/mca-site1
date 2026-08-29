# SummitCap MCA site

Full working site: marketing pages, live payback calculator, secure lead form,
Claude-powered qualification chatbot, and a CRM-ready lead pipeline.

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in ANTHROPIC_API_KEY at minimum
npm run dev
```

Open http://localhost:3000. The chat widget won't respond until
`ANTHROPIC_API_KEY` is set, everything else works with zero configuration.

## Deploy

This is a standard Next.js app, deploy it anywhere Next.js runs:

- **Vercel** (recommended, zero-config): push to a GitHub repo, import it in
  Vercel, add the environment variables from `.env.example` in the project
  settings, done. Then point your domain's DNS at Vercel (A/CNAME record they
  give you) whenever you're ready to go live, no code changes needed.
- **Your own VPS**: `npm run build && npm start`, put it behind Nginx/Caddy
  for TLS termination, or Cloudflare in front for a WAF layer too.

Nothing about deployment is locked in, you can move it later without
touching the code.

## What's real vs. what's a stub

**Real and working right now:**
- Full custom design (not a template), responsive, keyboard-accessible
- Live payback calculator in the hero
- Lead form: server-side validated (Zod), rate-limited, honeypot field
  against bots, writes to `data/leads.json`
- Chatbot: real Claude-powered conversation that qualifies a lead
  naturally, then automatically extracts structured data and saves it
  the same way the form does
- Security headers (CSP, HSTS, X-Frame-Options, etc.) on every response
- Google Analytics + Meta Pixel loaders, inactive until you add IDs

**Stubbed, waiting on a decision:**
- **CRM**: `src/lib/crm.ts` is the single place a saved lead gets pushed
  onward. Right now it just logs. Every lead is safely stored in your own
  data store first regardless, so nothing is lost while this is undecided.
  When you pick a CRM, either:
  1. Set `CRM_PROVIDER=webhook` and `CRM_WEBHOOK_URL=...` to push to
     Zapier/Make.com/n8n, which can fan out to almost any CRM with no code, or
  2. Implement the matching branch in `crm.ts` directly (Zoho/GoHighLevel/
     HubSpot stubs are sketched in there with the right shape).
- **Database**: leads currently write to `data/leads.json`. That's fine to
  demo and even fine for low volume, but before this is handling real
  applicant data, swap `src/lib/lead-store.ts` for a real Postgres table
  (Prisma or Drizzle). It's the only file that needs to change, nothing
  else references the storage mechanism directly.
- **Ad retargeting audiences**: the Meta Pixel and GA are wired to fire on
  page load, and the lead form/chat submissions are the events worth
  building custom audiences around. The audience-building itself happens
  in Meta Ads Manager / Google Ads once you're running campaigns, there's
  nothing to build in the app for that part until ads are live.

## Multiple domains

The same codebase can power more than one domain. Two ways to do it
depending on what you actually want:

- **Different design/copy per domain, same backend** (what you described):
  add a check on the incoming hostname (`req.headers.get("host")`) in
  `src/proxy.ts` or in `layout.tsx`, and branch the hero copy/imagery per
  domain while sharing the same calculator, form, chatbot, and lead
  pipeline underneath. I can build this multi-tenant switch next once you
  tell me how many domains and what should differ between them.
- **Fully separate sites**: just deploy this repo again per domain and
  change the copy/branding directly. More duplication, but simpler if the
  sites genuinely diverge over time.

## Security, specifically

- Every DB-bound field goes through a Zod schema server-side before it's
  ever written, and all storage functions use structured writes (JSON
  serialization here, parameterized queries once you're on Postgres),
  never raw string concatenation. That's what actually prevents SQL
  injection, not a WAF, the WAF is a second layer, not the first.
- Rate limiting on both `/api/lead` and `/api/chat`, per-IP.
- Honeypot field on the form to filter bot submissions before they're
  stored, not just before they're shown a success message.
- Security headers are set in `src/proxy.ts` for literally every response,
  so they can't be forgotten on a route added later.
- The chatbot is explicitly instructed to never ask for SSNs, bank
  account numbers, or bank statements, that has to happen later, with a
  human, over a channel you control.
- Nothing here handles PCI-scope data (card numbers) or SSNs, if a future
  version of the intake flow needs those, that's a different, much more
  locked-down conversation, don't add those fields to this form or this
  chatbot without redesigning storage around it.

## Still needs a decision from you before going fully live

1. Which CRM (affects `crm.ts`)
2. Hosting target (Vercel vs VPS)
3. Real business phone number, address, and license/disclosure text in
   the footer (what's there now is placeholder)
4. GA4 property ID and Meta Pixel ID once you have them
