"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import SavingsCalculator from "@/components/SavingsCalculator";
import ChatWidget from "@/components/ChatWidget";
import { LeadModalProvider, useLeadModal } from "@/components/LeadModalContext";
import {
  ProblemRecognition,
  WhoWeHelp,
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

function HomeContent() {
  const [prefill, setPrefill] = useState<{ balanceRange?: string; numberOfMcas?: string }>({});
  const openModal = useLeadModal();

  function handleContinue(balanceRange: string, numberOfMcas: string) {
    setPrefill({ balanceRange, numberOfMcas });
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <Header />
      <Hero onContinue={handleContinue} />
      <ProblemRecognition />
      <WhoWeHelp />
      <Solutions />
      <HowItWorks />
      <TrustSection />
      <ClientStories />
      <SavingsCalculator onGetStarted={openModal} />
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

export default function Home() {
  return (
    <LeadModalProvider>
      <HomeContent />
    </LeadModalProvider>
  );
}
