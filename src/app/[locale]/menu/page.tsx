import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { MenuSection } from "@/components/menu/MenuSection";
import { MenuTabs, TabPanel, type Tab } from "@/components/menu/MenuTabs";
import { PrintButton } from "@/components/menu/PrintButton";
import { menu } from "@/data/menu";

const slugByKey: Record<string, string> = {
  soups: "soups",
  coldStarters: "cold-starters",
  salads: "salads",
  warmStarters: "warm-starters",
  sides: "sides",
  sauces: "sauces",
  grilledMeat: "from-the-grill",
  vegetarian: "vegetarian",
  completeDishes: "main-plates",
  fish: "fish",
};

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.04'/></svg>`;

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("MenuPage");
  const tCategories = await getTranslations("MenuPage.categories");

  const tabs: Tab[] = menu.map((section, i) => ({
    key: section.key,
    slug: slugByKey[section.key] ?? section.key,
    label: tCategories(section.key),
    number: String(i + 1).padStart(2, "0"),
  }));

  return (
    <main className="relative text-vm-black">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 print-hide"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${NOISE_SVG}")`,
        }}
      />

      <section className="border-b border-vm-black/10 print-hide">
        <Container className="py-16 md:py-24">
          <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl">{t("title")}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-vm-smoke md:text-lg">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      <MenuTabs tabs={tabs} defaultKey="grilledMeat">
        <Container className="py-6 md:py-10">
          {menu.map((section, i) => (
            <TabPanel
              key={section.key}
              sectionKey={section.key}
              slug={slugByKey[section.key] ?? section.key}
            >
              <MenuSection section={section} index={i} />
            </TabPanel>
          ))}

          <div className="mt-16 flex justify-center print-hide">
            <PrintButton label={t("printMenu")} />
          </div>
        </Container>
      </MenuTabs>
    </main>
  );
}
