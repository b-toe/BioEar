"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const LAYERS = [
  { id: "housing", label: "Housing", description: "A lightweight shell that holds every component against the skull in a stable position.", offset: 0 },
  { id: "microphone", label: "Microphone", description: "Sits near the temple to capture environmental sound with minimal obstruction.", offset: 20 },
  { id: "electronics", label: "Processing electronics", description: "A small board that digitizes and filters the incoming signal.", offset: 40 },
  { id: "battery", label: "Battery", description: "A compact rechargeable cell sized for all-day wear.", offset: 60 },
  { id: "amplifier", label: "Amplifier", description: "Boosts the processed signal to a level the actuator can use.", offset: 80 },
  { id: "actuator", label: "Bone-conduction actuator", description: "Converts the amplified signal into vibration at the skull contact point.", offset: 100 },
];

export function DeviceLayers() {
  const [activeId, setActiveId] = useState(LAYERS[0].id);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="relative h-72">
        {LAYERS.map((layer) => {
          const isActive = layer.id === activeId;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveId(layer.id)}
              aria-pressed={isActive}
              className={cn(
                "absolute left-1/2 flex h-16 w-40 -translate-x-1/2 items-center justify-center rounded-2xl border text-xs font-medium transition-all duration-500",
                isActive ? "border-transparent bg-gradient-to-br from-lavender to-blue text-ink shadow-md z-10" : "border-ink/10 bg-white/70 text-gray"
              )}
              style={{ top: `${layer.offset * 1.6}px`, transform: `translate(-50%, 0) scale(${isActive ? 1.05 : 1})` }}
            >
              {layer.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-[28px] border border-ink/8 bg-white/70 p-8">
        {LAYERS.filter((l) => l.id === activeId).map((l) => (
          <div key={l.id}>
            <p className="text-xs font-medium uppercase tracking-wide text-gray">Layer</p>
            <h3 className="mt-2 text-2xl font-semibold text-ink">{l.label}</h3>
            <p className="mt-3 text-base leading-relaxed text-gray">{l.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
