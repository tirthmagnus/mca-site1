"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MessageCircleMore, X } from "lucide-react";
import { trackLead } from "@/lib/analytics";

type Message = { role: "user" | "assistant"; content: string };
type Step =
  | "situation"
  | "firstName"
  | "lastName"
  | "businessName"
  | "state"
  | "numberOfMcas"
  | "paymentFrequency"
  | "balanceRange"
  | "monthlyRevenue"
  | "phone"
  | "email"
  | "consent"
  | "done"
  | "declined";

type LeadDraft = {
  intakeContext: string;
  firstName: string;
  lastName: string;
  businessName: string;
  state: string;
  numberOfMcas: "1" | "2" | "3" | "4_plus" | "";
  paymentFrequency: "daily" | "weekly" | "other" | "";
  balanceRange: "under_25k" | "25k_50k" | "50k_100k" | "100k_250k" | "250k_plus" | "";
  monthlyRevenue: "under_10k" | "10k_25k" | "25k_50k" | "50k_100k" | "over_100k" | "";
  phone: string;
  email: string;
};

type Option = { label: string; value: string };

const GREETING: Message = {
  role: "assistant",
  content: "Hi. I can collect a few details for a confidential business-debt review. What best describes what is happening right now?",
};

const EMPTY_DRAFT: LeadDraft = {
  intakeContext: "",
  firstName: "",
  lastName: "",
  businessName: "",
  state: "",
  numberOfMcas: "",
  paymentFrequency: "",
  balanceRange: "",
  monthlyRevenue: "",
  phone: "",
  email: "",
};

const OPTIONS: Partial<Record<Step, Option[]>> = {
  situation: [
    { label: "Payments are too high", value: "Payments are too high" },
    { label: "I have multiple MCAs", value: "Multiple MCA positions" },
    { label: "I am behind on payments", value: "Behind on MCA payments" },
    { label: "Legal notice or lawsuit", value: "Legal notice or lawsuit" },
    { label: "Just exploring options", value: "Exploring options" },
  ],
  numberOfMcas: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4+", value: "4_plus" },
  ],
  paymentFrequency: [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Other", value: "other" },
  ],
  balanceRange: [
    { label: "Under $25k", value: "under_25k" },
    { label: "$25k-$50k", value: "25k_50k" },
    { label: "$50k-$100k", value: "50k_100k" },
    { label: "$100k-$250k", value: "100k_250k" },
    { label: "$250k+", value: "250k_plus" },
  ],
  monthlyRevenue: [
    { label: "Under $10k/mo", value: "under_10k" },
    { label: "$10k-$25k/mo", value: "10k_25k" },
    { label: "$25k-$50k/mo", value: "25k_50k" },
    { label: "$50k-$100k/mo", value: "50k_100k" },
    { label: "Over $100k/mo", value: "over_100k" },
  ],
  consent: [
    { label: "Yes, I agree", value: "yes" },
    { label: "Not now", value: "no" },
  ],
};

const NEXT: Record<Exclude<Step, "done" | "declined">, Step> = {
  situation: "firstName",
  firstName: "lastName",
  lastName: "businessName",
  businessName: "state",
  state: "numberOfMcas",
  numberOfMcas: "paymentFrequency",
  paymentFrequency: "balanceRange",
  balanceRange: "monthlyRevenue",
  monthlyRevenue: "phone",
  phone: "email",
  email: "consent",
  consent: "done",
};

function promptFor(step: Step, draft: LeadDraft): string {
  switch (step) {
    case "firstName": return "Thanks. What is your first name?";
    case "lastName": return `Thanks, ${draft.firstName}. What is your last name?`;
    case "businessName": return "What is the name of the business?";
    case "state": return "Which state is the business located in?";
    case "numberOfMcas": return "How many active MCA positions do you currently have?";
    case "paymentFrequency": return "How often are the MCA payments being withdrawn?";
    case "balanceRange": return "About how much is outstanding across the MCA obligations?";
    case "monthlyRevenue": return "What is the business's approximate monthly revenue?";
    case "phone": return "What phone number should a consultant use if you choose to be contacted?";
    case "email": return "And what email address should we attach to the request?";
    case "consent":
      return "Before I submit this: do you agree that MCAREVIVE may call, text, or email you at the information you provided about this business-debt inquiry? Consent is not required to purchase anything. Message and data rates may apply, message frequency varies, and you can opt out of texts by replying STOP.";
    default: return "";
  }
}

