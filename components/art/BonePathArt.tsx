import { BackBand, BandHint, BioEarDefs, Cochlea, COCHLEA_X, Cup, Vibration, Wearer } from "./BioEarFigure";

export function BonePathArt({ active = true, className }: { active?: boolean; className?: string }) {
  return (
    <svg viewBox="40 60 340 340" fill="none" className={className} role="img" aria-label="Diagram of the BioEar cups sending vibration through the skull to the inner ear.">
      <BioEarDefs />
      <BackBand />
      <Wearer strokeOpacity={0.3} />
      <BandHint />
      <Cochlea x={COCHLEA_X.left} glow={active} />
      <Cochlea x={COCHLEA_X.right} glow={active} />
      {active && (
        <>
          <Vibration side="left" strength={1.3} />
          <Vibration side="right" strength={1.3} />
        </>
      )}
      <Cup side="left" mic animate={active} />
      <Cup side="right" animate={active} />
    </svg>
  );
}
