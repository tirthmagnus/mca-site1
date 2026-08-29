export default function Page() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-2xl px-5 py-24 sm:px-8">
      <a href="/" className="text-sm font-medium text-ink/60 hover:text-ink">&larr; Back home</a>
      <h1 className="display mt-6 text-3xl font-bold text-ink">What Happens If You Default on an MCA?</h1>
        <p className="mt-4 text-ink/70 leading-relaxed">Most MCA agreements include a clause called a confession of judgment, which can allow a funder to pursue collection quickly if a business misses payments, sometimes without a standard court hearing first.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">Many funders also file a UCC-1 lien against business assets or receivables at the time of funding. On default, that filing can be used to claim the collateral it covers, though it does not by itself freeze a bank account.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">In practice, default often means a rapid escalation: a funder may attempt to withdraw a lump sum, contact a business's customers or payment processors directly under the UCC filing, or move to enforce a judgment.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">None of this means options have run out. Businesses that reach out before or immediately after a missed payment generally have more room to negotiate than those who wait. See MCA Lawsuit if legal action has already started, or MCA Debt Settlement to see how a negotiated resolution works.</p>
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
