import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { MenuSection } from "@/components/menu/MenuSection";
import { menu } from "@/data/menu";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("MenuPage");
  const tCategories = await getTranslations("MenuPage.categories");

  return (
    <main className="bg-vm-cream text-vm-black">
      <section className="border-b border-vm-black/10">
        <Container className="py-16 md:py-24">
          <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-vm-smoke md:text-lg">
            {t("subtitle")}
          </p>

          <nav
            aria-label={t("jumpTo")}
            className="mt-12 border-t border-vm-black/10 pt-6"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-vm-smoke">
              {t("jumpTo")}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm tracking-wide">
              {menu.map((section, i) => (
                <li key={section.key} className="flex items-baseline gap-1.5">
                  <span className="text-[10px] tabular-nums text-vm-red/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${section.key}`}
                    className="text-vm-black/80 transition-colors hover:text-vm-red"
                  >
                    {tCategories(section.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <Container className="py-6 md:py-10">
        {menu.map((section, i) => (
          <MenuSection key={section.key} section={section} index={i} />
        ))}
      </Container>
    </main>
  );
}
