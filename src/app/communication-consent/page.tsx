import { LegalPage, LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Page() {
  return (
    <LegalPage title="Communication Consent" intro="What it means when you affirmatively ask MCAREVIVE to contact you by phone, text message, or email about a business-debt inquiry.">
      <LegalSection title="1. Affirmative permission">
        <p>When you check a consent box or clearly provide equivalent permission in the chatbot, you authorize MCAREVIVE to contact you at the telephone number and email address you provided concerning your business-debt inquiry and related services.</p>
      </LegalSection>

      <LegalSection title="2. Calls, texts, and technology">
        <p>Your permission may include calls and text messages delivered using automated dialing or messaging technology where permitted by law. It may also include emails related to your inquiry. Message and data rates may apply. Message frequency varies based on your inquiry and interactions.</p>
      </LegalSection>

      <LegalSection title="3. Consent is optional">
        <p>Consent to receive marketing or automated communications is not a condition of purchasing a service. You may continue to review public website information without providing contact permission.</p>
      </LegalSection>

      <LegalSection title="4. How to stop communications">
        <p>Reply STOP to a text message to request that future text messages stop. Reply HELP for text-message assistance. You may also tell a representative that you no longer want particular communications or use the contact method below. A revocation request does not affect communications already sent before the request was processed or messages required for legal, transactional, or recordkeeping purposes where applicable.</p>
      </LegalSection>

      <LegalSection title="5. Number ownership and accuracy">
        <p>By providing a telephone number, you represent that you are authorized to provide that number for the stated purpose. If the number is reassigned, disconnected, or no longer yours, please notify MCAREVIVE or opt out promptly.</p>
      </LegalSection>

      <LegalSection title="6. Third parties and SMS opt-in data">
        <p>Service providers may process communications on MCAREVIVE’s behalf. The act of opting in to MCAREVIVE text messages does not, by itself, authorize an unrelated third party to use that opt-in to send its own marketing texts.</p>
      </LegalSection>

      <LegalSection title="7. Privacy and contact">
        <p>Information used for communications is handled as described in the <a href="/privacy-policy">Privacy Policy</a>.</p>
        <p>{CONTACT_EMAIL ? <>Questions or revocation requests may also be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</> : <>A monitored contact email should be configured before production launch so users have an additional revocation method.</>}</p>
      </LegalSection>
    </LegalPage>
  );
}
