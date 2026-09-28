"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data/faqs";
import { cn } from "@/lib/utils/cn";

export function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/8 border-y border-ink/8">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-medium text-ink">{item.q}</span>
              <ChevronDown size={18} className={cn("flex-none text-gray transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            {isOpen && <p className="pb-5 text-sm leading-relaxed text-gray">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
