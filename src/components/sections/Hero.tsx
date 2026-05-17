import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative isolate flex min-h-[85vh] flex-col overflow-hidden bg-vm-black text-vm-cream md:min-h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/grill.jpg"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover"
          style={{ objectPosition: "65% 50%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/60 to-transparent"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-8 pb-24 md:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-vm-cream/70">
            {t("eyebrow")}
          </p>
          <h1 className="text-5xl text-vm-cream md:text-7xl lg:text-[5.5rem]">
            <span className="block">{t("title")}</span>
            <span className="block text-vm-cream/85">{t("titleTwo")}</span>
            <span className="block italic text-vm-red">{t("titleThree")}</span>
          </h1>
          <p className="mt-8 max-w-xl font-display text-lg leading-relaxed text-vm-cream/80 md:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/book"
              className="group inline-flex items-center justify-between gap-4 bg-vm-red px-7 py-4 text-xs uppercase tracking-[0.3em] text-vm-cream transition-colors hover:bg-vm-cream hover:text-vm-black sm:justify-start"
            >
              <span>{t("ctaReserve")}</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/menu"
              className="group inline-flex items-center justify-between gap-4 border border-vm-cream/40 px-7 py-4 text-xs uppercase tracking-[0.3em] text-vm-cream transition-colors hover:border-vm-cream hover:bg-vm-cream/5 sm:justify-start"
            >
              <span>{t("ctaMenu")}</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <div className="relative h-12 w-px bg-white/40">
          <span className="animate-scroll-dot absolute left-1/2 top-0 block h-1 w-1 -translate-x-1/2 rounded-full bg-white" />
        </div>
        <span className="text-xs uppercase tracking-widest text-white/60">
          Scroll
        </span>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 right-6 hidden font-sans text-[10px] uppercase tracking-[0.3em] text-vm-cream/40 md:block"
      >
        45 Lange Leidsedwarsstraat · Amsterdam
      </div>
    </section>
  );
}
