// Shared drawing pieces for the BioEar wearer and headband, all in one 420x420
// coordinate space so every illustration on the site shows the same prototype.
// Front view: the band runs over the crown and a bone-conduction pod rests
// against the skull at each ear, with the electronics module on the band.

export const HEAD_PATH =
  "M210 80C268 80 304 124 304 186C304 250 290 298 258 326C244 338 228 344 210 344C192 344 176 338 162 326C130 298 116 250 116 186C116 124 152 80 210 80Z";
export const BAND_PATH = "M104 214C98 124 146 60 210 60C274 60 322 124 316 214";
export const COCHLEA_X = { left: 150, right: 270 } as const;
export const POD_X = { left: 90, right: 302 } as const;

export function BioEarDefs() {
  return (
    <defs>
      <linearGradient id="bf-band" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#b9b1ef" />
        <stop offset="0.5" stopColor="var(--lavender)" />
        <stop offset="1" stopColor="#b9b1ef" />
      </linearGradient>
      <linearGradient id="bf-pod" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fdeee7" />
        <stop offset="1" stopColor="#efc6b6" />
      </linearGradient>
      <linearGradient id="bf-module" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e3f0fa" />
        <stop offset="1" stopColor="#a9d0ee" />
      </linearGradient>
      <path id="bf-band-text" d="M150 78C172 66 190 62 210 62C230 62 248 66 270 78" />
    </defs>
  );
}

export function Wearer({ ears = false, strokeOpacity = 0.22 }: { ears?: boolean; strokeOpacity?: number }) {
  return (
    <g stroke="var(--ink)" strokeOpacity={strokeOpacity} strokeWidth="1.4" strokeLinecap="round">
      {ears && (
        <>
          <path d="M120 196C104 186 92 196 94 216C96 236 106 252 122 254" fill="var(--cream)" />
          <path d="M300 196C316 186 328 196 326 216C324 236 314 252 298 254" fill="var(--cream)" />
        </>
      )}
      <path d="M180 338C180 354 178 368 172 382M240 338C240 354 242 368 248 382" />
      <path d={HEAD_PATH} fill="var(--cream)" />
      <path d="M176 210c8-4 18-4 24 0M220 210c6-4 16-4 24 0" strokeOpacity={strokeOpacity * 1.4} />
      <path d="M204 252c4 3 8 3 12 0M196 286c8 5 20 5 28 0" strokeOpacity={strokeOpacity * 1.4} />
    </g>
  );
}

export function Cochlea({ x, y = 234, glow = false }: { x: number; y?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {glow && <circle r="15" fill="var(--mint)" opacity="0.45" className="bioear-vibe" />}
      <circle r="8" fill="var(--mint)" />
      <path
        d="M0 0c2.5 0 3 2.5 1.5 4-2.5 1.5-6 0-6-3.5 0-4 4-6.5 8-5 5 2.5 5.5 8 2.5 12"
        stroke="var(--ink)"
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeLinecap="round"
        transform={x > 210 ? "scale(-1 1)" : undefined}
      />
    </g>
  );
}

export function Headband() {
  return (
    <g>
      <path d={BAND_PATH} stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="15" strokeLinecap="round" />
      <path d={BAND_PATH} stroke="url(#bf-band)" strokeWidth="12" strokeLinecap="round" />
      <path d="M110 190C108 126 152 68 210 67" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      <text fontSize="7.5" letterSpacing="0.3em" fill="var(--ink)" fillOpacity="0.55" fontWeight="600">
        <textPath href="#bf-band-text" startOffset="50%" textAnchor="middle">BIOEAR</textPath>
      </text>
      <g transform="rotate(38 290 116)">
        <rect x="270" y="104" width="40" height="24" rx="12" fill="url(#bf-module)" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
        <circle cx="300" cy="116" r="2.4" fill="var(--mint)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="0.8" />
        <path d="M279 112v8M284 112v8M289 112v8" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </g>
  );
}

export function Pod({ x, side, mic = false, animate = true }: { x: number; side: "left" | "right"; mic?: boolean; animate?: boolean }) {
  return (
    <g className={animate ? "animate-breathing" : undefined} style={{ transformOrigin: `${x + 14}px 236px` }}>
      <rect x={x} y="204" width="28" height="60" rx="14" fill="url(#bf-pod)" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
      {/* contact pad that presses against the skull */}
      <rect x={side === "right" ? x - 3 : x + 25} y="216" width="6" height="36" rx="3" fill="var(--mint)" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1" />
      {mic && (
        <g fill="var(--ink)" opacity="0.5">
          <circle cx={x + 10} cy="218" r="1.4" />
          <circle cx={x + 14} cy="218" r="1.4" />
          <circle cx={x + 18} cy="218" r="1.4" />
        </g>
      )}
      <path d={`M${x + 9} 242h10M${x + 9} 248h10`} stroke="var(--ink)" strokeOpacity="0.22" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

// Vibration arcs leaving a pod's contact pad toward the centre of the head.
export function Vibration({ side, strength = 1 }: { side: "left" | "right"; strength?: number }) {
  const x = side === "left" ? 112 : 308;
  const dir = side === "left" ? 1 : -1;
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${x + dir * (12 + i * 9)} ${214 - i * 5}q${dir * 6} ${14 + i * 5} 0 ${28 + i * 10}`}
          stroke="var(--lavender)"
          strokeWidth={2.2 * strength}
          strokeLinecap="round"
          className="bioear-vibe"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
    </g>
  );
}

// Incoming sound waves arriving from the wearer's left.
export function SoundWaves({ x = 62 }: { x?: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${x - i * 14} ${196 - i * 12}a${30 + i * 14} ${30 + i * 14} 0 0 1 0 ${44 + i * 24}`}
          stroke="#8fc0e8"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="bioear-sound"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </g>
  );
}
