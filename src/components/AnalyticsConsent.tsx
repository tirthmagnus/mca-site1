"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Consent = "accepted" | "rejected" | null;
const STORAGE_KEY = "mcarevive_tracking_consent";

export default function AnalyticsConsent({
  gaId,
  metaPixelId,
}: {
  gaId?: string;
  metaPixelId?: string;
}) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const trackingConfigured = Boolean(gaId || metaPixelId);

  useEffect(() => {
    if (!trackingConfigured) {
      setReady(true);
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
    setReady(true);

    const reopen = () => setConsent(null);
    window.addEventListener("mcarevive:cookie-settings", reopen);
    return () => window.removeEventListener("mcarevive:cookie-settings", reopen);
  }, [trackingConfigured]);

  function choose(value: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  if (!trackingConfigured || !ready) return null;

  return (
    <>
      {consent === "accepted" && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {consent === "accepted" && metaPixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {consent === null && (
        <div className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-ink p-4 text-white shadow-[0_25px_80px_-25px_rgba(0,0,0,.75)] sm:bottom-5 sm:p-5">
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <div className="display text-sm font-semibold">Your privacy choices</div>
              <p className="mt-1 text-xs leading-5 text-white/62">
                If enabled for this site, analytics and advertising tools help measure visits and lead conversions. They stay off unless you accept. Essential website functions do not require advertising cookies.
              </p>
              <a href="/cookie-policy" className="mt-2 inline-block text-xs font-semibold text-amber underline underline-offset-2">Cookie Policy</a>
            </div>
            <button type="button" onClick={() => choose("rejected")} aria-label="Decline optional tracking" className="shrink-0 text-white/45 hover:text-white"><X size={18} /></button>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => choose("rejected")} className="min-h-10 rounded-full border border-white/20 px-5 text-xs font-bold text-white hover:bg-white/5">Decline optional</button>
            <button type="button" onClick={() => choose("accepted")} className="min-h-10 rounded-full bg-amber px-5 text-xs font-bold text-ink hover:bg-amber-2">Accept analytics</button>
          </div>
        </div>
      )}
    </>
  );
}
