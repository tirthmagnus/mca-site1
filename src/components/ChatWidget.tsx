"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MessageCircleMore, X } from "lucide-react";
import { trackLead } from "@/lib/analytics";

type Message = { role: "user" | "assistant"; content: string };
type Step =
  | "situation"
  | "firstName"
  | "phone"
  | "businessName"
  | "numberOfMcas"
  | "balanceRange"
  | "monthlyRevenue"
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

const SKIP = "__skip__";
const OPTIONAL_STEPS = new Set<Step>(["businessName", "numberOfMcas", "balanceRange", "monthlyRevenue", "email"]);

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
    { label: "Skip for now", value: SKIP },
  ],
  numberOfMcas: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4+", value: "4_plus" },
    { label: "Skip", value: SKIP },
  ],
  balanceRange: [
    { label: "Under $25k", value: "under_25k" },
    { label: "$25k-$50k", value: "25k_50k" },
    { label: "$50k-$100k", value: "50k_100k" },
    { label: "$100k-$250k", value: "100k_250k" },
    { label: "$250k+", value: "250k_plus" },
    { label: "Skip", value: SKIP },
  ],
  monthlyRevenue: [
    { label: "Under $10k/mo", value: "under_10k" },
    { label: "$10k-$25k/mo", value: "10k_25k" },
    { label: "$25k-$50k/mo", value: "25k_50k" },
    { label: "$50k-$100k/mo", value: "50k_100k" },
    { label: "Over $100k/mo", value: "over_100k" },
    { label: "Skip", value: SKIP },
  ],
  consent: [
    { label: "Yes, I agree", value: "yes" },
    { label: "Not now", value: "no" },
  ],
};

const NEXT: Record<Exclude<Step, "done" | "declined">, Step> = {
  situation: "firstName",
  firstName: "phone",
  phone: "businessName",
  businessName: "numberOfMcas",
  numberOfMcas: "balanceRange",
  balanceRange: "monthlyRevenue",
  monthlyRevenue: "email",
  email: "consent",
  consent: "done",
};

function promptFor(step: Step, draft: LeadDraft): string {
  switch (step) {
    case "firstName": return "What name should we use for your review?";
    case "phone": return `Thanks${draft.firstName ? `, ${draft.firstName}` : ""}. What phone number should our team use to reach you?`;
    case "businessName": return "Business name? This is optional, so you can skip it.";
    case "numberOfMcas": return "How many active MCA positions do you currently have? You can skip this if you are not sure.";
    case "balanceRange": return "About how much is outstanding across the MCA obligations? You can skip this if you are not sure.";
    case "monthlyRevenue": return "Approximate monthly business revenue? Optional.";
    case "email": return "Email address? Optional. Your phone number is enough for us to contact you.";
    case "consent":
      return "Before I submit this: do you agree that MCAREVIVE may call, text, or email you at the information you provided about this business-debt inquiry? Consent is not required to purchase anything. Message and data rates may apply, message frequency varies, and you can opt out of texts by replying STOP.";
    default: return "";
  }
}

function inputPlaceholder(step: Step) {
  switch (step) {
    case "firstName": return "Your name";
    case "phone": return "Phone number";
    case "businessName": return "Business name (optional)";
    case "email": return "Email address (optional)";
    default: return "Type your answer";
  }
}

