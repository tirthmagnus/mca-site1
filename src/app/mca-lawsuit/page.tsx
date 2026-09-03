import ResourceArticle from "@/components/ResourceArticle";
import { LegalSection } from "@/components/LegalPage";

export default function Page() {
  return (
    <ResourceArticle title="Facing an MCA Lawsuit" summary="A lawsuit changes the urgency. Business-debt negotiation may still be part of a broader response, but active litigation requires attention to court papers, deadlines, and licensed legal counsel.">
      <LegalSection title="Treat court papers as time-sensitive">
        <p>If your business or a guarantor has been served with a complaint, summons, motion, judgment-related notice, or other court paper, do not rely on a website conversation as a response. Deadlines vary by court and jurisdiction, and missing one can affect available defenses or remedies.</p>
      </LegalSection>
      <LegalSection title="Negotiation and litigation are different tracks">
        <p>Parties sometimes negotiate while a dispute or lawsuit is pending, but a negotiation does not automatically stop a case, cancel a deadline, or prevent enforcement activity. Any litigation strategy should be handled by appropriately licensed counsel.</p>
      </LegalSection>
      <LegalSection title="Confessions of judgment require specific review">
        <p>Whether a confession-of-judgment provision exists, can be used, or is enforceable depends on the contract, transaction, parties, procedure, and applicable law. General website language cannot determine the answer for a specific agreement.</p>
      </LegalSection>
      <LegalSection title="What to gather">
        <p>Keep the signed MCA agreement, payment history, notices, correspondence, court papers, and a current list of active obligations together. Those documents help a lawyer and any business-debt professional understand the situation without relying on assumptions.</p>
      </LegalSection>
    </ResourceArticle>
  );
}
