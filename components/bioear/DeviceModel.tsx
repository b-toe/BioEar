"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { BioEarDefs, Headband, Pod, POD_X } from "@/components/art/BioEarFigure";

// Positions are in the shared BioEarFigure coordinate space.
const HOTSPOTS = [
  { id: "microphone", x: 104, y: 218, label: "Microphone", description: "Captures environmental sound." },
  { id: "processor", x: 280, y: 104, label: "Processor", description: "Shapes and filters the digital signal." },
  { id: "battery", x: 302, y: 130, label: "Battery", description: "Powers the entire system." },
  { id: "amplifier", x: 316, y: 216, label: "Amplifier", description: "Boosts the signal before actuation." },
  { id: "actuator", x: 300, y: 252, label: "Actuator", description: "Converts signal into vibration." },
  { id: "headband", x: 158, y: 76, label: "Headband", description: "Holds the device in place against the skull." },
];

export function DeviceModel() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = HOTSPOTS.find((h) => h.id === activeId);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
      <div className="relative">
        <svg viewBox="60 36 300 270" fill="none" className="w-full" role="img" aria-label="Interactive diagram of the BioEar prototype with selectable components.">
          <BioEarDefs />
          <ellipse cx="210" cy="292" rx="120" ry="10" fill="var(--lavender)" opacity="0.35" />
          <Headband />
          <Pod x={POD_X.left} side="left" mic animate={false} />
          <Pod x={POD_X.right} side="right" animate={false} />
          {HOTSPOTS.map((h) => (
            <g key={h.id}>
              <circle
                cx={h.x}
                cy={h.y}
                r={activeId === h.id ? 8 : 6}
                fill={activeId === h.id ? "var(--ink)" : "#fff"}
                fillOpacity={activeId === h.id ? 0.75 : 0.9}
                stroke="var(--ink)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                className={activeId === h.id ? undefined : "bioear-vibe"}
                style={{ transition: "r 200ms ease" }}
              />
              <circle
                cx={h.x}
                cy={h.y}
                r="16"
                fill="transparent"
                className="cursor-pointer"
                onClick={() => setActiveId(h.id)}
                role="button"
                tabIndex={0}
                aria-label={h.label}
                onKeyDown={(e) => e.key === "Enter" && setActiveId(h.id)}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className={cn("rounded-[24px] border border-ink/8 bg-white/70 p-6 min-h-[140px]", !active && "flex items-center justify-center")}>
        {active ? (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-gray">Component</p>
            <h4 className="mt-1 text-xl font-semibold text-ink">{active.label}</h4>
            <p className="mt-2 text-sm leading-relaxed text-gray">{active.description}</p>
          </>
        ) : (
          <p className="text-sm text-gray">Select a highlighted point to learn what it does.</p>
        )}
      </div>
    </div>
  );
}
