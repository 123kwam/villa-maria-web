import { promises as fs } from "fs";
import path from "path";

export type AboutBlock = {
  title: string;
  body: string;
};

export async function loadAbout(locale: string): Promise<AboutBlock[]> {
  const contentDir = path.join(process.cwd(), "content");
  const localized = path.join(contentDir, `about_company.${locale}`);
  const fallback = path.join(contentDir, "about_company");

  let raw: string;
  try {
    raw = await fs.readFile(localized, "utf8");
  } catch {
    raw = await fs.readFile(fallback, "utf8");
  }

  return raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const [title, ...rest] = lines;
      return {
        title: title ?? "",
        body: rest.join(" "),
      };
    });
}
