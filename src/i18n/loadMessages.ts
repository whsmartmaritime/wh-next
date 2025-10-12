import fs from "node:fs/promises";
import path from "node:path";

export async function loadMessages(
  locale: string
): Promise<Record<string, unknown>> {
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

    // Nếu không có file nào, trả về rỗng hoặc throw error
    if (Object.keys(result).length === 0) {
      // Có thể throw hoặc trả về {} tuỳ ý
      throw new Error(`Không tìm thấy messages cho locale: ${locale}`);
      // return {};
    }

    return result;
  } catch (err) {
    // Có thể log lỗi hoặc trả về rỗng
    throw new Error(`Lỗi load messages cho locale: ${locale}: ${err}`);
    // return {};
  }
}
