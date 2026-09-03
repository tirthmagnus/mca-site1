"use client";

import { useEffect, useState } from "react";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, CircleAlert, PhoneCall, ShieldCheck } from "lucide-react";
import { trackLead } from "@/lib/analytics";

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
  companyWebsite: string;
};

const BALANCE_OPTIONS: [string, string][] = [
  ["under_25k", "Under $25,000"],
  ["25k_50k", "$25,000 – $50,000"],
  ["50k_100k", "$50,000 – $100,000"],
  ["100k_250k", "$100,000 – $250,000"],
  ["250k_plus", "$250,000+"],
];

const MCA_COUNT_OPTIONS: [string, string][] = [["1", "1"], ["2", "2"], ["3", "3"], ["4_plus", "4+"]];
const FREQUENCY_OPTIONS: [string, string][] = [["daily", "Daily"], ["weekly", "Weekly"], ["other", "Other"]];
const REVENUE_OPTIONS: [string, string][] = [
  ["under_10k", "Under $10k/mo"],
  ["10k_25k", "$10k–$25k/mo"],
  ["25k_50k", "$25k–$50k/mo"],
  ["50k_100k", "$50k–$100k/mo"],
  ["over_100k", "Over $100k/mo"],
];

const STEP_LABELS = ["Situation", "Business", "Name", "Contact", "Review"];
const TOTAL_STEPS = STEP_LABELS.length;

