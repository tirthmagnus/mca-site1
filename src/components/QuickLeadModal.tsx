"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { trackLead } from "@/lib/analytics";

export default function QuickLeadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          phone,
          businessName,
          consentToContact: consent,
          companyWebsite,
          source: "quick_modal",
          landingPage: window.location.href,
        }),
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
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-[rgba(8,21,34,.82)] px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-8"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center sm:items-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-lead-title"
          className="w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[1.75rem] border border-[#d7d1c5] bg-[#fffdf8] p-5 text-[#081522] shadow-[0_35px_100px_-24px_rgba(0,0,0,.78)] ring-1 ring-white/30 animate-[popIn_.18s_ease-out] sm:max-h-[calc(100dvh-4rem)] sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 flex items-start justify-between gap-5">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber/13 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-[#89581c]">
                <ShieldCheck size={14} /> Confidential review
              </div>
              <h3 id="quick-lead-title" className="display text-2xl font-semibold tracking-[-.04em] text-ink">Talk through the pressure with a person.</h3>
              <p className="mt-2 text-sm leading-6 text-ink/55">Leave the basics and a consultant can contact you about your business situation.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 rounded-full border border-line p-2 text-ink/45 transition-colors hover:bg-paper-2 hover:text-ink"
            >
              <X size={18} />
            </button>
          </div>

          {status === "done" ? (
            <div className="rounded-2xl border border-line bg-paper p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber/20 text-[#89581c]"><ShieldCheck size={24} /></div>
              <p className="display mt-4 text-xl font-semibold text-ink">Thank you, {firstName}.</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">We received your information. One of our team members will review it and reach out at <strong>{phone}</strong>.</p>
              <button onClick={onClose} className="mt-5 min-h-11 rounded-full bg-ink px-6 text-sm font-bold text-white hover:bg-ink-2">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <Field label="Your name" value={firstName} onChange={setFirstName} autoComplete="name" required />
              <Field label="Phone number" value={phone} onChange={setPhone} type="tel" autoComplete="tel" required />
              <Field label="Business name (optional)" value={businessName} onChange={setBusinessName} autoComplete="organization" />

              <label className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 text-[11px] leading-5 text-ink/62 sm:text-xs">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-amber"
                />
                <span>
                  By checking this box and submitting, I consent to receive calls, text messages, and emails from MCAREVIVE at the contact information I provided about business debt services, including through automated technology where permitted. Consent is not a condition of purchase. Message and data rates may apply, and message frequency varies. Reply STOP to opt out of texts or HELP for help. See our <a className="font-semibold underline underline-offset-2" href="/communication-consent">Communication Consent</a> and <a className="font-semibold underline underline-offset-2" href="/privacy-policy">Privacy Policy</a>.
                </span>
              </label>

              {error && <p className="text-sm text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={status === "submitting" || !consent}
                className="min-h-12 w-full rounded-full bg-amber px-6 text-sm font-bold text-ink transition hover:bg-amber-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting…" : "Request a confidential review"}
              </button>
              <p className="text-center text-[11px] leading-5 text-ink/42">Business-use inquiry only. No obligation and no guaranteed outcome.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-semibold text-ink/68">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="min-h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-amber sm:text-sm"
      />
    </label>
  );
}
