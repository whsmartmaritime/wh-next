import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { components } from "@/components/mdx";

// Simple types
export interface ContentData {
  title: string;
  description: string;
  content?: React.ReactElement; // Only for MDX
  hero?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  sections?: Record<string, unknown>[];
  [key: string]: unknown; // For flexible JSON structure
}

/**
 * Universal content loader - handles both JSON and MDX
 * KISS approach: detect file type and return unified structure
 */
export async function loadContent(
  locale: string,
  section: string,
  category: string,
  slug?: string
): Promise<ContentData | null> {
  try {
    // MDX path (if slug provided)
    if (slug) {
      const mdxPath = path.join(
        process.cwd(),
        `messages/${locale}/${section}/${category}/${slug}.mdx`
      );
      try {
        const source = await fs.readFile(mdxPath, "utf-8");
        const { content, frontmatter } = await compileMDX({
          source,
          components,
          options: { parseFrontmatter: true },
        });

        const fm = frontmatter as Record<string, unknown>;
        const meta = (fm.meta as Record<string, unknown>) || {};
        return {
          title: (meta.title as string) || (fm.title as string) || "",
          description:
            (meta.description as string) || (fm.description as string) || "",
          content,
          ...fm, // Include all frontmatter data
        };
      } catch {
        // MDX not found, continue to JSON
      }
    }

    // JSON path
    const jsonPath = path.join(
      process.cwd(),
      `messages/${locale}/${section}/${category}.json`
    );
    const jsonContent = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(jsonContent);

    return {
      title: data.meta?.title || data.hero?.titleMain || "",
      description: data.meta?.description || data.hero?.description || "",
      ...data, // Include all JSON data
    };
  } catch (error) {
    console.error(`Error loading content:`, error);
    return null;
  }
}

/**
 * Get available slugs for a category (for static generation)
 */
export async function getSlugs(
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
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(".mdx", ""));
  } catch {
    return [];
  }
}

/**
 * Get available categories for a section (for static generation)
 */
export async function getCategories(
  locale: string,
  section: string
): Promise<string[]> {
  try {
    const dirPath = path.join(process.cwd(), `messages/${locale}/${section}`);
    const items = await fs.readdir(dirPath);
    return items
      .filter((item) => item.endsWith(".json"))
      .map((item) => item.replace(".json", ""));
  } catch {
    return [];
  }
}
