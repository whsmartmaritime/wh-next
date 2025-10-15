import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import MediaCard from "@/components/MediaCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  entries,
  type Locales,
  type PostEntry,
} from "@/lib/postIndex.generated";
type EntryFrontmatter = {
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  meta: { title: string; description?: string; ogImage: string };
};
type MdxModule = {
  default: React.ComponentType;
  frontmatter: EntryFrontmatter;
};

export function generateStaticParams() {
  // Lấy toàn bộ path dạng /solutions/[solution]/[entry]
  const entryPaths = Object.keys(routing.pathnames).filter(
    (key) => key.startsWith("/solutions/") && key.split("/").length === 4
  );

  // Tạo danh sách params từ locales + đường dẫn
  return routing.locales.flatMap((locale) =>
    entryPaths.map((pathKey) => {
      const [, , solution, entry] = pathKey.split("/"); // ['', 'solutions', 'ais', 'introduction']
      return { locale, solution, entry };
    })
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; solution: string; entry: string }>;
}): Promise<Metadata> {
  const { locale, solution, entry } = await props.params;
  const { frontmatter } = (await import(
    `@/content/${locale}/solutions/${solution}/${entry}.mdx`
  )) as { frontmatter: EntryFrontmatter };

  const title = frontmatter.meta.title;
  const description = frontmatter.meta.description;
  const ogImage = frontmatter.meta.ogImage;

  // 📍 URL gốc của trang
  const base = new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  );

  const url = new URL(`${locale}/solutions/${solution}/${entry}`, base);

  // 🌐 Tạo alternate URL cho đa ngôn ngữ
  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      (routing.pathnames as Record<string, { [key: string]: string }>)[
        `/solutions/${solution}/${entry}`
      ]?.[l],
    ])
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function EntryPage(props: {
  params: Promise<{ locale: string; solution: string; entry: string }>;
}) {
  const { locale, solution, entry } = await props.params;
  const t = await getTranslations("entry");
  const { default: Entry, frontmatter } = (await import(
    `@/content/${locale}/solutions/${solution}/${entry}.mdx`
  )) as MdxModule;
  const l = locale as Locales;

  // Lấy toàn bộ bài viết theo locale để lọc theo tag
  const allEntries = entries as unknown as Record<
    Locales,
    ReadonlyArray<PostEntry>
  >;
  const pool = allEntries[l] ?? [];

  return (
    <>
      {/** BgGrid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 container-gutter grid grid-cols-16 h-full pointer-events-none select-none"
      >
        <div className="col-start-1 border-l border-neutral-500/20 h-full" />
        <div className="col-start-4 border-l border-neutral-500/20 h-full hidden lg:block" />
        <div className="col-start-14 border-l border-neutral-500/20 h-full hidden lg:block" />
        <div className="col-start-16 border-r border-neutral-500/20 h-full" />
      </div>
      <div className="container-gutter grid grid-cols-16 mt-4">
        <Breadcrumbs
          className="col-span-8 col-start-4 mx-8 lg:mx-16"
          items={[
            { label: locale === "vi" ? "Trang chủ" : "Home", href: `/` },
            {
              label: locale === "vi" ? "Giải pháp" : "Solutions",
              href: `/solutions`,
            },
            {
              label: locale === "vi" ? solution : solution,
              href: `/${locale}/solutions/${solution}`,
            },
            { label: frontmatter.publishedAt },
          ]}
        />
      </div>
      <article className="container-gutter grid grid-cols-16">
        {/** Cột 1 */}
        <div className="col-span-3 hidden lg:block flex flex-col">
          <div className="border-y border-neutral-500/20 flex flex-col py-8">
            <div className="text-xl md:text-2xl font-semibold ml-4 lg:ml-8 mb-2">
              {t("author")}
            </div>
            <div className="text-muted-foreground self-center">
              {frontmatter.author}
            </div>
          </div>
          <div className="border-y border-neutral-500/20 flex flex-col py-8">
            <div className="text-xl md:text-2xl font-semibold ml-4 lg:ml-8 mb-2">
              {t("publishedAt")}
            </div>
            <div className="text-muted-foreground self-center">
              {frontmatter.publishedAt}
            </div>
          </div>
          <div className="border-y border-neutral-500/20 flex flex-col py-8">
            <div className="text-xl md:text-2xl font-semibold ml-4 lg:ml-8 mb-2">
              {t("updatedAt")}
            </div>
            <div className="text-muted-foreground self-center">
              {frontmatter.updatedAt ?? frontmatter.publishedAt}
            </div>
          </div>
          <div className="border-y border-neutral-500/20 flex flex-col py-8">
            <div className="text-xl md:text-2xl font-semibold ml-4 lg:ml-8 mb-2">
              {t("category")}
            </div>
            <div className="text-muted-foreground self-center">
              {frontmatter.category}
            </div>
          </div>
        </div>
        {/** Cột 2 */}
        <div className="col-span-16 lg:col-span-13 ">
          <div className="  flex flex-col items-start justify-center ">
            <h1 className="text-4xl lg:text-6xl font-bold m-8 lg:m-16">
              {frontmatter.meta.title}
            </h1>
            <div className="relative aspect-[16/9] w-full ">
              <Image
                src={frontmatter.meta.ogImage}
                alt={frontmatter.meta.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="col-span-8 col-start-5">
          <Entry />
        </div>
      </article>
      {/* Lọc bài liên quan theo tag chung, loại bỏ bài hiện tại */}
      {(() => {
        const pathKey = `/solutions/${solution}/${entry}`;
        const currentRoute =
          (routing.pathnames as Record<string, Record<string, string>>)[
            pathKey
          ]?.[l] ?? `/${l}${pathKey}`;
        const tagSet = new Set(frontmatter.tags ?? []);
        const score = (p: PostEntry) =>
          (p.tags ?? []).reduce((acc, t) => acc + (tagSet.has(t) ? 1 : 0), 0);
        const related = pool
          .filter(
            (p) =>
              p.route !== currentRoute &&
              (p.tags ?? []).some((t) => tagSet.has(t))
          )
          .sort((a, b) => score(b) - score(a));
        return related.length > 0 ? (
          <section
            className="relative container-gutter flex flex-col items-center py-8"
            aria-label="related posts"
          >
            <div className="w-1/2">
              <h2 className="font-semibold text-2xl lg:text-4xl mb-4 lg:mb-8">
                {t("relatedPosts")}
              </h2>
              <div className="mb-4 lg:mb-8">
                {related.slice(0, 3).map((p: PostEntry) => (
                  <article
                    className="mb-4 lg:mb-8 text-muted-foreground"
                    key={p.route}
                  >
                    <MediaCard
                      data={{
                        href: p.route,
                        title: p.title,
                        description: [p.publishedAt, p.author]
                          .filter(Boolean)
                          .join(" • "),
                        imgSrc: p.ogImage,
                        imgAlt: p.title ?? "Article image",
                      }}
                      variant="compact"
                    />
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null;
      })()}
    </>
  );
}
export const dynamicParams = false;
