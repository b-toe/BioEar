import { BioEarDefs, Cochlea, COCHLEA_X, Headband, Pod, POD_X, SoundWaves, Vibration, Wearer } from "./BioEarFigure";

// Hero illustration of the BioEar prototype as worn. The wearer is a faint
// outline so the device stays the focus.
export function EarWaveArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 420" fill="none" className={className} role="img" aria-label="The BioEar headband prototype as worn: a band over the head with a bone-conduction pod at each ear, a microphone picking up sound, and vibration travelling into the skull.">
      <BioEarDefs />
      <defs>
        <radialGradient id="ew-halo" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="var(--lavender)" stopOpacity="0.34" />
          <stop offset="1" stopColor="var(--blue)" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      <circle cx="210" cy="210" r="198" fill="url(#ew-halo)" />

      <Wearer />
      <Cochlea x={COCHLEA_X.left} />
      <Cochlea x={COCHLEA_X.right} />
      <Vibration side="left" />
      <Vibration side="right" />
      <Headband />
      <Pod x={POD_X.left} side="left" mic />
      <Pod x={POD_X.right} side="right" />
      <SoundWaves />

      <g fontSize="9.5" fill="var(--ink)" fillOpacity="0.6" letterSpacing="0.08em" fontWeight="500">
        <g fill="none" stroke="var(--ink)" strokeOpacity="0.25">
          <path d="M100 216L64 150H30" />
          <path d="M306 104L330 74H372" />
          <path d="M330 256L352 300H392" />
        </g>
        <text x="30" y="144">MIC</text>
        <text x="330" y="68">DSP + BATTERY</text>
        <text x="352" y="316">ACTUATOR</text>
        <text x="210" y="404" textAnchor="middle" fillOpacity="0.45">VIBRATION → INNER EAR</text>
      </g>
    </svg>
  );
}
