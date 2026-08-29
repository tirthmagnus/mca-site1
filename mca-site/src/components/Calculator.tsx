"use client";

import { useMemo, useState } from "react";

function formatUSD(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

// Rough, deliberately conservative illustration of typical MCA debt
// settlement outcomes. Real savings depend entirely on number of
// positions, lender, and how far behind the merchant is, this is
// clearly labeled as an estimate everywhere it's shown.
function estimateSavings(debt: number, weeklyPayment: number) {
  const settlementSavingsRate = 0.32; // typical reduction off principal
  const estimatedSettlement = debt * (1 - settlementSavingsRate);
  const totalSaved = debt - estimatedSettlement;

  // New consolidated weekly payment: assume it drops to roughly 45%
  // of current total weekly outflow once positions are combined.
  const newWeeklyPayment = weeklyPayment * 0.45;
  const weeklyRelief = weeklyPayment - newWeeklyPayment;

  return { estimatedSettlement, totalSaved, newWeeklyPayment, weeklyRelief };
}

export default function Calculator({
  onGetStarted,
}: {
  onGetStarted: (debt: number) => void;
}) {
  const [debt, setDebt] = useState(75000);
  const [weeklyPayment, setWeeklyPayment] = useState(6000);

  const { estimatedSettlement, totalSaved, newWeeklyPayment, weeklyRelief } =
    useMemo(() => estimateSavings(debt, weeklyPayment), [debt, weeklyPayment]);

  return (
    <div className="rounded-2xl border border-line bg-white/95 p-6 shadow-[0_20px_60px_-25px_rgba(11,18,32,0.35)] sm:p-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="display text-lg font-semibold text-ink">
          See what relief could look like
        </h2>
        <span className="tabular text-xs text-ink/50">estimate only</span>
      </div>

      <div className="space-y-5">
        <Field label="Total MCA debt owed" value={formatUSD(debt)}>
          <input
            type="range"
            min={20000}
            max={500000}
            step={5000}
            value={debt}
            onChange={(e) => setDebt(Number(e.target.value))}
            className="mt-2 w-full accent-amber"
            aria-label="Total MCA debt owed"
          />
        </Field>

        <Field label="Current weekly payment" value={formatUSD(weeklyPayment)}>
          <input
            type="range"
            min={500}
            max={30000}
            step={250}
            value={weeklyPayment}
            onChange={(e) => setWeeklyPayment(Number(e.target.value))}
            className="mt-2 w-full accent-amber"
            aria-label="Current weekly payment across all positions"
          />
        </Field>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 border-t border-line pt-6">
        <Stat label="Estimated new weekly payment" value={formatUSD(newWeeklyPayment)} />
        <Stat label="Weekly cash freed up" value={formatUSD(weeklyRelief)} />
        <Stat label="Estimated settled amount" value={formatUSD(estimatedSettlement)} />
        <Stat label="Estimated total savings" value={formatUSD(totalSaved)} />
      </div>

      <button
        onClick={() => onGetStarted(debt)}
        className="mt-7 w-full rounded-lg bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-amber"
      >
        Get my free debt assessment &rarr;
      </button>
      <p className="mt-3 text-center text-xs text-ink/45">
        Illustration only, not a guarantee. Actual outcomes depend on your lenders and
        specific situation. Free consultation, no obligation.
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
