import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

const PHONE_DISPLAY = "+31 20 622 3759";
const PHONE_TEL = "+31206223759";

export async function GroupDining() {
  const t = await getTranslations("GroupDining");

  return (
    <section className="relative isolate overflow-hidden bg-vm-black text-vm-cream">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/food/beef-bowl.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-vm-black via-vm-black/80 to-vm-black/40"
        />
      </div>

      <Container className="relative py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-vm-cream/75 md:text-lg">
              {t("p")}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:col-span-5 md:items-end md:justify-end">
            <a
              href={`tel:${PHONE_TEL}`}
              className="group font-display text-3xl tabular-nums text-vm-cream transition-colors hover:text-vm-red md:text-4xl"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-vm-cream/70 hover:text-vm-red"
            >
              <span aria-hidden className="h-px w-8 bg-vm-red transition-all group-hover:w-12" />
              <span>{t("cta")}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
