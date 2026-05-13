import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function Intro() {
  const t = await getTranslations("Intro");

  return (
    <section className="bg-vm-cream text-vm-black">
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
              {t("eyebrow")}
            </p>
            <div
              aria-hidden
              className="mt-4 h-px w-12 bg-vm-red"
            />
          </div>

          <div className="md:col-span-9">
            <p className="font-display text-2xl leading-snug text-vm-black md:text-4xl">
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
