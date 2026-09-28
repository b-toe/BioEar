export function EarWaveArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 420" fill="none" className={className} role="img" aria-label="Illustration of sound waves traveling toward a simplified head profile, with a BioEar device at the ear.">
      <circle cx="210" cy="210" r="190" fill="var(--lavender)" opacity="0.12" />

      {/* head silhouette */}
      <path
        d="M180 120c48 0 82 36 86 82 14 4 22 18 18 34-4 14-18 22-32 20-8 30-34 54-68 58v30h-30v-32c-40-8-68-42-68-84 0-56 44-108 94-108Z"
        fill="var(--cream)"
        stroke="var(--ink)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />

      {/* ear + device */}
      <g className="animate-breathing" style={{ transformOrigin: "268px 210px" }}>
        <path d="M258 190c10-6 22-2 24 10 2 10-4 18-14 20" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <rect x="264" y="176" width="14" height="52" rx="7" fill="var(--peach)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.2" />
      </g>

      {/* sound waves */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${60 - i * 18} 210 q 20 -${28 + i * 6} 40 0 q 20 ${28 + i * 6} 40 0`}
          stroke="var(--blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity={0.9 - i * 0.2}
        />
      ))}

      <circle cx="182" cy="188" r="2.6" fill="var(--ink)" opacity="0.7" />
      <circle cx="196" cy="188" r="2.6" fill="var(--ink)" opacity="0.7" />
    </svg>
  );
}
