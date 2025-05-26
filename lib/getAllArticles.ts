import fs from "fs/promises";
import path from "path";

type Article = {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
};

export async function getAllArticles(locale: "ja" | "en"): Promise<Article[]> {
  try {
    const filePath = path.join(process.cwd(), "articles", `${locale}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents) as Article[];
  } catch (err) {
    // ファイルがない、JSONエラー、などすべて空配列で処理
    return [];
  }
}
