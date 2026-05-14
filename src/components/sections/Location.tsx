import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/place/Villa+Maria+Steakhouse/@52.3640146,4.8846737,600m/data=!3m2!1e3!5s0x47c609e908b7b63b:0xc2e0e67d9884a778!4m15!1m8!3m7!1s0x47c609e90447de8f:0x85d217a00b9e55dc!2sLange+Leidsedwarsstraat+45,+1017+NG+Amsterdam!3b1!8m2!3d52.3640146!4d4.8846737!16s%2Fg%2F11nntqcbrj!3m5!1s0x47c609e90414e71b:0xb97815d1ed7a741!8m2!3d52.3640146!4d4.8846737!16s%2Fg%2F124stg9lr!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D";
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Lange+Leidsedwarsstraat+45,+1017+NG+Amsterdam&output=embed";

export async function Location() {
  const t = await getTranslations("Location");

  return (
    <section className="bg-vm-black text-vm-cream">
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
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
