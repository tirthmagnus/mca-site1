"use client";

import Calculator from "./Calculator";

export default function Hero({ onApply }: { onApply: (amount: number) => void }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="tabular mb-5 inline-block rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber">
            Funding in as fast as 24 hours
          </p>
          <h1 className="display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
            Know your exact payback before you apply.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/70">
            Most sites make you fill out a form to find out what a cash advance actually
            costs. Move the sliders, see the real numbers, then apply in two minutes.
          </p>
          <dl className="mt-9 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-7">
            <div>
              <dt className="tabular text-2xl font-bold">$500K</dt>
              <dd className="mt-0.5 text-xs text-white/50">Max funding</dd>
            </div>
            <div>
              <dt className="tabular text-2xl font-bold">2 hrs</dt>
              <dd className="mt-0.5 text-xs text-white/50">Approval time</dd>
            </div>
            <div>
              <dt className="tabular text-2xl font-bold">550+</dt>
              <dd className="mt-0.5 text-xs text-white/50">Credit score OK</dd>
            </div>
          </dl>
        </div>

        <Calculator onApply={onApply} />
      </div>
    </section>
  );
}
