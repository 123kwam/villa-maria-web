import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { loadAbout } from "@/lib/about";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");
  const blocks = await loadAbout(locale);

  if (blocks.length === 0) notFound();

  return (
    <main className="bg-vm-cream text-vm-black">
      <section className="bg-vm-black text-vm-cream">
        <Container className="py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-vm-cream/80 md:text-lg">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      {blocks.map((block, i) => (
        <div key={i}>
          {i === 1 && (
            <figure className="relative aspect-[16/9] w-full overflow-hidden bg-vm-black md:aspect-[21/9]">
              <Image
                src="/images/interior/booth-detail.jpg"
                alt={t("interiorPhotoCaption")}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 bg-vm-black/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-vm-cream md:bottom-6 md:left-6">
                {t("interiorPhotoCaption")}
              </figcaption>
            </figure>
          )}

          <section
            className={`border-vm-black/10 ${i > 0 ? "border-t" : ""}`}
          >
            <Container className="py-16 md:py-24">
              <div className="grid gap-10 md:grid-cols-12 md:gap-16">
                <div className="md:col-span-4">
                  <span className="font-sans text-[11px] tabular-nums tracking-[0.3em] text-vm-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
                    {block.title}
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="font-display text-lg leading-relaxed text-vm-black/90 md:text-xl md:leading-relaxed">
                    {block.body}
                  </p>
                </div>
              </div>
            </Container>
          </section>
        </div>
      ))}

      <section className="border-t border-vm-black/10 bg-vm-black text-vm-cream">
        <Container className="py-16 md:py-20">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
                {t("closingEyebrow")}
              </p>
              <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
                {t("closingTitle")}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:items-end">
              <Link
                href="/book"
                className="group inline-flex items-center justify-between gap-4 bg-vm-red px-7 py-4 text-xs uppercase tracking-[0.3em] text-vm-cream transition-colors hover:bg-vm-cream hover:text-vm-black"
              >
                <span>{t("ctaReserve")}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/menu"
                className="group inline-flex items-center justify-between gap-4 border border-vm-cream/40 px-7 py-4 text-xs uppercase tracking-[0.3em] text-vm-cream transition-colors hover:border-vm-cream"
              >
                <span>{t("ctaMenu")}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
