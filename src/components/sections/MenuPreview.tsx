import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Item = {
  name: string;
  spanish: string;
  weight: string;
  price: string;
};

const items: Item[] = [
  { name: "Sirloin", spanish: "Bife de chorizo", weight: "200g", price: "€20.50" },
  { name: "Rib Eye", spanish: "Bife ancho", weight: "200g", price: "€24.50" },
  { name: "Tenderloin", spanish: "Bife de lomo", weight: "200g", price: "€30.20" },
  { name: "T-Bone Steak", spanish: "", weight: "500g", price: "€43.50" },
  { name: "Tres Carnes", spanish: "Three cuts on one plate", weight: "", price: "€36.20" },
  { name: "Spare Ribs Villa Maria", spanish: "BBQ, spicy", weight: "", price: "€23.00" },
];

export async function MenuPreview() {
  const t = await getTranslations("MenuPreview");

  return (
    <section className="bg-vm-black text-vm-cream">
      <Container className="py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-vm-cream/65">
              {t("subtitle")}
            </p>

            <ul className="mt-10 divide-y divide-vm-cream/15">
              {items.map((item, i) => (
                <li
                  key={item.name}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="font-sans text-[10px] tabular-nums tracking-[0.25em] text-vm-red/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <div>
                      <p className="font-display text-xl text-vm-cream md:text-2xl">
                        {item.name}
                      </p>
                      {item.spanish && (
                        <p className="font-sans text-xs uppercase tracking-[0.2em] text-vm-cream/45">
                          {item.spanish}
                        </p>
                      )}
                    </div>
                    <div className="flex items-baseline gap-3 tabular-nums">
                      {item.weight && (
                        <span className="text-xs uppercase tracking-[0.2em] text-vm-cream/40">
                          {item.weight}
                        </span>
                      )}
                      <span className="price font-display text-lg text-vm-cream md:text-xl">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/menu"
              className="group mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-vm-cream/80 hover:text-vm-red"
            >
              <span aria-hidden className="h-px w-8 bg-vm-red transition-all group-hover:w-12" />
              <span>{t("cta")}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="md:col-span-5">
            <figure className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/food/steak-plate.jpg"
                alt={t("signaturePhotoCaption")}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vm-black/85 to-transparent p-5 text-xs uppercase tracking-[0.25em] text-vm-cream/80">
                {t("signaturePhotoCaption")}
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
