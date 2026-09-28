export function BonePathArt({ active = true, className }: { active?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className} role="img" aria-label="Diagram of vibration traveling through the skull to the inner ear.">
      <path
        d="M120 90c40-24 100-24 140 4 26 18 40 46 38 78-2 34-24 62-56 74-6 22-26 38-50 38-30 0-54-24-56-54-30-6-52-32-52-64 0-30 16-56 36-76Z"
        fill="var(--cream)"
        stroke="var(--ink)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <circle cx="270" cy="150" r="10" fill="var(--mint)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.2" />
      <path
        d="M270 150c-40 0-80 6-110 26"
        stroke={active ? "var(--lavender)" : "var(--ink)"}
        strokeOpacity={active ? 1 : 0.25}
        strokeWidth={active ? 4 : 1.5}
        strokeLinecap="round"
        style={active ? { filter: "drop-shadow(0 0 6px var(--lavender))" } : undefined}
      />
      <circle cx="158" cy="178" r="7" fill="var(--peach)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
}
