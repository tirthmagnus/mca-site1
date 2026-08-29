"use client";

import {
  Repeat, Layers, TrendingDown, PhoneCall, FileWarning, Clock,
  RefreshCw, MessagesSquare, Map, Combine, HandCoins,
  ClipboardList, Search, Target, Handshake,
  ShieldCheck, Sparkles, Eye, Lock, Building2, UserCheck,
  BookOpen, Camera,
} from "lucide-react";
import { useLeadModal } from "./LeadModalContext";

const PROBLEMS = [
  { icon: Repeat, title: "Daily ACH Withdrawals", body: "Payments pulled from your account every business day, regardless of how sales actually came in that day." },
  { icon: Layers, title: "Multiple Stacked MCAs", body: "More than one advance running at the same time, each one drawing from the same daily revenue." },
  { icon: TrendingDown, title: "Declining Revenue", body: "A slower season or a rough stretch makes fixed daily payments feel heavier every week." },
  { icon: PhoneCall, title: "Collection Pressure", body: "Calls, letters, or a lender pushing for payment faster than your cash flow can support." },
  { icon: FileWarning, title: "UCC Filings", body: "A lender has filed a public claim (a UCC-1) against your business assets or receivables tied to the advance." },
  { icon: Clock, title: "Falling Behind", body: "Payments that were manageable at first are no longer lining up with what your business brings in." },
];

const SOLUTIONS = [
  { icon: RefreshCw, title: "Restructure Payments", body: "Explore whether payment amount, frequency, or schedule may be modified, subject to your funder's agreement." },
  { icon: MessagesSquare, title: "Negotiate MCA Obligations", body: "Open a direct conversation with your MCA provider about your current situation and possible adjusted terms." },
  { icon: Map, title: "Develop a Resolution Strategy", body: "Build a plan specific to your balances, agreements, and cash flow, not a one-size-fits-all approach." },
  { icon: Combine, title: "Stacked MCA Relief", body: "When multiple positions are involved, work toward a combined approach across all of them rather than one at a time." },
  { icon: HandCoins, title: "Business Debt Settlement", body: "Where appropriate, pursue a negotiated resolution on outstanding balances with your funders." },
];

const STEPS = [
  { icon: ClipboardList, title: "Free Case Review", body: "We gather information about your business, your MCA obligations, current payments, and financial situation." },
  { icon: Search, title: "MCA Analysis", body: "We review your agreements, balances, payment history, and business cash flow in detail." },
  { icon: Target, title: "Resolution Strategy", body: "We map out potential approaches based specifically on your business's circumstances." },
  { icon: Handshake, title: "Negotiation & Resolution", body: "We communicate with your MCA providers and pursue an agreed resolution where possible." },
];

const TRUST_STATS = [
  ["[YEARS IN BUSINESS]", "Years in business"],
  ["[BUSINESSES HELPED]", "Businesses helped"],
  ["[DEBT RESOLVED]", "Debt resolved"],
  ["[BBB STATUS]", "BBB status"],
] as const;

// SAMPLE CASE STUDY — replace with verified, client-approved results
// before this goes live. No fabricated dollar figures or settlement
// percentages: the FTC has specifically pursued debt relief companies
// for exactly that pattern, so even placeholder copy stays qualitative.
const CLIENT_STORIES = [
  { industry: "Restaurant", numberOfMcas: "3 positions", quote: "One weekly payment instead of three daily withdrawals changed how I could plan payroll and inventory." },
  { industry: "Trucking", numberOfMcas: "2 positions", quote: "Having someone negotiate directly with my funders meant I could focus on keeping trucks on the road." },
  { industry: "Medical practice", numberOfMcas: "4 positions", quote: "I didn't think there was a path that didn't end in closing. There was, and I had help through every step." },
];

