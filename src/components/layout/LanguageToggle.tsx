"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageToggle({ variant = "header" }: { variant?: "header" | "menu" }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const currentLocale = (params.locale as Locale) ?? routing.defaultLocale;

  const switchTo = (next: Locale) => {
    if (next === currentLocale) return;
    router.replace(pathname, { locale: next });
  };

  if (variant === "menu") {
    return (
      <div
        className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase"
        aria-label={t("languageLabel")}
      >
        {routing.locales.map((loc) => {
          const active = loc === currentLocale;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => switchTo(loc)}
              className={`relative pb-1 transition-colors ${
                active
                  ? "text-vm-black"
                  : "text-vm-black/40 hover:text-vm-black"
              }`}
              aria-current={active ? "true" : undefined}
            >
              {loc.toUpperCase()}
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px h-px bg-vm-red"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="flex items-center text-[11px] tracking-[0.25em] uppercase"
      aria-label={t("languageLabel")}
    >
      {routing.locales.map((loc, i) => {
        const active = loc === currentLocale;
        return (
          <div key={loc} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className="px-1.5 text-vm-black/30">
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => switchTo(loc)}
              className={`transition-colors ${
                active
                  ? "text-vm-red"
                  : "text-vm-black/50 hover:text-vm-black"
              }`}
              aria-current={active ? "true" : undefined}
            >
              {loc.toUpperCase()}
            </button>
          </div>
        );
      })}
    </div>
  );
}
