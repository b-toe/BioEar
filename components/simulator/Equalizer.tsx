"use client";

const BANDS = [125, 250, 500, 1000, 2000, 4000, 8000];

export function Equalizer({
  values,
  onChange,
}: {
  values: number[];
  onChange: (index: number, value: number) => void;
}) {
  return (
    <div className="flex items-end justify-between gap-3 rounded-[24px] border border-ink/8 bg-white/70 p-6">
      {BANDS.map((band, i) => (
        <div key={band} className="flex flex-col items-center gap-2">
          <div className="relative flex h-32 items-end">
            <input
              type="range"
              min={0}
              max={100}
              value={values[i] ?? 50}
              onChange={(e) => onChange(i, Number(e.target.value))}
              aria-label={`${band} Hz band level, currently ${values[i] ?? 50} percent`}
              className="h-32 w-6 accent-[var(--lavender)]"
              style={{ writingMode: "vertical-lr", direction: "rtl" }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-wide text-gray">
            {band >= 1000 ? `${band / 1000}k` : band}
          </span>
        </div>
      ))}
    </div>
  );
}
