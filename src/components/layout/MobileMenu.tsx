"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "./LanguageToggle";

type NavKey = "home" | "menu" | "about" | "contact" | "book";
const navItems: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "book", href: "/book" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const tMenu = useTranslations("MobileMenu");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tHeader("openMenu")}
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex h-full flex-col bg-vm-cream text-vm-black">
        <div className="flex items-center justify-between border-b border-vm-black/10 px-6 py-5">
          <LanguageToggle variant="menu" />
          <button
            type="button"
            onClick={onClose}
            aria-label={tHeader("closeMenu")}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-vm-black/70 hover:text-vm-red"
          >
            <span>{tHeader("closeMenu")}</span>
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center border border-vm-black/20 transition-colors group-hover:border-vm-red group-hover:text-vm-red"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 pt-10 pb-6">
          <ul className="space-y-6">
            {navItems.map((item, i) => (
              <li
                key={item.key}
                className={`transition-all duration-500 ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group block"
                >
                  <span className="font-display text-5xl leading-none tracking-tight text-vm-black transition-colors group-hover:text-vm-red">
                    {t(item.key)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-vm-black/10 bg-vm-cream px-6 py-6">
          <div className="space-y-1 text-sm leading-relaxed">
            <p className="font-display text-base text-vm-black">
              {tHeader("addressShort")}
            </p>
            <p className="text-vm-smoke">{tMenu("leidsepleinWalk")}</p>
            <a
              href={`tel:${tHeader("phoneShort").replace(/\s/g, "")}`}
              className="mt-2 inline-block font-display text-lg tabular-nums text-vm-red hover:text-vm-black"
            >
              {tHeader("phoneShort")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
