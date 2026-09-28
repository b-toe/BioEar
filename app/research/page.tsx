import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchTimeline } from "@/components/research/ResearchTimeline";
import { ExperimentCard } from "@/components/research/ExperimentCard";
import { ResearchChart } from "@/components/research/ResearchChart";
import { experiments } from "@/lib/data/research";
import { researchQuestion, methodology, futureExperiments, limitations } from "@/content/research-copy";
import { PROTOTYPE_VERSION } from "@/lib/constants";

export const metadata: Metadata = { title: "Research — BioEar" };

export default function ResearchPage() {
  return (
    <PageContainer>
      <SectionHeading eyebrow="Engineering BioEar" title="Research question" description={researchQuestion} />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-[24px] border border-ink/8 bg-white/70 p-6">
          <p className="text-xs uppercase tracking-wide text-gray">Current prototype</p>
          <p className="mt-2 text-2xl font-semibold text-ink">v{PROTOTYPE_VERSION}</p>
        </div>
        <div className="rounded-[24px] border border-ink/8 bg-white/70 p-6">
          <p className="text-xs uppercase tracking-wide text-gray">Methodology</p>
          <p className="mt-2 text-sm leading-relaxed text-gray">{methodology}</p>
        </div>
        <div className="rounded-[24px] border border-ink/8 bg-white/70 p-6">
          <p className="text-xs uppercase tracking-wide text-gray">Limitations</p>
          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-gray">
            {limitations.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-xl font-semibold text-ink">Experiments</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((e) => <ExperimentCard key={e.id} experiment={e} />)}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-xl font-semibold text-ink">Measurements</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <ResearchChart title="Frequency response" data={null} unitX="Hz" unitY="dB" />
          <ResearchChart title="Speech-recognition accuracy" data={null} unitX="trial" unitY="%" />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-xl font-semibold text-ink">Timeline</h2>
        <ResearchTimeline />
      </div>

      <div className="mt-16 border-t border-ink/8 pt-8">
        <h2 className="mb-4 text-lg font-semibold text-ink">Future work</h2>
        <ul className="space-y-2 text-sm leading-relaxed text-gray">
          {futureExperiments.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </PageContainer>
  );
}
