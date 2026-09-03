"use client";

import { useState } from "react";

const BALANCE_OPTIONS = [
  ["under_25k", "Under $25k"],
  ["25k_50k", "$25k - $50k"],
  ["50k_100k", "$50k - $100k"],
  ["100k_250k", "$100k - $250k"],
  ["250k_plus", "$250k+"],
] as const;
const MCA_COUNT_OPTIONS = [["1", "1"], ["2", "2"], ["3", "3"], ["4_plus", "4+"]] as const;

export default function QuickQualifier({ onContinue }: { onContinue: (balanceRange: string, numberOfMcas: string) => void }) {
  const [balanceRange, setBalanceRange] = useState<string | null>(null);
  const [numberOfMcas, setNumberOfMcas] = useState<string | null>(null);
  const canContinue = Boolean(balanceRange && numberOfMcas);

  return (
    <div className="premium-card min-w-0 rounded-[26px] bg-cream p-5 text-ink sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Quick fit check</p>
          <h2 className="display mt-2 text-xl font-semibold tracking-[-.03em]">Start with two numbers.</h2>
        </div>
        <span className="tabular rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold text-white">~30 sec</span>
      </div>

      <div className="mt-5">
        <div className="text-xs font-semibold uppercase tracking-[.08em] text-ink/50">Outstanding MCA balance</div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BALANCE_OPTIONS.map(([val, label]) => (
            <button key={val} type="button" onClick={() => setBalanceRange(val)} className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors sm:text-sm ${balanceRange === val ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/75 hover:border-ink/35"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="text-xs font-semibold uppercase tracking-[.08em] text-ink/50">Active MCA positions</div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {MCA_COUNT_OPTIONS.map(([val, label]) => (
            <button key={val} type="button" onClick={() => setNumberOfMcas(val)} className={`min-h-11 rounded-xl border text-sm font-bold transition-colors ${numberOfMcas === val ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/75 hover:border-ink/35"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <button disabled={!canContinue} onClick={() => canContinue && onContinue(balanceRange!, numberOfMcas!)} className="mt-6 min-h-12 w-full rounded-full bg-amber px-5 text-sm font-bold text-ink transition hover:bg-amber-2 disabled:cursor-not-allowed disabled:opacity-40">
        Continue to free case review
      </button>
      <p className="mt-3 text-center text-[11px] leading-5 text-ink/45">No obligation. No guaranteed outcome claims. Your information is handled confidentially.</p>
    </div>
  );
}
