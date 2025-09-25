import { join } from "path";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import { cache } from "react";

export interface CategoryMetadata {
  title: string;
  description: string;
  icon?: string;
  order: number;
  content?: string;
}

export const getCategoryMetadata = cache(
  async (
    categoryPath: string,
    locale: string
  ): Promise<CategoryMetadata | null> => {
    try {
      // Construct the path to the category metadata file
      const metaPath = join(
        process.cwd(),
        "content/posts",
        categoryPath,
        "_meta",
        `${locale}.mdx`
      );

      // Read and parse the metadata file
      const source = await readFile(metaPath, "utf-8");
      const { data, content } = matter(source);

      return {
        title: data.title,
        description: data.description,
        icon: data.icon,
        order: data.order || 99,
        content: content,
      };
    } catch (error) {
      console.error(`Error reading category metadata: ${error}`);
      return null;
    }
  }
);
