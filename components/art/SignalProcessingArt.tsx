export function SignalProcessingArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 160" fill="none" className={className} role="img" aria-label="A rough waveform entering a processor and emerging as a cleaner waveform.">
      <path d="M20 80 L40 40 L55 120 L70 20 L85 130 L100 60 L115 90 L130 80" stroke="var(--gray)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <rect x="160" y="45" width="80" height="70" rx="16" fill="var(--lavender)" opacity="0.25" stroke="var(--ink)" strokeOpacity="0.3" />
      <text x="200" y="85" textAnchor="middle" fontSize="10" fill="var(--ink)" opacity="0.6">DSP</text>
      <path d="M270 80 Q 290 55 310 80 T 350 80" stroke="var(--blue)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M130 80 H160" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M240 80 H270" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  );
}
