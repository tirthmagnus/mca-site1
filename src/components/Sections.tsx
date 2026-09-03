"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardList,
  Combine,
  Eye,
  FileWarning,
  HandCoins,
  Handshake,
  Layers,
  Lock,
  Map,
  MessagesSquare,
  PhoneCall,
  Quote,
  RefreshCw,
  Repeat,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  UserCheck,
  X,
} from "lucide-react";
import { useLeadModal } from "./LeadModalContext";
import { PHONE_DISPLAY, PHONE_TEL, hasPhone } from "@/lib/site";
import SiteFooter from "./SiteFooter";

const PROBLEMS = [
  { icon: Repeat, title: "Daily ACH pressure", body: "Frequent withdrawals can leave too little operating cash for payroll, inventory, rent, and vendors." },
  { icon: Layers, title: "Stacked positions", body: "Multiple advances can compound the pressure because several obligations draw from the same revenue." },
  { icon: TrendingDown, title: "Revenue changed", body: "A slower season or lost contract can make a payment structure that once worked suddenly feel unsustainable." },
  { icon: PhoneCall, title: "Collection pressure", body: "Calls, notices, and escalating demands can consume time when you need to stay focused on the business." },
  { icon: FileWarning, title: "UCC or legal concerns", body: "Commercial financing agreements can involve UCC filings, guarantees, or litigation risk that deserve careful review." },
  { icon: Building2, title: "Operations are getting squeezed", body: "The warning sign is simple: debt service is starting to dictate day-to-day business decisions." },
];

const SOLUTIONS = [
  { icon: RefreshCw, title: "Payment restructuring", body: "Explore whether payment amount, frequency, or timing can be modified with creditor participation." },
  { icon: MessagesSquare, title: "Creditor negotiation", body: "Create one organized communication path for discussing hardship, current cash flow, and possible terms." },
  { icon: Map, title: "Resolution planning", body: "Build a strategy around balances, contracts, operating needs, and the order in which obligations should be addressed." },
  { icon: Combine, title: "Multi-position strategy", body: "Evaluate stacked obligations together instead of treating each advance as an isolated problem." },
  { icon: HandCoins, title: "Negotiated settlement", body: "Where appropriate, pursue a negotiated resolution. Any outcome depends on the facts and creditor agreement." },
];

const STEPS = [
  { icon: ClipboardList, title: "Case review", body: "We collect the basics: balances, active positions, payment cadence, revenue, and immediate pressure points." },
  { icon: Search, title: "Document and cash-flow review", body: "Your agreements and operating picture are reviewed to understand the realistic options and risks." },
  { icon: Target, title: "Strategy", body: "A proposed path is built around your business, not around a generic savings promise." },
  { icon: Handshake, title: "Communication and negotiation", body: "If you choose to proceed, the team works through the agreed strategy and keeps you informed." },
];

