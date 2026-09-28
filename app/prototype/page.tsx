import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DeviceLayers } from "@/components/bioear/DeviceLayers";
import { PROTOTYPE_VERSION } from "@/lib/constants";

export const metadata: Metadata = { title: "Prototype — BioEar" };

export default function PrototypePage() {
  return (
    <PageContainer>
      <SectionHeading
        eyebrow={`Prototype v${PROTOTYPE_VERSION}`}
        title="Inside BioEar"
        description="Select a layer to see what it does inside the current prototype."
      />
      <div className="mt-14">
        <DeviceLayers />
      </div>
    </PageContainer>
  );
}
