import type { Content, ContentParams } from "./types";
import { loadJSONContent, jsonExists } from "./json/loader";
import { loadMDXContent, mdxExists } from "./mdx/loader";

/**
 * Unified content loader that handles both JSON and MDX
 * Priority: MDX first (if slug provided), then JSON
 */
export async function loadContent(
  params: ContentParams
): Promise<Content | null> {
  // If slug is provided, try to load MDX first
  if (params.slug) {
    const mdxContent = await loadMDXContent(params);
    if (mdxContent) return mdxContent;
  }

  // Fallback to JSON content (for main pages)
  const jsonContent = await loadJSONContent(params);
  if (jsonContent) return jsonContent;

  return null;
}

/**
 * Check if content exists (either MDX or JSON)
 */
export async function contentExists(params: ContentParams): Promise<boolean> {
  if (params.slug) {
    return await mdxExists(params);
  }
  return await jsonExists(params);
}

/**
 * Get content type for given parameters
 */
export async function getContentType(
  params: ContentParams
): Promise<"mdx" | "json" | null> {
  if (params.slug && (await mdxExists(params))) {
    return "mdx";
  }
  if (await jsonExists(params)) {
    return "json";
  }
  return null;
}
