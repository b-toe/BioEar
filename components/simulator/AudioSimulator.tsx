"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Waves } from "lucide-react";
import { BioEarAudioEngine } from "@/lib/audio/audio-engine";
import { DEFAULT_PARAMS, EngineParams, PRESETS } from "@/lib/audio/presets";
import { WaveformCanvas } from "./WaveformCanvas";
import { FrequencyVisualizer } from "./FrequencyVisualizer";
import { ProcessingModes } from "./ProcessingModes";
import { SimulatorExplanation } from "./SimulatorExplanation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const TONES = [250, 500, 1000, 2000, 4000, 8000];

type Mode = "idle" | "tone" | "microphone" | "sample";

export function AudioSimulator() {
  const engineRef = useRef<BioEarAudioEngine | null>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [params, setParams] = useState<EngineParams>(DEFAULT_PARAMS);
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>("natural");
  const [viewMode, setViewMode] = useState<"waveform" | "spectrum">("waveform");
  const [showProcessed, setShowProcessed] = useState(true);
  const [micDenied, setMicDenied] = useState(false);
  const [analysers, setAnalysers] = useState<{ raw: AnalyserNode | null; processed: AnalyserNode | null }>({
    raw: null,
    processed: null,
  });

  useEffect(() => {
    engineRef.current = new BioEarAudioEngine();
    return () => {
      engineRef.current?.stop();
    };
  }, []);

  async function startTone(freq: number) {
    stop();
    const engine = engineRef.current!;
    await engine.startTone(freq, params);
    setAnalysers({ raw: engine.rawAnalyser, processed: engine.processedAnalyser });
    setMode("tone");
  }

  async function startSample() {
    stop();
    const engine = engineRef.current!;
    // Synthesized speech-like demo tone — a stand-in until a recorded voice sample asset is added.
    await engine.startTone(320, params);
    setAnalysers({ raw: engine.rawAnalyser, processed: engine.processedAnalyser });
    setMode("sample");
  }

  async function startMicrophone() {
    stop();
    try {
      const engine = engineRef.current!;
      await engine.startMicrophone(params);
      setAnalysers({ raw: engine.rawAnalyser, processed: engine.processedAnalyser });
      setMode("microphone");
      setMicDenied(false);
    } catch {
      setMicDenied(true);
    }
  }

  function stop() {
    engineRef.current?.stop();
    engineRef.current = new BioEarAudioEngine();
    setAnalysers({ raw: null, processed: null });
    setMode("idle");
  }

  function updateParams(next: Partial<EngineParams>) {
    const merged = { ...params, ...next };
    setParams(merged);
    engineRef.current?.updateParams(merged);
  }

  function selectPreset(key: keyof typeof PRESETS) {
    setActivePreset(key);
    updateParams(PRESETS[key]);
  }

  const activeAnalyser = showProcessed ? analysers.processed : analysers.raw;

  return (
    <div className="space-y-8">
      <SimulatorExplanation />

      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant={mode === "sample" ? "primary" : "outline"} onClick={startSample}>
          <Waves size={16} /> Sample voice
        </Button>
        <div className="flex flex-wrap gap-1.5 rounded-full border border-ink/10 p-1.5">
          {TONES.map((f) => (
            <button
              key={f}
              onClick={() => startTone(f)}
              className="rounded-full px-2.5 py-1.5 text-xs font-medium text-ink/80 hover:bg-ink/5"
            >
              {f >= 1000 ? `${f / 1000}k` : f}
            </button>
          ))}
        </div>
        <Button variant={mode === "microphone" ? "primary" : "outline"} onClick={startMicrophone}>
          <Mic size={16} /> Microphone
        </Button>
      </div>
      {micDenied && (
        <p className="text-sm text-gray">Microphone access was not granted. Try the sample voice or tone generator instead.</p>
      )}

      {mode !== "idle" && (
        <button onClick={stop} className="inline-flex items-center gap-2 text-sm text-gray hover:text-ink">
          <Square size={14} /> Stop
        </button>
      )}

      <div className="rounded-[28px] border border-ink/8 bg-white/70 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-ink/10 p-1">
            <button
              onClick={() => setShowProcessed(false)}
              aria-pressed={!showProcessed}
              className={cn("rounded-full px-4 py-1.5 text-xs font-medium", !showProcessed ? "bg-ink text-cream" : "text-gray")}
            >
              Raw signal
            </button>
            <button
              onClick={() => setShowProcessed(true)}
              aria-pressed={showProcessed}
              className={cn("rounded-full px-4 py-1.5 text-xs font-medium", showProcessed ? "bg-ink text-cream" : "text-gray")}
            >
              BioEar processed
            </button>
          </div>
          <div className="inline-flex rounded-full border border-ink/10 p-1">
            <button
              onClick={() => setViewMode("waveform")}
              aria-pressed={viewMode === "waveform"}
              className={cn("rounded-full px-4 py-1.5 text-xs font-medium", viewMode === "waveform" ? "bg-ink text-cream" : "text-gray")}
            >
              Waveform
            </button>
            <button
              onClick={() => setViewMode("spectrum")}
              aria-pressed={viewMode === "spectrum"}
              className={cn("rounded-full px-4 py-1.5 text-xs font-medium", viewMode === "spectrum" ? "bg-ink text-cream" : "text-gray")}
            >
              Spectrum
            </button>
          </div>
        </div>

        {viewMode === "waveform" ? (
          <WaveformCanvas analyser={activeAnalyser} />
        ) : (
          <FrequencyVisualizer analyser={activeAnalyser} />
        )}
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink">Processing presets</h3>
        <ProcessingModes active={activePreset} onSelect={selectPreset} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {([
          ["gain", "Overall gain"],
          ["low", "Low frequencies"],
          ["mid", "Mid frequencies"],
          ["high", "High frequencies"],
          ["speechEmphasis", "Speech emphasis"],
          ["noiseReduction", "Noise reduction"],
          ["compression", "Compression"],
        ] as const).map(([key, label]) => (
          <label key={key} className="block">
            <span className="mb-1.5 flex justify-between text-xs font-medium uppercase tracking-wide text-gray">
              {label} <span>{params[key]}</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={params[key]}
              onChange={(e) => updateParams({ [key]: Number(e.target.value) } as Partial<EngineParams>)}
              className="w-full accent-[var(--lavender)]"
              aria-label={label}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
