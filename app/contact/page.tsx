import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/bioear/ContactForm";

export const metadata: Metadata = { title: "Contact — BioEar" };

export default function ContactPage() {
  return (
    <PageContainer>
      <SectionHeading eyebrow="Contact" title="Get in touch" description="Questions about the engineering, the research, or collaboration? Send us a message." />
      <div className="mt-12 max-w-lg">
        <ContactForm />
      </div>
    </PageContainer>
  );
}
