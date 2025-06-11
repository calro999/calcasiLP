import fs from "fs/promises";
import path from "path";

export interface Article {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  excerpt: string;
  content?: string;
}

export async function getAllArticles(lang: string = "ja"): Promise<Article[]> {
  const dir = path.join(process.cwd(), "contents", "articles", lang);

  try {
    const files = await fs.readdir(dir);
    const articles = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const data = await fs.readFile(path.join(dir, file), "utf8");
          return JSON.parse(data) as Article;
        })
    );

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("記事の読み込みエラー:", error);
    return [];
  }
}
