import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { routing as existingRouting } from "../i18n/routing";

// --- Config & Types -------------------------------------------------------
type RouteMap = Record<string, Record<string, string>>;
interface FrontmatterMeta {
  slug?: string;
  title?: string;
  ogImage?: string;
}
interface Frontmatter {
  slug?: string;
  meta?: FrontmatterMeta;
  title?: string;
  featured?: boolean; // yêu cầu boolean chuẩn
  publishedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  ogImage?: string;
}
export type PostEntry = {
  route: string;
  locale: string;
  title?: string;
  featured?: boolean;
  publishedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  ogImage?: string;
};

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

function isValidDateStr(s?: string): boolean {
  if (!s) return false;
  const t = Date.parse(s);
  return Number.isFinite(t);
}

function makeSortByDateDesc<T extends { publishedAt?: string }>() {
  return (a: T, b: T) => {
    const da = a.publishedAt ? Date.parse(a.publishedAt) : NaN;
    const db = b.publishedAt ? Date.parse(b.publishedAt) : NaN;
    if (Number.isNaN(da) && Number.isNaN(db)) return 0;
    if (Number.isNaN(da)) return 1;
    if (Number.isNaN(db)) return -1;
    return db - da;
  };
}

// --- Core -----------------------------------------------------------------

type GroupMap = Record<
  string,
  { canonical: string; perLocale: Record<string, string> }
>;

type PostsByLocale = Record<string, Array<PostEntry>>;

async function collectContent(): Promise<{
  groups: GroupMap;
  postsByLocale: PostsByLocale;
}> {
  const { locales, defaultLocale } = existingRouting;
  const groups: GroupMap = {};
  // Thu thập metadata cho card theo từng locale, chỉ đọc file 1 lần
  const postsByLocale: PostsByLocale = Object.fromEntries(
    locales.map((l) => [l, [] as PostEntry[]])
  );

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
    const baseDir = path.join(process.cwd(), "src", "content", locale);
    for (const file of await walk(baseDir)) {
      const rel = norm(path.relative(baseDir, file));
      const parts = rel.split("/");
      const base = parts.pop()!.replace(/\.mdx$/, "");
      const dirRoute = parts.length ? `/${parts.join("/")}` : "";
      const { data } = matter(await fs.readFile(file, "utf8")); // Đọc mỗi file đúng 1 lần
      const fm = data as Frontmatter; // Parse frontmatter một lần, dùng cho cả route & posts
      const slug = fm.slug ?? fm.meta?.slug;
      if (!slug) {
        console.warn("⚠️ Missing slug:", file);
        continue;
      }
      // Build localized directory route (parent segments) if translation exists.
      const localizedDir = localizeDirRoute(dirRoute, locale);
      const route = `${localizedDir}/${slug}`.replace(/\/+/, "/");
      const groupId = `${dirRoute}|${base}`;
      groups[groupId] ||= { canonical: route, perLocale: {} };
      if (locale === defaultLocale) groups[groupId].canonical = route;
      const existing = groups[groupId].perLocale[locale];
      if (existing && existing !== route) {
        console.warn("⚠️ Slug conflict:", file);
        continue;
      }
      groups[groupId].perLocale[locale] = route;

      // Thu thập metadata cho bài viết để render card
      // Quy ước: không có publishedAt (hoặc ngày không hợp lệ) => coi như draft, KHÔNG hiển thị
      if (isValidDateStr(fm.publishedAt)) {
        const entry: PostEntry = {
          route,
          locale,
          title: fm.meta?.title ?? fm.title,
          featured: fm.featured,
          publishedAt: fm.publishedAt,
          author: fm.author,
          category: fm.category,
          tags: fm.tags,
          ogImage: fm.meta?.ogImage ?? fm.ogImage,
        };
        postsByLocale[locale].push(entry);
      }
    }
  }
  return { groups, postsByLocale };
}