function labelForOption(step: Step, value: string) {
  if (value === SKIP) return "Skip";
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
    const showTimer = setTimeout(() => setShowTooltip(true), 4500);
    const hideTimer = setTimeout(() => setShowTooltip(false), 11500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
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
    const skipping = value === SKIP;
    if (!value) return;
    append("user", labelForOption(step, value));
    setInput("");

    if (!skipping && step === "phone" && !/^[0-9+()\-.\s]{7,20}$/.test(value)) {
      append("assistant", "That phone number does not look complete. Please enter a valid phone number including area code.");
      return;
    }

    if (!skipping && step === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      append("assistant", "That email address does not look complete. Please check it or tap Skip.");
      return;
    }

    if (!skipping && step === "firstName" && value.length < 2) {
      append("assistant", "Please enter your name so our team knows who to ask for.");
      return;
    }

    if (step === "consent") {
      const agreed = /^(yes|y|agree|i agree)$/i.test(value);
      if (!agreed) {
        setStep("declined");
        append("assistant", "No problem. I did not submit your information. You can keep browsing or return whenever you are ready.");
        return;
      }
      await submitLead();
      return;
    }

    const nextDraft = { ...draft };
    if (!skipping) {
      switch (step) {
        case "situation": nextDraft.intakeContext = value; break;
        case "firstName": nextDraft.firstName = value; break;
        case "phone": nextDraft.phone = value; break;
        case "businessName": nextDraft.businessName = value; break;
        case "numberOfMcas": nextDraft.numberOfMcas = value as LeadDraft["numberOfMcas"]; break;
        case "balanceRange": nextDraft.balanceRange = value as LeadDraft["balanceRange"]; break;
        case "monthlyRevenue": nextDraft.monthlyRevenue = value as LeadDraft["monthlyRevenue"]; break;
        case "email": nextDraft.email = value; break;
      }
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
      append("assistant", `Thank you, ${draft.firstName}. We received your information. One of our team members will review it and reach out at ${draft.phone}.`);
    } catch {
      append("assistant", "I lost the connection while saving the request. Please try again or use the case-review form.");
    } finally {
      setSending(false);
    }
  }

  const currentOptions = OPTIONS[step];
  const inputDisabled = sending || step === "done" || step === "declined";
  const optionalTextStep = OPTIONAL_STEPS.has(step) && !currentOptions;

  return (
    <>
      {!open && showTooltip && (
        <div className="fixed bottom-24 right-5 z-[55] hidden max-w-[240px] items-start gap-2 rounded-2xl border border-[#d9d5ca] bg-[#fffdf8] px-4 py-3 text-sm leading-5 text-[#081522] shadow-[0_18px_45px_-20px_rgba(8,21,34,.5)] animate-[popIn_.2s_ease-out] sm:flex">
          <span>Questions about MCA payment pressure? Start here.</span>
          <button type="button" onClick={() => setShowTooltip(false)} aria-label="Dismiss" className="shrink-0 text-[#081522]/45 hover:text-[#081522]"><X size={14} /></button>
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
        className={`mobile-safe-bottom fixed right-3 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-[#c8862e] bg-[#e0a344] text-[#081522] shadow-[0_15px_40px_-15px_rgba(8,21,34,.75)] transition-transform hover:scale-105 sm:bottom-5 sm:right-5 sm:h-16 sm:w-16 ${open ? "" : "chat-bubble-pulse"}`}
      >
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#fffdf8] bg-[#081522]" />}
        {open ? <X size={23} strokeWidth={1.8} /> : <MessageCircleMore size={25} strokeWidth={1.7} />}
      </button>

      {open && (
        <div className="fixed bottom-[calc(var(--mobile-bar-height)+env(safe-area-inset-bottom)+5rem)] left-3 right-3 z-[59] isolate flex max-h-[calc(100dvh-var(--mobile-bar-height)-6.25rem-env(safe-area-inset-bottom))] min-h-[360px] flex-col overflow-hidden rounded-[1.5rem] border border-[#cfc9bc] bg-[#fffdf8] shadow-[0_30px_90px_-24px_rgba(8,21,34,.72)] ring-1 ring-black/5 sm:bottom-24 sm:left-auto sm:right-5 sm:h-[560px] sm:max-h-[calc(100dvh-7rem)] sm:w-[390px]">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#081522] px-4 py-3.5 text-white">
            <div>
              <div className="display text-sm font-semibold">MCAREVIVE Intake</div>
              <div className="mt-0.5 text-[11px] text-white/60">Quick guided review, no AI bot</div>
            </div>
            {leadCaptured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e0a344] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-[#081522]">
                <Check size={11} /> Received
              </span>
            )}
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[#f7f4ed] px-3.5 py-4 sm:px-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${message.role === "user" ? "ml-auto rounded-br-md bg-[#e0a344] text-[#081522]" : "rounded-bl-md border border-[#d9d5ca] bg-white text-[#243646] shadow-sm"}`}
              >
                {message.content}
              </div>
            ))}
            {sending && (
              <div className="max-w-[70%] rounded-2xl rounded-bl-md border border-[#d9d5ca] bg-white px-3.5 py-2.5 text-sm text-[#6b7781] shadow-sm">
                Saving your request…
              </div>
            )}
          </div>

          {currentOptions && !inputDisabled && (
            <div className="shrink-0 border-t border-[#d9d5ca] bg-[#fffdf8] px-3 py-3">
              <div className="grid grid-cols-2 gap-2">
                {currentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => advance(option.value)}
                    className="min-h-10 rounded-xl border border-[#d9d5ca] bg-white px-3 py-2 text-left text-xs font-semibold leading-4 text-[#081522] transition hover:border-[#d79b43] hover:bg-[#fff8ea]"
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
              className="flex shrink-0 items-center gap-2 border-t border-[#d9d5ca] bg-[#fffdf8] p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] sm:pb-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={inputPlaceholder(step)}
                maxLength={step === "email" ? 160 : 120}
                inputMode={step === "phone" ? "tel" : step === "email" ? "email" : "text"}
                autoComplete={step === "phone" ? "tel" : step === "email" ? "email" : "off"}
                className="min-w-0 flex-1 rounded-xl border border-[#cfc9bc] bg-white px-3.5 py-2.5 text-base text-[#081522] outline-none transition focus:border-[#d79b43] sm:text-sm"
              />
              {optionalTextStep && (
                <button type="button" onClick={() => advance(SKIP)} className="min-h-11 shrink-0 rounded-xl border border-[#cfc9bc] bg-white px-3 text-xs font-bold text-[#455461]">Skip</button>
              )}
              <button type="submit" disabled={!input.trim()} className="min-h-11 shrink-0 rounded-xl bg-[#081522] px-4 text-sm font-bold text-white disabled:opacity-40">Send</button>
            </form>
          )}

          {inputDisabled && (
            <div className="shrink-0 border-t border-[#d9d5ca] bg-[#fffdf8] px-4 py-3 text-center text-[11px] leading-5 text-[#5d6871]">
              {leadCaptured ? "Your request has been received. Our team will reach out using the phone number you provided." : "No information was submitted."}
            </div>
          )}
        </div>
      )}
    </>
  );
}
