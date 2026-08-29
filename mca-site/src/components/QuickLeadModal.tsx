"use client";

import { useState } from "react";
import { X } from "lucide-react";

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
  const [companyWebsite, setCompanyWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md scale-100 rounded-2xl bg-white p-6 shadow-2xl transition-transform animate-[popIn_0.18s_ease-out] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="display text-xl font-semibold text-ink">Get your free case review</h3>
            <p className="mt-1 text-sm text-ink/55">Leave your number, a consultant will call you.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-ink/40 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        {status === "done" ? (
          <div className="rounded-lg bg-paper-2 p-5 text-center">
            <p className="font-semibold text-ink">You&apos;re all set.</p>
            <p className="mt-1 text-sm text-ink/60">
              A consultant will call you shortly to schedule your free case review.
            </p>
            <button
              onClick={onClose}
              className="mt-4 rounded-lg bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-ink-2"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <input
              type="text"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-ink/70">First name</span>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-ink/70">Phone number</span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-ink/70">Business name</span>
              <input
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-ink"
              />
            </label>
            <label className="flex items-start gap-2.5 text-xs text-ink/60">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 accent-amber"
              />
              <span>[INSERT ATTORNEY-APPROVED CALL/TEXT/EMAIL CONSENT LANGUAGE]</span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={status === "submitting" || !consent}
              className="w-full rounded-lg bg-amber px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-amber-2 hover:shadow-md disabled:opacity-50"
            >
              {status === "submitting" ? "Submitting…" : "Request my free case review"}
            </button>
            <p className="text-center text-xs text-ink/40">Confidential. No obligation.</p>
          </form>
        )}
      </div>
    </div>
  );
}
