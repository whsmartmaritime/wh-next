import fs from 'node:fs/promises';
import path from 'node:path';

// Load messages for a locale by merging all JSON files under messages/{locale}
// Each file represents a namespace. The file name (without extension) is used
// as the top-level key, and the JSON content is assigned as its value.
export async function loadMessages(
  locale: string,
  options?: { defaultLocale?: string }
): Promise<Record<string, unknown>> {
  const defaultLocale = options?.defaultLocale ?? 'en';

  const localeDir = path.join(process.cwd(), 'messages', locale);
  try {
    const names = await fs.readdir(localeDir);
    const result: Record<string, unknown> = {};

    // Only consider .json files at the top level of the locale folder
    const jsonFiles = names.filter((n) => n.toLowerCase().endsWith('.json'));

    // If the folder exists but is empty, fall back to monolithic JSON
    if (jsonFiles.length === 0) {
      return await loadFromMonolith(locale, defaultLocale);
    }

    await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(localeDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(content) as Record<string, unknown>;
        const namespace = path.basename(file, path.extname(file));
        result[namespace] = data;
      })
    );

    return result;
  } catch {
    // If the folder is missing or reading fails, try the monolithic JSON
    return await loadFromMonolith(locale, defaultLocale);
  }
}

async function loadFromMonolith(
  locale: string,
  defaultLocale: string
): Promise<Record<string, unknown>> {
  try {
    return (await import(`../../messages/${locale}.json`)).default as Record<string, unknown>;
  } catch {
    return (await import(`../../messages/${defaultLocale}.json`)).default as Record<
      string,
      unknown
    >;
  }
}