const WHY_US = [
  { icon: ShieldCheck, title: "MCA-Focused Experience", body: "We work specifically with merchant cash advance obligations, not general consumer debt." },
  { icon: Sparkles, title: "Customized Strategies", body: "Your revenue, agreements, and balances shape the approach, not a template." },
  { icon: Eye, title: "Transparent Communication", body: "You know what's happening with your case and why, at every stage." },
  { icon: Lock, title: "Confidential Consultations", body: "Your situation stays private, reviewed only by the team working your case." },
  { icon: Building2, title: "Business-First Approach", body: "The goal is keeping your business operating, not just settling a number." },
  { icon: UserCheck, title: "Direct Human Support", body: "A real person on your case, not a ticket queue." },
];

const EDUCATION_ARTICLES = [
  { title: "What Is MCA Debt Relief?", body: "An overview of what debt relief actually means for a business carrying merchant cash advance obligations, and how it differs from a loan modification.", href: null },
  { title: "MCA Settlement vs. MCA Consolidation", body: "Settlement negotiates down what's owed. Consolidation combines multiple positions into one payment. They solve different problems.", href: "/mca-debt-settlement" },
  { title: "What Happens If You Default on an MCA?", body: "MCA agreements often include a confession of judgment, a clause that can let a funder pursue collection quickly, without a standard court proceeding.", href: "/what-happens-when-you-default" },
  { title: "What Is MCA Stacking?", body: "Taking on a new advance while still repaying existing ones. Each funder draws from the same daily revenue, and the combined effective cost compounds fast.", href: null },
  { title: "Can MCA Payments Be Restructured?", body: "Sometimes, subject to your funder's agreement. It depends on your specific contracts, balances, and how many positions are involved.", href: "/mca-debt-restructuring" },
  { title: "What Is a UCC-1 Filing?", body: "A public filing that gives your MCA funder a legal claim on business assets or receivables. It doesn't freeze your accounts by itself, but it affects your standing with other lenders.", href: null },
];

const FAQS = [
  { q: "What is Merchant Cash Advance debt relief?", a: "It's the process of working with your MCA providers to explore restructured terms, negotiated settlements, or a combined resolution across multiple positions, aimed at getting your payments back in line with what your business can actually support." },
  { q: "Can MCA payments be reduced?", a: "In some cases, subject to your funder's agreement. It depends on your specific agreements, current balances, and financial circumstances, there's no universal outcome we can promise before reviewing your case." },
  { q: "What if I have multiple MCAs?", a: "That's common, and it's part of what we specialize in. Stacked positions are reviewed together so any resolution accounts for all of your funders, not just one." },
  { q: "How does MCA negotiation work?", a: "We review your agreements and cash flow, then communicate directly with your funders about your situation and potential adjusted terms or settlement." },
  { q: "How long does the process take?", a: "It varies by how many positions and funders are involved, and how each one responds. Every case is different." },
  { q: "Is MCA settlement guaranteed?", a: "No outcome is guaranteed. Results depend on your specific lenders, agreements, and circumstances, and we won't promise a specific percentage or dollar reduction before reviewing your case." },
  { q: "Does a free consultation obligate me to enroll?", a: "No. The case review is free and confidential, and there's no obligation to move forward afterward." },
  { q: "What information should I have ready?", a: "Your MCA agreements, recent statements showing payment activity, and a general sense of your current monthly revenue help us give you an accurate picture fastest." },
];

const WHO_WE_HELP = ["Restaurants", "Trucking & Logistics", "Construction", "Medical Practices", "Retail", "Professional Services"];

