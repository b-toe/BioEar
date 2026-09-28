"use client";

import { useEffect, useRef } from "react";

export function WaveformCanvas({
  analyser,
  color = "var(--lavender)",
  height = 140,
}: {
  analyser: AnalyserNode | null;
  color?: string;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      ctx!.scale(dpr, dpr);
    }
    resize();

    const resolvedColor = getComputedStyle(document.documentElement).getPropertyValue(
      color.replace("var(", "").replace(")", "")
    ) || "#C9C3F5";

    function draw() {
      const rect = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);

      if (!analyser) {
        ctx!.strokeStyle = "#73778233";
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(0, rect.height / 2);
        ctx!.lineTo(rect.width, rect.height / 2);
        ctx!.stroke();
        raf = requestAnimationFrame(draw);
        return;
      }

      const data = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(data);

      ctx!.lineWidth = 2;
      ctx!.strokeStyle = resolvedColor.trim() || "#C9C3F5";
      ctx!.beginPath();
      const slice = rect.width / data.length;
      let x = 0;
      for (let i = 0; i < data.length; i++) {
        const v = data[i] / 128 - 1;
        const y = rect.height / 2 + v * (rect.height / 2 - 8);
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
        x += slice;
      }
      ctx!.stroke();
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => cancelAnimationFrame(raf);
  }, [analyser, color]);

  return <canvas ref={canvasRef} style={{ width: "100%", height }} role="img" aria-label="Live audio waveform" />;
}
