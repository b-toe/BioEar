import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AudioSimulator } from "@/components/simulator/AudioSimulator";

export const metadata: Metadata = { title: "Sound Lab — BioEar" };

export default function SimulatorPage() {
  return (
    <PageContainer>
      <SectionHeading
        eyebrow="BioEar Sound Lab"
        title="Explore how digital processing can reshape sound"
        description="Everything here runs locally in your browser using the Web Audio API. Microphone access is never activated automatically."
      />
      <div className="mt-12">
        <AudioSimulator />
      </div>
    </PageContainer>
  );
}