// lucide-react dropped brand-specific icons a while back, these are
// minimal generic glyphs standing in for each platform, not official logos.
function FacebookIcon(props: { size?: number }) {
  return (
    <svg width={props.size ?? 16} height={props.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5H14z" />
    </svg>
  );
}
function InstagramIcon(props: { size?: number }) {
  return (
    <svg width={props.size ?? 16} height={props.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.2" cy="7.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon(props: { size?: number }) {
  return (
    <svg width={props.size ?? 16} height={props.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <circle cx="8.2" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8.2 11v6M12 17v-3.5c0-1.4 1-2.2 2.2-2.2s1.8.8 1.8 2.2V17" />
    </svg>
  );
}
function XIcon(props: { size?: number }) {
  return (
    <svg width={props.size ?? 16} height={props.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function InlineCTA({ label }: { label: string }) {
  const openModal = useLeadModal();
  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={openModal}
        className="rounded-lg border-2 border-ink bg-transparent px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-ink hover:text-white hover:shadow-lg"
      >
        {label}
      </button>
    </div>
  );
}

export function ProblemRecognition() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h2 className="display text-3xl font-bold text-ink">Is this happening to your business?</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((p) => (
          <div key={p.title} className="lift-card rounded-xl border border-line bg-white p-5">
            <p.icon className="text-amber" size={26} strokeWidth={1.75} />
            <h3 className="display mt-3 text-base font-semibold text-ink">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{p.body}</p>
          </div>
        ))}
      </div>
      <InlineCTA label="See if you may have options →" />
    </section>
  );
}

export function WhoWeHelp() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber">
        Photo slots — drop in real, licensed photography here
      </div>
      <h2 className="display text-2xl font-bold text-ink">Real businesses, real relief</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {WHO_WE_HELP.map((label) => (
          <div key={label} className="group aspect-square overflow-hidden rounded-xl border border-line bg-gradient-to-br from-paper-2 to-line/40">
            <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center transition-colors group-hover:bg-ink/5">
              <Camera className="text-ink/25" size={28} strokeWidth={1.5} />
              <span className="text-xs font-medium text-ink/50">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="bg-paper-2 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="display text-3xl font-bold text-ink">MCA relief built around your business</h2>
        <p className="mt-2 max-w-2xl text-ink/60">
          Every business has different revenue, agreements, balances, and payment obligations, so the right
          approach depends on your specific situation.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="lift-card rounded-xl border border-line bg-white p-5">
              <s.icon className="text-amber" size={26} strokeWidth={1.75} />
              <h3 className="display mt-3 text-base font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{s.body}</p>
            </div>
          ))}
        </div>
        <InlineCTA label="Talk to a consultant →" />
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h2 className="display text-3xl font-bold text-ink">How it works</h2>
      <div className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connecting line, desktop only */}
        <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-0.5 bg-line lg:block" />
        {STEPS.map((s, i) => (
          <div key={s.title} className="relative">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber bg-white shadow-sm">
              <s.icon className="text-ink" size={22} strokeWidth={1.75} />
            </div>
            <div className="tabular mt-3 text-xs font-semibold text-ink/40">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="display mt-1 text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm text-ink/60">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="border-y border-line bg-white py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber">
          Placeholder — populate with verified data only
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {TRUST_STATS.map(([value, label]) => (
            <div key={label}>
              <div className="tabular text-lg font-bold text-ink/30 sm:text-xl">{value}</div>
              <div className="mt-1 text-xs text-ink/50">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientStories() {
  return (
    <section id="results" className="bg-paper-2 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber">
          Sample content — replace with verified client stories
        </div>
        <h2 className="display text-3xl font-bold text-ink">What clients say</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {CLIENT_STORIES.map((c) => (
            <div key={c.industry} className="lift-card rounded-xl border border-line bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                {c.industry} &middot; {c.numberOfMcas}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">&ldquo;{c.quote}&rdquo;</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink/45">
          Individual results vary. Past results do not guarantee future outcomes.
        </p>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h2 className="display text-3xl font-bold text-ink">Why choose us</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink/70">
        Our team focuses specifically on{" "}
        <a href="/mca-debt-restructuring" className="font-medium text-ink underline decoration-amber decoration-2 underline-offset-2 hover:text-amber">
          MCA debt restructuring
        </a>{" "}
        and long-term financial relief, building a plan around your actual cash flow, not a
        generic template. Our{" "}
        <a href="/mca-debt-settlement" className="font-medium text-ink underline decoration-amber decoration-2 underline-offset-2 hover:text-amber">
          MCA debt settlement
        </a>{" "}
        specialists work directly with your lenders to negotiate terms that give your
        business breathing room. If payments have already slipped, start with{" "}
        <a href="/what-happens-when-you-default" className="font-medium text-ink underline decoration-amber decoration-2 underline-offset-2 hover:text-amber">
          what happens when you default
        </a>
        , and if you're{" "}
        <a href="/mca-lawsuit" className="font-medium text-ink underline decoration-amber decoration-2 underline-offset-2 hover:text-amber">
          facing an MCA lawsuit
        </a>
        , learn your options there before anything else.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_US.map((w) => (
          <div key={w.title} className="lift-card rounded-xl border border-transparent p-2">
            <w.icon className="text-amber" size={24} strokeWidth={1.75} />
            <h3 className="display mt-3 text-base font-semibold text-ink">{w.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{w.body}</p>
          </div>
        ))}
      </div>
      <InlineCTA label="Request my free case review →" />
    </section>
  );
}

export function Education() {
  return (
    <section id="resources" className="bg-paper-2 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="display text-3xl font-bold text-ink">Understand your MCA options</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EDUCATION_ARTICLES.map((a) => {
            const CardInner = (
              <>
                <BookOpen className="text-amber" size={22} strokeWidth={1.75} />
                <h3 className="display mt-3 text-base font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{a.body}</p>
                {a.href && <div className="mt-2.5 text-xs font-semibold text-amber">Read more &rarr;</div>}
              </>
            );
            return a.href ? (
              <a key={a.title} href={a.href} className="lift-card block rounded-xl border border-line bg-white p-5">
                {CardInner}
              </a>
            ) : (
              <div key={a.title} className="lift-card rounded-xl border border-line bg-white p-5">
                {CardInner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <h2 className="display text-3xl font-bold text-ink">Common questions</h2>
      <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
        {FAQS.map((f) => (
          <details key={f.q} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink transition-colors hover:text-amber">
              {f.q}
              <span className="text-amber transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA() {
  const openModal = useLeadModal();
  return (
    <section className="bg-ink py-20 text-center text-white">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <h2 className="display text-3xl font-bold">Your business may have more options than you think.</h2>
        <p className="mt-3 text-white/70">
          Tell us what&apos;s happening with your MCA payments and learn what options may be available.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={openModal}
            className="rounded-lg bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-amber-2 hover:shadow-lg"
          >
            Request a Free Case Review
          </button>
          <a href="tel:+18885551234" className="rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Speak With Our Team: (888) 555-1234
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const links = [
    ["Privacy Policy", "/privacy-policy"],
    ["Terms of Use", "/terms-of-use"],
    ["Cookie Policy", "/cookie-policy"],
    ["Accessibility Statement", "/accessibility-statement"],
    ["Business Debt Services Disclaimer", "/business-debt-services-disclaimer"],
    ["Communication Consent", "/communication-consent"],
    ["Legal Disclaimer", "/legal-disclaimer"],
  ];
  const socials = [
    [FacebookIcon, "Facebook"],
    [InstagramIcon, "Instagram"],
    [LinkedinIcon, "LinkedIn"],
    [XIcon, "X"],
  ] as const;
  return (
    <footer className="border-t border-line bg-ink py-14 text-white/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="display text-lg font-bold text-white">
            MCA<span className="text-amber">REVIVE</span>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(([Icon, label]) => (
              <a
                key={label}
                href="#"
                aria-label={`${label} (placeholder link)`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-amber hover:text-amber"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed">
          [LEGAL COPY TO BE REVIEWED BY COMPANY COUNSEL] — MCAREVIVE is a business debt
          advisory service. It is not a law firm, government agency, or lender unless
          explicitly stated otherwise, and does not guarantee specific settlement amounts,
          payment reductions, or timelines. Individual results vary. Fees for services, if
          any, are disclosed in writing before any agreement begins.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-white">{label}</a>
          ))}
          <a href="tel:+18885551234" className="transition-colors hover:text-white">(888) 555-1234</a>
        </div>
      </div>
    </footer>
  );
}
