"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(32,35,42,0.06)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M4 14C6 10 8 18 10 14C12 10 14 18 16 14C18 10 20 18 22 14" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="text-lg font-semibold tracking-tight text-ink">BioEar</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm text-ink/80 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-ink/60 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href="/technology" variant="primary" className="!px-5 !py-2.5 text-sm">
            Explore BioEar
          </Button>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}
