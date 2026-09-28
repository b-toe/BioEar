import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComponentExplorer } from "@/components/bioear/ComponentExplorer";
import { SignalPath } from "@/components/bioear/SignalPath";
import { technologySections, references } from "@/content/technology-copy";

export const metadata: Metadata = { title: "Technology — BioEar" };

export default function TechnologyPage() {
  return (
    <PageContainer>
      <SectionHeading
        eyebrow="Technology"
        title="Inside the BioEar signal chain"
        description="A technical walkthrough of how BioEar captures, processes, and transmits sound."
      />

      <div className="mt-14">
        <h2 className="mb-6 text-xl font-semibold text-ink">System block diagram</h2>
        <SignalPath />
      </div>

      <div className="mt-16 space-y-10">
        {technologySections.map((s, i) => (
          <div key={s.id} className="grid gap-2 border-t border-ink/8 pt-6 sm:grid-cols-[auto_1fr] sm:gap-8">
            <span className="text-xs font-medium uppercase tracking-wide text-gray">0{i + 1}</span>
            <div>
              <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-xl font-semibold text-ink">Component explorer</h2>
        <ComponentExplorer />
      </div>

      <div className="mt-16 border-t border-ink/8 pt-8">
        <h2 className="mb-4 text-lg font-semibold text-ink">Technical references</h2>
        <ul className="space-y-3">
          {references.map((r) => (
            <li key={r.title} className="text-sm text-gray">
              <span className="font-medium text-ink">{r.title}</span> — {r.note}
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
}
