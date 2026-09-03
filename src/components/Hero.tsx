"use client";

import { ArrowDownRight, CheckCircle2 } from "lucide-react";
import QuickQualifier from "./QuickQualifier";

export default function Hero({ onContinue }: { onContinue: (balanceRange: string, numberOfMcas: string) => void }) {
  return (
    <section id="top" className="soft-grid relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-0 h-[440px] w-[440px] rounded-full bg-[#2f5a68]/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="min-w-0">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/60">
            <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1.5 text-amber">Business debt support</span>
            <span>Confidential case review</span>
          </div>

          <h1 className="display max-w-[760px] text-[clamp(2.55rem,8vw,5.4rem)] font-semibold leading-[.96] tracking-[-0.055em]">
            Protect the business you built from MCA cash-flow pressure.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
            When daily or weekly merchant cash advance withdrawals start crowding out payroll, inventory, or operations, we help business owners evaluate restructuring and negotiated resolution options.
          </p>

          <div className="mt-7 grid max-w-xl gap-2.5 sm:grid-cols-3">
            {["Business-only focus", "Case-by-case strategy", "No outcome guarantees"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/72">
                <CheckCircle2 size={16} className="shrink-0 text-amber" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <a href="#how" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-white">
            See how the process works <ArrowDownRight size={16} />
          </a>
        </div>

        <div className="min-w-0">
          <div className="relative mb-4 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-2 shadow-[0_32px_90px_-38px_rgba(0,0,0,.75)]">
            <div className="relative h-52 overflow-hidden rounded-[22px] sm:h-64 lg:h-72">
              <img
                src="https://images.pexels.com/photos/34164499/pexels-photo-34164499.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Small business owners standing behind a cafe counter"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/12 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-amber">Built for operators</p>
                <p className="mt-1 max-w-md text-sm leading-6 text-white/85">A calmer, clearer first step before you make another financing decision.</p>
              </div>
            </div>
          </div>
          <QuickQualifier onContinue={onContinue} />
        </div>
      </div>
    </section>
  );
}
