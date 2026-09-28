import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/layout/FadeIn";
import { AccessibilityArt } from "@/components/art/AccessibilityArt";

export const metadata: Metadata = { title: "Our Story — BioEar" };

const beats = [
  { title: "The problem", body: "Hearing technology can be expensive and specialized, putting some solutions out of reach." },
  { title: "The question", body: "Could the core idea behind bone conduction be recreated more simply, from inexpensive parts?" },
  { title: "The experiment", body: "We built a prototype: a microphone, a small processor, an amplifier, and a bone-conduction actuator." },
  { title: "The challenge", body: "Making inexpensive hardware produce a clear, useful signal took several rounds of iteration." },
  { title: "The goal", body: "Explore accessibility through engineering — not to replace clinical devices, but to understand what's possible." },
];

export default function StoryPage() {
  return (
    <PageContainer>
      <SectionHeading eyebrow="Our story" title="Why are we building this?" />

      <div className="mt-12 flex justify-center">
        <AccessibilityArt className="w-full max-w-sm" />
      </div>

      <div className="mx-auto mt-14 max-w-2xl space-y-10">
        {beats.map((b, i) => (
          <FadeIn key={b.title} delay={i * 80}>
            <p className="text-xs font-medium uppercase tracking-wide text-gray">0{i + 1}</p>
            <h3 className="mt-1 text-xl font-semibold text-ink">{b.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-gray">{b.body}</p>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mx-auto mt-16 max-w-xl text-center">
        <p className="text-2xl font-semibold leading-snug text-ink">
          BioEar began as a question. The prototype is our attempt at an answer.
        </p>
      </FadeIn>
    </PageContainer>
  );
}
