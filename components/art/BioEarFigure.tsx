// Shared drawing pieces for the BioEar prototype so every illustration on the
// site shows the same device: an open C-shaped elastic band that wraps around
// the back of the head, ending in a hook and a round cup behind each ear. The
// cup holds the electronics and presses the actuator against the skull; a round
// lid closes it.

// ---------- Front view (worn), 420x420 space ----------

export const HEAD_PATH =
  "M210 80C268 80 304 124 304 186C304 250 290 298 258 326C244 338 228 344 210 344C192 344 176 338 162 326C130 298 116 250 116 186C116 124 152 80 210 80Z";
export const COCHLEA_X = { left: 150, right: 270 } as const;
// Outer (lid) edge of each cup.
export const CUP_X = { left: 84, right: 336 } as const;
const BACK_BAND = "M100 208C96 166 146 146 210 146C274 146 324 166 320 208";

export function BioEarDefs() {
  return (
    <defs>
      <linearGradient id="bf-band" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f8cdb4" />
        <stop offset="1" stopColor="#eea47e" />
      </linearGradient>
      <linearGradient id="bf-band-h" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#e99a72" />
        <stop offset="0.5" stopColor="#f8cdb4" />
        <stop offset="1" stopColor="#e99a72" />
      </linearGradient>
      <linearGradient id="bf-cup" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fbd9c6" />
        <stop offset="1" stopColor="#eda27c" />
      </linearGradient>
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

// The part of the band that runs behind the head. Draw it before <Wearer> so
// the head hides it, then draw <BandHint> on top to show where it goes.
export function BackBand() {
  return (
    <g>
      <path d={BACK_BAND} stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="13" strokeLinecap="round" />
      <path d={BACK_BAND} stroke="url(#bf-band-h)" strokeWidth="10" strokeLinecap="round" />
    </g>
  );
}

export function BandHint() {
  return <path d="M118 176C140 154 176 146 210 146C244 146 280 154 302 176" stroke="#e99a72" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />;
}

// A cup seen side-on from the front: a short cylinder whose inner face (with
// the mint actuator pad) presses against the skull and whose outer face is
// the lid. `mic` marks the microphone port on the lid.
export function Cup({ side, mic = false, animate = true }: { side: "left" | "right"; mic?: boolean; animate?: boolean }) {
  const outer = CUP_X[side];
  const dir = side === "left" ? 1 : -1;
  const inner = outer + dir * 30;
  const x0 = Math.min(outer, inner);
  return (
    <g className={animate ? "animate-breathing" : undefined} style={{ transformOrigin: `${outer + dir * 15}px 232px` }}>
      {/* hook up to the band */}
      <path d={`M${outer + dir * 14} 210C${outer + dir * 10} 190 ${outer + dir * 18} 184 ${outer + dir * 18} 200`} stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="9" strokeLinecap="round" />
      <path d={`M${outer + dir * 14} 210C${outer + dir * 10} 190 ${outer + dir * 18} 184 ${outer + dir * 18} 200`} stroke="#f2b593" strokeWidth="6" strokeLinecap="round" />
      <rect x={x0} y="208" width="30" height="48" rx="5" fill="url(#bf-cup)" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
      <rect x={inner - (dir > 0 ? 3 : 3)} y="216" width="6" height="32" rx="3" fill="var(--mint)" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1" />
      {/* lid */}
      <ellipse cx={outer} cy="232" rx="7" ry="24" fill="#f8c9ad" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
      {mic && (
        <g fill="var(--ink)" opacity="0.55">
          <circle cx={outer} cy="226" r="1.4" />
          <circle cx={outer} cy="232" r="1.4" />
          <circle cx={outer} cy="238" r="1.4" />
        </g>
      )}
    </g>
  );
}

// Vibration arcs leaving a cup's pad toward the centre of the head.
export function Vibration({ side, strength = 1 }: { side: "left" | "right"; strength?: number }) {
  const x = side === "left" ? 120 : 300;
  const dir = side === "left" ? 1 : -1;
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${x + dir * (8 + i * 9)} ${214 - i * 5}q${dir * 6} ${14 + i * 5} 0 ${28 + i * 10}`}
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
export function SoundWaves({ x = 56, y = 196 }: { x?: number; y?: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${x - i * 14} ${y - i * 12}a${30 + i * 14} ${30 + i * 14} 0 0 1 0 ${44 + i * 24}`}
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

// ---------- Product view (three-quarter, from above), 420x320 space ----------
// Matches the team's 3D model: the open side of the C faces the viewer.

const RING = { cx: 210, cy: 150, rx: 168, ry: 72, h: 24 };
// Band ends at 160 and 20 degrees around the ellipse.
const END_L = { x: 52, y: 175 };
const END_R = { x: 368, y: 175 };

function ProductCup({ x, flip, open = false }: { x: number; flip: boolean; open?: boolean }) {
  // Cylinder whose axis points into the ring; drawn for the left side and mirrored for the right.
  const t = flip ? `translate(${x * 2} 0) scale(-1 1)` : undefined;
  return (
    <g transform={t}>
      <path d={`M${x - 6} ${END_L.y + 6}C${x - 14} ${END_L.y - 26} ${x + 26} ${END_L.y - 30} ${x + 22} ${END_L.y + 30}`} stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="12" strokeLinecap="round" />
      <path d={`M${x - 6} ${END_L.y + 6}C${x - 14} ${END_L.y - 26} ${x + 26} ${END_L.y - 30} ${x + 22} ${END_L.y + 30}`} stroke="#f2b593" strokeWidth="9" strokeLinecap="round" />
      <path d={`M${x} 202h40a12 30 0 0 1 0 60h-40Z`} fill="url(#bf-cup)" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
      <ellipse cx={x + 40} cy="232" rx="12" ry="30" fill="var(--mint)" opacity="0.6" />
      {open ? (
        <>
          <ellipse cx={x} cy="232" rx="12" ry="30" fill="#e7956c" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
          <ellipse cx={x + 1} cy="232" rx="8" ry="24" fill="#c97d5a" />
          <rect x={x - 2} y="220" width="6" height="12" rx="1.5" fill="var(--mint)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="0.8" />
          <rect x={x - 1} y="236" width="5" height="10" rx="1.5" fill="var(--lavender)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="0.8" />
        </>
      ) : (
        <>
          <ellipse cx={x} cy="232" rx="12" ry="30" fill="#f8c9ad" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
          <g fill="var(--ink)" opacity="0.5">
            <circle cx={x} cy="224" r="1.5" />
            <circle cx={x} cy="232" r="1.5" />
            <circle cx={x} cy="240" r="1.5" />
          </g>
        </>
      )}
    </g>
  );
}

export function DeviceProduct({ head = true, lidOff = true }: { head?: boolean; lidOff?: boolean }) {
  const { cx, cy, rx, ry, h } = RING;
  return (
    <g>
      <ellipse cx="210" cy="292" rx="150" ry="12" fill="var(--lavender)" opacity="0.3" />
      {head && (
        <g stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1.4" strokeDasharray="3 5" fill="var(--cream)" fillOpacity="0.7">
          <ellipse cx="210" cy="196" rx="112" ry="62" />
          <path d="M200 257q10 18 20 0" strokeDasharray="none" />
        </g>
      )}
      {/* elastic band, open side toward the viewer */}
      <path
        d={`M${END_L.x} ${END_L.y}A${rx} ${ry} 0 1 1 ${END_R.x} ${END_R.y}v${h}A${rx} ${ry} 0 1 0 ${END_L.x} ${END_L.y + h}Z`}
        fill="url(#bf-band)"
        stroke="var(--ink)"
        strokeOpacity="0.5"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d={`M${END_L.x + 6} ${END_L.y - 3}A${rx - 4} ${ry - 4} 0 1 1 ${END_R.x - 6} ${END_R.y - 3}`} stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      <text fontSize="8" letterSpacing="0.35em" fill="var(--ink)" fillOpacity="0.5" fontWeight="600" x={cx} y={cy - ry + 17} textAnchor="middle">
        BIOEAR
      </text>
      <ProductCup x={60} flip={false} />
      <ProductCup x={360} flip open={lidOff} />
      {lidOff && (
        <g>
          <path d="M372 232H392" stroke="var(--ink)" strokeOpacity="0.3" strokeDasharray="2 4" />
          <ellipse cx="400" cy="232" rx="9" ry="28" fill="#f8c9ad" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
        </g>
      )}
    </g>
  );
}
