"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function FloatingBookCTA() {
  const t = useTranslations("FloatingCTA");
  const pathname = usePathname();

  if (pathname.startsWith("/book")) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 md:hidden">
      <div className="pointer-events-auto flex justify-end">
        <Link
          href="/book"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-vm-red px-6 py-4 text-vm-cream shadow-[0_18px_40px_-12px_rgba(139,26,26,0.65)] ring-1 ring-vm-cream/15 transition-all hover:rotate-[-1deg] hover:bg-vm-black hover:ring-vm-cream/30"
        >
          <span aria-hidden className="absolute inset-1 rounded-full border border-vm-cream/20" />
          <span className="relative font-sans text-xs uppercase tracking-[0.3em]">
            {t("label")}
          </span>
          <span
            aria-hidden
            className="relative grid h-7 w-7 place-items-center rounded-full bg-vm-cream/15 transition-colors group-hover:bg-vm-cream/25"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 6H11M11 6L6 1M11 6L6 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
