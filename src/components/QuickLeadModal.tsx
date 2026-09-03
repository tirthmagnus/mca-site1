"use client";

import { useEffect, useState } from "react";
import { Check, PhoneCall, ShieldCheck, X } from "lucide-react";
import { trackLead } from "@/lib/analytics";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return value;
}

export default function QuickLeadModal({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [consent, setConsent] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (firstName.trim().length < 2) {
      setError("Please add your name so our team knows who to ask for.");
      return;
    }
    if (!/^[0-9+()\-.\s]{7,20}$/.test(phone.trim())) {
      setError("Please enter a complete phone number, including area code.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, phone, businessName, consentToContact: consent, companyWebsite, source: "quick_modal", landingPage: window.location.href }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      trackLead("quick_modal");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="fixed inset-0 z-[70] bg-[rgba(8,21,34,.84)] px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-6" onClick={onClose}>
      <div className="flex h-full min-h-0 items-center justify-center">
        <div role="dialog" aria-modal="true" aria-labelledby="quick-lead-title" className="modal-shell" onClick={(e) => e.stopPropagation()}>
          <div className="modal-scroll">
            <div className="mb-6 flex items-start justify-between gap-4 sm:mb-7">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber/13 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#89581c] sm:text-[11px]">
                  <ShieldCheck size={14} /> Confidential review
                </div>
                <h3 id="quick-lead-title" className="display max-w-sm text-[1.7rem] font-semibold leading-[1.08] tracking-[-.045em] text-ink sm:text-3xl">Talk through the pressure with a person.</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-ink/55">Leave your name and phone number. The rest is optional.</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" className="button-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink/45 shadow-sm transition hover:border-ink/20 hover:text-ink"><X size={19} /></button>
            </div>

            {status === "done" ? (
              <div className="modal-success" aria-live="polite">
                <div className="success-icon !h-14 !w-14"><Check size={27} strokeWidth={2.3} /></div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#89581c]">Request received</p>
                <p className="display mt-2 text-2xl font-semibold tracking-[-.04em] text-ink">Thank you, {firstName}.</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink/62">A team member will review what you shared and reach out at <strong className="text-ink">{formatPhone(phone)}</strong>.</p>
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-line bg-white p-4 text-left">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white"><PhoneCall size={18} /></div>
                  <div><p className="text-xs font-bold text-ink">What happens next</p><p className="mt-0.5 text-xs leading-5 text-ink/52">We review the request first, then call to discuss your situation and next steps.</p></div>
                </div>
                <button onClick={onClose} className="button-press mt-6 min-h-12 w-full rounded-full bg-ink px-6 text-sm font-bold text-white hover:bg-ink-2">Done</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <input type="text" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <Field label="Your name" value={firstName} onChange={(v) => { setFirstName(v); setError(null); }} autoComplete="name" required />
                <Field label="Phone number" value={phone} onChange={(v) => { setPhone(v); setError(null); }} type="tel" autoComplete="tel" inputMode="tel" required />
                <Field label="Business name (optional)" value={businessName} onChange={setBusinessName} autoComplete="organization" />

                <label className="consent-card !p-3.5 sm:!p-4">
                  <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setError(null); }} required className="mt-0.5 h-5 w-5 shrink-0 accent-amber" />
                  <span className="text-[10px] leading-[1.65] text-ink/62 sm:text-[11px] sm:leading-5">
                    By checking this box and submitting, I consent to receive calls, text messages, and emails from MCAREVIVE at the contact information I provided about business debt services, including through automated technology where permitted. Consent is not a condition of purchase. Message and data rates may apply, and message frequency varies. Reply STOP to opt out of texts or HELP for help. See our <a className="font-semibold underline underline-offset-2" href="/communication-consent">Communication Consent</a> and <a className="font-semibold underline underline-offset-2" href="/privacy-policy">Privacy Policy</a>.
                  </span>
                </label>

                {error && <div className="form-alert !mt-3" role="alert"><ShieldCheck size={18} className="shrink-0" /><div><strong>Check this detail.</strong><span>{error}</span></div></div>}

                <button type="submit" disabled={status === "submitting" || !consent} className="button-press min-h-13 w-full rounded-full bg-amber px-6 text-sm font-bold text-ink shadow-[0_12px_28px_-18px_rgba(8,21,34,.7)] transition hover:bg-amber-2 disabled:cursor-not-allowed disabled:opacity-45">
                  {status === "submitting" ? "Submitting securely…" : "Request a confidential review"}
                </button>
                <p className="text-center text-[10px] leading-5 text-ink/42 sm:text-[11px]">Business-use inquiry only. No obligation and no guaranteed outcome.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", autoComplete, inputMode, required = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; autoComplete?: string; inputMode?: "text" | "tel" | "email"; required?: boolean; }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 flex items-center gap-1.5 font-semibold text-ink/68">{label}{required && <span className="rounded-full bg-amber/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[.08em] text-[#89581c]">Required</span>}</span>
      <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} inputMode={inputMode} className="form-input" />
    </label>
  );
}
