import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { TheRoom } from "@/components/sections/TheRoom";
import { GroupDining } from "@/components/sections/GroupDining";
import { Awards } from "@/components/sections/Awards";
import { Location } from "@/components/sections/Location";
import { FooterCTA } from "@/components/sections/FooterCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Intro />
      <MenuPreview />
      <TheRoom />
      <GroupDining />
      <Awards />
      <Location />
      <FooterCTA />
    </main>
  );
}