const INDUSTRIES = [
  { label: "Restaurants", image: "https://images.pexels.com/photos/34164499/pexels-photo-34164499.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { label: "Trucking & Logistics", image: "https://images.pexels.com/photos/11114134/pexels-photo-11114134.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { label: "Construction & Trades", image: "https://images.pexels.com/photos/5973931/pexels-photo-5973931.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { label: "Medical Practices", image: "https://images.pexels.com/photos/7108403/pexels-photo-7108403.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { label: "Retail", image: "https://images.pexels.com/photos/3738387/pexels-photo-3738387.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { label: "Professional Services", image: "https://images.pexels.com/photos/36714208/pexels-photo-36714208.jpeg?auto=compress&cs=tinysrgb&w=900" },
];

const TRUST_POINTS = [
  ["Business only", "Focused on commercial obligations, not consumer debt."],
  ["Case by case", "No universal settlement percentage or timeline is promised."],
  ["Clear consent", "Contact permission is requested before a lead is submitted."],
  ["Human support", "The consultation is designed to lead to a real conversation."],
] as const;

const CLIENT_STORIES = [
  {
    industry: "Restaurant operator",
    detail: "Multiple weekly withdrawals",
    summary: "Several weekly withdrawals were compressing cash available for payroll, food costs, and rent.",
    situation: "The business was still operating, but stacked payment obligations were beginning to control day-to-day decisions.",
    review: "A useful review would organize the active obligations, payment cadence, cash-flow pressure, and contract terms before discussing possible paths.",
    nextStep: "The immediate goal is clarity: understand the obligations together, identify realistic options, and decide what should happen next.",
    image: INDUSTRIES[0].image,
  },
  {
    industry: "Logistics company",
    detail: "Stacked MCA positions",
    summary: "Multiple MCA positions were drawing from the same operating revenue while fuel, insurance, and driver costs continued.",
    situation: "The pressure was not one isolated payment. It was the combined effect of several withdrawals hitting the same cash flow.",
    review: "A consolidated review would compare balances, payment frequency, operating needs, and the order in which obligations should be addressed.",
    nextStep: "The business can then evaluate a coordinated strategy instead of reacting to each position separately.",
    image: INDUSTRIES[1].image,
  },
  {
    industry: "Medical practice",
    detail: "Cash-flow compression",
    summary: "A change in collections timing created a mismatch between incoming revenue and recurring financing withdrawals.",
    situation: "The practice needed to protect payroll and operating continuity while understanding what options were available around its commercial obligations.",
    review: "The starting point would be current cash flow, active agreements, balances, and any notices or escalation already received.",
    nextStep: "With that information organized, the business can make a more informed decision about restructuring, negotiation, or another appropriate path.",
    image: INDUSTRIES[3].image,
  },
];

const WHY_US = [
  { icon: ShieldCheck, title: "MCA-focused", body: "The site and intake flow are built specifically around commercial MCA pressure." },
  { icon: Sparkles, title: "No cookie-cutter promise", body: "The approach starts with the business facts instead of an advertised settlement percentage." },
  { icon: Eye, title: "Transparent process", body: "Options, uncertainty, and next steps should be explained before you decide to proceed." },
  { icon: Lock, title: "Privacy-minded intake", body: "The public form does not ask for SSNs, bank credentials, or payment card information." },
  { icon: Building2, title: "Operations first", body: "The practical question is how obligations interact with payroll, vendors, rent, and working capital." },
  { icon: UserCheck, title: "Direct support", body: "The goal of the online intake is to connect you with a person who can review the situation." },
];

const EDUCATION_ARTICLES = [
  { title: "What Is MCA Debt Relief?", body: "A plain-English overview of restructuring, negotiation, and settlement for commercial MCA obligations.", href: "/mca-debt-restructuring" },
  { title: "Settlement vs. Restructuring", body: "Two different approaches with different tradeoffs, creditor involvement, and possible consequences.", href: "/mca-debt-settlement" },
  { title: "What Happens After Default?", body: "Understand why contract terms, UCC filings, guarantees, and legal notices matter when payments stop.", href: "/what-happens-when-you-default" },
  { title: "Facing an MCA Lawsuit", body: "A starting point for understanding the urgency of legal papers and why licensed counsel may be needed.", href: "/mca-lawsuit" },
];

const FAQS = [
  { q: "What is merchant cash advance debt relief?", a: "It generally refers to strategies intended to address commercial MCA obligations through negotiated changes, restructuring, settlement, or other business-specific approaches. The available options depend on the agreements, balances, cash flow, creditor participation, and applicable law." },
  { q: "Can my MCA payments be reduced?", a: "Possibly, but there is no universal reduction. Any modified payment or settlement requires facts specific to your situation and, where applicable, creditor agreement." },
  { q: "What if I have multiple MCAs?", a: "Multiple positions are common. A useful review looks at the combined cash-flow burden and the terms of each obligation rather than evaluating one advance in isolation." },
  { q: "How long does the process take?", a: "There is no single timeline. It varies based on the number of obligations, creditor responsiveness, your financial situation, and the strategy used." },
  { q: "Are settlements guaranteed?", a: "No. Creditor participation and outcomes are not guaranteed, and no specific savings amount, percentage, or timeline should be assumed before your case is reviewed." },
  { q: "Is this for personal credit-card debt?", a: "No. MCAREVIVE is positioned for businesses and commercial obligations, not consumer or personal debt relief." },
  { q: "What should I have ready for a consultation?", a: "Recent MCA agreements, payment information, approximate balances, and a high-level picture of business revenue are useful. Do not send SSNs, bank passwords, or payment card numbers through the public website." },
];

function InlineCTA({ label }: { label: string }) {
  const openModal = useLeadModal();
  return (
    <div className="mt-10">
      <button onClick={openModal} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition hover:bg-ink-2">
        {label} <ArrowRight size={16} />
      </button>
    </div>
  );
}

function SectionHeading({ kicker, title, body }: { kicker: string; title: string; body?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{kicker}</p>
      <h2 className="display mt-3 text-3xl font-semibold leading-tight tracking-[-.045em] text-ink sm:text-4xl">{title}</h2>
      {body && <p className="mt-4 max-w-2xl text-base leading-7 text-ink/62">{body}</p>}
    </div>
  );
}

export function ProblemRecognition() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-24">
      <SectionHeading kicker="Pressure points" title="The problem is rarely just the balance." body="MCA stress shows up in day-to-day operations first. These are the signals worth taking seriously." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((p, index) => (
          <article key={p.title} className="lift-card premium-card rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p.icon className="text-amber" size={24} strokeWidth={1.7} />
              <span className="tabular text-xs text-ink/25">0{index + 1}</span>
            </div>
            <h3 className="display mt-5 text-lg font-semibold tracking-[-.025em]">{p.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/58">{p.body}</p>
          </article>
        ))}
      </div>
      <InlineCTA label="Review my situation" />
    </section>
  );
}

