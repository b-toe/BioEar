import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";
import { bioear } from "@/content/bioear-copy";

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M4 14C6 10 8 18 10 14C12 10 14 18 16 14C18 10 20 18 22 14" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="text-lg font-semibold text-ink">BioEar</span>
            </div>
            <p className="mt-3 text-sm text-gray">Engineering another pathway to hearing.</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/80">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-ink/8 pt-6">
          <p className="text-xs text-gray">© 2026 BioEar Engineering Project</p>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-gray">{bioear.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
