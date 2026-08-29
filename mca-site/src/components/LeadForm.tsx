"use client";

import { useState } from "react";

type FormState = {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  industry: string;
  monthlyRevenue: string;
  timeInBusiness: string;
  fundingAmount: string;
  consentToContact: boolean;
  companyWebsite: string; // honeypot, must stay empty
};

const initialState: FormState = {
  businessName: "",
  contactName: "",
  phone: "",
  email: "",
  industry: "",
  monthlyRevenue: "25k_50k",
  timeInBusiness: "1_3yr",
  fundingAmount: "50000",
  consentToContact: false,
  companyWebsite: "",
};

export default function LeadForm({ prefillAmount }: { prefillAmount?: number }) {
  const [form, setForm] = useState<FormState>({
    ...initialState,
    fundingAmount: prefillAmount ? String(prefillAmount) : initialState.fundingAmount,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          fundingAmount: Number(form.fundingAmount),
          source: "form",
        }),
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
          A funding specialist will reach out shortly to walk through your options.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="apply" className="scroll-mt-24 space-y-4 rounded-2xl border border-line bg-white p-6 sm:p-8">
      <h3 className="display text-xl font-semibold text-ink">Get your quote</h3>

      {/* Honeypot: hidden from real users via CSS, bots fill every field they find. */}
      <input
        type="text"
        name="companyWebsite"
        value={form.companyWebsite}
        onChange={(e) => setForm({ ...form, companyWebsite: e.target.value })}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label="Business name"
          value={form.businessName}
          onChange={(v) => setForm({ ...form, businessName: v })}
          required
        />
        <TextInput
          label="Your name"
          value={form.contactName}
          onChange={(v) => setForm({ ...form, contactName: v })}
          required
        />
        <TextInput
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
          required
        />
        <TextInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          required
        />
        <TextInput
          label="Industry"
          value={form.industry}
          onChange={(v) => setForm({ ...form, industry: v })}
          required
        />
        <TextInput
          label="Funding amount needed"
          type="number"
          value={form.fundingAmount}
          onChange={(v) => setForm({ ...form, fundingAmount: v })}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectInput
          label="Time in business"
          value={form.timeInBusiness}
          onChange={(v) => setForm({ ...form, timeInBusiness: v })}
          options={[
            ["under_6mo", "Under 6 months"],
            ["6mo_1yr", "6 months to 1 year"],
            ["1_3yr", "1 to 3 years"],
            ["3yr_plus", "3+ years"],
          ]}
        />
        <SelectInput
          label="Average monthly revenue"
          value={form.monthlyRevenue}
          onChange={(v) => setForm({ ...form, monthlyRevenue: v })}
          options={[
            ["under_10k", "Under $10k"],
            ["10k_25k", "$10k to $25k"],
            ["25k_50k", "$25k to $50k"],
            ["50k_100k", "$50k to $100k"],
            ["over_100k", "Over $100k"],
          ]}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={form.consentToContact}
          onChange={(e) => setForm({ ...form, consentToContact: e.target.checked })}
          required
          className="mt-0.5 h-4 w-4 accent-amber"
        />
        <span>
          I agree to be contacted by phone, text, or email about financing options. Message
          and data rates may apply. Consent isn&apos;t required to make a purchase.
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-2 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit application"}
      </button>
      <p className="text-center text-xs text-ink/45">
        Soft credit check only. Submitting won&apos;t affect your credit score.
      </p>
    </form>
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

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-ink/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
      >
        {options.map(([val, text]) => (
          <option key={val} value={val}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
