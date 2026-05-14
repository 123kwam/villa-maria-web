import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export async function Intro() {
  const t = await getTranslations("Intro");

  return (
    <section className="bg-vm-cream text-vm-black">
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </div>

          <div className="md:col-span-9">
            <p className="font-display text-2xl leading-snug text-vm-black first-letter:float-left first-letter:mt-1 first-letter:pr-2 first-letter:font-display first-letter:text-[4em] first-letter:leading-[0.9] first-letter:text-vm-red md:text-4xl">
              {t("p1")}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-vm-smoke md:text-lg">
              {t("p2")}
            </p>
            <p className="mt-4 max-w-2xl font-display text-base italic leading-relaxed text-vm-black/85 md:text-lg">
              {t("p3")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
