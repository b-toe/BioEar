import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BoneConductionDiagram } from "@/components/bioear/BoneConductionDiagram";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = { title: "How It Works — BioEar" };

export default function HowItWorksPage() {
  return (
    <PageContainer>
      <SectionHeading
        eyebrow="How it works"
        title="Two pathways to the same inner ear"
        description="BioEar does not bypass the inner ear — it reaches it through a different route. Toggle between the two pathways below."
      />

      <div className="mt-12">
        <BoneConductionDiagram />
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide text-gray">Conventional</p>
          <h3 className="mt-2 text-lg font-semibold text-ink">Air conduction</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray">
            Sound &rarr; ear canal &rarr; middle ear &rarr; inner ear.
          </p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide text-gray">BioEar concept</p>
          <h3 className="mt-2 text-lg font-semibold text-ink">Bone conduction</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray">
            Sound &rarr; microphone &rarr; processing &rarr; vibration &rarr; skull &rarr; inner ear.
          </p>
        </Card>
      </div>

      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-gray">
        FDA materials describe bone-conduction systems as transmitting mechanical vibrations through skull bone to
        the inner ear — the same destination as conventional hearing, reached by a different physical path.
      </p>
    </PageContainer>
  );
}
