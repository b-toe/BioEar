export function ResearchArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 200" fill="none" className={className} role="img" aria-label="Abstract illustration of lab equipment and a measurement graph.">
      <rect x="30" y="120" width="90" height="50" rx="10" fill="var(--blue)" opacity="0.3" stroke="var(--ink)" strokeOpacity="0.3" />
      <circle cx="75" cy="100" r="14" fill="var(--lavender)" opacity="0.5" />
      <polyline points="150,160 175,120 200,140 225,90 250,110 280,70" stroke="var(--mint)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="150" y1="170" x2="290" y2="170" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1.2" />
      <line x1="150" y1="170" x2="150" y2="60" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1.2" />
    </svg>
  );
}
