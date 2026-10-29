import { BioEarDefs, Cochlea, COCHLEA_X, Headband, Pod, POD_X, Vibration, Wearer } from "./BioEarFigure";

export function BonePathArt({ active = true, className }: { active?: boolean; className?: string }) {
  return (
    <svg viewBox="40 40 340 360" fill="none" className={className} role="img" aria-label="Diagram of the BioEar pods sending vibration through the skull to the inner ear.">
      <BioEarDefs />
      <Wearer strokeOpacity={0.3} />
      <Cochlea x={COCHLEA_X.left} glow={active} />
      <Cochlea x={COCHLEA_X.right} glow={active} />
      {active && (
        <>
          <Vibration side="left" strength={1.3} />
          <Vibration side="right" strength={1.3} />
        </>
      )}
      <Headband />
      <Pod x={POD_X.left} side="left" mic animate={active} />
      <Pod x={POD_X.right} side="right" animate={active} />
    </svg>
  );
}
