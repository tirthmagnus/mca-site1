import { LegalPage, LegalSection } from "@/components/LegalPage";

export default function Page() {
  return (
    <LegalPage title="Legal Disclaimer" intro="General legal limitations that apply to educational content, business-debt information, examples, and communications on this site.">
      <LegalSection title="No legal, tax, or accounting advice">
        <p>Content on this website is educational and general. It is not legal, tax, accounting, investment, or financial-planning advice and should not be used as a substitute for advice from a qualified professional who has reviewed your specific documents and circumstances.</p>
      </LegalSection>

      <LegalSection title="No attorney-client relationship">
        <p>Using the website, sending information through a form, or communicating with a non-lawyer representative does not create an attorney-client relationship. Do not assume a legal deadline has been protected because you contacted the website.</p>
      </LegalSection>

      <LegalSection title="Commercial agreements vary">
        <p>Merchant cash advance and commercial-finance agreements can differ significantly in structure, governing law, dispute provisions, UCC terms, guarantees, reconciliation provisions, and remedies. General descriptions on this site may not apply to your contract.</p>
      </LegalSection>

      <LegalSection title="No prediction of outcome">
        <p>Examples, educational articles, testimonials, and descriptions of possible strategies do not predict what a creditor, court, or other party will do in a specific matter. No particular settlement, savings amount, payment change, legal result, or timeline is promised.</p>
      </LegalSection>

      <LegalSection title="Third-party information">
        <p>References or links to third-party websites are provided for convenience or context. MCAREVIVE does not endorse or guarantee the accuracy, availability, or legal conclusions of third-party material.</p>
      </LegalSection>
    </LegalPage>
  );
}
