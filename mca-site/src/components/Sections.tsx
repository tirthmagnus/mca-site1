const PROBLEMS = [
  { title: "Daily ACH Withdrawals", body: "Payments pulled from your account every business day, regardless of how sales actually came in that day." },
  { title: "Multiple Stacked MCAs", body: "More than one advance running at the same time, each one drawing from the same daily revenue." },
  { title: "Declining Revenue", body: "A slower season or a rough stretch makes fixed daily payments feel heavier every week." },
  { title: "Collection Pressure", body: "Calls, letters, or a lender pushing for payment faster than your cash flow can support." },
  { title: "UCC Filings", body: "A lender has filed a public claim (a UCC-1) against your business assets or receivables tied to the advance." },
  { title: "Falling Behind", body: "Payments that were manageable at first are no longer lining up with what your business brings in." },
];

const SOLUTIONS = [
  { title: "Restructure Payments", body: "Explore whether payment amount, frequency, or schedule may be modified, subject to your funder's agreement." },
  { title: "Negotiate MCA Obligations", body: "Open a direct conversation with your MCA provider about your current situation and possible adjusted terms." },
  { title: "Develop a Resolution Strategy", body: "Build a plan specific to your balances, agreements, and cash flow, not a one-size-fits-all approach." },
  { title: "Stacked MCA Relief", body: "When multiple positions are involved, work toward a combined approach across all of them rather than one at a time." },
  { title: "Business Debt Settlement", body: "Where appropriate, pursue a negotiated resolution on outstanding balances with your funders." },
];

const STEPS = [
  { title: "Free Case Review", body: "We gather information about your business, your MCA obligations, current payments, and financial situation." },
  { title: "MCA Analysis", body: "We review your agreements, balances, payment history, and business cash flow in detail." },
  { title: "Resolution Strategy", body: "We map out potential approaches based specifically on your business's circumstances." },
  { title: "Negotiation & Resolution", body: "We communicate with your MCA providers and pursue an agreed resolution where possible." },
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
  {
    industry: "Restaurant",
    numberOfMcas: "3 positions",
    quote: "One weekly payment instead of three daily withdrawals changed how I could plan payroll and inventory.",
  },
  {
    industry: "Trucking",
    numberOfMcas: "2 positions",
    quote: "Having someone negotiate directly with my funders meant I could focus on keeping trucks on the road.",
  },
  {
    industry: "Medical practice",
    numberOfMcas: "4 positions",
    quote: "I didn't think there was a path that didn't end in closing. There was, and I had help through every step.",
  },
];

const WHY_US = [
  { title: "MCA-Focused Experience", body: "We work specifically with merchant cash advance obligations, not general consumer debt." },
  { title: "Customized Strategies", body: "Your revenue, agreements, and balances shape the approach, not a template." },
  { title: "Transparent Communication", body: "You know what's happening with your case and why, at every stage." },
  { title: "Confidential Consultations", body: "Your situation stays private, reviewed only by the team working your case." },
  { title: "Business-First Approach", body: "The goal is keeping your business operating, not just settling a number." },
  { title: "Direct Human Support", body: "A real person on your case, not a ticket queue." },
];

const EDUCATION_ARTICLES = [
  { title: "What Is MCA Debt Relief?", body: "An overview of what debt relief actually means for a business carrying merchant cash advance obligations, and how it differs from a loan modification." },
  { title: "MCA Settlement vs. MCA Consolidation", body: "Settlement negotiates down what's owed. Consolidation combines multiple positions into one payment. They solve different problems." },
  { title: "What Happens If You Default on an MCA?", body: "MCA agreements often include a confession of judgment, a clause that can let a funder pursue collection quickly, without a standard court proceeding." },
  { title: "What Is MCA Stacking?", body: "Taking on a new advance while still repaying existing ones. Each funder draws from the same daily revenue, and the combined effective cost compounds fast." },
  { title: "Can MCA Payments Be Restructured?", body: "Sometimes, subject to your funder's agreement. It depends on your specific contracts, balances, and how many positions are involved." },
  { title: "What Is a UCC-1 Filing?", body: "A public filing that gives your MCA funder a legal claim on business assets or receivables. It doesn't freeze your accounts by itself, but it affects your standing with other lenders." },
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

export function ProblemRecognition() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h2 className="display text-3xl font-bold text-ink">Is this happening to your business?</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((p) => (
          <div key={p.title} className="rounded-xl border border-line bg-white p-5">
            <h3 className="display text-base font-semibold text-ink">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{p.body}</p>
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
            <div key={s.title} className="rounded-xl border border-line bg-white p-5">
              <h3 className="display text-base font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h2 className="display text-3xl font-bold text-ink">How it works</h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <div key={s.title} className="border-t-2 border-amber pt-4">
            <div className="tabular text-sm text-ink/40">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="display mt-2 text-lg font-semibold text-ink">{s.title}</h3>
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
            <div key={c.industry} className="rounded-xl border border-line bg-white p-5">
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
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_US.map((w) => (
          <div key={w.title}>
            <h3 className="display text-base font-semibold text-ink">{w.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{w.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="resources" className="bg-paper-2 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="display text-3xl font-bold text-ink">Understand your MCA options</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EDUCATION_ARTICLES.map((a) => (
            <div key={a.title} className="rounded-xl border border-line bg-white p-5">
              <h3 className="display text-base font-semibold text-ink">{a.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{a.body}</p>
            </div>
          ))}
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
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink">
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
  return (
    <section className="bg-ink py-20 text-center text-white">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <h2 className="display text-3xl font-bold">Your business may have more options than you think.</h2>
        <p className="mt-3 text-white/70">
          Tell us what&apos;s happening with your MCA payments and learn what options may be available.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#apply" className="rounded-lg bg-amber px-6 py-3.5 text-sm font-semibold text-ink hover:bg-amber-2">
            Request a Free Case Review
          </a>
          <a href="tel:+10000000000" className="rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
            Speak With Our Team: [PHONE]
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-14 text-white/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="display text-lg font-bold text-white">
          [COMPANY <span className="text-amber">NAME]</span>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed">
          [LEGAL COPY TO BE REVIEWED BY COMPANY COUNSEL] — [Company Name] is a business debt
          advisory service. It is not a law firm, government agency, or lender unless
          explicitly stated otherwise, and does not guarantee specific settlement amounts,
          payment reductions, or timelines. Individual results vary. Fees for services, if
          any, are disclosed in writing before any agreement begins.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
          <a href="#" className="hover:text-white">Accessibility Statement</a>
          <a href="#" className="hover:text-white">Business Debt Services Disclaimer</a>
          <a href="#" className="hover:text-white">Communication Consent</a>
          <a href="#" className="hover:text-white">Legal Disclaimer</a>
          <a href="tel:+10000000000" className="hover:text-white">[PHONE]</a>
        </div>
      </div>
    </footer>
  );
}
