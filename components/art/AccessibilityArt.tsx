export function AccessibilityArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" fill="none" className={className} role="img" aria-label="Two abstract figures communicating.">
      <circle cx="90" cy="70" r="24" fill="var(--peach)" opacity="0.5" />
      <path d="M60 150c0-30 22-46 30-46s30 16 30 46" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
      <circle cx="210" cy="70" r="24" fill="var(--mint)" opacity="0.6" />
      <path d="M180 150c0-30 22-46 30-46s30 16 30 46" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
      <path d="M118 90 Q150 60 182 90" stroke="var(--blue)" strokeWidth="2" strokeDasharray="4 6" fill="none" />
    </svg>
  );
}
