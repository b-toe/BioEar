"use client";

import { useEffect, useRef } from "react";

export function SoundOrb({ size = 220 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let frame = 0;
    let raf: number;

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      };
    }
    window.addEventListener("mousemove", onMove);

    function draw() {
      frame += 0.02;
      ctx!.clearRect(0, 0, size, size);
      const cx = size / 2 + mouseRef.current.x * 6;
      const cy = size / 2 + mouseRef.current.y * 6;

      const rings = 4;
      for (let i = rings; i > 0; i--) {
        const t = frame + i * 0.6;
        const wobble = Math.sin(t) * 4;
        const radius = (size / 2 - 10) * (i / rings) + wobble;
        ctx!.beginPath();
        ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
        const hues = ["#C9C3F5", "#BFDDF4", "#C8E8DC", "#F4D6CA"];
        ctx!.strokeStyle = hues[i % hues.length];
        ctx!.globalAlpha = 0.35 + i * 0.06;
        ctx!.lineWidth = 2;
        ctx!.stroke();
      }

      ctx!.globalAlpha = 1;
      ctx!.beginPath();
      ctx!.arc(cx, cy, size * 0.18, 0, Math.PI * 2);
      ctx!.fillStyle = "#FBF9F4";
      ctx!.fill();
      ctx!.strokeStyle = "#20232A";
      ctx!.globalAlpha = 0.15;
      ctx!.stroke();

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [size]);

  return <canvas ref={canvasRef} style={{ width: size, height: size }} aria-hidden="true" />;
}
