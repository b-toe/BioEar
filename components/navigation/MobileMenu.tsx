"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-full p-2 text-ink hover:bg-ink/5"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-t border-ink/8 bg-cream px-6 py-6 shadow-lg">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-ink/85 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/technology"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-lavender to-blue px-5 py-2.5 text-sm font-medium text-ink"
            >
              Explore BioEar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
