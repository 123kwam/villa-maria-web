import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";

const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/place/Villa+Maria+Steakhouse/@52.3640146,4.8846737,600m/data=!3m2!1e3!5s0x47c609e908b7b63b:0xc2e0e67d9884a778!4m15!1m8!3m7!1s0x47c609e90447de8f:0x85d217a00b9e55dc!2sLange+Leidsedwarsstraat+45,+1017+NG+Amsterdam!3b1!8m2!3d52.3640146!4d4.8846737!16s%2Fg%2F11nntqcbrj!3m5!1s0x47c609e90414e71b:0xb97815d1ed7a741!8m2!3d52.3640146!4d4.8846737!16s%2Fg%2F124stg9lr!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D";
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Lange+Leidsedwarsstraat+45,+1017+NG+Amsterdam&output=embed";
const INSTAGRAM_URL = "https://www.instagram.com/villa.maria.steakhouse/";
const PHONE_DISPLAY = "+31 20 622 3759";
const PHONE_TEL = "+31206223759";
const EMAIL = "info@restaurantvillamaria.nl";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");

  return (
    <main className="bg-vm-cream text-vm-black">
      <section className="bg-vm-black text-vm-cream">
        <Container className="py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-vm-cream/80 md:text-lg">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      <section className="border-b border-vm-black/10">
        <Container className="py-16 md:py-24">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <InfoColumn index="01" label={t("addressLabel")}>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="block font-display text-2xl leading-snug underline-offset-4 hover:text-vm-red hover:underline"
              >
                {t("addressLine1")}
                <br />
                {t("addressLine2")}
              </a>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-vm-smoke hover:text-vm-red"
              >
                <span>{t("directionsCta")}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </InfoColumn>

            <InfoColumn index="02" label={t("hoursLabel")}>
              <p className="font-display text-3xl tabular-nums leading-none">
                {t("hoursValue")}
              </p>
              <p className="text-sm text-vm-smoke">{t("hoursNote")}</p>
            </InfoColumn>

            <InfoColumn index="03" label={t("phoneLabel")}>
              <a
                href={`tel:${PHONE_TEL}`}
                className="block font-display text-2xl tabular-nums hover:text-vm-red"
              >
                {PHONE_DISPLAY}
              </a>
              <p className="text-sm text-vm-smoke">{t("phoneNote")}</p>
            </InfoColumn>

            <InfoColumn index="04" label={t("emailLabel")}>
              <a
                href={`mailto:${EMAIL}`}
                className="block break-words font-display text-lg underline-offset-4 hover:text-vm-red hover:underline"
              >
                {EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-baseline gap-2 text-[11px] uppercase tracking-[0.3em] text-vm-smoke hover:text-vm-red"
              >
                <span>{t("instagramLabel")}</span>
                <span aria-hidden className="text-vm-smoke/60 normal-case tracking-normal">
                  {t("instagramHandle")}
                </span>
              </a>
            </InfoColumn>
          </div>
        </Container>
      </section>

      <section className="bg-vm-black text-vm-cream">
        <Container className="py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
                {t("directionsEyebrow")}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
                <span className="block">{t("directionsTitle")}</span>
                <span className="block text-vm-cream/70">
                  {t("directionsTitleTwo")}
                </span>
              </h2>

              <div className="mt-10 space-y-8">
                <DirectionItem
                  label={t("fromLeidsepleinLabel")}
                  body={t("fromLeidsepleinBody")}
                />
                <DirectionItem
                  label={t("fromCentraalLabel")}
                  body={t("fromCentraalBody")}
                />
              </div>
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

      <section className="bg-vm-cream text-vm-black">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
                {t("form.eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
                {t("form.title")}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-vm-black/80 md:text-lg">
                {t("form.intro")}
              </p>
            </div>
            <div className="md:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function InfoColumn({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2 text-[10px] uppercase tracking-[0.3em] text-vm-smoke">
        <span className="text-vm-red tabular-nums">{index}</span>
        <span>{label}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DirectionItem({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-vm-cream/45">
        {label}
      </p>
      <p className="mt-2 font-display text-lg leading-snug text-vm-cream/90 md:text-xl">
        {body}
      </p>
    </div>
  );
}
