import { LegalPage, LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" intro="How information submitted through MCAREVIVE is collected, used, disclosed, and protected in connection with this business-services website.">
      <LegalSection title="1. Scope">
        <p>This Privacy Policy applies to information collected through the MCAREVIVE website, web forms, chat experience, and related communications. The website is intended for business-purpose inquiries concerning commercial obligations, including merchant cash advances. It is not intended for consumer debt-relief requests.</p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>We may collect information you provide directly, including your name, business name, telephone number, email address, state, approximate business revenue, information about merchant cash advance obligations, payment frequency, and other information you choose to provide during an inquiry.</p>
        <p>We may also collect technical information such as IP address, browser and device information, referring pages, pages viewed, approximate interaction data, and analytics or advertising events when those services are enabled.</p>
        <p>Please do not submit Social Security numbers, online-banking credentials, full payment-card numbers, account passwords, or other highly sensitive credentials through a public form or chatbot.</p>
      </LegalSection>

      <LegalSection title="3. How we use information">
        <ul>
          <li>To respond to inquiries and evaluate the business information provided for an initial conversation.</li>
          <li>To contact you when you have provided the applicable permission to receive calls, texts, or emails.</li>
          <li>To operate, secure, troubleshoot, analyze, and improve the website and intake process.</li>
          <li>To maintain records, prevent abuse or fraud, comply with legal obligations, and protect rights and safety.</li>
          <li>To measure marketing and website performance when analytics or advertising tools are configured.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How information may be disclosed">
        <p>Information may be disclosed to hosting, infrastructure, CRM, communications, analytics, security, and other service providers that support website operations. Information may also be disclosed to professional or service partners involved in responding to a service request where appropriate, to authorities or other parties when required by law or necessary to protect rights, and in connection with a merger, financing, acquisition, or transfer of business assets.</p>
        <p>SMS opt-in permission is used for communications related to the inquiry and does not, by itself, authorize unrelated third parties to send their own marketing texts.</p>
      </LegalSection>

      <LegalSection title="5. Analytics, advertising, and cookies">
        <p>The site may use analytics or advertising technologies, including Google Analytics or Meta tools, when configured. Those providers may receive technical and interaction information according to their own terms and privacy practices. See the <a href="/cookie-policy">Cookie Policy</a> for additional information.</p>
      </LegalSection>

      <LegalSection title="6. Retention and security">
        <p>We retain information for as long as reasonably necessary for the purposes described in this policy, to maintain business and compliance records, resolve disputes, and enforce agreements. We use reasonable administrative and technical safeguards, but no website, transmission method, or storage system can be guaranteed to be completely secure.</p>
      </LegalSection>

      <LegalSection title="7. Your choices">
        <p>You may ask to update or correct information you provided. You may opt out of marketing email using the unsubscribe method provided in the message, and you may opt out of text messages by replying STOP. You may also revoke communication permission through the contact method provided below. Some operational or legally required records may still be retained.</p>
      </LegalSection>

      <LegalSection title="8. State privacy rights">
        <p>Depending on where you live and the nature of the information involved, applicable law may provide additional privacy rights. Requests will be evaluated and handled as required by applicable law, including any identity-verification requirements.</p>
      </LegalSection>

      <LegalSection title="9. Third-party websites">
        <p>The site may link to third-party websites or services. MCAREVIVE does not control their content, security, or privacy practices. Review the policies of any third-party service before providing information to it.</p>
      </LegalSection>

      <LegalSection title="10. Changes and contact">
        <p>We may update this policy as website practices change. The date at the top of the policy reflects the latest revision.</p>
        <p>{CONTACT_EMAIL ? <>Privacy questions may be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</> : <>Before production launch, the company should publish a monitored privacy-contact email address here and in the website footer.</>}</p>
      </LegalSection>
    </LegalPage>
  );
}
