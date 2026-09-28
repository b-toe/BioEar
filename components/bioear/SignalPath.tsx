"use client";

import { useState } from "react";
import { signalPath } from "@/content/bioear-copy";
import { cn } from "@/lib/utils/cn";

export function SignalPath() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = signalPath[activeIndex];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div className="relative">
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-ink/10" aria-hidden="true" />
        <ol className="flex flex-col gap-1">
          {signalPath.map((step, i) => (
            <li key={step.id}>
              <button
                onClick={() => setActiveIndex(i)}
                aria-current={i === activeIndex}
                className="group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-ink/5"
              >
                <span
                  className={cn(
                    "relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full border text-xs font-medium transition-all duration-300",
                    i === activeIndex
                      ? "border-transparent bg-gradient-to-br from-lavender to-blue text-ink shadow-sm"
                      : "border-ink/15 bg-cream text-gray group-hover:border-ink/30"
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("text-sm font-medium", i === activeIndex ? "text-ink" : "text-gray")}>
                  {step.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-[28px] border border-ink/8 bg-white/70 p-8 min-h-[220px] flex flex-col justify-center">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray">Step {activeIndex + 1}</p>
        <h3 className="mt-2 text-2xl font-semibold text-ink">{active.label}</h3>
        <p className="mt-3 text-base leading-relaxed text-gray">{active.description}</p>
        <div className="mt-6 flex gap-1.5" aria-hidden="true">
          {signalPath.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                i <= activeIndex ? "bg-lavender" : "bg-ink/8"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
