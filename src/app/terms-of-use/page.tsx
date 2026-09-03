import { LegalPage, LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Page() {
  return (
    <LegalPage title="Terms of Use" intro="Terms governing access to and use of the MCAREVIVE website, educational content, calculators, forms, and chat features.">
      <LegalSection title="1. Acceptance and permitted use">
        <p>By using this website, you agree to these Terms of Use. The site is intended for adults acting for a business or commercial purpose. Do not use the site for unlawful activity, to interfere with site operation, to attempt unauthorized access, or to submit false or misleading information.</p>
      </LegalSection>

      <LegalSection title="2. Website information is not professional advice">
        <p>Website content is general information only. MCAREVIVE is not a law firm, accounting firm, tax adviser, court, government agency, or lender. Nothing on this site creates an attorney-client, fiduciary, lending, or other professional relationship. Obtain advice from appropriately licensed professionals for legal, tax, accounting, or other regulated matters.</p>
      </LegalSection>

      <LegalSection title="3. No enrollment or creditor agreement through the website">
        <p>Submitting a form, using the chatbot, running a calculator, or speaking with a representative does not by itself enroll you in a service, modify an MCA agreement, bind any creditor, or create a settlement. Any paid service must be described in a separate written agreement setting out the actual scope, fees, and terms.</p>
      </LegalSection>

      <LegalSection title="4. No guarantee of results">
        <p>Creditor participation, payment changes, extensions, settlements, savings, reduced balances, litigation outcomes, and timelines vary by business, agreement, funder, and circumstances. No website statement, example, testimonial, or conversation should be understood as a promise that a particular result will occur.</p>
      </LegalSection>

      <LegalSection title="5. Calculators and examples">
        <p>Interactive tools are informational. A cash-flow calculation may summarize numbers supplied by the user but does not predict a negotiated result. Any examples or case studies must be read with their stated assumptions and disclosures and do not establish what will happen in another matter.</p>
      </LegalSection>

      <LegalSection title="6. Communications">
        <p>If you voluntarily provide contact permission, communications are governed by the consent language presented at the point of collection and the <a href="/communication-consent">Communication Consent</a>. Consent may be revoked as described there.</p>
      </LegalSection>

      <LegalSection title="7. Intellectual property">
        <p>The MCAREVIVE name, site design, written content, graphics, and other original site materials are protected by applicable intellectual-property laws. You may view and use site materials for your own business evaluation but may not reproduce, scrape, republish, sell, or exploit them commercially without permission.</p>
      </LegalSection>

      <LegalSection title="8. Third-party services and links">
        <p>The site may use or link to third-party platforms. MCAREVIVE does not control third-party availability, security, policies, or content and is not responsible for actions taken solely by those third parties.</p>
      </LegalSection>

      <LegalSection title="9. Website availability and limitation">
        <p>The website is provided on an “as available” basis. To the maximum extent permitted by law, MCAREVIVE disclaims warranties relating to uninterrupted operation, accuracy, or fitness for a particular purpose and is not responsible for indirect or consequential losses arising solely from use of the public website. Nothing in these Terms limits rights that cannot legally be waived.</p>
      </LegalSection>

      <LegalSection title="10. Changes and contact">
        <p>These Terms may be revised as the website or business changes. Continued site use after an update is subject to the updated Terms.</p>
        <p>{CONTACT_EMAIL ? <>Questions may be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</> : <>A monitored company contact email should be configured before production launch.</>}</p>
      </LegalSection>
    </LegalPage>
  );
}
