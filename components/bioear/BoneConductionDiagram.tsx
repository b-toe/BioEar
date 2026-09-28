"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export function BoneConductionDiagram() {
  const [mode, setMode] = useState<"air" | "bone">("bone");

  return (
    <div>
      <div className="mb-6 inline-flex rounded-full border border-ink/10 bg-white/70 p-1" role="tablist" aria-label="Conduction pathway">
        {(["air", "bone"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              mode === m ? "bg-gradient-to-r from-lavender to-blue text-ink" : "text-gray hover:text-ink"
            )}
          >
            {m === "air" ? "Air conduction" : "Bone conduction"}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 420 260" className="w-full max-w-lg" role="img" aria-label={
        mode === "air"
          ? "Diagram showing sound traveling through the ear canal to the inner ear."
          : "Diagram showing vibration traveling through the skull directly to the inner ear."
      }>
        <path
          d="M110 60c56 0 100 44 104 100 16 4 26 20 22 38-4 16-20 26-38 24-10 36-42 62-80 64v34h-36v-36c-46-10-78-50-78-98 0-68 52-126 106-126Z"
          fill="var(--cream)"
          stroke="var(--ink)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        {/* ear canal */}
        <path d="M214 128c14 6 22 18 22 32s-8 26-22 32" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
        {/* cochlea */}
        <circle cx="252" cy="160" r="12" fill="var(--mint)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.2" />

        {mode === "air" ? (
          <>
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${40 - i * 16} 130 q 16 -22 32 0 q 16 22 32 0`}
                stroke="var(--blue)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                opacity={0.9 - i * 0.25}
              />
            ))}
            <path d="M120 130 H210" stroke="var(--blue)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </>
        ) : (
          <>
            <rect x="292" y="140" width="24" height="42" rx="10" fill="var(--peach)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.2" />
            <path
              d="M292 161c-40 0-90 0-118 0"
              stroke="var(--lavender)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px var(--lavender))" }}
            />
          </>
        )}
      </svg>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-gray">
        {mode === "air"
          ? "Sound travels through the ear canal to the middle and inner ear — the conventional hearing pathway."
          : "BioEar's actuator transmits vibration through the skull, reaching the same inner ear without using the ear canal."}
      </p>
    </div>
  );
}
