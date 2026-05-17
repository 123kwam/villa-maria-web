import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const PHONE_DISPLAY = "+31 20 622 3759";
const PHONE_TEL = "+31206223759";

export async function FooterCTA() {
  const t = await getTranslations("FooterCTA");

  return (
    <section className="bg-vm-cream text-vm-black">
      <Container className="py-20 md:py-28">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
              <span className="block">{t("title")}</span>
              <span className="block italic text-vm-red">{t("titleTwo")}</span>
            </h2>
          </Reveal>

          <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-auto md:flex-col md:items-end">
            <Link
              href="/book"
              className="group inline-flex items-center justify-between gap-4 bg-vm-black px-7 py-4 text-xs uppercase tracking-[0.3em] text-vm-cream transition-colors hover:bg-vm-red"
            >
              <span>{t("ctaReserve")}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <div className="flex items-baseline gap-3 text-vm-black">
              <span className="text-[11px] uppercase tracking-[0.3em] text-vm-smoke">
                {t("phoneLabel")}
              </span>
              <a
                href={`tel:${PHONE_TEL}`}
                className="font-display text-lg tabular-nums hover:text-vm-red"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
