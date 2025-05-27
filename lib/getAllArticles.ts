import path from "path";
import fs from "fs/promises";
import { Article } from "./types";

export async function getAllArticles(lang: "ja" | "en"): Promise<Article[]> {
  try {
    const dir = path.join(process.cwd(), "contents", "articles", lang);
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const articles = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
        .map(async (entry) => {
          const filePath = path.join(dir, entry.name);
          const content = await fs.readFile(filePath, "utf8");
          return JSON.parse(content) as Article;
        })
    );

    return articles.sort((a, b) => b.id - a.id);
  } catch (error) {
    console.error(`[getAllArticles] エラー:`, error);
    return [];
  }
}
