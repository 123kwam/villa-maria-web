import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

const MAPS_URL =
  "https://www.google.com/maps/place/Villa+Maria+Steakhouse/@52.3640146,4.8846737,600m/data=!3m2!1e3!5s0x47c609e908b7b63b:0xc2e0e67d9884a778!4m15!1m8!3m7!1s0x47c609e90447de8f:0x85d217a00b9e55dc!2sLange+Leidsedwarsstraat+45,+1017+NG+Amsterdam!3b1!8m2!3d52.3640146!4d4.8846737!16s%2Fg%2F11nntqcbrj!3m5!1s0x47c609e90414e71b:0xb97815d1ed7a741!8m2!3d52.3640146!4d4.8846737!16s%2Fg%2F124stg9lr!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D";
const INSTAGRAM_URL = "https://www.instagram.com/villa.maria.steakhouse/";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-vm-black text-vm-cream">
      <Container as="div" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <Image
              src="/images/logo/villa-maria-logo.png"
              alt="Villa Maria Steakhouse"
              width={314}
              height={198}
              className="h-auto w-32"
            />
            <p className="mt-6 max-w-sm font-display text-lg italic leading-snug text-vm-cream/80">
              {t("tagline")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:col-span-7 lg:col-span-8">
            <FooterColumn label={t("visitLabel")} index="01">
              <p className="font-display text-lg leading-snug">
                {t("addressLine1")}
                <br />
                {t("addressLine2")}
              </p>
              <p className="text-vm-cream/55 text-sm">{t("leidsepleinWalk")}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-vm-cream/70 hover:text-vm-red"
              >
                <span>{t("directions")}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </FooterColumn>

            <FooterColumn label={t("hoursLabel")} index="02">
              <p className="font-display text-3xl tabular-nums leading-none">
                {t("hoursValue")}
              </p>
              <p className="text-vm-cream/55 text-sm leading-snug">
                {t("hoursNote")}
              </p>
            </FooterColumn>

            <FooterColumn label={t("reachLabel")} index="03">
              <a
                href={`tel:${t("phoneValue").replace(/\s/g, "")}`}
                className="block font-display text-lg tabular-nums text-vm-cream hover:text-vm-red"
              >
                {t("phoneValue")}
              </a>
              <a
                href={`mailto:${t("emailValue")}`}
                className="block text-sm text-vm-cream/80 underline-offset-4 hover:text-vm-red hover:underline"
              >
                {t("emailValue")}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-vm-cream/70 hover:text-vm-red"
              >
                <span>{t("instagramLabel")}</span>
                <span aria-hidden className="text-vm-cream/40">
                  {t("instagramHandle")}
                </span>
              </a>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-vm-red/40 pt-6 text-xs uppercase tracking-[0.25em] text-vm-cream/55 md:flex-row md:items-center md:justify-between">
          <p>{t("awardsLabel")}</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/menu" className="hover:text-vm-cream">
              {tNav("menu")}
            </Link>
            <Link href="/about" className="hover:text-vm-cream">
              {tNav("about")}
            </Link>
            <Link href="/contact" className="hover:text-vm-cream">
              {tNav("contact")}
            </Link>
            <Link href="/book" className="text-vm-red hover:text-vm-cream">
              {tNav("book")}
            </Link>
          </nav>
        </div>

        <p className="mt-6 text-xs tracking-wide text-vm-cream/40">
          © {year} {t("rights")} · {t("rightsSuffix")}
        </p>
      </Container>
    </footer>
  );
}

function FooterColumn({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2 text-[10px] uppercase tracking-[0.3em] text-vm-cream/45">
        <span className="text-vm-red tabular-nums">{index}</span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
