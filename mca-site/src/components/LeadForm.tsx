"use client";

import { useEffect, useState } from "react";

type FormState = {
  balanceRange: string;
  numberOfMcas: string;
  paymentFrequency: string;
  monthlyRevenue: string;
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  state: string;
  consentToContact: boolean;
  companyWebsite: string; // honeypot, must stay empty
};

const BALANCE_OPTIONS: [string, string][] = [
  ["under_25k", "Under $25,000"],
  ["25k_50k", "$25,000 – $50,000"],
  ["50k_100k", "$50,000 – $100,000"],
  ["100k_250k", "$100,000 – $250,000"],
  ["250k_plus", "$250,000+"],
];

const MCA_COUNT_OPTIONS: [string, string][] = [
  ["1", "1"], ["2", "2"], ["3", "3"], ["4_plus", "4+"],
];

const FREQUENCY_OPTIONS: [string, string][] = [
  ["daily", "Daily"], ["weekly", "Weekly"], ["other", "Other"],
];

const REVENUE_OPTIONS: [string, string][] = [
  ["under_10k", "Under $10k/mo"],
  ["10k_25k", "$10k–$25k/mo"],
  ["25k_50k", "$25k–$50k/mo"],
  ["50k_100k", "$50k–$100k/mo"],
  ["over_100k", "Over $100k/mo"],
];

const TOTAL_STEPS = 5;

export default function LeadForm({
  prefillBalanceRange,
  prefillNumberOfMcas,
}: {
  prefillBalanceRange?: string;
  prefillNumberOfMcas?: string;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    balanceRange: prefillBalanceRange ?? "",
    numberOfMcas: prefillNumberOfMcas ?? "",
    paymentFrequency: "",
    monthlyRevenue: "",
    firstName: "",
    lastName: "",
    businessName: "",
    phone: "",
    email: "",
    state: "",
    consentToContact: false,
    companyWebsite: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // The hero's QuickQualifier mounts before this form receives its answers
  // (they arrive via a state update from the parent after the user clicks
  // "Continue"), so a useState initializer alone won't pick them up. Sync
  // them here, and skip straight to step 2 since step 1 is already answered.
  useEffect(() => {
    if (prefillBalanceRange || prefillNumberOfMcas) {
      setForm((f) => ({
        ...f,
        balanceRange: prefillBalanceRange ?? f.balanceRange,
        numberOfMcas: prefillNumberOfMcas ?? f.numberOfMcas,
      }));
      setStep((s) => (s === 1 ? 2 : s));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillBalanceRange, prefillNumberOfMcas]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const canAdvance =
    (step === 1 && form.balanceRange) ||
    (step === 2 && form.numberOfMcas && form.paymentFrequency && form.monthlyRevenue) ||
    (step === 3 && form.firstName && form.lastName && form.businessName) ||
    (step === 4 && form.phone && form.email && form.state);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "form" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center">
        <h3 className="display text-xl font-semibold text-ink">You&apos;re all set</h3>
        <p className="mt-2 text-ink/60">
          A consultant will call you shortly to schedule your free case review, a real
          conversation, not an automated follow-up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="apply" className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="display text-xl font-semibold text-ink">Free case review</h3>
        <span className="tabular text-xs text-ink/45">Step {step} of {TOTAL_STEPS}</span>
      </div>
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-paper-2">
        <div
          className="h-full rounded-full bg-amber transition-all"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Honeypot: hidden from real users via CSS, bots fill every field they find. */}
      <input
        type="text"
        name="companyWebsite"
        value={form.companyWebsite}
        onChange={(e) => update("companyWebsite", e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {step === 1 && (
        <ChoiceStep
          label="Approximate outstanding MCA balance"
          options={BALANCE_OPTIONS}
          value={form.balanceRange}
          onChange={(v) => update("balanceRange", v)}
        />
      )}

      {step === 2 && (
        <div className="space-y-5">
          <ChoiceStep
            label="Number of active MCAs"
            options={MCA_COUNT_OPTIONS}
            value={form.numberOfMcas}
            onChange={(v) => update("numberOfMcas", v)}
            grid
          />
          <ChoiceStep
            label="Payment frequency"
            options={FREQUENCY_OPTIONS}
            value={form.paymentFrequency}
            onChange={(v) => update("paymentFrequency", v)}
            grid
          />
          <ChoiceStep
            label="Approximate monthly business revenue"
            options={REVENUE_OPTIONS}
            value={form.monthlyRevenue}
            onChange={(v) => update("monthlyRevenue", v)}
          />
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="First name" value={form.firstName} onChange={(v) => update("firstName", v)} required />
          <TextInput label="Last name" value={form.lastName} onChange={(v) => update("lastName", v)} required />
          <div className="sm:col-span-2">
            <TextInput label="Business name" value={form.businessName} onChange={(v) => update("businessName", v)} required />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} required />
          <TextInput label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
          <div className="sm:col-span-2">
            <TextInput label="State" value={form.state} onChange={(v) => update("state", v)} required />
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-5">
          <div className="rounded-lg border border-line bg-paper p-4 text-sm text-ink/70">
            <div className="font-semibold text-ink">Review</div>
            <div className="mt-1.5 space-y-0.5">
              <div>{form.firstName} {form.lastName} &middot; {form.businessName}</div>
              <div>{form.phone} &middot; {form.email} &middot; {form.state}</div>
              <div>Balance: {form.balanceRange.replace(/_/g, " ")} &middot; MCAs: {form.numberOfMcas} &middot; {form.paymentFrequency}</div>
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm text-ink/70">
            <input
              type="checkbox"
              checked={form.consentToContact}
              onChange={(e) => update("consentToContact", e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 accent-amber"
            />
            <span>[INSERT ATTORNEY-APPROVED CALL/TEXT/EMAIL CONSENT LANGUAGE]</span>
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting" || !form.consentToContact}
            className="w-full rounded-lg bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-2 disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Request my free case review"}
          </button>
        </div>
      )}

      {step < 5 && (
        <div className="mt-7 flex justify-between">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-medium text-ink/60 hover:text-ink">
              &larr; Back
            </button>
          ) : <span />}
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => setStep(step + 1)}
            className="rounded-lg bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue &rarr;
          </button>
        </div>
      )}

      <p className="mt-5 text-center text-xs text-ink/45">
        Confidential. No obligation. A consultant will call to schedule your review.
      </p>
    </form>
  );
}

function ChoiceStep({
  label,
  options,
  value,
  onChange,
  grid,
}: {
  label: string;
  options: [string, string][];
  value: string;
  onChange: (v: string) => void;
  grid?: boolean;
}) {
  return (
    <div>
      <div className="mb-2.5 text-sm font-medium text-ink/70">{label}</div>
      <div className={grid ? "grid grid-cols-4 gap-2" : "grid grid-cols-1 gap-2"}>
        {options.map(([val, text]) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${grid ? "text-center" : "text-left"} ${
              value === val ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink/80 hover:border-ink/40"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-ink/70">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
      />
    </label>
  );
}
