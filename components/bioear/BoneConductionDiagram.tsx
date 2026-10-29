"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { BackBand, BandHint, BioEarDefs, Cochlea, COCHLEA_X, Cup, SoundWaves, Vibration, Wearer } from "@/components/art/BioEarFigure";

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

      <svg viewBox="20 60 380 340" fill="none" className="w-full max-w-md" role="img" aria-label={
        mode === "air"
          ? "Diagram showing sound travelling through the ear canal to the inner ear."
          : "Diagram showing the BioEar cups sending vibration through the skull directly to the inner ear."
      }>
        <BioEarDefs />
        {mode === "bone" && <BackBand />}
        <Wearer ears={mode === "air"} strokeOpacity={0.3} />
        <Cochlea x={COCHLEA_X.left} glow />
        <Cochlea x={COCHLEA_X.right} />

        {mode === "air" ? (
          <>
            <SoundWaves x={70} />
            {/* ear canal */}
            <path d="M98 222H140" stroke="#8fc0e8" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" className="bioear-vibe" />
            <path d="M96 214h44M96 230h44" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="1.2" strokeLinecap="round" />
            <text x="118" y="270" fontSize="10" fill="var(--ink)" fillOpacity="0.5" letterSpacing="0.08em" textAnchor="middle">EAR CANAL</text>
          </>
        ) : (
          <>
            <SoundWaves x={58} />
            <BandHint />
            <Vibration side="left" strength={1.3} />
            <Vibration side="right" strength={1.3} />
            <Cup side="left" mic />
            <Cup side="right" />
            <text x="210" y="392" fontSize="10" fill="var(--ink)" fillOpacity="0.5" letterSpacing="0.08em" textAnchor="middle">THROUGH THE SKULL</text>
          </>
        )}
      </svg>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-gray">
        {mode === "air"
          ? "Sound travels through the ear canal to the middle and inner ear — the conventional hearing pathway."
          : "BioEar's cups press an actuator against the bone behind each ear and send vibration through the skull, reaching the same inner ear without using the ear canal."}
      </p>
    </div>
  );
}
