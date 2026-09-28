export function SimulatorExplanation() {
  return (
    <div className="rounded-[24px] border border-ink/8 bg-white/60 p-6 text-sm leading-relaxed text-gray">
      <p>
        This lab runs real audio processing in your browser using the Web Audio API — nothing is uploaded.
        Adjust the sliders or choose a preset to hear how filtering, speech emphasis, and noise reduction change
        the signal before it would reach a bone-conduction actuator.
      </p>
      <p className="mt-3 text-xs uppercase tracking-wide text-gray/80">
        Demo only — not a clinical hearing profile.
      </p>
    </div>
  );
}
