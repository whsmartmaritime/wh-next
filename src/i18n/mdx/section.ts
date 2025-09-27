import { join } from "path";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import { cache } from "react";

export interface SectionMetadata {
  title: string;
  description: string;
  icon?: string;
  order: number;
  content?: string;
}

export const getSectionMetadata = cache(
  async (
    section: string,
    category: string,
    locale: string
  ): Promise<SectionMetadata | null> => {
    try {
      // Construct the path to the metadata file
      const metaPath = join(
        process.cwd(),
        "messages",
        locale,
        section,
        category,
        "_meta.mdx"
      );

      // Read and parse the metadata file
      const source = await readFile(metaPath, "utf-8");
      const { data, content } = matter(source);

      return {
        title: data.title,
        description: data.description,
        icon: data.icon,
        order: data.order ?? 99,
        content: content.trim(),
      };
    } catch (error) {
      console.error(`Error loading metadata: ${error}`);
      return null;
    }
  }
);
