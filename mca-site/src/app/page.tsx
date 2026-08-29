"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import ChatWidget from "@/components/ChatWidget";
import { HowItWorks, Industries, Comparison, FAQ, Footer } from "@/components/Sections";

export default function Home() {
  const [prefillAmount, setPrefillAmount] = useState<number | undefined>();

  function handleApply(amount: number) {
    setPrefillAmount(amount);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <Header />
      <Hero onApply={handleApply} />
      <HowItWorks />
      <Industries />
      <Comparison />

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <h2 className="display text-center text-3xl font-bold text-ink">
          Ready to see a real offer?
        </h2>
        <p className="mt-2 text-center text-ink/60">
          Takes about two minutes. A funding specialist follows up shortly after.
        </p>
        <div className="mt-8">
          <LeadForm prefillAmount={prefillAmount} />
        </div>
      </section>

      <FAQ />
      <Footer />
      <ChatWidget />
    </main>
  );
}
