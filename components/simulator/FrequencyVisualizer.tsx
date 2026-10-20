"use client";

import { useEffect, useRef, useState } from "react";

// The spectrum is drawn on a log frequency axis, like hearing itself, so the
// speech band and the axis labels line up with what is actually playing.
const MIN_HZ = 50;
const MAX_HZ = 16000;
const SPEECH_BAND: [number, number] = [500, 4000];
const AXIS_LABELS = [100, 500, 1000, 4000, 10000];

function hzToRatio(hz: number) {
  return Math.log(hz / MIN_HZ) / Math.log(MAX_HZ / MIN_HZ);
}

function ratioToHz(ratio: number) {
  return MIN_HZ * Math.pow(MAX_HZ / MIN_HZ, ratio);
}

export function FrequencyVisualizer({ analyser, height = 180 }: { analyser: AnalyserNode | null; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ freq: number; amp: number; x: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
    }
    resize();

    function draw() {
      const rect = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);

      // speech-relevant region highlight (roughly 500Hz-4kHz)
      const speechStart = hzToRatio(SPEECH_BAND[0]);
      const speechEnd = hzToRatio(SPEECH_BAND[1]);
      ctx!.fillStyle = "#C8E8DC33";
      ctx!.fillRect(rect.width * speechStart, 0, rect.width * (speechEnd - speechStart), rect.height);

      if (!analyser) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);

      const barCount = 64;
      const barWidth = rect.width / barCount;
      const hzPerBin = analyser.context.sampleRate / analyser.fftSize;

      for (let i = 0; i < barCount; i++) {
        const lo = Math.floor(ratioToHz(i / barCount) / hzPerBin);
        const hi = Math.max(lo, Math.floor(ratioToHz((i + 1) / barCount) / hzPerBin));
        let peak = 0;
        for (let b = lo; b <= hi && b < data.length; b++) peak = Math.max(peak, data[b]);
        const v = peak / 255;
        const barHeight = v * (rect.height - 10);
        ctx!.fillStyle = "#BFDDF4";
        ctx!.fillRect(i * barWidth + 1, rect.height - barHeight, barWidth - 2, barHeight);
      }

      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [analyser]);

  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!analyser) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    const freq = ratioToHz(ratio);
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    const binIndex = Math.min(data.length - 1, Math.round(freq / (analyser.context.sampleRate / analyser.fftSize)));
    const amp = Math.round((data[binIndex] / 255) * 100);
    setHover({ freq: Math.round(freq), amp, x });
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label="Live frequency spectrum, with the speech-relevant range highlighted"
      />
      {hover && (
        <div
          className="pointer-events-none absolute top-2 rounded-lg bg-ink px-2.5 py-1 text-xs text-cream shadow-lg"
          style={{ left: Math.min(Math.max(hover.x, 40), 260) }}
        >
          {hover.freq >= 1000 ? `${(hover.freq / 1000).toFixed(1)} kHz` : `${hover.freq} Hz`} · {hover.amp}%
        </div>
      )}
      <div className="relative mt-1 h-4 text-[10px] uppercase tracking-wide text-gray">
        {AXIS_LABELS.map((hz) => (
          <span key={hz} className="absolute -translate-x-1/2" style={{ left: `${hzToRatio(hz) * 100}%` }}>
            {hz >= 1000 ? `${hz / 1000}k` : hz}
          </span>
        ))}
      </div>
    </div>
  );
}
