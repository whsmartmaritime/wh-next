import fs from "node:fs/promises";
import path from "node:path";

export async function loadMessages(
  locale: string,
  options?: { defaultLocale?: string }
): Promise<Record<string, unknown>> {
  const defaultLocale = options?.defaultLocale ?? "en";
  const localeDir = path.join(process.cwd(), "messages", locale);

  try {
    const result: Record<string, unknown> = {};

    // Đệ quy đọc tất cả file .json trong folder và subfolder
    async function readDirRecursive(dir: string, prefix = "") {
      const names = await fs.readdir(dir, { withFileTypes: true });
      for (const name of names) {
        const fullPath = path.join(dir, name.name);
        if (name.isDirectory()) {
          await readDirRecursive(
            fullPath,
            prefix ? `${prefix}/${name.name}` : name.name
          );
        } else if (name.isFile() && name.name.toLowerCase().endsWith(".json")) {
          const content = await fs.readFile(fullPath, "utf8");
          const data = JSON.parse(content) as Record<string, unknown>;
          const namespace = prefix
            ? `${prefix}/${path.basename(name.name, ".json")}`
            : path.basename(name.name, ".json");
          result[namespace] = data;
        }
      }
    }

    await readDirRecursive(localeDir);

    // Nếu không có file nào, fallback sang monolithic
    if (Object.keys(result).length === 0) {
      return await loadFromMonolith(locale, defaultLocale);
    }

    return result;
  } catch {
    return await loadFromMonolith(locale, defaultLocale);
  }
}

async function loadFromMonolith(
  locale: string,
  defaultLocale: string
): Promise<Record<string, unknown>> {
  try {
    return (await import(`../../messages/${locale}.json`)).default as Record<
      string,
      unknown
    >;
  } catch {
    return (await import(`../../messages/${defaultLocale}.json`))
      .default as Record<string, unknown>;
  }
}
