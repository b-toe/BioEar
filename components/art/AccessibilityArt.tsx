// Two people talking; the listener on the right wears BioEar.
export function AccessibilityArt({ className }: { className?: string }) {
  const bust = (x: number, fill: string) => (
    <g stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round">
      <path d={`M${x - 54} 210c0-34 22-54 54-54s54 20 54 54`} fill={fill} fillOpacity="0.55" />
      <path d={`M${x - 10} 140v18M${x + 10} 140v18`} />
      <path d={`M${x} 64c26 0 40 18 40 42 0 26-16 44-40 44s-40-18-40-44c0-24 14-42 40-42Z`} fill="var(--cream)" />
    </g>
  );

  return (
    <svg viewBox="0 0 360 220" fill="none" className={className} role="img" aria-label="Two people in conversation. The listener wears BioEar, which turns the speaker's voice into vibration.">
      <circle cx="180" cy="120" r="100" fill="var(--lavender)" opacity="0.18" />

      {bust(84, "var(--mint)")}
      {bust(276, "var(--blue)")}

      {/* faces */}
      <g stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round">
        <path d="M72 100h6M90 100h6M77 124c4 3 10 3 14 0" />
        <path d="M256 100h6M276 100h6M262 124c4 2 10 2 14 0" />
      </g>

      {/* BioEar on the listener: band behind the head, cups behind the ears */}
      <path d="M234 112c0-18 18-26 42-26s42 8 42 26" stroke="#e99a72" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
      {[226, 326].map((x) => (
        <g key={x}>
          <rect x={x - 8} y="100" width="16" height="26" rx="4" fill="#f2b593" stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="1.2" />
          <ellipse cx={x < 276 ? x - 8 : x + 8} cy="113" rx="4" ry="13" fill="#f8c9ad" stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="1.2" />
        </g>
      ))}
      <path d="M244 106q3 7 0 14M249 103q4 10 0 20" stroke="var(--lavender)" strokeWidth="2" strokeLinecap="round" className="bioear-vibe" />

      {/* speech travelling to the listener */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${140 + i * 16} ${100 - i * 6}a${18 + i * 6} ${18 + i * 6} 0 0 1 0 ${36 + i * 12}`}
          stroke="#8fc0e8"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="bioear-sound"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  );
}