function inputPlaceholder(step: Step) {
  switch (step) {
    case "firstName": return "First name";
    case "lastName": return "Last name";
    case "businessName": return "Business name";
    case "state": return "State";
    case "phone": return "Phone number";
    case "email": return "Email address";
    default: return "Type your answer";
  }
}

function labelForOption(step: Step, value: string) {
  return OPTIONS[step]?.find((option) => option.value === value)?.label || value;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [step, setStep] = useState<Step>("situation");
  const [draft, setDraft] = useState<LeadDraft>(EMPTY_DRAFT);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, sending, step]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open || OPTIONS[step]) return;
    const timer = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 120);
    return () => clearTimeout(timer);
  }, [open, step]);

  function append(role: Message["role"], content: string) {
    setMessages((current) => [...current, { role, content }]);
  }

  async function advance(rawValue: string) {
    if (sending || step === "done" || step === "declined") return;

    const value = rawValue.trim();
    if (!value) return;
    append("user", labelForOption(step, value));
    setInput("");

    if (step === "phone" && !/^[0-9+()\-.\s]{7,20}$/.test(value)) {
      append("assistant", "That phone number does not look complete. Please enter a valid phone number including area code.");
      return;
    }

    if (step === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      append("assistant", "That email address does not look complete. Please check it and try again.");
      return;
    }

    if (["firstName", "lastName", "businessName", "state"].includes(step) && value.length < 2) {
      append("assistant", "Please enter a little more information so I can continue.");
      return;
    }

    if (step === "consent") {
      const agreed = /^(yes|y|agree|i agree)$/i.test(value);
      if (!agreed) {
        setStep("declined");
        append("assistant", "No problem. I did not submit your information. You can keep browsing the site or use the case-review form later if you change your mind.");
        return;
      }

      await submitLead();
      return;
    }

    const nextDraft = { ...draft };
    switch (step) {
      case "situation": nextDraft.intakeContext = value; break;
      case "firstName": nextDraft.firstName = value; break;
      case "lastName": nextDraft.lastName = value; break;
      case "businessName": nextDraft.businessName = value; break;
      case "state": nextDraft.state = value; break;
      case "numberOfMcas": nextDraft.numberOfMcas = value as LeadDraft["numberOfMcas"]; break;
      case "paymentFrequency": nextDraft.paymentFrequency = value as LeadDraft["paymentFrequency"]; break;
      case "balanceRange": nextDraft.balanceRange = value as LeadDraft["balanceRange"]; break;
      case "monthlyRevenue": nextDraft.monthlyRevenue = value as LeadDraft["monthlyRevenue"]; break;
      case "phone": nextDraft.phone = value; break;
      case "email": nextDraft.email = value; break;
    }

    setDraft(nextDraft);
    const nextStep = NEXT[step];
    setStep(nextStep);
    append("assistant", promptFor(nextStep, nextDraft));
  }

  async function submitLead() {
    setSending(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          consentToContact: true,
          source: "chatbot",
          landingPage: window.location.href,
          companyWebsite: "",
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        append("assistant", data.error || "I could not save the request. Please use the case-review form instead.");
        return;
      }

      trackLead("chatbot");
      setLeadCaptured(true);
      setStep("done");
      append("assistant", `Thanks, ${draft.firstName}. Your request was received. A consultant can follow up using the contact permission you provided.`);
    } catch {
      append("assistant", "I lost the connection while saving the request. Please try again or use the case-review form.");
    } finally {
      setSending(false);
    }
  }

  const currentOptions = OPTIONS[step];
  const inputDisabled = sending || step === "done" || step === "declined";

  return (
    <>
      {!open && showTooltip && (
        <div className="mobile-safe-bottom fixed right-3 z-[55] flex max-w-[calc(100vw-5.5rem)] items-start gap-2 rounded-2xl border border-line bg-cream px-4 py-3 text-xs leading-5 text-ink shadow-[0_18px_45px_-20px_rgba(8,21,34,.5)] animate-[popIn_.2s_ease-out] sm:bottom-28 sm:right-5 sm:max-w-[230px] sm:text-sm">
          <span>Questions about MCA payment pressure? Start here.</span>
          <button type="button" onClick={() => setShowTooltip(false)} aria-label="Dismiss" className="shrink-0 text-ink/40 hover:text-ink"><X size={14} /></button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
          setShowTooltip(false);
        }}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className={`mobile-safe-bottom fixed right-3 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-amber/70 bg-amber text-ink shadow-[0_15px_40px_-15px_rgba(8,21,34,.75)] transition-transform hover:scale-105 sm:bottom-5 sm:right-5 sm:h-16 sm:w-16 ${open ? "" : "chat-bubble-pulse"}`}
      >
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-cream bg-ink" />}
        {open ? <X size={23} strokeWidth={1.8} /> : <MessageCircleMore size={25} strokeWidth={1.7} />}
      </button>

      {open && (
        <div className="fixed bottom-[calc(var(--mobile-bar-height)+env(safe-area-inset-bottom)+5rem)] left-3 right-3 z-[58] flex max-h-[calc(100dvh-var(--mobile-bar-height)-6.5rem-env(safe-area-inset-bottom))] min-h-[360px] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-cream shadow-[0_30px_90px_-24px_rgba(8,21,34,.65)] sm:bottom-24 sm:left-auto sm:right-5 sm:h-[560px] sm:max-h-[calc(100dvh-7rem)] sm:w-[390px]">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-ink px-4 py-3.5 text-white">
            <div>
              <div className="display text-sm font-semibold">MCAREVIVE Intake</div>
              <div className="mt-0.5 text-[11px] text-white/52">Guided intake, not legal advice</div>
            </div>
            {leadCaptured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-ink">
                <Check size={11} /> Saved
              </span>
            )}
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3.5 py-4 sm:px-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${message.role === "user" ? "ml-auto rounded-br-md bg-amber text-ink" : "rounded-bl-md border border-line bg-white text-ink/78"}`}
              >
                {message.content}
              </div>
            ))}
            {sending && (
              <div className="max-w-[70%] rounded-2xl rounded-bl-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink/45">
                Saving your request…
              </div>
            )}
          </div>

          {currentOptions && !inputDisabled && (
            <div className="shrink-0 border-t border-line bg-white/55 px-3 py-3">
              <div className="grid grid-cols-2 gap-2">
                {currentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => advance(option.value)}
                    className="min-h-10 rounded-xl border border-line bg-white px-3 py-2 text-left text-xs font-semibold leading-4 text-ink transition hover:border-amber hover:bg-amber/10"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!currentOptions && !inputDisabled && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                advance(input);
              }}
              className="flex shrink-0 items-center gap-2 border-t border-line bg-cream p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] sm:pb-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={inputPlaceholder(step)}
                maxLength={step === "email" ? 160 : 120}
                inputMode={step === "phone" ? "tel" : step === "email" ? "email" : "text"}
                autoComplete={step === "phone" ? "tel" : step === "email" ? "email" : "off"}
                className="min-w-0 flex-1 rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-amber sm:text-sm"
              />
              <button type="submit" disabled={!input.trim()} className="min-h-11 shrink-0 rounded-xl bg-ink px-4 text-sm font-bold text-white disabled:opacity-40">Send</button>
            </form>
          )}

          {inputDisabled && (
            <div className="shrink-0 border-t border-line bg-paper px-4 py-3 text-center text-[11px] leading-5 text-ink/48">
              {leadCaptured ? "Your request has been submitted." : "No information was submitted."}
            </div>
          )}
        </div>
      )}
    </>
  );
}
