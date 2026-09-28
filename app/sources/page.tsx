import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ART_SOURCES, ICON_LIBRARY } from "@/content/art-sources";
import { references } from "@/content/technology-copy";

export const metadata: Metadata = { title: "Behind the Visuals — BioEar" };

export default function SourcesPage() {
  return (
    <PageContainer>
      <SectionHeading eyebrow="Transparency" title="Behind the visuals" description="Every artwork, icon set, and reference used on this site." />

      <div className="mt-14">
        <h2 className="mb-4 text-lg font-semibold text-ink">Artwork</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {ART_SOURCES.map((a) => (
            <Card key={a.asset}>
              <p className="font-medium text-ink">{a.asset}</p>
              <p className="mt-1 text-sm text-gray">Source: {a.name}</p>
              <p className="text-sm text-gray">License: {a.license}</p>
              <div className="mt-2">
                <Badge tone={a.attributionRequired ? "in-progress" : "complete"}>
                  {a.attributionRequired ? "Attribution required" : "Attribution not required"}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="mb-4 text-lg font-semibold text-ink">Icons</h2>
        <Card>
          <p className="font-medium text-ink">{ICON_LIBRARY.name}</p>
          <p className="mt-1 text-sm text-gray">License: {ICON_LIBRARY.license}</p>
          <p className="mt-1 text-sm text-gray">{ICON_LIBRARY.note}</p>
        </Card>
      </div>

      <div className="mt-14">
        <h2 className="mb-4 text-lg font-semibold text-ink">Scientific & technology references</h2>
        <ul className="space-y-3">
          {references.map((r) => (
            <li key={r.title} className="text-sm text-gray">
              <span className="font-medium text-ink">{r.title}</span> — {r.note}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14">
        <h2 className="mb-4 text-lg font-semibold text-ink">External libraries</h2>
        <ul className="space-y-2 text-sm text-gray">
          <li>Next.js — App Router framework</li>
          <li>Tailwind CSS — design system and layout</li>
          <li>Supabase — database, auth, and storage</li>
          <li>Lucide — interface icons (ISC License)</li>
          <li>Web Audio API — real-time audio processing in the Sound Lab</li>
        </ul>
      </div>
    </PageContainer>
  );
}
