export default function Page() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-2xl px-5 py-24 sm:px-8">
      <a href="/" className="text-sm font-medium text-ink/60 hover:text-ink">&larr; Back home</a>
      <h1 className="display mt-6 text-3xl font-bold text-ink">Facing an MCA Lawsuit</h1>
        <p className="mt-4 text-ink/70 leading-relaxed">If a funder has filed suit, or a confession of judgment has already been entered, timing matters. This is not legal advice, and if you're facing active litigation, a licensed attorney should review your specific situation.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">What a debt relief approach can still do alongside legal counsel is work directly with the funder on a negotiated resolution, which can sometimes reduce or resolve the underlying obligation even after a suit has been filed.</p>
        <p className="mt-4 text-ink/70 leading-relaxed">A confession of judgment clause is what allows some funders to move quickly to judgment without a typical court process, which is why acting early, before litigation starts, generally preserves more options. See What Happens If You Default for how that escalation usually unfolds.</p>
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
