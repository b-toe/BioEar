import { BioEarDefs, DeviceProduct } from "./BioEarFigure";

// Hero illustration of the BioEar prototype, drawn from the team's 3D model:
// an elastic C-band around the back of the head with a cup behind each ear.
// The wearer's head is a faint dashed outline so the device stays the focus.
export function EarWaveArt({ className }: { className?: string }) {
  return (
    <svg viewBox="-36 20 466 330" fill="none" className={className} role="img" aria-label="The BioEar prototype: an open elastic band that wraps around the back of the head, with a round cup behind each ear that holds the electronics and presses vibration into the skull. One cup's lid is shown removed.">
      <BioEarDefs />
      <defs>
        <radialGradient id="ew-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--lavender)" stopOpacity="0.3" />
          <stop offset="1" stopColor="var(--blue)" stopOpacity="0.04" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="190" rx="215" ry="160" fill="url(#ew-halo)" />

      <DeviceProduct />

      {/* vibration from each cup into the skull */}
      {[
        { x: 112, dir: 1 },
        { x: 308, dir: -1 },
      ].map(({ x, dir }) =>
        [0, 1, 2].map((i) => (
          <path
            key={`${x}-${i}`}
            d={`M${x + dir * i * 10} ${216 - i * 4}q${dir * 7} ${16 + i * 4} 0 ${32 + i * 8}`}
            stroke="var(--lavender)"
            strokeWidth="2.6"
            strokeLinecap="round"
            className="bioear-vibe"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))
      )}

      {/* sound arriving at the microphone */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${4 - i * 12} ${212 - i * 10}a${22 + i * 10} ${22 + i * 10} 0 0 1 0 ${40 + i * 20}`}
          stroke="#8fc0e8"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="bioear-sound"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      <g fontSize="9.5" fill="var(--ink)" fillOpacity="0.6" letterSpacing="0.08em" fontWeight="500">
        <g fill="none" stroke="var(--ink)" strokeOpacity="0.25">
          <path d="M290 84L322 46H372" />
          <path d="M80 264L96 312H140" />
          <path d="M400 262V300" />
        </g>
        <text x="322" y="40">ELASTIC BAND</text>
        <text x="96" y="326">DEVICE CUP + MIC</text>
        <text x="400" y="316" textAnchor="middle">LID</text>
        <text x="210" y="342" textAnchor="middle" fillOpacity="0.45">VIBRATION → INNER EAR</text>
      </g>
    </svg>
  );
}
