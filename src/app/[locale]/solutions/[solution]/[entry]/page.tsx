import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { routing } from "@/i18n/routing";

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

  const raw = await fs.readFile(
    path.join(
      process.cwd(),
      "src",
      "content",
      locale,
      "solutions",
      solution,
      `${entry}.mdx`
    ),
    "utf-8"
  );
  const { data: frontmatter } = matter(raw);

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

  const raw = await fs.readFile(
    path.join(
      process.cwd(),
      "src",
      "content",
      locale,
      "solutions",
      solution,
      `${entry}.mdx`
    ),
    "utf-8"
  );
  const { data: frontmatter } = matter(raw);
  const { default: Entry } = await import(
    `@/content/${locale}/solutions/${solution}/${entry}.mdx`
  );
  return (
    <>
      <h1>{frontmatter.title}</h1>
      {frontmatter.description}

      <article className="prose max-w-none">
        <Entry />
      </article>
    </>
  );
}
export const dynamicParams = false;
