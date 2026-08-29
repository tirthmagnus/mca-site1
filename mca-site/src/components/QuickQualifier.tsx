"use client";

import { useState } from "react";

const BALANCE_OPTIONS = [
  ["under_25k", "Under $25,000"],
  ["25k_50k", "$25,000 – $50,000"],
  ["50k_100k", "$50,000 – $100,000"],
  ["100k_250k", "$100,000 – $250,000"],
  ["250k_plus", "$250,000+"],
] as const;

const MCA_COUNT_OPTIONS = ["1", "2", "3", "4+"] as const;

export default function QuickQualifier({
  onContinue,
}: {
  onContinue: (balanceRange: string, numberOfMcas: string) => void;
}) {
  const [balanceRange, setBalanceRange] = useState<string | null>(null);
  const [numberOfMcas, setNumberOfMcas] = useState<string | null>(null);

  const canContinue = balanceRange && numberOfMcas;

  return (
    <div className="rounded-2xl border border-line bg-white/95 p-6 shadow-[0_20px_60px_-25px_rgba(11,18,32,0.35)] sm:p-8">
      <h2 className="display text-lg font-semibold text-ink">See if you may have options</h2>
      <p className="mt-1 text-xs text-ink/50">Two quick questions, no commitment</p>

      <div className="mt-6">
        <div className="text-sm font-medium text-ink/70">Approximate outstanding MCA balance</div>
        <div className="mt-2.5 grid grid-cols-1 gap-2">
          {BALANCE_OPTIONS.map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setBalanceRange(val)}
              className={`rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                balanceRange === val
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper text-ink/80 hover:border-ink/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm font-medium text-ink/70">Number of active MCAs</div>
        <div className="mt-2.5 grid grid-cols-4 gap-2">
          {MCA_COUNT_OPTIONS.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setNumberOfMcas(val)}
              className={`rounded-lg border py-2.5 text-sm font-semibold transition-colors ${
                numberOfMcas === val
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper text-ink/80 hover:border-ink/40"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!canContinue}
        onClick={() => canContinue && onContinue(balanceRange, numberOfMcas)}
        className="mt-7 w-full rounded-lg bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue to free case review &rarr;
      </button>
      <p className="mt-3 text-center text-xs text-ink/45">
        Confidential. No obligation. Business-focused solutions.
      </p>
    </div>
  );
}
