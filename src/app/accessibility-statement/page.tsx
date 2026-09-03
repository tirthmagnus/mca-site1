import { LegalPage, LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Page() {
  return (
    <LegalPage title="Accessibility Statement" intro="MCAREVIVE’s commitment to making its public website usable by people with a broad range of abilities and assistive technologies.">
      <LegalSection title="Our approach">
        <p>MCAREVIVE aims to provide a website experience that is perceivable, operable, understandable, and robust across modern browsers, devices, keyboard navigation, and common assistive technologies.</p>
      </LegalSection>

      <LegalSection title="Measures built into the site">
        <ul>
          <li>Semantic headings, form labels, links, buttons, and descriptive control names.</li>
          <li>Keyboard-visible focus states and reduced-motion support.</li>
          <li>Responsive layouts designed to remain usable at narrow widths and with mobile safe areas.</li>
          <li>Readable contrast and scalable text throughout core forms and navigation.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Third-party content">
        <p>Some third-party services or externally hosted content may not be controlled directly by MCAREVIVE. We aim to choose accessible integrations and to provide alternatives where reasonably possible.</p>
      </LegalSection>

      <LegalSection title="Feedback">
        <p>If you encounter an accessibility barrier, please describe the page, feature, and problem so it can be investigated. {CONTACT_EMAIL ? <>Send accessibility feedback to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</> : <>A monitored accessibility-contact email should be configured before production launch.</>}</p>
      </LegalSection>
    </LegalPage>
  );
}