function prettyChoice(value: string) {
  return value
    .replace("under_25k", "Under $25,000")
    .replace("25k_50k", "$25,000 – $50,000")
    .replace("50k_100k", "$50,000 – $100,000")
    .replace("100k_250k", "$100,000 – $250,000")
    .replace("250k_plus", "$250,000+")
    .replace("4_plus", "4+")
    .replace(/_/g, " ");
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return value;
}

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
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [nudge, setNudge] = useState(0);

  useEffect(() => {
    if (prefillBalanceRange || prefillNumberOfMcas) {
      setForm((f) => ({
        ...f,
        balanceRange: prefillBalanceRange ?? f.balanceRange,
        numberOfMcas: prefillNumberOfMcas ?? f.numberOfMcas,
      }));
      setStep((s) => (s === 1 ? 2 : s));
    }
  }, [prefillBalanceRange, prefillNumberOfMcas]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldError(null);
  }

  function goNext() {
    if (step === 3 && form.firstName.trim().length < 2) {
      setFieldError("Add your name so our team knows who to ask for.");
      setNudge((v) => v + 1);
      return;
    }
    if (step === 4 && !/^[0-9+()\-.\s]{7,20}$/.test(form.phone.trim())) {
      setFieldError("Enter a complete phone number, including area code.");
      setNudge((v) => v + 1);
      return;
    }
    setFieldError(null);
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consentToContact) {
      setFieldError("Please confirm contact permission before submitting.");
      setNudge((v) => v + 1);
      return;
    }
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "form", landingPage: window.location.href }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      trackLead("form");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <section id="apply" className="success-panel scroll-mt-24" aria-live="polite">
        <div className="success-icon"><Check size={30} strokeWidth={2.2} /></div>
        <p className="section-kicker">Request received</p>
        <h3 className="display mt-4 text-3xl font-semibold tracking-[-.045em] text-ink sm:text-4xl">Thank you, {form.firstName}.</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/62 sm:text-base">
          Your information has been received. A team member will review it and reach out at <strong className="text-ink">{formatPhone(form.phone)}</strong>.
        </p>
        <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          {["We review the information you shared.", "A team member contacts you by phone.", "You discuss the situation and possible next steps."].map((item, index) => (
            <div key={item} className="success-step">
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
        <a href="#top" className="button-press mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-bold text-white hover:bg-ink-2">Return to top</a>
        <p className="mt-5 text-[11px] leading-5 text-ink/42">Submitting a request does not enroll your business in a program or guarantee an outcome.</p>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="apply" className="lead-form-shell scroll-mt-24">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Confidential review</p>
          <h3 className="display mt-2 text-2xl font-semibold tracking-[-.035em] text-ink sm:text-3xl">Free case review</h3>
        </div>
        <span className="tabular shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.08em] text-ink/48 sm:hidden">{step}/{TOTAL_STEPS}</span>
      </div>

      <FormStepper step={step} />

      <input type="text" name="companyWebsite" value={form.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div key={step} className="form-step-enter mt-8">
        {step === 1 && (
          <ChoiceStep label="Approximate outstanding MCA balance (optional)" options={BALANCE_OPTIONS} value={form.balanceRange} onChange={(v) => update("balanceRange", v)} />
        )}

        {step === 2 && (
          <div className="space-y-6">
            <ChoiceStep label="Number of active MCAs (optional)" options={MCA_COUNT_OPTIONS} value={form.numberOfMcas} onChange={(v) => update("numberOfMcas", v)} grid />
            <ChoiceStep label="Payment frequency (optional)" options={FREQUENCY_OPTIONS} value={form.paymentFrequency} onChange={(v) => update("paymentFrequency", v)} grid />
            <ChoiceStep label="Approximate monthly business revenue (optional)" options={REVENUE_OPTIONS} value={form.monthlyRevenue} onChange={(v) => update("monthlyRevenue", v)} />
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5">
            <div>
              <p className="display text-xl font-semibold text-ink">Who should we ask for?</p>
              <p className="mt-1 text-sm leading-6 text-ink/52">Your name is required. Business name is optional.</p>
            </div>
            <TextInput label="Your name" value={form.firstName} onChange={(v) => update("firstName", v)} autoComplete="name" required hasError={Boolean(fieldError)} />
            <TextInput label="Business name (optional)" value={form.businessName} onChange={(v) => update("businessName", v)} autoComplete="organization" />
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-5">
            <div>
              <p className="display text-xl font-semibold text-ink">Where can we reach you?</p>
              <p className="mt-1 text-sm leading-6 text-ink/52">Phone is required. Email and state are optional.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Phone number" type="tel" value={form.phone} onChange={(v) => update("phone", v)} autoComplete="tel" inputMode="tel" required hasError={Boolean(fieldError)} />
              <TextInput label="Email (optional)" type="email" value={form.email} onChange={(v) => update("email", v)} autoComplete="email" inputMode="email" />
              <div className="sm:col-span-2"><TextInput label="State (optional)" value={form.state} onChange={(v) => update("state", v)} autoComplete="address-level1" /></div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <div>
              <p className="display text-xl font-semibold text-ink">Review your request</p>
              <p className="mt-1 text-sm leading-6 text-ink/52">Only your name and phone number are required.</p>
            </div>

            <div className="review-grid">
              <ReviewItem label="Contact" value={form.firstName} sub={formatPhone(form.phone)} onEdit={() => setStep(3)} />
              <ReviewItem label="Business" value={form.businessName || "Not provided"} sub={form.state || "State not provided"} onEdit={() => setStep(3)} />
              <ReviewItem label="MCA snapshot" value={form.balanceRange ? prettyChoice(form.balanceRange) : "Balance not provided"} sub={form.numberOfMcas ? `${prettyChoice(form.numberOfMcas)} active MCA${form.numberOfMcas === "1" ? "" : "s"}` : "MCA count not provided"} onEdit={() => setStep(1)} />
              <ReviewItem label="Contact details" value={form.email || "Email not provided"} sub={form.paymentFrequency ? `${prettyChoice(form.paymentFrequency)} payments` : "Payment cadence not provided"} onEdit={() => setStep(4)} />
            </div>

            <label className="consent-card">
              <input type="checkbox" checked={form.consentToContact} onChange={(e) => update("consentToContact", e.target.checked)} required className="mt-0.5 h-5 w-5 shrink-0 accent-amber" />
              <span className="text-[11px] leading-5 text-ink/64 sm:text-xs sm:leading-6">
                By checking this box and submitting, I consent to receive calls, text messages, and emails from MCAREVIVE at the contact information I provided about business debt services, including through automated technology where permitted. Consent is not a condition of purchase. Message and data rates may apply, and message frequency varies. Reply STOP to opt out of texts or HELP for help. See our <a className="font-semibold underline underline-offset-2" href="/communication-consent">Communication Consent</a> and <a className="font-semibold underline underline-offset-2" href="/privacy-policy">Privacy Policy</a>.
              </span>
            </label>

            {error && <FormAlert message={error} />}

            <button type="submit" disabled={status === "submitting"} className="button-press min-h-13 w-full rounded-full bg-amber px-6 text-sm font-bold text-ink shadow-[0_12px_28px_-18px_rgba(8,21,34,.7)] transition hover:bg-amber-2 disabled:cursor-wait disabled:opacity-60">
              {status === "submitting" ? "Submitting securely…" : "Request my free case review"}
            </button>
            <p className="text-center text-[11px] leading-5 text-ink/42">Confidential. No obligation. A team member will call to discuss your request.</p>
          </div>
        )}
      </div>

      {fieldError && step < 5 && <div key={nudge} className="mt-5"><FormAlert message={fieldError} /></div>}

      {step < 5 && (
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line/80 pt-5">
          {step > 1 ? (
            <button type="button" onClick={() => { setFieldError(null); setStep(step - 1); }} className="button-press inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-sm font-semibold text-ink/58 hover:text-ink"><ChevronLeft size={16} /> Back</button>
          ) : <span />}
          <button type="button" onClick={goNext} className="button-press group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white shadow-[0_14px_30px_-20px_rgba(8,21,34,.8)] transition hover:bg-ink-2">
            Continue <ChevronRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </form>
  );
}

function FormStepper({ step }: { step: number }) {
  return (
    <div className="form-stepper" aria-label={`Step ${step} of ${TOTAL_STEPS}: ${STEP_LABELS[step - 1]}`}>
      <div className="form-stepper-line" aria-hidden="true"><span style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }} /></div>
      {STEP_LABELS.map((label, index) => {
        const number = index + 1;
        const complete = number < step;
        const active = number === step;
        return (
          <div key={label} className={`form-stepper-item ${complete ? "is-complete" : ""} ${active ? "is-active" : ""}`}>
            <div className="form-stepper-dot">{complete ? <Check size={14} strokeWidth={2.5} /> : number}</div>
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ChoiceStep({ label, options, value, onChange, grid }: { label: string; options: [string, string][]; value: string; onChange: (v: string) => void; grid?: boolean; }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold text-ink/70">{label}</div>
      <div className={grid ? "grid grid-cols-2 gap-2 sm:grid-cols-4" : "grid grid-cols-1 gap-2 sm:grid-cols-2"}>
        {options.map(([val, text]) => {
          const selected = value === val;
          return (
            <button key={val} type="button" onClick={() => onChange(val)} aria-pressed={selected} className={`choice-button button-press ${selected ? "is-selected" : ""}`}>
              <span>{text}</span>{selected && <CheckCircle2 size={17} />}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-ink/40">Optional. You can continue without selecting an answer.</p>
    </div>
  );
}

function TextInput({ label, value, onChange, type = "text", required, autoComplete, inputMode, hasError = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; autoComplete?: string; inputMode?: "text" | "tel" | "email"; hasError?: boolean; }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 flex items-center gap-1.5 font-semibold text-ink/70">{label}{required && <span className="rounded-full bg-amber/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[.08em] text-[#89581c]">Required</span>}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} autoComplete={autoComplete} inputMode={inputMode} aria-invalid={hasError || undefined} className={`form-input ${hasError ? "has-error" : ""}`} />
    </label>
  );
}

function ReviewItem({ label, value, sub, onEdit }: { label: string; value: string; sub?: string; onEdit: () => void }) {
  return (
    <div className="review-item">
      <div className="min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#89581c]">{label}</span>
        <p className="mt-1 break-words text-sm font-semibold text-ink">{value}</p>
        {sub && <p className="mt-0.5 break-words text-xs leading-5 text-ink/48">{sub}</p>}
      </div>
      <button type="button" onClick={onEdit} className="shrink-0 text-[11px] font-bold text-ink/45 underline decoration-ink/20 underline-offset-4 hover:text-ink">Edit</button>
    </div>
  );
}

function FormAlert({ message }: { message: string }) {
  return (
    <div className="form-alert" role="alert">
      <CircleAlert size={18} className="shrink-0" />
      <div><strong>Almost there.</strong><span>{message}</span></div>
    </div>
  );
}
