"use client";

import { useEffect, useRef, useState } from "react";

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
      ctx!.fillStyle = "#C8E8DC33";
      ctx!.fillRect(rect.width * 0.18, 0, rect.width * 0.35, rect.height);

      if (!analyser) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);

      const barCount = 64;
      const step = Math.floor(data.length / barCount);
      const barWidth = rect.width / barCount;

      for (let i = 0; i < barCount; i++) {
        const v = data[i * step] / 255;
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
    const nyquist = 22050;
    const freq = ratio * nyquist;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    const binIndex = Math.floor(ratio * data.length);
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
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wide text-gray">
        <span>100</span>
        <span>1k</span>
        <span>4k</span>
        <span>10k+</span>
      </div>
    </div>
  );
}
