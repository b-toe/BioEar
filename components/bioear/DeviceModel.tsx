"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { BioEarDefs, DeviceProduct } from "@/components/art/BioEarFigure";

// Positions are in the shared BioEarFigure coordinate space.
const HOTSPOTS = [
  { id: "microphone", x: 60, y: 224, label: "Microphone", description: "Sits in the cup lid to capture environmental sound." },
  { id: "processor", x: 362, y: 226, label: "Processor", description: "Lives inside the cup and shapes and filters the digital signal." },
  { id: "battery", x: 363, y: 242, label: "Battery", description: "A small cell inside the cup that powers the entire system." },
  { id: "amplifier", x: 340, y: 210, label: "Amplifier", description: "Boosts the signal before actuation." },
  { id: "actuator", x: 100, y: 232, label: "Actuator", description: "Faces the skull from the inner side of the cup and converts the signal into vibration." },
  { id: "headband", x: 120, y: 120, label: "Elastic band", description: "Wraps around the back of the head and holds both cups firmly against the bone behind the ears." },
];

export function DeviceModel() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = HOTSPOTS.find((h) => h.id === activeId);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
      <div className="relative">
        <svg viewBox="20 60 400 250" fill="none" className="w-full" role="img" aria-label="Interactive diagram of the BioEar prototype with selectable components.">
          <BioEarDefs />
          <DeviceProduct head={false} />
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
