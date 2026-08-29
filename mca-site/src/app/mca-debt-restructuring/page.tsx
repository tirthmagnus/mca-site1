export default function Page() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-2xl px-5 py-24 sm:px-8">
      <a href="/" className="text-sm font-medium text-ink/60 hover:text-ink">&larr; Back home</a>
      <h1 className="display mt-6 text-3xl font-bold text-ink">MCA Debt Restructuring</h1>
        <p className="mt-4 text-ink/70 leading-relaxed">MCA debt restructuring is the process of modifying the terms of one or more merchant cash advances, typically the payment amount, frequency, or schedule, to better match what a business's cash flow can actually support.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">Unlike a traditional loan modification, an MCA isn't governed by state usury or lending laws, since it's structured as a purchase of future receivables rather than a loan. That means restructuring happens through direct negotiation with the funder, not a standardized legal process.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">Restructuring is most relevant for businesses with one MCA position that has become unmanageable, but revenue is still steady enough to support a lower, more predictable payment going forward.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">When more than one position is involved, restructuring is usually combined with a broader consolidation approach, see MCA Debt Settlement for how that works when multiple funders are involved.</p>
      <div className="mt-8 rounded-xl border border-amber/40 bg-amber/10 p-5 text-xs text-ink/60">
        [LEGAL COPY TO BE REVIEWED BY COMPANY COUNSEL] — general information only, not legal
        or financial advice specific to any individual situation.
      </div>
      <a href="/#apply" className="mt-8 inline-block rounded-lg bg-amber px-6 py-3 text-sm font-semibold text-ink hover:bg-amber-2">
        Get my free case review &rarr;
      </a>
    </main>
  );
}
