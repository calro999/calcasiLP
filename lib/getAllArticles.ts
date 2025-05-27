import path from "path";
import fs from "fs/promises";
import type { Article } from "@/lib/types";

/**
 * 多言語対応記事一覧取得関数
 * @param lang - 'ja' または 'en'
 * @returns Article配列
 */
export async function getAllArticles(lang: "ja" | "en"): Promise<Article[]> {
  const dirPath = path.join(process.cwd(), "contents", "articles", lang);

  let files: string[];

  try {
    files = await fs.readdir(dirPath);
  } catch (error) {
    console.warn(`[getAllArticles] フォルダが見つかりません: ${dirPath}`);
    return []; // フォルダがない場合は空配列
  }

  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  if (jsonFiles.length === 0) return [];

  const articlesPromises = jsonFiles.map(async (filename) => {
    const filePath = path.join(dirPath, filename);
    const fileContents = await fs.readFile(filePath, "utf8");
    const article: Article = JSON.parse(fileContents);
    return {
      ...article,
      slug: `/article/${article.id}`, // slugを追加して他の機能と連携
    };
  });

  const articles = await Promise.all(articlesPromises);
  return articles.sort((a, b) => b.id - a.id);
}
