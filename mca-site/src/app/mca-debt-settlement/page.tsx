export default function Page() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-2xl px-5 py-24 sm:px-8">
      <a href="/" className="text-sm font-medium text-ink/60 hover:text-ink">&larr; Back home</a>
      <h1 className="display mt-6 text-3xl font-bold text-ink">MCA Debt Settlement</h1>
        <p className="mt-4 text-ink/70 leading-relaxed">MCA debt settlement is a negotiated agreement with a funder to resolve an outstanding balance for less than the full amount owed, often paired with combining multiple positions into a single, lower weekly payment.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">This differs from restructuring: restructuring changes the terms of an existing agreement, settlement negotiates the amount owed down directly. Businesses carrying multiple stacked positions, see What Is MCA Stacking?, are the most common candidates for a settlement-based approach.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">Settlement outcomes vary case by case, depending on the specific funder, the number of positions, and the business's current financial situation. No settlement percentage or dollar amount can be promised before a funder actually agrees to terms.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">If a funder has already filed suit or sent a demand letter, see MCA Lawsuit for what that changes about timing and options.</p>
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