export function WhoWeHelp() {
  return (
    <section className="border-y border-line/80 bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading kicker="Who we work with" title="Built around the realities of operating businesses." body="MCA pressure can look different by industry, but the cash-flow problem is familiar across service, retail, logistics, healthcare, and the trades." />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((item) => (
            <article key={item.label} className="group relative min-h-48 overflow-hidden rounded-2xl bg-ink sm:min-h-60">
              <img src={item.image} alt={`${item.label} business`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-bold leading-tight text-white">{item.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="bg-ink py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p className="section-kicker !text-amber">Possible paths</p>
        <h2 className="display mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-[-.045em] sm:text-4xl">A strategy should fit the contracts and the business, not the ad.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">No single approach is right for every MCA situation. The goal is to understand the available paths, their tradeoffs, and what creditors may agree to.</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {SOLUTIONS.map((s) => (
            <article key={s.title} className="bg-ink p-6 transition hover:bg-white/[.035]">
              <s.icon className="text-amber" size={25} strokeWidth={1.6} />
              <h3 className="display mt-8 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-24">
      <SectionHeading kicker="Process" title="A clearer path from pressure to a decision." body="The first step is not signing up. It is understanding what you are dealing with." />
      <div ref={ref} className={`process-track mt-12 ${visible ? "is-visible" : ""}`}>
        {STEPS.map((s, i) => (
          <article key={s.title} className="process-step" style={{ "--step-delay": `${i * 120}ms` } as React.CSSProperties}>
            <div className="process-rail" aria-hidden="true"><span /></div>
            <div className="process-node"><s.icon size={21} strokeWidth={1.7} /></div>
            <div className="process-copy">
              <span className="tabular text-[10px] font-bold uppercase tracking-[.12em] text-[#89581c]">Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-2 text-xl font-semibold tracking-[-.025em] text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/58">{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="border-y border-line bg-white py-12">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {TRUST_POINTS.map(([title, body]) => (
          <div key={title} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 shrink-0 text-amber" size={20} />
            <div><div className="text-sm font-bold text-ink">{title}</div><div className="mt-1 text-xs leading-5 text-ink/52">{body}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ClientStories() {
  const [selectedStory, setSelectedStory] = useState<(typeof CLIENT_STORIES)[number] | null>(null);

  return (
    <>
      <section id="results" className="bg-paper-2 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHeading kicker="Business stories" title="See the situation behind the pressure, not just a headline." body="Every business is different. These examples show the kinds of MCA situations a confidential review can help organize before a business decides what to do next." />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {CLIENT_STORIES.map((c) => (
              <button
                key={c.industry}
                type="button"
                onClick={() => setSelectedStory(c)}
                className="premium-card group overflow-hidden rounded-3xl text-left transition hover:-translate-y-1 hover:border-amber/70 hover:shadow-[0_28px_65px_-38px_rgba(8,21,34,.55)]"
              >
                <div className="relative h-44 overflow-hidden bg-ink">
                  <img src={c.image} alt={`${c.industry} business`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-[.12em] text-white/85">{c.detail}</span>
                </div>
                <div className="p-6 sm:p-7">
                  <Quote className="text-amber" size={27} strokeWidth={1.5} />
                  <h3 className="display mt-5 text-xl font-semibold text-ink">{c.industry}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/65">{c.summary}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-[#89581c]">View story <ArrowRight size={14} className="transition group-hover:translate-x-1" /></div>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-ink/45">Illustrative business scenarios only. They are not promises of a particular result, savings amount, or timeline.</p>
        </div>
      </section>

      {selectedStory && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-[rgba(8,21,34,.82)] px-3 py-5 backdrop-blur-sm sm:px-6 sm:py-10" onClick={() => setSelectedStory(null)}>
          <div className="flex min-h-full items-center justify-center">
            <article className="w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-[#d7d1c5] bg-[#fffdf8] shadow-[0_35px_100px_-24px_rgba(0,0,0,.78)]" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-48 overflow-hidden bg-ink sm:h-64">
                <img src={selectedStory.image} alt={`${selectedStory.industry} business`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <button type="button" onClick={() => setSelectedStory(null)} aria-label="Close story" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-ink/75 text-white backdrop-blur-sm"><X size={18} /></button>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                  <div className="text-[10px] font-bold uppercase tracking-[.14em] text-amber">Business scenario</div>
                  <h3 className="display mt-2 text-2xl font-semibold">{selectedStory.industry}</h3>
                  <p className="mt-1 text-sm text-white/65">{selectedStory.detail}</p>
                </div>
              </div>
              <div className="grid gap-6 p-5 sm:p-7">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[.12em] text-[#89581c]">Situation</div>
                  <p className="mt-2 text-sm leading-7 text-ink/68">{selectedStory.situation}</p>
                </div>
                <div className="border-t border-line pt-5">
                  <div className="text-xs font-bold uppercase tracking-[.12em] text-[#89581c]">What a review would look at</div>
                  <p className="mt-2 text-sm leading-7 text-ink/68">{selectedStory.review}</p>
                </div>
                <div className="border-t border-line pt-5">
                  <div className="text-xs font-bold uppercase tracking-[.12em] text-[#89581c]">Next step</div>
                  <p className="mt-2 text-sm leading-7 text-ink/68">{selectedStory.nextStep}</p>
                </div>
                <button type="button" onClick={() => { setSelectedStory(null); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="min-h-12 rounded-full bg-ink px-6 text-sm font-bold text-white">Request a confidential review</button>
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
}

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-24">
      <SectionHeading kicker="Why MCAREVIVE" title="Credibility comes from what you refuse to overpromise." body="The experience is designed to feel professional and specific to commercial debt without relying on fake statistics or universal savings claims." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_US.map((w) => (
          <article key={w.title} className="rounded-2xl border border-line bg-cream p-6">
            <w.icon className="text-amber" size={23} strokeWidth={1.6} />
            <h3 className="display mt-5 text-lg font-semibold">{w.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/58">{w.body}</p>
          </article>
        ))}
      </div>
      <InlineCTA label="Request a confidential review" />
    </section>
  );
}

export function Education() {
  return (
    <section id="resources" className="bg-ink py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p className="section-kicker !text-amber">Resource center</p>
        <h2 className="display mt-3 max-w-3xl text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Know what the terms mean before you make the next move.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EDUCATION_ARTICLES.map((a) => (
            <a key={a.title} href={a.href} className="group rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:border-amber/45 hover:bg-white/[.06]">
              <BookOpen className="text-amber" size={22} strokeWidth={1.6} />
              <h3 className="display mt-6 text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">{a.body}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-amber">Read guide <ArrowRight size={14} className="transition group-hover:translate-x-1" /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-8 sm:py-24">
      <SectionHeading kicker="FAQ" title="Questions worth asking before you enroll in anything." />
      <div className="mt-9 divide-y divide-line border-y border-line">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold text-ink">
              <span>{f.q}</span><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-amber transition group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-ink/58">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA() {
  const openModal = useLeadModal();
  return (
    <section className="bg-amber py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-4 sm:px-8 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-ink/55">Start with clarity</p>
          <h2 className="display mt-3 text-3xl font-semibold leading-tight tracking-[-.045em] text-ink sm:text-5xl">You do not need another generic promise. You need to understand your options.</h2>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button onClick={openModal} className="min-h-12 rounded-full bg-ink px-6 text-sm font-bold text-white">Request Free Case Review</button>
          {hasPhone && <a href={`tel:${PHONE_TEL}`} className="flex min-h-12 items-center justify-center rounded-full border border-ink/25 px-6 text-sm font-bold text-ink">Call {PHONE_DISPLAY}</a>}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return <SiteFooter />;
}
