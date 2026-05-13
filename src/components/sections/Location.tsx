import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/place/Lange+Leidsedwarsstraat+45,+1017+NG+Amsterdam";
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Lange+Leidsedwarsstraat+45,+1017+NG+Amsterdam&output=embed";

export async function Location() {
  const t = await getTranslations("Location");

  return (
    <section className="bg-vm-black text-vm-cream">
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              <span className="block">{t("title")}</span>
              <span className="block text-vm-cream/70">{t("titleTwo")}</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-vm-cream/75 md:text-lg">
              {t("p1")}
            </p>
            <p className="mt-2 max-w-sm text-base leading-relaxed text-vm-cream/65">
              {t("p2")}
            </p>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-vm-cream/80 hover:text-vm-red"
            >
              <span aria-hidden className="h-px w-8 bg-vm-red transition-all group-hover:w-12" />
              <span>{t("cta")}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-vm-cream/15">
              <iframe
                src={MAPS_EMBED_URL}
                title={t("mapTitle")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
                style={{ filter: "grayscale(0.4) contrast(0.95)" }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
