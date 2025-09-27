import fs from "fs/promises";
import path from "path";
import type { JSONContent, ContentParams } from "../types";

/**
 * Load JSON content from messages directory
 */
export async function loadJSONContent(
  params: ContentParams
): Promise<JSONContent | null> {
  try {
    const { locale, section, category } = params;
    const filePath = path.join(
      process.cwd(),
      `messages/${locale}/${section}/${category}.json`
    );

    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content);

    return {
      type: "json",
      meta: {
        title: data.meta?.title || data.hero?.titleMain || "",
        description: data.meta?.description || data.hero?.description || "",
        ogImage: data.meta?.ogImage,
        canonical: data.meta?.canonical,
        slug: data.meta?.slug || category,
        ...data.meta,
      },
      hero: data.hero,
      sections: data.sections || [],
    };
  } catch (error) {
    console.error(`Error loading JSON content: ${error}`);
    return null;
  }
}

/**
 * Check if JSON file exists
 */
export async function jsonExists(params: ContentParams): Promise<boolean> {
  try {
    const { locale, section, category } = params;
    const filePath = path.join(
      process.cwd(),
      `messages/${locale}/${section}/${category}.json`
    );

    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all available JSON categories for a section
 */
export async function getJSONCategories(
  locale: string,
  section: string
): Promise<string[]> {
  try {
    const dirPath = path.join(process.cwd(), `messages/${locale}/${section}`);
    const files = await fs.readdir(dirPath);

    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));
  } catch (error) {
    console.error(`Error getting JSON categories: ${error}`);
    return [];
  }
}
