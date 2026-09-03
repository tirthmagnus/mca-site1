import { LegalPage, LegalSection } from "@/components/LegalPage";

export default function Page() {
  return (
    <LegalPage title="Business Debt Services Disclaimer" intro="Important limitations and risk information for business owners evaluating options involving merchant cash advances and other commercial obligations.">
      <LegalSection title="Business-purpose services only">
        <p>MCAREVIVE’s website is directed to businesses evaluating commercial-debt and merchant-cash-advance issues. It is not a consumer debt-relief website and is not intended to address personal credit-card, medical, student-loan, mortgage, or other consumer debt.</p>
      </LegalSection>

      <LegalSection title="Not a lender, government agency, or law firm">
        <p>MCAREVIVE does not make loans through this website and is not a government program or court. MCAREVIVE is not a law firm and does not provide legal representation or legal advice unless a separate engagement with an appropriately licensed professional expressly says otherwise.</p>
      </LegalSection>

      <LegalSection title="No guaranteed restructuring or settlement">
        <p>No creditor is required by this website to modify a contract, reduce a balance, pause withdrawals, accept a payment plan, settle an obligation, or stop collection activity. Results depend on the applicable agreements, creditor decisions, payment history, business condition, negotiation, law, and other facts. Payment reductions, savings, settlements, and timeframes are not guaranteed.</p>
      </LegalSection>

      <LegalSection title="Possible risks and consequences">
        <p>Depending on the agreement and strategy, a creditor or funder may continue collection activity or exercise contractual or legal remedies. Potential consequences can include fees or additional charges, UCC-related activity, account or payment disputes, litigation, enforcement of guarantees, or effects on business relationships and future financing. The exact risks depend on the documents and jurisdiction.</p>
      </LegalSection>

      <LegalSection title="Fees and service scope">
        <p>Any service fees, payment arrangements, scope of work, cancellation provisions, and other material terms should appear in a separate written service agreement before enrollment. Do not rely on public website copy as a substitute for the signed agreement.</p>
      </LegalSection>

      <LegalSection title="Urgent legal matters">
        <p>If your business has been sued, received a summons, restraining notice, judgment notice, bank restraint, or other court paper, deadlines may apply. Promptly consult a lawyer licensed in the relevant jurisdiction. Website intake or communication with MCAREVIVE does not extend or pause a court deadline.</p>
      </LegalSection>
    </LegalPage>
  );
}
