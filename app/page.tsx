import { HeroSection } from "@/components/hero/HeroSection";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/layout/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SignalPath } from "@/components/bioear/SignalPath";
import { DeviceModel } from "@/components/bioear/DeviceModel";
import { BoneConductionDiagram } from "@/components/bioear/BoneConductionDiagram";
import { BioEarStats } from "@/components/bioear/BioEarStats";
import { ResearchTimeline } from "@/components/research/ResearchTimeline";
import { SoundOrb } from "@/components/hero/SoundOrb";
import { ideaCards, bioear } from "@/content/bioear-copy";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* THE PROBLEM */}
      <Section tone="lavender">
        <FadeIn>
          <SectionHeading
            align="center"
            eyebrow="The problem"
            title="Some hearing pathways are blocked. What if sound could take another route?"
          />
        </FadeIn>
      </Section>

      {/* THE IDEA */}
      <Section>
        <SectionHeading eyebrow="The idea" title="Capture. Process. Transmit." className="mb-12" />
        <div className="grid gap-6 sm:grid-cols-3">
          {ideaCards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 100}>
              <Card>
                <p className="text-xs font-medium uppercase tracking-wide text-gray">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray">{card.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* FOLLOW THE SIGNAL */}
      <Section tone="blue">
        <SectionHeading eyebrow="Follow the signal" title="How sound becomes vibration" className="mb-12" />
        <FadeIn>
          <SignalPath />
        </FadeIn>
      </Section>

      {/* INTERACTIVE DEVICE */}
      <Section>
        <SectionHeading eyebrow="The device" title="A closer look at the prototype" className="mb-12" />
        <FadeIn>
          <DeviceModel />
        </FadeIn>
      </Section>

      {/* HOW IT WORKS preview */}
      <Section tone="mint">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <FadeIn>
            <SectionHeading
              eyebrow="How it works"
              title="Air conduction vs. bone conduction"
              description="Conventional hearing relies on the ear canal. BioEar explores a second pathway, through the skull, to the same inner ear."
            />
            <Button href="/how-it-works" variant="outline" className="mt-6">
              See the full comparison
            </Button>
          </FadeIn>
          <FadeIn delay={100}>
            <BoneConductionDiagram />
          </FadeIn>
        </div>
      </Section>

      {/* SOUND LAB PREVIEW */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <FadeIn>
            <SectionHeading
              eyebrow="Sound lab"
              title="What happens to sound inside BioEar?"
              description="Play a tone, watch the waveform, then compare it to BioEar's processed version — live, in your browser."
            />
            <Button href="/simulator" variant="primary" className="mt-6">
              Open Sound Lab
            </Button>
          </FadeIn>
          <FadeIn delay={100} className="flex justify-center">
            <SoundOrb size={180} />
          </FadeIn>
        </div>
      </Section>

      {/* WHY BIOEAR */}
      <Section tone="peach">
        <SectionHeading eyebrow="Why BioEar" title="Three engineering commitments" className="mb-12" />
        <FadeIn>
          <BioEarStats />
        </FadeIn>
      </Section>

      {/* ENGINEERING JOURNEY */}
      <Section>
        <SectionHeading eyebrow="Engineering journey" title="From question to prototype" className="mb-12" />
        <FadeIn>
          <ResearchTimeline />
        </FadeIn>
        <div className="mt-8">
          <Button href="/research" variant="outline">Explore the research</Button>
        </div>
      </Section>

      {/* FINAL STATEMENT */}
      <Section tone="lavender">
        <FadeIn className="text-center">
          <p className="mx-auto max-w-2xl text-2xl font-semibold leading-snug text-ink sm:text-3xl">
            We are not just amplifying sound. We are exploring another way to carry it.
          </p>
          <Button href="/technology" variant="primary" className="mt-8">
            Explore the technology
          </Button>
          <p className="mx-auto mt-10 max-w-md text-xs text-gray">{bioear.disclaimer}</p>
        </FadeIn>
      </Section>
    </>
  );
}
