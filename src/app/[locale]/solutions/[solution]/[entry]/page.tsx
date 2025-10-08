import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type EntryFrontmatter = {
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  category?: string;
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

  return (
    <>
      {/** BgGrid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 container-gutter grid grid-cols-12 h-full pointer-events-none select-none"
      >
        <div className="col-start-1 border-l border-neutral-500/20 h-full" />
        <div className="col-start-3 border-l border-neutral-500/20 h-full hidden lg:block" />
        <div className="col-start-7 border-l border-neutral-500/20 h-full hidden md:block" />
        <div className="col-start-11 border-l border-neutral-500/20 h-full hidden lg:block" />
        <div className="col-start-12 border-r border-neutral-500/20 h-full" />
      </div>
      <div className="container-gutter grid grid-cols-12">
        {/** Cột 1 */}
        <div className="col-span-2 hidden lg:block flex flex-col">
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
        <div className="col-span-12 lg:col-span-8 lg:col-start-4">
          <article className="  flex flex-col items-start justify-center py-8 lg:py-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 lg:mb-16">
              {frontmatter.meta.title}
            </h1>
            <div className="aspect-[16/9] w-[124.5%] lg:-translate-x-1/10">
              <Image
                src={frontmatter.meta.ogImage}
                alt={frontmatter.meta.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="w-full">
              <Entry />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
export const dynamicParams = false;
