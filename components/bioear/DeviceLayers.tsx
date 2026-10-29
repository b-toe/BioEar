"use client";

import { useState, type ReactNode } from "react";

const LAYERS = [
  { id: "housing", short: "Housing", label: "Housing", description: "A lightweight shell that holds every component against the skull in a stable position." },
  { id: "microphone", short: "Microphone", label: "Microphone", description: "Sits near the temple to capture environmental sound with minimal obstruction." },
  { id: "electronics", short: "Electronics", label: "Processing electronics", description: "A small board that digitizes and filters the incoming signal." },
  { id: "battery", short: "Battery", label: "Battery", description: "A compact rechargeable cell sized for all-day wear." },
  { id: "amplifier", short: "Amplifier", label: "Amplifier", description: "Boosts the processed signal to a level the actuator can use." },
  { id: "actuator", short: "Actuator", label: "Bone-conduction actuator", description: "Converts the amplified signal into vibration at the skull contact point." },
];

const RX = 92;
const RY = 24;
const DEPTH = 12;

const LAYER_LOOK: Record<string, { fill: string; detail: ReactNode }> = {
  housing: { fill: "#fdeee7", detail: <path d="M-60 -8c30-10 90-10 120 0" strokeOpacity="0.2" /> },
  microphone: {
    fill: "var(--blue)",
    detail: (
      <>
        <circle cx="-40" cy="0" r="7" fill="#fff" />
        <circle cx="-40" cy="0" r="2" fill="var(--ink)" />
      </>
    ),
  },
  electronics: {
    fill: "var(--mint)",
    detail: (
      <>
        <rect x="-18" y="-9" width="36" height="18" rx="3" fill="#fff" />
        <path d="M-12 -14v-3M-4 -14v-3M4 -14v-3M12 -14v-3M-12 14v3M-4 14v3M4 14v3M12 14v3M-50 4h20M30 -4h22" />
      </>
    ),
  },
  battery: {
    fill: "var(--lavender)",
    detail: (
      <>
        <rect x="-30" y="-9" width="56" height="18" rx="5" fill="#fff" />
        <path d="M30 -3v6M-12 0h8M-8 -4v8" />
      </>
    ),
  },
  amplifier: { fill: "var(--blue)", detail: <path d="M-12 -10L12 0L-12 10Z" fill="#fff" /> },
  actuator: {
    fill: "var(--peach)",
    detail: (
      <>
        <ellipse cx="0" cy="0" rx="30" ry="9" fill="var(--mint)" />
        <ellipse cx="0" cy="0" rx="16" ry="5" />
      </>
    ),
  },
};

export function DeviceLayers() {
  const [activeId, setActiveId] = useState(LAYERS[0].id);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      {/* Exploded view of one BioEar pod, from the outer shell down to the pad that touches the skull. */}
      <svg viewBox="0 0 380 370" fill="none" className="w-full" role="group" aria-label="Exploded view of the BioEar pod. Select a layer.">
        {LAYERS.map((layer, i) => ({ layer, i })).reverse().map(({ layer, i }) => {
          const isActive = layer.id === activeId;
          const cx = 150 + (isActive ? 22 : 0);
          const cy = 40 + i * 52;
          const look = LAYER_LOOK[layer.id];
          return (
            <g
              key={layer.id}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={layer.label}
              onClick={() => setActiveId(layer.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveId(layer.id)}
              className="cursor-pointer outline-none"
              style={{ transition: "transform 400ms ease" }}
            >
              <path
                d={`M${cx - RX} ${cy}v${DEPTH}a${RX} ${RY} 0 0 0 ${RX * 2} 0v-${DEPTH}Z`}
                fill={look.fill}
                stroke="var(--ink)"
                strokeOpacity={isActive ? 0.6 : 0.3}
                strokeWidth="1.2"
                style={{ filter: "brightness(0.93)", transition: "all 400ms ease" }}
              />
              <ellipse cx={cx} cy={cy} rx={RX} ry={RY} fill={look.fill} stroke="var(--ink)" strokeOpacity={isActive ? 0.6 : 0.3} strokeWidth="1.2" style={{ transition: "all 400ms ease" }} />
              <g transform={`translate(${cx} ${cy})`} stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round">
                {look.detail}
              </g>
              <path d={`M${cx + RX + 6} ${cy + 4}H${276}`} stroke="var(--ink)" strokeOpacity={isActive ? 0.45 : 0.15} strokeDasharray="2 4" />
              <text x="282" y={cy + 8} fontSize="12" fill="var(--ink)" fillOpacity={isActive ? 0.9 : 0.5} fontWeight={isActive ? 600 : 400}>
                {layer.short}
              </text>
            </g>
          );
        })}
        <path d="M40 346c60 10 160 10 220 0" stroke="var(--ink)" strokeOpacity="0.25" strokeWidth="1.4" strokeDasharray="3 5" />
        <text x="150" y="364" fontSize="10" letterSpacing="0.08em" textAnchor="middle" fill="var(--ink)" fillOpacity="0.45">SKULL CONTACT</text>
      </svg>

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
