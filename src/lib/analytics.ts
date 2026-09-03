"use client";

type TrackingWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

export function trackLead(source: "form" | "quick_modal" | "chatbot") {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;

  w.gtag?.("event", "generate_lead", {
    lead_source: source,
    value: 1,
    currency: "USD",
  });

  w.fbq?.("track", "Lead", {
    content_name: source,
  });
}
