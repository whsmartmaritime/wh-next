import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { routing as existingRouting } from '../i18n/routing';

// --- Types ---------------------------------------------------------------
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
	featured?: boolean;
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

// --- Core Functions ------------------------------------------------------

/**
 * Recursively walk directory and collect MDX files
 */
const walk = async (dir: string): Promise<string[]> => {
	try {
		const ents = await fs.readdir(dir, { withFileTypes: true });
		const out: string[] = [];
		for (const e of ents) {
			const full = path.join(dir, e.name);
			if (e.isDirectory()) out.push(...(await walk(full)));
			else if (e.isFile() && e.name.endsWith('.mdx')) out.push(full);
		}
		return out;
	} catch {
		return [];
	}
};

/**
 * Normalize path separators
 */
const norm = (p: string) => p.replace(/\\/g, '/');

/**
 * Validate date string
 */
function isValidDateStr(s?: string): boolean {
	if (!s) return false;
	const t = Date.parse(s);
	return Number.isFinite(t);
}

/**
 * Create sort function by date descending
 */
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

/**
 * Collect content from MDX files
 */
async function collectContent(): Promise<{
	groups: Record<
		string,
		{ canonical: string; perLocale: Record<string, string> }
	>;
	postsByLocale: Record<string, Array<PostEntry>>;
}> {
	const { locales, defaultLocale } = existingRouting;
	const groups: Record<
		string,
		{ canonical: string; perLocale: Record<string, string> }
	> = {};
	const postsByLocale: Record<string, Array<PostEntry>> = Object.fromEntries(
		locales.map((l) => [l, [] as PostEntry[]]),
	);

	// Localize directory route helper
	function localizeDirRoute(dirRoute: string, locale: string): string {
		if (!dirRoute || locale === defaultLocale) return dirRoute;

		const { pathnames } = existingRouting as unknown as {
			pathnames: Record<string, Record<string, string>>;
		};

		const segs = dirRoute.split('/').filter(Boolean);
		const ancestors: string[] = [];
		for (let i = 0; i < segs.length; i++) {
			ancestors.push(`/${segs.slice(0, i + 1).join('/')}`);
		}

		for (let i = ancestors.length - 1; i >= 0; i--) {
			const ancestor = ancestors[i];
			const entry = pathnames[ancestor];
			if (entry?.[locale]) {
				return entry[locale];
			}
		}
		return dirRoute;
	}

	// Process each locale
	for (const locale of locales) {
		const baseDir = path.join(process.cwd(), 'src', 'content', locale);

		for (const file of await walk(baseDir)) {
			const rel = norm(path.relative(baseDir, file));
			const parts = rel.split('/');
			const base = parts.pop()?.replace(/\.mdx$/, '');
			const dirRoute = parts.length ? `/${parts.join('/')}` : '';

			const { data } = matter(await fs.readFile(file, 'utf8'));
			const fm = data as Frontmatter;

			const slug = fm.slug ?? fm.meta?.slug;
			if (!slug) {
				console.warn('⚠️ Missing slug:', file);
				continue;
			}

			const localizedDir = localizeDirRoute(dirRoute, locale);
			const route = `${localizedDir}/${slug}`.replace(/\/+/, '/');

			const groupId = `${dirRoute}|${base}`;
			groups[groupId] ||= { canonical: route, perLocale: {} };
			if (locale === defaultLocale) groups[groupId].canonical = route;

			const existing = groups[groupId].perLocale[locale];
			if (existing && existing !== route) {
				console.warn('⚠️ Slug conflict:', file);
				continue;
			}
			groups[groupId].perLocale[locale] = route;

			// Collect post metadata if published
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

/**
 * Merge groups with existing routing
 */
function merge(
	groups: Record<
		string,
		{ canonical: string; perLocale: Record<string, string> }
	>,
): RouteMap {
	const { defaultLocale, pathnames: existing } = existingRouting;
	const merged: RouteMap = { ...existing };

	for (const g of Object.values(groups)) {
		const key = g.canonical;

		// Ensure parent paths exist
		key
			.split('/')
			.filter(Boolean)
			.reduce((acc, seg) => {
				const p = `${acc}/${seg}`.replace(/\/+/, '/');
				if (!merged[p]) merged[p] = { [defaultLocale]: p };
				return p;
			}, '');

		merged[key] ||= {};
		for (const [loc, locPath] of Object.entries(g.perLocale)) {
			merged[key][loc] = locPath;
		}
	}

	return Object.fromEntries(
		Object.keys(merged)
			.sort()
			.map((k) => [k, merged[k]]),
	);
}

/**
 * Generate routing.ts file content
 */
function printPathnames(map: RouteMap): string {
	const orderLocales = [...existingRouting.locales];
	const localeSet = new Set(orderLocales);

	return [
		'{',
		...Object.keys(map)
			.sort()
			.map((rk, i, arr) => {
				const locales = (
					Object.keys(map[rk]) as (typeof orderLocales)[number][]
				)
					.filter((s) => localeSet.has(s))
					.sort((a, b) => orderLocales.indexOf(a) - orderLocales.indexOf(b));

				const inner = locales
					.map(
						(l, li) =>
							`    ${l}: ${JSON.stringify(map[rk][l])}${
								li === locales.length - 1 ? '' : ','
							}`,
					)
					.join('\n');

				return `  ${JSON.stringify(rk)}: {\n${inner}\n  }${
					i === arr.length - 1 ? '' : ','
				}`;
			}),
		'}',
	].join('\n');
}

/**
 * Compute posts data for UI
 */
function computePosts(byLocale: Record<string, Array<PostEntry>>) {
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
			if (!p.category) continue;
			if (!groups[p.category]) groups[p.category] = [];
			groups[p.category].push(p);
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

/**
 * Write routing.ts file
 */
async function writeRoutingFile(merged: RouteMap) {
	const content = `import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ${JSON.stringify(existingRouting.locales, null, 2)},
  defaultLocale: ${JSON.stringify(existingRouting.defaultLocale)},
  pathnames: ${printPathnames(merged)}
});
`;
	await fs.writeFile(
		path.join(process.cwd(), 'src', 'i18n', 'routing.ts'),
		content,
		'utf8',
	);
}

/**
 * Write posts data file
 */
async function writePostsFile(
	computed: Record<
		string,
		{
			featureEntry: PostEntry | null;
			entries: PostEntry[];
			featureByCategory: Record<string, PostEntry | null>;
			entriesByCategory: Record<string, PostEntry[]>;
		}
	>,
) {
	const featureMap: Record<string, PostEntry | null> = {};
	const entriesMap: Record<string, PostEntry[]> = {};
	const featureByCategoryMap: Record<
		string,
		Record<string, PostEntry | null>
	> = {};
	const entriesByCategoryMap: Record<string, Record<string, PostEntry[]>> = {};

	for (const [loc, obj] of Object.entries(computed)) {
		featureMap[loc] = obj.featureEntry;
		entriesMap[loc] = obj.entries;
		featureByCategoryMap[loc] = obj.featureByCategory;
		entriesByCategoryMap[loc] = obj.entriesByCategory;
	}

	const moduleText = `export type PostEntry = {
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

export const featureEntry = ${JSON.stringify(featureMap, null, 2)} as const;

export const entries = ${JSON.stringify(entriesMap, null, 2)} as const;

export const featureByCategory = ${JSON.stringify(
		featureByCategoryMap,
		null,
		2,
	)} as const;

export const entriesByCategory = ${JSON.stringify(
		entriesByCategoryMap,
		null,
		2,
	)} as const;

export type Locales = keyof typeof entries;
`;

	const libDir = path.join(process.cwd(), 'src', 'lib');
	await fs.mkdir(libDir, { recursive: true });
	try {
		await fs.rm(path.join(libDir, 'posts.generated.ts'));
	} catch {}
	await fs.writeFile(
		path.join(libDir, 'postIndex.generated.ts'),
		moduleText,
		'utf8',
	);
}

// --- Main -----------------------------------------------------------------

async function run() {
	try {
		const { groups, postsByLocale } = await collectContent();
		const merged = merge(groups);
		await writeRoutingFile(merged);
		const computed = computePosts(postsByLocale);
		await writePostsFile(computed);

		console.log(
			`✅ updatePathname: groups=${Object.keys(groups).length}, totalRoutes=${
				Object.keys(merged).length
			}. Posts file generated.`,
		);
	} catch (e) {
		console.error('❌ updatePathname failed:', e);
		process.exit(1);
	}
}

run();
