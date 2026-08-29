"use client";

import { useMemo, useState } from "react";

function formatUSD(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function Calculator({
  onApply,
}: {
  onApply: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(50000);
  const [factorRate, setFactorRate] = useState(1.24);
  const [termMonths, setTermMonths] = useState(9);

  const { payback, dailyRemittance, cost } = useMemo(() => {
    const payback = amount * factorRate;
    const cost = payback - amount;
    // Rough business-day estimate: ~21 business days/month.
    const businessDays = termMonths * 21;
    const dailyRemittance = payback / businessDays;
    return { payback, dailyRemittance, cost };
  }, [amount, factorRate, termMonths]);

  return (
    <div className="rounded-2xl border border-line bg-white/95 p-6 shadow-[0_20px_60px_-25px_rgba(11,18,32,0.35)] sm:p-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="display text-lg font-semibold text-ink">
          See your numbers first
        </h2>
        <span className="tabular text-xs text-ink/50">estimate only</span>
      </div>

      <div className="space-y-5">
        <Field label="Funding amount" value={formatUSD(amount)}>
          <input
            type="range"
            min={5000}
            max={500000}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-2 w-full accent-amber"
            aria-label="Funding amount"
          />
        </Field>

        <Field label="Factor rate" value={factorRate.toFixed(2)}>
          <input
            type="range"
            min={1.1}
            max={1.5}
            step={0.01}
            value={factorRate}
            onChange={(e) => setFactorRate(Number(e.target.value))}
            className="mt-2 w-full accent-amber"
            aria-label="Factor rate"
          />
        </Field>

        <Field label="Term" value={`${termMonths} months`}>
          <input
            type="range"
            min={3}
            max={18}
            step={1}
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className="mt-2 w-full accent-amber"
            aria-label="Term in months"
          />
        </Field>
      </div>

      <div className="mt-7 grid grid-cols-3 gap-3 border-t border-line pt-6">
        <Stat label="Total payback" value={formatUSD(payback)} />
        <Stat label="Cost of capital" value={formatUSD(cost)} />
        <Stat label="Est. daily remittance" value={formatUSD(dailyRemittance)} />
      </div>

      <button
        onClick={() => onApply(amount)}
        className="mt-7 w-full rounded-lg bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-amber"
      >
        Get a real quote for {formatUSD(amount)} &rarr;
      </button>
      <p className="mt-3 text-center text-xs text-ink/45">
        Estimate only, not an offer. A soft credit check won&apos;t affect your score.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-ink/70">{label}</label>
        <span className="tabular text-base font-semibold text-ink">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="tabular text-lg font-semibold text-ink sm:text-xl">{value}</div>
      <div className="mt-0.5 text-xs leading-tight text-ink/50">{label}</div>
    </div>
  );
}
