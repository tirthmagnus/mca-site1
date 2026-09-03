import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import SiteFooter from "./SiteFooter";

export default function ResourceArticle({
  eyebrow = "MCAREVIVE Resource Center",
  title,
  summary,
  children,
}: {
  eyebrow?: string;
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
          <a href="/" className="display text-lg font-bold tracking-[-.04em]">MCA<span className="text-amber">REVIVE</span></a>
          <a href="/#resources" className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white"><ArrowLeft size={14} /> Resources</a>
        </div>
      </header>

      <section className="bg-ink pb-16 pt-14 text-white sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-amber">{eyebrow}</p>
          <h1 className="display mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-.05em] sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/58">{summary}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-8 sm:py-16">
        <article className="legal-copy premium-card rounded-[1.75rem] p-6 sm:p-9">{children}</article>

        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-amber/30 bg-amber/10 p-5 text-xs leading-6 text-ink/58">
          <Scale className="mt-0.5 shrink-0 text-amber" size={19} />
          <p>General business information only. MCA agreements and legal rights vary by contract and jurisdiction. MCAREVIVE is not a law firm and this page is not legal, tax, or accounting advice. If you received court papers or face a legal deadline, contact a licensed attorney promptly.</p>
        </div>

        <a href="/#apply" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-amber px-6 text-sm font-bold text-ink hover:bg-amber-2">Request a confidential review <ArrowRight size={16} /></a>
      </section>
      <SiteFooter />
    </main>
  );
}
