import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export async function Intro() {
  const t = await getTranslations("Intro");

  return (
    <section className="bg-vm-cream text-vm-black">
      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </div>

            <div className="lg:col-span-9">
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
        </Reveal>
      </Container>
    </section>
  );
}
