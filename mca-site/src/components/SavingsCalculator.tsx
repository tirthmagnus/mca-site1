"use client";

import { useMemo, useState } from "react";

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

// Illustration only. Every number here is a rough, generic estimate, not
// a projection of a real outcome. Actual results depend entirely on the
// specific lenders and agreements involved, subject to their approval.
function estimate(debt: number, weeklyPayment: number) {
  const estimatedSettlement = debt * 0.68;
  const totalSaved = debt - estimatedSettlement;
  const newWeeklyPayment = weeklyPayment * 0.45;
  return { estimatedSettlement, totalSaved, newWeeklyPayment, weeklyRelief: weeklyPayment - newWeeklyPayment };
}

export default function SavingsCalculator({ onGetStarted }: { onGetStarted: () => void }) {
  const [debt, setDebt] = useState(75000);
  const [weeklyPayment, setWeeklyPayment] = useState(6000);
  const { estimatedSettlement, totalSaved, newWeeklyPayment, weeklyRelief } = useMemo(
    () => estimate(debt, weeklyPayment),
    [debt, weeklyPayment]
  );

  return (
    <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_20px_60px_-30px_rgba(11,18,32,0.25)] sm:p-10">
        <div className="text-center">
          <h2 className="display text-3xl font-bold text-ink">See what relief could look like</h2>
          <p className="mt-2 text-ink/60">A rough illustration, not a projection of your specific outcome.</p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium text-ink/70">Total MCA debt owed</label>
                <span className="tabular text-base font-semibold text-ink">{formatUSD(debt)}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={500000}
                step={5000}
                value={debt}
                onChange={(e) => setDebt(Number(e.target.value))}
                className="mt-2 w-full accent-amber"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium text-ink/70">Current weekly payment</label>
                <span className="tabular text-base font-semibold text-ink">{formatUSD(weeklyPayment)}</span>
              </div>
              <input
                type="range"
                min={500}
                max={30000}
                step={250}
                value={weeklyPayment}
                onChange={(e) => setWeeklyPayment(Number(e.target.value))}
                className="mt-2 w-full accent-amber"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl bg-paper-2 p-5">
            <div>
              <div className="tabular text-lg font-bold text-ink sm:text-xl">{formatUSD(newWeeklyPayment)}</div>
              <div className="mt-0.5 text-xs text-ink/50">Est. new weekly payment</div>
            </div>
            <div>
              <div className="tabular text-lg font-bold text-ink sm:text-xl">{formatUSD(weeklyRelief)}</div>
              <div className="mt-0.5 text-xs text-ink/50">Weekly cash freed up</div>
            </div>
            <div>
              <div className="tabular text-lg font-bold text-ink sm:text-xl">{formatUSD(estimatedSettlement)}</div>
              <div className="mt-0.5 text-xs text-ink/50">Est. settled amount</div>
            </div>
            <div>
              <div className="tabular text-lg font-bold text-ink sm:text-xl">{formatUSD(totalSaved)}</div>
              <div className="mt-0.5 text-xs text-ink/50">Est. total savings</div>
            </div>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          className="mt-8 w-full rounded-lg bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-amber-2 hover:shadow-lg sm:w-auto sm:px-10"
        >
          Get my actual numbers &rarr;
        </button>
        <p className="mt-3 text-xs text-ink/45">
          Illustration only, not a guarantee. Actual outcomes depend on your specific lenders and
          agreements, subject to their approval.
        </p>
      </div>
    </section>
  );
}
