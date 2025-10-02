import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { routing as existingRouting } from "../i18n/routing";

// --- Config & Types -------------------------------------------------------
const ROOT = process.cwd();
const MESSAGES = path.join(ROOT, "messages");
const ROUTING_FILE = path.join(ROOT, "src/i18n/routing.ts");
type RouteMap = Record<string, Record<string, string>>;
interface Frontmatter {
  slug?: string;
  meta?: { slug?: string };
}

// --- Helpers --------------------------------------------------------------
const walk = async (dir: string): Promise<string[]> => {
  try {
    const ents = await fs.readdir(dir, { withFileTypes: true });
    const out: string[] = [];
    for (const e of ents) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(full)));
      else if (e.isFile() && e.name.endsWith(".mdx")) out.push(full);
    }
    return out;
  } catch {
    return [];
  }
};
const norm = (p: string) => p.replace(/\\/g, "/");

// --- Core -----------------------------------------------------------------
async function buildGroups() {
  const { locales, defaultLocale } = existingRouting;
  const groups: Record<
    string,
    { canonical: string; perLocale: Record<string, string> }
  > = {};
  for (const locale of locales) {
    for (const file of await walk(path.join(MESSAGES, locale))) {
      const rel = norm(path.relative(path.join(MESSAGES, locale), file));
      const parts = rel.split("/");
      const base = parts.pop()!.replace(/\.mdx$/, "");
      const dirRoute = parts.length ? `/${parts.join("/")}` : "";
      const { data } = matter(await fs.readFile(file, "utf8"));
      const fm = data as Frontmatter;
      const slug = fm.slug ?? fm.meta?.slug;
      if (!slug) {
        console.warn("⚠️ Missing slug:", file);
        continue;
      }
      const route = `${dirRoute}/${slug}`.replace(/\/+/g, "/");
      const groupId = `${dirRoute}|${base}`;
      groups[groupId] ||= { canonical: route, perLocale: {} };
      if (locale === defaultLocale) groups[groupId].canonical = route;
      const existing = groups[groupId].perLocale[locale];
      if (existing && existing !== route) {
        console.warn("⚠️ Slug conflict:", file);
        continue;
      }
      groups[groupId].perLocale[locale] = route;
    }
  }
  return groups;
}

function merge(groups: Awaited<ReturnType<typeof buildGroups>>): RouteMap {
  const { defaultLocale, pathnames: existing } = existingRouting;
  const merged: RouteMap = { ...existing };
  for (const g of Object.values(groups)) {
    const key = g.canonical;
    // Ensure parents
    key
      .split("/")
      .filter(Boolean)
      .reduce((acc, seg) => {
        const p = `${acc}/${seg}`.replace(/\/+/g, "/");
        if (!merged[p]) merged[p] = { [defaultLocale]: p };
        return p;
      }, "");
    merged[key] ||= {};
    for (const [loc, locPath] of Object.entries(g.perLocale))
      merged[key][loc] ||= locPath;
  }
  return Object.fromEntries(
    Object.keys(merged)
      .sort()
      .map((k) => [k, merged[k]])
  );
}

function printPathnames(map: RouteMap) {
  const orderLocales = [...existingRouting.locales];
  const localeSet = new Set(orderLocales);
  const isLocale = (s: string): s is (typeof orderLocales)[number] =>
    localeSet.has(s as (typeof orderLocales)[number]);
  return [
    "{",
    ...Object.keys(map)
      .sort()
      .map((rk, i, arr) => {
        const locales = Object.keys(map[rk])
          .filter(isLocale)
          .sort((a, b) => orderLocales.indexOf(a) - orderLocales.indexOf(b));
        const inner = locales
          .map(
            (l, li) =>
              `    ${l}: ${JSON.stringify(map[rk][l])}${
                li === locales.length - 1 ? "" : ","
              }`
          )
          .join("\n");
        return `  ${JSON.stringify(rk)}: {\n${inner}\n  }${
          i === arr.length - 1 ? "" : ","
        }`;
      }),
    "}",
  ].join("\n");
}

async function run() {
  const groups = await buildGroups();
  const merged = merge(groups);
  const content = `import { defineRouting } from "next-intl/routing";\n\nexport const routing = defineRouting({\n  locales: ${JSON.stringify(
    existingRouting.locales,
    null,
    2
  )},\n  defaultLocale: ${JSON.stringify(
    existingRouting.defaultLocale
  )},\n  pathnames: ${printPathnames(merged)}\n});\n`;
  await fs.writeFile(ROUTING_FILE, content, "utf8");
  console.log(
    `✅ updatePathname: groups=${Object.keys(groups).length}, totalRoutes=${
      Object.keys(merged).length
    }`
  );
}

run().catch((e) => {
  console.error("❌ updatePathname failed:", e);
  process.exit(1);
});
