"use client";

import { PRESETS, PRESET_LABELS } from "@/lib/audio/presets";
import { cn } from "@/lib/utils/cn";

export function ProcessingModes({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (key: keyof typeof PRESETS) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          aria-pressed={active === key}
          className={cn(
            "rounded-2xl border p-4 text-left transition-all duration-200",
            active === key ? "border-transparent bg-gradient-to-br from-lavender/40 to-blue/40" : "border-ink/10 hover:border-ink/25"
          )}
        >
          <p className="text-sm font-semibold text-ink">{PRESET_LABELS[key].name}</p>
          <p className="mt-1 text-xs leading-relaxed text-gray">{PRESET_LABELS[key].description}</p>
        </button>
      ))}
    </div>
  );
}
