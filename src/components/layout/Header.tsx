"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";

type NavKey = "home" | "menu" | "about" | "contact" | "book";
const navItems: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "book", href: "/book" },
];

export function Header() {
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [restaurantOpen, setRestaurantOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      const hour = parseInt(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Europe/Amsterdam",
          hour: "numeric",
          hour12: false,
        }).format(new Date()),
        10
      );
      setRestaurantOpen(hour >= 12 && hour < 23);
    };
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className="sticky top-0 z-50"
      >
        <div className="hidden lg:block bg-vm-black text-vm-cream/70">
          <Container className="flex items-center justify-center gap-5 py-2 text-[10px] tracking-[0.3em] uppercase">
            <span>{tHeader("addressShort")}</span>
            <span aria-hidden className="text-vm-red">
              ●
            </span>
            <span>{tHeader("hoursShort")}</span>
            <span aria-hidden className="text-vm-red">
              ●
            </span>
            <a
              href={`tel:${tHeader("phoneShort").replace(/\s/g, "")}`}
              className="tabular-nums transition-colors hover:text-vm-cream"
            >
              {tHeader("phoneShort")}
            </a>
          </Container>
        </div>

        <div
          className={`border-b border-vm-black/10 transition-all duration-200 ${
            scrolled
              ? "bg-vm-cream/85 py-2 backdrop-blur-md"
              : "bg-vm-cream py-3"
          }`}
        >
          <Container className="flex items-center justify-between gap-6">
            <Link
              href="/"
              aria-label={tHeader("logoAlt")}
              className="relative block shrink-0"
            >
              <Image
                src="/images/logo/villa-maria-logo.png"
                alt={tHeader("logoAlt")}
                width={314}
                height={198}
                priority
                className={`h-auto w-auto transition-[max-height] duration-200 ${
                  scrolled ? "max-h-14" : "max-h-20"
                }`}
              />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-8"
            >
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="group relative py-1 text-sm"
                >
                  <span className="font-sans tracking-wide text-vm-black/85 transition-colors group-hover:text-vm-black">
                    {t(item.key)}
                  </span>
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-vm-red transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {mounted && restaurantOpen && (
                <div className="flex items-center gap-2 lg:hidden">
                  <span
                    aria-hidden
                    className="block h-1 w-1 rounded-full bg-green-500"
                  />
                  <span className="font-label text-xs uppercase tracking-widest text-vm-smoke">
                    {tHeader("openToday")}
                  </span>
                </div>
              )}

              <div className="hidden md:block">
                <LanguageToggle />
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={tHeader("openMenu")}
                aria-expanded={mobileOpen}
                className="group lg:hidden"
              >
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center border border-vm-black/30 transition-colors group-hover:border-vm-red"
                >
                  <span className="flex flex-col gap-[3px]">
                    <span className="block h-px w-4 bg-vm-black transition-colors group-hover:bg-vm-red" />
                    <span className="block h-px w-4 bg-vm-black transition-colors group-hover:bg-vm-red" />
                    <span className="block h-px w-2.5 bg-vm-black transition-colors group-hover:bg-vm-red" />
                  </span>
                </span>
              </button>
            </div>
          </Container>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
