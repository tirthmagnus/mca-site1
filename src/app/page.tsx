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

      <section className="border-y border-line bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-kicker">Confidential intake</p>
            <h2 className="display mt-4 text-3xl font-semibold tracking-[-.045em] text-ink sm:text-4xl">Tell us what the payment pressure looks like.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink/58">The form collects business-level information needed for an initial conversation. Do not submit Social Security numbers, bank credentials, card details, or account passwords here.</p>
            <div className="mt-7 space-y-3 text-sm text-ink/62">
              <div>• Business-use inquiry only</div>
              <div>• No obligation to enroll</div>
              <div>• No settlement or savings outcome is guaranteed</div>
            </div>
          </div>
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
