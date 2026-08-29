const STEPS = [
  { title: "Tell us the basics", body: "Business name, revenue range, and how much you need. Two minutes, soft credit check only." },
  { title: "We review", body: "A funding specialist looks at your numbers, not just your credit score." },
  { title: "You get an offer", body: "See your exact factor rate and remittance schedule before you sign anything." },
  { title: "Funds land", body: "Approved offers can fund in as fast as 24 hours after signing." },
];

const INDUSTRIES = [
  "Restaurants", "Retail", "Construction", "Trucking & Transport",
  "Healthcare", "Auto Repair", "Salons & Spas", "E-commerce",
];

const COMPARISON: [string, string, string, string][] = [
  ["Approval speed", "As fast as 2 hours", "1-3 business days", "Several weeks"],
  ["Credit score needed", "550+", "600+", "680+"],
  ["Collateral required", "None", "Sometimes", "Usually"],
  ["Repayment", "Tied to daily sales", "Fixed schedule", "Fixed schedule"],
];

const FAQS = [
  { q: "Will applying hurt my credit score?", a: "No. Prequalifying uses a soft credit check, which doesn't affect your score. A hard pull only happens if you move forward with a signed offer." },
  { q: "What's a factor rate?", a: "It's the multiplier applied to your advance to set the total payback, for example a 1.25 factor rate on a $50,000 advance means you repay $62,500. It's fixed at approval and doesn't compound like interest does." },
  { q: "What information will you ask for?", a: "To start: your business name, industry, time in business, and revenue range. Bank statements and ID come later in the process, never through this chat or the initial form." },
  { q: "How is this different from a bank loan?", a: "An MCA is a sale of future receivables, not a loan, so approval is faster and less dependent on your credit score. It typically costs more than a bank loan, so it fits best for short-term needs, not long-term financing." },
];

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

export function Industries() {
  return (
    <section id="industries" className="bg-paper-2 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="display text-3xl font-bold text-ink">Built for businesses like yours</h2>
        <p className="mt-2 text-ink/60">Funding designed around industries with variable, seasonal, or card-heavy revenue.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind}
              className="rounded-xl border border-line bg-white px-4 py-4 text-sm font-medium text-ink/80"
            >
              {ind}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h2 className="display text-3xl font-bold text-ink">MCA vs. other financing</h2>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-ink text-left text-white">
              <th className="px-5 py-3.5 font-semibold"> </th>
              <th className="px-5 py-3.5 font-semibold">Merchant Cash Advance</th>
              <th className="px-5 py-3.5 font-semibold">Business Line of Credit</th>
              <th className="px-5 py-3.5 font-semibold">Bank Term Loan</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map(([label, mca, loc, bank], i) => (
              <tr key={label} className={i % 2 ? "bg-paper-2" : "bg-white"}>
                <td className="px-5 py-3.5 font-medium text-ink/70">{label}</td>
                <td className="tabular px-5 py-3.5 font-semibold text-ink">{mca}</td>
                <td className="px-5 py-3.5 text-ink/70">{loc}</td>
                <td className="px-5 py-3.5 text-ink/70">{bank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="bg-paper-2 py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
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
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-14 text-white/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="display text-lg font-bold text-white">
          Summit<span className="text-amber">Cap</span>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed">
          SummitCap is a marketing name. Financing offers are subject to underwriting approval
          and vary by state. A merchant cash advance is a purchase of future receivables, not a
          loan, and is not subject to state usury laws governing interest rates. Rates, terms,
          and requirements shown are estimates for illustration and are not a commitment to
          lend or extend credit. Not all applicants qualify. See your state's specific
          commercial financing disclosure requirements for full terms before signing.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">State Disclosures</a>
          <a href="tel:+18005551234" className="hover:text-white">(800) 555-1234</a>
        </div>
      </div>
    </footer>
  );
}
