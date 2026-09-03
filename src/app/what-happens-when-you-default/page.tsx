import ResourceArticle from "@/components/ResourceArticle";
import { LegalSection } from "@/components/LegalPage";

export default function Page() {
  return (
    <ResourceArticle title="What Happens After an MCA Default?" summary="Default consequences are contract-specific. The safest first step is to identify the exact agreement, notices, payment status, and any legal deadlines before assuming what happens next.">
      <LegalSection title="Start with the contract">
        <p>Merchant cash advance agreements may contain default provisions, guarantees, UCC-related terms, reconciliation provisions, dispute procedures, and remedies. Not every agreement contains the same provisions, and enforceability can depend on the facts and jurisdiction.</p>
      </LegalSection>
      <LegalSection title="Collection activity may escalate">
        <p>After a claimed default, a funder may increase collection efforts or pursue remedies described in the agreement and allowed by applicable law. That can include demands for payment, disputes involving receivables or payment processors, enforcement of guarantees, or litigation. The actual path varies.</p>
      </LegalSection>
      <LegalSection title="A UCC filing is not the same thing as a court judgment">
        <p>A UCC financing statement generally gives public notice of a claimed security interest; its effect depends on the underlying security agreement, collateral, priority, and applicable law. A filing alone should not be treated as proof that every collection action is automatically permitted.</p>
      </LegalSection>
      <LegalSection title="Do not ignore legal papers">
        <p>If you receive a summons, complaint, judgment notice, restraining notice, or similar legal document, there may be a deadline to respond. A debt-services inquiry does not pause that deadline. Have a licensed attorney review the papers promptly.</p>
      </LegalSection>
    </ResourceArticle>
  );
}
