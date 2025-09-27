import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import type { MDXContent, ContentParams } from "../types";
import { components } from "@/components/mdx";

/**
 * Load MDX content from messages directory
 */
export async function loadMDXContent(
  params: ContentParams
): Promise<MDXContent | null> {
  try {
    const { locale, section, category, slug } = params;

    if (!slug) {
      throw new Error("Slug is required for MDX content");
    }

    const filePath = path.join(
      process.cwd(),
      `messages/${locale}/${section}/${category}/${slug}.mdx`
    );

    const source = await fs.readFile(filePath, "utf-8");
    const { content, frontmatter } = await compileMDX({
      source,
      components,
      options: {
        parseFrontmatter: true,
      },
    });

    const fm = frontmatter as Record<string, unknown>;

    return {
      type: "mdx",
      content,
      frontmatter: fm,
      meta: {
        title: (fm.title as string) || "",
        description: (fm.description as string) || "",
        slug: (fm.slug as string) || slug,
        publishedAt: fm.publishedAt as string,
        author: fm.author as string,
        category: fm.category as string,
        tags: fm.tags as string[],
        featured: fm.featured as boolean,
        ogImage: fm.coverImage as string,
      },
      hero: {
        titleMain: (fm.title as string) || "",
        description: (fm.description as string) || "",
      },
    };
  } catch (error) {
    console.error(`Error loading MDX content: ${error}`);
    return null;
  }
}

/**
 * Check if MDX file exists
 */
export async function mdxExists(params: ContentParams): Promise<boolean> {
  try {
    const { locale, section, category, slug } = params;

    if (!slug) return false;

    const filePath = path.join(
      process.cwd(),
      `messages/${locale}/${section}/${category}/${slug}.mdx`
    );

    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all available MDX slugs for a category
 */
export async function getMDXSlugs(
  locale: string,
  section: string,
  category: string
): Promise<string[]> {
  try {
    const dirPath = path.join(
      process.cwd(),
      `messages/${locale}/${section}/${category}`
    );
    const files = await fs.readdir(dirPath);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""));
  } catch (error) {
    console.error(`Error getting MDX slugs: ${error}`);
    return [];
  }
}
