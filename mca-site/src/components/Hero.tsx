"use client";

import QuickQualifier from "./QuickQualifier";

export default function Hero({
  onContinue,
}: {
  onContinue: (balanceRange: string, numberOfMcas: string) => void;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="tabular mb-5 inline-block rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber">
            Confidential consultation, no obligation
          </p>
          <p className="display text-lg font-semibold text-amber sm:text-xl">
            Break free from the MCA payment cycle.
          </p>
          <h1 className="display mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.2rem]">
            Merchant cash advance payments taking over your cash flow?
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/70">
            If daily or weekly MCA withdrawals are straining your business, you may have
            more options than you think. We help business owners explore ways to
            restructure or resolve overwhelming MCA obligations and get cash flow back
            under control.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            <li>Confidential consultation</li>
            <li>No obligation</li>
            <li>Business-focused solutions</li>
          </ul>
        </div>

        <QuickQualifier onContinue={onContinue} />
      </div>
    </section>
  );
}
