import { LegalPage, LegalSection } from "@/components/LegalPage";

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" intro="How browser storage, analytics, and similar technologies may be used to operate and measure the MCAREVIVE website.">
      <LegalSection title="What this site uses by default">
        <p>The core website, intake forms, and guided chat do not require advertising cookies. The site may use limited browser storage for functional preferences, including remembering whether a visitor accepted or declined optional tracking.</p>
      </LegalSection>

      <LegalSection title="Optional analytics and advertising tools">
        <p>The codebase supports Google Analytics and Meta Pixel. These integrations are optional and are not loaded unless the corresponding site identifiers are configured and the visitor accepts optional tracking through the website&apos;s privacy choices notice.</p>
        <ul>
          <li><strong>Analytics:</strong> may help understand visits, traffic sources, page usage, and completed lead submissions.</li>
          <li><strong>Advertising measurement:</strong> may help measure campaign performance and attributed conversions when advertising campaigns are active.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Why this information can be useful">
        <p>Aggregate measurement can help determine which pages are useful, which marketing sources produce legitimate inquiries, where visitors leave the intake process, and whether technical changes improve website performance. MCAREVIVE should enable only the tools it has a real business reason to use.</p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>When optional tracking is configured, visitors can accept or decline it before those tools load. A visitor can reopen the privacy choices control from the website footer. Browser and device settings may provide additional controls for cookies and tracking technologies.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>This Cookie Policy should be updated if the website adds, removes, or materially changes analytics, advertising, consent-management, or other browser technologies.</p>
      </LegalSection>
    </LegalPage>
  );
}
