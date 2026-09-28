import { Button } from "@/components/ui/Button";
import { EarWaveArt } from "@/components/art/EarWaveArt";
import { FloatingWave } from "./FloatingWave";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-40 h-96 w-96 rounded-full bg-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-32 h-80 w-80 rounded-full bg-mint/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gray">
            Sound &rarr; Signal &rarr; Vibration
          </p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Hear through another pathway.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-gray">
            BioEar explores a low-cost, non-surgical approach to bone-conduction hearing technology.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/technology" variant="primary">Explore BioEar</Button>
            <Button href="/how-it-works" variant="outline">See how it works</Button>
          </div>
          <FloatingWave className="mt-10 max-w-[220px] opacity-80" />
        </div>

        <div className="flex justify-center">
          <EarWaveArt className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
}
