import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { COMPANY_LEGAL_NAME, CONTACT_EMAIL, COMPANY_ADDRESS } from "@/lib/site";
import SiteFooter from "./SiteFooter";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
          <a href="/" className="display text-lg font-bold tracking-[-.04em]">MCA<span className="text-amber">REVIVE</span></a>
          <a href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white"><ArrowLeft size={14} /> Back to site</a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[.62fr_1.38fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="section-kicker">Website policy</p>
          <h1 className="display mt-4 text-4xl font-semibold tracking-[-.05em] text-ink sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-sm text-sm leading-7 text-ink/58">{intro}</p>
          <div className="mt-7 border-t border-line pt-5 text-xs leading-6 text-ink/45">
            <div>Last updated: September 3, 2026</div>
            <div>{COMPANY_LEGAL_NAME}</div>
            {COMPANY_ADDRESS && <div>{COMPANY_ADDRESS}</div>}
            {CONTACT_EMAIL && <div><a className="underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>}
          </div>
        </aside>

        <article className="premium-card legal-copy rounded-[1.75rem] p-6 sm:p-9 lg:p-10">
          {children}
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
