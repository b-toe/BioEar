"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const HOTSPOTS = [
  { id: "microphone", x: 96, y: 70, label: "Microphone", description: "Captures environmental sound." },
  { id: "processor", x: 150, y: 46, label: "Processor", description: "Shapes and filters the digital signal." },
  { id: "battery", x: 150, y: 96, label: "Battery", description: "Powers the entire system." },
  { id: "amplifier", x: 190, y: 70, label: "Amplifier", description: "Boosts the signal before actuation." },
  { id: "actuator", x: 226, y: 96, label: "Actuator", description: "Converts signal into vibration." },
  { id: "headband", x: 130, y: 20, label: "Headband", description: "Holds the device in place against the skull." },
];

export function DeviceModel() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = HOTSPOTS.find((h) => h.id === activeId);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
      <div className="relative">
        <svg viewBox="0 0 300 160" className="w-full" role="img" aria-label="Interactive diagram of the BioEar prototype with selectable components.">
          <path d="M70 100c0-38 36-70 80-70s80 32 80 70-36 50-80 50-80-12-80-50Z" fill="var(--cream)" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1.5" />
          <path d="M90 30c20-14 100-14 120 0" stroke="var(--lavender)" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7" />
          {HOTSPOTS.map((h) => (
            <g key={h.id}>
              <circle
                cx={h.x}
                cy={h.y}
                r={activeId === h.id ? 10 : 7}
                fill={activeId === h.id ? "var(--lavender)" : "var(--peach)"}
                stroke="var(--ink)"
                strokeOpacity="0.35"
                strokeWidth="1"
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
