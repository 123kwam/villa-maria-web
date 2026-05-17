"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function FloatingBookCTA() {
  const t = useTranslations("FloatingCTA");
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/book")) return null;

  return (
    <div
      className={`pointer-events-none fixed bottom-6 right-6 z-40 transition-opacity duration-200 md:hidden ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <Link
        href="/book"
        aria-hidden={!shown}
        tabIndex={shown ? 0 : -1}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-vm-red/95 px-5 py-3 text-vm-cream shadow-[0_18px_40px_-12px_rgba(139,26,26,0.65)] ring-1 ring-vm-cream/15 backdrop-blur-sm transition-all hover:rotate-[-1deg] hover:bg-vm-black hover:ring-vm-cream/30 ${
          shown ? "pointer-events-auto" : ""
        }`}
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
  );
}
