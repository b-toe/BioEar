import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiveDemo } from "@/components/bioear/LiveDemo";

export const metadata: Metadata = { title: "Live Demonstration — BioEar" };

export default function DemoPage() {
  return (
    <PageContainer>
      <SectionHeading align="center" eyebrow="BioEar live demonstration" title="Capture. Process. Transmit." description="A short, automatic walkthrough of the full BioEar signal chain." />
      <div className="mt-14">
        <LiveDemo />
      </div>
    </PageContainer>
  );
}
