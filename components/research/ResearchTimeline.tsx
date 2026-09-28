"use client";

import { useState } from "react";
import { milestones } from "@/lib/data/milestones";
import { Modal } from "@/components/ui/Modal";

export function ResearchTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? milestones[openIndex] : null;

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-4 lg:grid-cols-7 sm:overflow-visible">
        {milestones.map((m, i) => (
          <button
            key={m.month}
            onClick={() => setOpenIndex(i)}
            className="flex min-w-[140px] flex-col items-start gap-2 rounded-2xl border border-ink/10 bg-white/70 p-4 text-left transition-colors hover:border-ink/25 sm:min-w-0"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-gray">{m.month}</span>
            <span className="text-sm font-semibold text-ink">{m.title}</span>
          </button>
        ))}
      </div>

      <Modal open={!!open} onClose={() => setOpenIndex(null)} title={open ? `${open.month} — ${open.title}` : ""}>
        {open?.description}
      </Modal>
    </>
  );
}
