import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { routing as existingRouting } from "../i18n/routing";

// --- Config & Types -------------------------------------------------------
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

  // Resolve the deepest translated ancestor path for a given canonical dirRoute.
  // Example: dirRoute=/solutions/navigation, locale=vi, existing mapping has
  //   '/solutions/navigation': { vi: '/giai-phap/nghi-khi-hang-hai' }
  // Returns '/giai-phap/nghi-khi-hang-hai'. If no translation found, returns original dirRoute.
  function localizeDirRoute(dirRoute: string, locale: string): string {
    if (!dirRoute) return dirRoute;
    if (locale === defaultLocale) return dirRoute; // canonical stays unchanged
    const { pathnames } = existingRouting as unknown as {
      pathnames: Record<string, Record<string, string>>;
    };
    // Build list of ancestor paths: '/solutions', '/solutions/navigation'
    const segs = dirRoute.split("/").filter(Boolean);
    const ancestors: string[] = [];
    for (let i = 0; i < segs.length; i++) {
      ancestors.push("/" + segs.slice(0, i + 1).join("/"));
    }
    // Search deepest first for a translation.
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const a = ancestors[i];
      const entry = pathnames[a];
      if (entry && entry[locale]) {
        return entry[locale];
      }
    }
    return dirRoute; // fallback unchanged
  }
  for (const locale of locales) {
    for (const file of await walk(
      path.join(path.join(process.cwd(), "src", "content"), locale)
    )) {
      const rel = norm(
        path.relative(
          path.join(path.join(process.cwd(), "src", "content"), locale),
          file
        )
      );
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
      // Build localized directory route (parent segments) if translation exists.
      const localizedDir = localizeDirRoute(dirRoute, locale);
      const route = `${localizedDir}/${slug}`.replace(/\/+/g, "/");
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
    for (const [loc, locPath] of Object.entries(g.perLocale)) {
      // Overwrite to ensure refreshed localized parent segments are applied.
      merged[key][loc] = locPath;
    }
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
  await fs.writeFile(
    path.join(process.cwd(), "src", "i18n", "routing.ts"),
    content,
    "utf8"
  );
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
