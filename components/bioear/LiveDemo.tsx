"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { BioEarAudioEngine } from "@/lib/audio/audio-engine";
import { PRESETS } from "@/lib/audio/presets";
import { WaveformCanvas } from "@/components/simulator/WaveformCanvas";
import { FrequencyVisualizer } from "@/components/simulator/FrequencyVisualizer";
import { BonePathArt } from "@/components/art/BonePathArt";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const STAGES = ["Capture", "Process", "Transmit"] as const;

export function LiveDemo() {
  const engineRef = useRef<BioEarAudioEngine | null>(null);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(0);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    engineRef.current = new BioEarAudioEngine();
    return () => engineRef.current?.stop();
  }, []);

  async function start() {
    setRunning(true);
    setStage(0);
    const engine = engineRef.current!;
    await engine.startTone(440, PRESETS.bioearPrototype);
    setAnalyser(engine.processedAnalyser);

    setTimeout(() => setStage(1), 5000);
    setTimeout(() => setStage(2), 10000);
    setTimeout(() => {
      engine.stop();
      engineRef.current = new BioEarAudioEngine();
      setAnalyser(null);
      setRunning(false);
    }, 15000);
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {STAGES.map((s, i) => (
          <div
            key={s}
            className={cn(
              "rounded-2xl border p-5 text-center transition-all duration-500",
              running && stage === i ? "border-transparent bg-gradient-to-br from-lavender to-blue shadow-md scale-[1.03]" : "border-ink/10 bg-white/60"
            )}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-gray">0{i + 1}</p>
            <p className="mt-1 text-lg font-semibold text-ink">{s.toUpperCase()}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-ink/8 bg-white/70 p-6">
        {stage < 2 ? (
          <WaveformCanvas analyser={running ? analyser : null} />
        ) : (
          <FrequencyVisualizer analyser={running ? analyser : null} />
        )}
      </div>

      {stage === 2 && running && (
        <div className="flex justify-center">
          <BonePathArt active className="w-full max-w-sm" />
        </div>
      )}

      <div className="flex justify-center">
        <Button onClick={start} variant="primary" className={cn(running && "pointer-events-none opacity-60")}>
          <Play size={16} /> {running ? "Demonstration running…" : "Start demonstration"}
        </Button>
      </div>
    </div>
  );
}
