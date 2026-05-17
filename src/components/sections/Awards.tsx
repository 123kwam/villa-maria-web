import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Restaurant_Review-g188590-d2244593-Reviews-Villa_Maria_Steakhouse-Amsterdam_North_Holland_Province.html";

export async function Awards() {
  const t = await getTranslations("Awards");

  const badges = [
    { src: "/images/awards/tripadvisor-award-2024.png", alt: t("altTripadvisor2024") },
    { src: "/images/awards/tripadvisor-awarrd-2022.png", alt: t("altTripadvisor2022") },
    { src: "/images/awards/travellers-choice-2021.png", alt: t("altTripadvisor2021") },
    { src: "/images/awards/certificaat-uitmuntenheid-2015.png", alt: t("altCertificate2015") },
  ];

  return (
    <section className="bg-vm-cream text-vm-black">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-vm-smoke">
              {t("subtitle")}
            </p>
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-vm-black/80 hover:text-vm-red"
            >
              <span aria-hidden className="h-px w-8 bg-vm-red transition-all group-hover:w-12" />
              <span>{t("cta")}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>

          <Reveal delay={120} className="md:col-span-7">
            <ul className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
              {badges.map((b) => (
                <li key={b.src} className="flex flex-col items-center justify-center">
                  <div className="relative aspect-square w-full max-w-[160px]">
                    <Image
                      src={b.src}
                      alt={b.alt}
                      fill
                      sizes="(min-width: 768px) 160px, 40vw"
                      className="object-contain"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