function merge(groups: GroupMap): RouteMap {
  const { defaultLocale, pathnames: existing } = existingRouting;
  const merged: RouteMap = { ...existing };
  for (const g of Object.values(groups)) {
    const key = g.canonical;
    // Ensure parents
    key
      .split("/")
      .filter(Boolean)
      .reduce((acc, seg) => {
        const p = `${acc}/${seg}`.replace(/\/+/, "/");
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

function computePosts(byLocale: PostsByLocale) {
  const sortByDateDesc = makeSortByDateDesc<PostEntry>();
  const out: Record<
    string,
    {
      featureEntry: PostEntry | null;
      entries: PostEntry[];
      featureByCategory: Record<string, PostEntry | null>;
      entriesByCategory: Record<string, PostEntry[]>;
    }
  > = {};
  for (const l of existingRouting.locales) {
    const list = byLocale[l] || [];
    const allSorted = list.slice().sort(sortByDateDesc);
    const featuredList = allSorted.filter((p) => p.featured);
    const featureEntry = featuredList[0] || null;
    const entries = featureEntry
      ? allSorted.filter((p) => p.route !== featureEntry.route)
      : allSorted;

    // Group by category
    const groups: Record<string, PostEntry[]> = {};
    for (const p of allSorted) {
      if (!p.category) continue; // chỉ nhóm khi có category rõ ràng
      (groups[p.category] ||= []).push(p);
    }

    const featureByCategory: Record<string, PostEntry | null> = {};
    const entriesByCategory: Record<string, PostEntry[]> = {};
    for (const [cat, arr] of Object.entries(groups)) {
      const catSorted = arr.slice().sort(sortByDateDesc);
      const catFeatured =
        catSorted.find((p) => p.featured) || catSorted[0] || null;
      const catEntries = catFeatured
        ? catSorted.filter((p) => p.route !== catFeatured.route)
        : catSorted;
      featureByCategory[cat] = catFeatured;
      entriesByCategory[cat] = catEntries;
    }

    out[l] = { featureEntry, entries, featureByCategory, entriesByCategory };
  }
  return out;
}

async function writeRoutingFile(merged: RouteMap) {
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
}

async function writePostsFile(
  byLocaleEntries: Record<
    string,
    {
      featureEntry: PostEntry | null;
      entries: PostEntry[];
      featureByCategory: Record<string, PostEntry | null>;
      entriesByCategory: Record<string, PostEntry[]>;
    }
  >
) {
  // Xuất maps theo locale
  const featureMap: Record<string, PostEntry | null> = {};
  const entriesMap: Record<string, PostEntry[]> = {};
  const featureByCategoryMap: Record<
    string,
    Record<string, PostEntry | null>
  > = {};
  const entriesByCategoryMap: Record<string, Record<string, PostEntry[]>> = {};
  for (const [loc, obj] of Object.entries(byLocaleEntries)) {
    featureMap[loc] = obj.featureEntry;
    entriesMap[loc] = obj.entries;
    featureByCategoryMap[loc] = obj.featureByCategory;
    entriesByCategoryMap[loc] = obj.entriesByCategory;
  }

  const moduleText = `export type PostEntry = {\n  route: string;\n  locale: string;\n  title?: string;\n  featured?: boolean;\n  publishedAt?: string;\n  author?: string;\n  category?: string;\n  tags?: string[];\n  ogImage?: string;\n};\n\nexport const featureEntry = ${JSON.stringify(
    featureMap,
    null,
    2
  )} as const;\n\nexport const entries = ${JSON.stringify(
    entriesMap,
    null,
    2
  )} as const;\n\nexport const featureByCategory = ${JSON.stringify(
    featureByCategoryMap,
    null,
    2
  )} as const;\n\nexport const entriesByCategory = ${JSON.stringify(
    entriesByCategoryMap,
    null,
    2
  )} as const;\n\nexport type Locales = keyof typeof entries;\n`;

  const libDir = path.join(process.cwd(), "src", "lib");
  await fs.mkdir(libDir, { recursive: true });
  try {
    await fs.rm(path.join(libDir, "posts.generated.ts"));
  } catch {}
  await fs.writeFile(
    path.join(libDir, "postIndex.generated.ts"),
    moduleText,
    "utf8"
  );
}

async function run() {
  const { groups, postsByLocale } = await collectContent();
  const merged = merge(groups);
  await writeRoutingFile(merged);
  const computed = computePosts(postsByLocale);
  await writePostsFile(computed);
  // Emit sitemap paths for next-sitemap additionalPaths
  try {
    const routes = new Set<string>();
    const prefix = (l: string, p: string) => {
      const base = p === "/" ? "" : p;
      const out = `/${l}${base}`.replace(/\/+$/, "");
      return out || `/${l}`;
    };
    // Add base locale roots (e.g., /en, /vi)
    for (const l of existingRouting.locales) routes.add(`/${l}`);
    // Add localized static routes from merged pathnames, prefixed by locale
    for (const [, locMap] of Object.entries(merged)) {
      for (const l of existingRouting.locales) {
        const p = (locMap as Record<string, string>)[l];
        if (typeof p === "string" && p.startsWith("/"))
          routes.add(prefix(l, p));
      }
    }
    // Add dynamic post routes (feature + entries) per locale, prefixed by locale
    for (const l of existingRouting.locales) {
      const obj = computed[l];
      if (!obj) continue;
      const add = (p?: string) => {
        if (typeof p === "string" && p.startsWith("/"))
          routes.add(prefix(l, p));
      };
      add(obj.featureEntry?.route);
      for (const e of obj.entries) add(e.route);
      for (const arr of Object.values(obj.entriesByCategory)) {
        for (const e of arr) add(e.route);
      }
    }
    const list = Array.from(routes).sort();
    await fs.writeFile(
      path.join(process.cwd(), "sitemap.paths.json"),
      JSON.stringify(list, null, 2) + "\n",
      "utf8"
    );
  } catch (e) {
    console.warn("⚠️ Failed to emit sitemap.paths.json:", e);
  }
  console.log(
    `✅ updatePathname: groups=${Object.keys(groups).length}, totalRoutes=${
      Object.keys(merged).length
    }. Posts file generated.`
  );
}

run().catch((e) => {
  console.error("❌ updatePathname failed:", e);
  process.exit(1);
});
