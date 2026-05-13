import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function TheRoom() {
  const t = await getTranslations("TheRoom");

  return (
    <section className="bg-vm-cream text-vm-black">
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-vm-smoke md:text-lg">
              {t("p")}
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 aspect-[5/6] md:aspect-[6/5]">
              <figure className="relative col-span-6 row-span-4 overflow-hidden md:col-span-4 md:row-span-6">
                <Image
                  src="/images/interior/dining-room.jpg"
                  alt={t("captionDining")}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-3 left-3 bg-vm-black/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-vm-cream">
                  {t("captionDining")}
                </figcaption>
              </figure>
              <figure className="relative col-span-3 row-span-2 overflow-hidden md:col-span-2 md:row-span-3">
                <Image
                  src="/images/interior/booth-detail.jpg"
                  alt={t("captionBooth")}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-3 left-3 bg-vm-black/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-vm-cream">
                  {t("captionBooth")}
                </figcaption>
              </figure>
              <figure className="relative col-span-3 row-span-2 overflow-hidden md:col-span-2 md:row-span-3">
                <Image
                  src="/images/interior/terrace.jpg"
                  alt={t("captionTerrace")}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-3 left-3 bg-vm-black/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-vm-cream">
                  {t("captionTerrace")}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
