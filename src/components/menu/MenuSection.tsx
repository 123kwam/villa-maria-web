import { getTranslations } from "next-intl/server";
import {
  type MenuSection as MenuSectionType,
  isWeighted,
  type WeightedItem,
  type SingleItem,
} from "@/data/menu";

type Props = {
  section: MenuSectionType;
  index: number;
};

export async function MenuSection({ section, index }: Props) {
  const t = await getTranslations("MenuPage");
  const tCategories = await getTranslations("MenuPage.categories");

  const note =
    section.key === "sauces"
      ? t("noteSauces")
      : section.key === "completeDishes"
        ? t("noteCompleteDishes")
        : section.key === "fish"
          ? t("noteFish")
          : null;

  return (
    <section
      id={section.key}
      className="border-t border-vm-black/10 py-12 first:border-t-0 md:py-16"
    >
      <header className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-10">
        <span className="font-sans text-[11px] tabular-nums tracking-[0.3em] text-vm-red">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          {tCategories(section.key)}
        </h2>
        {note && (
          <p className="w-full text-sm italic text-vm-smoke md:ml-auto md:w-auto md:max-w-md md:text-right">
            {note}
          </p>
        )}
      </header>

      {section.weightHeaders ? (
        <WeightedTable
          items={section.items.filter(isWeighted) as WeightedItem[]}
          extras={section.items.filter((i) => !isWeighted(i)) as SingleItem[]}
          weightHeaders={section.weightHeaders}
        />
      ) : (
        <SingleList items={section.items as SingleItem[]} />
      )}
    </section>
  );
}

function SingleList({ items }: { items: SingleItem[] }) {
  return (
    <ul className="divide-y divide-vm-black/10">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex items-baseline gap-6 py-4 md:py-5"
        >
          <div className="flex-1">
            <p className="font-display text-lg leading-tight md:text-xl">
              {item.name}
            </p>
            {item.description && (
              <p className="mt-0.5 text-sm italic text-vm-smoke">
                {item.description}
              </p>
            )}
          </div>
          <span
            aria-hidden
            className="mt-2 hidden flex-1 self-end border-b border-dotted border-vm-black/20 md:block"
          />
          <span className="font-display text-lg tabular-nums text-vm-black md:text-xl">
            {item.price}
          </span>
        </li>
      ))}
    </ul>
  );
}

function WeightedTable({
  items,
  extras,
  weightHeaders,
}: {
  items: WeightedItem[];
  extras: SingleItem[];
  weightHeaders: string[];
}) {
  return (
    <div>
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-vm-black/15 text-[11px] uppercase tracking-[0.25em] text-vm-smoke">
              <th className="py-3 text-left font-sans font-normal">
                <span className="sr-only">Cut</span>
              </th>
              {weightHeaders.map((w) => (
                <th
                  key={w}
                  className="py-3 text-right font-sans font-normal tabular-nums"
                >
                  {w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className="border-b border-vm-black/10">
                <td className="py-4">
                  <p className="font-display text-xl leading-tight">
                    {item.name}
                  </p>
                  {item.spanish && (
                    <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-vm-smoke">
                      {item.spanish}
                    </p>
                  )}
                </td>
                {item.weights.map((w) => (
                  <td
                    key={w.weight}
                    className="py-4 text-right font-display text-lg tabular-nums"
                  >
                    {w.price}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-6 md:hidden">
        {items.map((item) => (
          <li
            key={item.name}
            className="border-b border-vm-black/10 pb-5"
          >
            <p className="font-display text-xl leading-tight">{item.name}</p>
            {item.spanish && (
              <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-vm-smoke">
                {item.spanish}
              </p>
            )}
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              {item.weights.map((w) => (
                <div
                  key={w.weight}
                  className="border border-vm-black/10 px-1 py-2"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-vm-smoke">
                    {w.weight}
                  </p>
                  <p className="mt-1 font-display text-sm tabular-nums">
                    {w.price}
                  </p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {extras.length > 0 && (
        <div className="mt-8">
          <SingleList items={extras} />
        </div>
      )}
    </div>
  );
}
