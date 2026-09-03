"use client";

import { useMemo, useState } from "react";
import { Activity, CalendarDays, Gauge, WalletCards } from "lucide-react";

function formatUSD(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatPct(n: number) {
  return `${Math.round(n)}%`;
}

export default function SavingsCalculator({ onGetStarted }: { onGetStarted: () => void }) {
  const [debt, setDebt] = useState(75000);
  const [weeklyPayment, setWeeklyPayment] = useState(6000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(60000);

  const metrics = useMemo(() => {
    const monthlyMcaOutflow = (weeklyPayment * 52) / 12;
    const annualMcaOutflow = weeklyPayment * 52;
    const revenueBurden = monthlyRevenue > 0 ? (monthlyMcaOutflow / monthlyRevenue) * 100 : 0;
    const remainingBeforeExpenses = monthlyRevenue - monthlyMcaOutflow;

    const pressure =
      revenueBurden >= 50
        ? "Severe cash-flow pressure"
        : revenueBurden >= 30
          ? "High cash-flow pressure"
          : revenueBurden >= 15
            ? "Meaningful cash-flow pressure"
            : "Lower payment pressure";

    return { monthlyMcaOutflow, annualMcaOutflow, revenueBurden, remainingBeforeExpenses, pressure };
  }, [weeklyPayment, monthlyRevenue]);

  const cards = [
    { icon: CalendarDays, value: formatUSD(metrics.monthlyMcaOutflow), label: "Approx. monthly MCA withdrawals" },
    { icon: WalletCards, value: formatUSD(metrics.annualMcaOutflow), label: "Annualized MCA outflow" },
    { icon: Gauge, value: formatPct(metrics.revenueBurden), label: "Monthly revenue going to MCA payments" },
    { icon: Activity, value: formatUSD(metrics.remainingBeforeExpenses), label: "Revenue left before all other expenses" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-24">
      <div className="overflow-hidden rounded-[2rem] border border-line bg-cream shadow-[0_35px_90px_-60px_rgba(8,21,34,.6)]">
        <div className="grid lg:grid-cols-[.9fr_1.1fr]">
          <div className="bg-ink p-6 text-white sm:p-10 lg:p-12">
            <p className="section-kicker !text-amber">Cash-flow pressure check</p>
            <h2 className="display mt-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
              See how much of the business is being consumed by MCA payments.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/58 sm:text-base">
              This calculator only uses the numbers you enter. It does not predict a settlement, payment reduction, savings amount, or creditor outcome.
            </p>

            <div className="mt-9 space-y-7">
              <RangeControl label="Outstanding MCA balance" value={debt} min={20000} max={500000} step={5000} onChange={setDebt} />
              <RangeControl label="Current weekly MCA payment" value={weeklyPayment} min={500} max={30000} step={250} onChange={setWeeklyPayment} />
              <RangeControl label="Approximate monthly business revenue" value={monthlyRevenue} min={10000} max={300000} step={5000} onChange={setMonthlyRevenue} />
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col gap-2 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[.14em] text-ink/42">Current pressure profile</div>
                <div className="display mt-2 text-2xl font-semibold text-ink">{metrics.pressure}</div>
              </div>
              <div className="tabular text-sm text-ink/45">Debt entered: {formatUSD(debt)}</div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {cards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-line bg-paper p-5">
                  <card.icon size={19} strokeWidth={1.6} className="text-amber" />
                  <div className="tabular mt-5 break-words text-xl font-bold tracking-[-.03em] text-ink sm:text-2xl">{card.value}</div>
                  <div className="mt-1.5 text-xs leading-5 text-ink/48">{card.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber/30 bg-amber/10 p-5 text-sm leading-6 text-ink/65">
              A case review can look at the actual agreements, payment structure, creditor positions, and business cash flow. Any change still depends on the facts of the case and creditor agreement.
            </div>

            <button
              onClick={onGetStarted}
              className="mt-6 min-h-12 w-full rounded-full bg-ink px-6 text-sm font-bold text-white transition hover:bg-ink-2 sm:w-auto"
            >
              Review my situation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-white/65">{label}</label>
        <span className="tabular shrink-0 text-sm font-bold text-amber sm:text-base">{formatUSD(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-amber"
      />
    </div>
  );
}
