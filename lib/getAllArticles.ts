import fs from "fs/promises";
import path from "path";
import { Article } from "./types";

export async function getAllArticles(lang: "ja" | "en"): Promise<Article[]> {
  const articlesDir = path.join(process.cwd(), "contents", "articles", lang);
  let filenames: string[];

  try {
    const dirEntries = await fs.readdir(articlesDir, { withFileTypes: true });
    filenames = dirEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => entry.name);
  } catch (error) {
    console.warn(`[getAllArticles] フォルダが見つかりません: ${articlesDir}`);
    return []; // 空でもOK
  }

  const articlesPromises = filenames.map(async (filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = await fs.readFile(filePath, "utf8");
    const article: Article = JSON.parse(fileContents);
    return article;
  });

  const articles = await Promise.all(articlesPromises);
  return articles.sort((a, b) => b.id - a.id);
}
