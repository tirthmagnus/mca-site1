"use client";

import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL, hasPhone } from "@/lib/site";

const links = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms of Use", "/terms-of-use"],
  ["Communication Consent", "/communication-consent"],
  ["Business Debt Disclaimer", "/business-debt-services-disclaimer"],
  ["Legal Disclaimer", "/legal-disclaimer"],
  ["Cookie Policy", "/cookie-policy"],
  ["Accessibility", "/accessibility-statement"],
] as const;

export default function SiteFooter() {
  const optionalTrackingConfigured = Boolean(
    process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID
  );

  return (
    <footer className="bg-ink py-14 text-white/55">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.6fr]">
          <div>
            <div className="display text-xl font-bold tracking-[-.04em] text-white">MCA<span className="text-amber">REVIVE</span></div>
            <p className="mt-3 max-w-sm text-sm leading-6">Business-focused support for owners evaluating options around merchant cash advance obligations.</p>
            <div className="mt-5 space-y-1 text-sm">
              {hasPhone && <div><a href={`tel:${PHONE_TEL}`} className="hover:text-white">{PHONE_DISPLAY}</a></div>}
              {CONTACT_EMAIL && <div><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a></div>}
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
              <div className="text-[10px] font-bold uppercase tracking-[.14em] text-amber">Important business-services disclaimer</div>
              <p className="mt-3 text-[11px] leading-5 text-white/48 sm:text-xs sm:leading-6">
                MCAREVIVE provides business-purpose information and commercial debt support services concerning merchant cash advances and other business obligations. MCAREVIVE is not a lender, government agency, or law firm and does not provide legal, tax, accounting, or investment advice. Nothing on this website guarantees that any funder or creditor will modify, restructure, settle, suspend, forgive, or otherwise change an obligation. Eligibility, fees, creditor participation, payment changes, savings, settlements, and timelines vary based on the business, governing agreements, creditor decisions, applicable law, and other circumstances. Creditors may continue collection activity and may exercise contractual or legal remedies. Submitting information through this website does not enroll you in a program, create an attorney-client relationship, or obligate either party to enter into a service agreement. Any services, fees, and material terms should be set out in a separate written agreement before enrollment. If you have received legal papers or face a legal deadline, consult a qualified attorney promptly. This website is intended for commercial/business obligations and not personal consumer debt.
              </p>
            </div>

            <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs">
              {links.map(([label, href]) => <a key={href} href={href} className="hover:text-white">{label}</a>)}
              {optionalTrackingConfigured && (
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("mcarevive:cookie-settings"))}
                  className="text-left hover:text-white"
                >
                  Cookie Choices
                </button>
              )}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-[11px] text-white/35">
          © {new Date().getFullYear()} MCAREVIVE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
