import path from "path";
import fs from "fs/promises";
import { Strategy } from "./types";

export async function getAllStrategies(lang: "ja" | "en"): Promise<Strategy[]> {
  try {
    const dir = path.join(process.cwd(), "contents", "strategies", lang);

    // ✅ フォルダ存在チェック
    const dirStat = await fs.stat(dir).catch(() => null);
    if (!dirStat || !dirStat.isDirectory()) {
      console.warn(`[getAllStrategies] フォルダが存在しません: ${dir}`);
      return [];
    }

    const files = await fs.readdir(dir);

    const strategies = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const filePath = path.join(dir, file);
          const content = await fs.readFile(filePath, "utf8");
          return JSON.parse(content) as Strategy;
        })
    );

    return strategies.sort((a, b) => b.id - a.id);
  } catch (error) {
    console.error(`[getAllStrategies] エラー:`, error);
    return [];
  }
}
