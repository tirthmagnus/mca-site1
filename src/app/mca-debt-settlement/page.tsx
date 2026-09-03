import ResourceArticle from "@/components/ResourceArticle";
import { LegalSection } from "@/components/LegalPage";

export default function Page() {
  return (
    <ResourceArticle title="MCA Settlement vs. Restructuring" summary="Both terms appear frequently in commercial-debt conversations, but they describe different goals and neither produces an automatic or guaranteed result.">
      <LegalSection title="What settlement generally means">
        <p>A settlement is a negotiated agreement intended to resolve an obligation on terms accepted by the parties. Those terms can vary and may address amount, timing, releases, payment schedule, or other conditions. A creditor is not required to settle merely because a business requests it.</p>
      </LegalSection>
      <LegalSection title="How restructuring differs">
        <p>Restructuring usually focuses on modifying the payment mechanics of an existing obligation, while settlement focuses on resolving the obligation through negotiated terms. The practical distinction depends on the documents and the final written agreement.</p>
      </LegalSection>
      <LegalSection title="Multiple MCA positions">
        <p>When several obligations are drawing from the same revenue, the combined cash-flow burden matters. A review should consider each position separately and together, including balances, payment schedules, priority, security interests, guarantees, and any active disputes.</p>
      </LegalSection>
      <LegalSection title="No universal settlement percentage">
        <p>There is no responsible way to promise a particular percentage reduction before a creditor agrees. Advertised or historical outcomes do not determine what another business will receive. Results and timelines vary by funder, agreement, business condition, negotiation, and applicable law.</p>
      </LegalSection>
    </ResourceArticle>
  );
}
