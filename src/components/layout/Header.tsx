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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
          className={`border-b border-vm-black/10 bg-vm-cream/95 backdrop-blur-md transition-[padding] duration-300 ${
            scrolled ? "py-2" : "py-4"
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
                className={`h-auto w-auto transition-[max-height] duration-300 ${
                  scrolled ? "max-h-10" : "max-h-14"
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

            <div className="flex items-center gap-5">
              <div className="hidden md:block">
                <LanguageToggle />
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={tHeader("openMenu")}
                aria-expanded={mobileOpen}
                className="group flex items-center gap-2 lg:hidden"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-vm-black/70 transition-colors group-hover:text-vm-red">
                  {tHeader("openMenu").split(" ")[0]}
                </span>
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
