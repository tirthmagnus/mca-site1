"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import ChatWidget from "@/components/ChatWidget";
import {
  ProblemRecognition,
  Solutions,
  HowItWorks,
  TrustSection,
  ClientStories,
  WhyChooseUs,
  Education,
  FAQ,
  FinalCTA,
  Footer,
} from "@/components/Sections";

export default function Home() {
  const [prefill, setPrefill] = useState<{ balanceRange?: string; numberOfMcas?: string }>({});

  function handleContinue(balanceRange: string, numberOfMcas: string) {
    setPrefill({ balanceRange, numberOfMcas });
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <Header />
      <Hero onContinue={handleContinue} />
      <ProblemRecognition />
      <Solutions />
      <HowItWorks />
      <TrustSection />
      <ClientStories />
      <WhyChooseUs />

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <div className="mt-2">
          <LeadForm prefillBalanceRange={prefill.balanceRange} prefillNumberOfMcas={prefill.numberOfMcas} />
        </div>
      </section>

      <Education />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
