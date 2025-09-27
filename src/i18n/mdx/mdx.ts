import fs from "fs/promises";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";
import { generateSlug } from "./utils";

// Types
interface MDXContent {
  frontmatter: MDXFrontmatter;
  content: ReactElement;
}

interface MDXFrontmatter {
  title: string;
  description?: string;
  publishedAt?: string;
  author?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  slug?: string;
}

interface FileInfo {
  locale: string;
  section: string; // 'solutions' or 'services'
  category: string; // e.g., 'navigation', 'gmdss', etc.
  filePath: string;
}

/**
 * Get MDX content from a file
 */
export async function getMDXContent(
  filePath: string,
  components?: any
): Promise<MDXContent> {
  const source = await fs.readFile(filePath, "utf-8");
  const { content, frontmatter } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    content,
    frontmatter: frontmatter as MDXFrontmatter,
  };
}

/**
 * Find all MDX files in a specific section and category
 */
export async function findMDXFiles(
  locale: string,
  section: string,
  category: string
): Promise<string[]> {
  const basePath = path.join(
    process.cwd(),
    "messages",
    locale,
    section,
    category
  );
  const pattern = "*.mdx";

  try {
    return await glob(pattern, { cwd: basePath, absolute: true });
  } catch (error) {
    console.error(`Error finding MDX files: ${error}`);
    return [];
  }
}

/**
 * Extract file info from file path
 */
export function getFileInfo(filePath: string): FileInfo | null {
  const match = filePath.match(
    /messages\/(en|vi)\/(solutions|services)\/([^/]+)/
  );
  if (!match) return null;

  return {
    locale: match[1],
    section: match[2],
    category: match[3],
    filePath,
  };
}
