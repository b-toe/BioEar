export function ProgressRing({ value, size = 96, label }: { value: number; size?: number; label?: string }) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--ink)" strokeOpacity={0.08} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--lavender)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-semibold text-ink">{Math.round(value)}%</span>
        {label && <span className="text-[10px] uppercase tracking-wide text-gray">{label}</span>}
      </div>
    </div>
  );
}
