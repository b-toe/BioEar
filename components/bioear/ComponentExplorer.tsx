"use client";

import { useState } from "react";
import { Mic, Cpu, Zap, Radio, BatteryMedium, Square, LucideIcon } from "lucide-react";
import { componentData } from "@/content/technology-copy";
import { cn } from "@/lib/utils/cn";

const icons: Record<string, LucideIcon> = { Mic, Cpu, Zap, Radio, BatteryMedium, Square };

export function ComponentExplorer() {
  const [activeId, setActiveId] = useState(componentData[0].id);
  const active = componentData.find((c) => c.id === activeId)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
        {componentData.map((c) => {
          const Icon = icons[c.icon];
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-200",
                isActive ? "border-transparent bg-gradient-to-br from-lavender/40 to-blue/40" : "border-ink/10 hover:border-ink/25"
              )}
            >
              <Icon size={20} className="text-ink" />
              <span className="text-xs font-medium text-ink">{c.name}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-[28px] border border-ink/8 bg-white/70 p-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray">{active.category}</p>
        <h3 className="mt-2 text-2xl font-semibold text-ink">{active.name}</h3>
        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray">Purpose</p>
            <p className="mt-1 text-base text-ink/90">{active.description}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray">Output</p>
            <p className="mt-1 text-base text-ink/90">{active.output}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
