import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative isolate overflow-hidden bg-vm-black text-vm-cream">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/grill.jpg"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-vm-black via-vm-black/55 to-vm-black/35"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-vm-black/85 via-transparent to-vm-black/40"
        />
      </div>

      <Container as="div" className="relative flex min-h-[88vh] flex-col justify-end py-20 md:py-28">
        <div className="max-w-3xl">
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
      </Container>

      <div
        aria-hidden
        className="absolute bottom-6 right-6 hidden font-sans text-[10px] uppercase tracking-[0.3em] text-vm-cream/40 md:block"
      >
        45 Lange Leidsedwarsstraat · Amsterdam
      </div>
    </section>
  );
}
