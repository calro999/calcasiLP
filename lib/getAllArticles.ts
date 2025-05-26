import fs from "fs";
import path from "path";

type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
};

export async function getAllArticles(locale: "ja" | "en"): Promise<Article[]> {
  const articlesDir = path.join(process.cwd(), "articles", locale);

  // フォルダが存在しない場合は空配列を返す
  if (!fs.existsSync(articlesDir)) return [];

  const fileNames = fs.readdirSync(articlesDir);
  const articles: Article[] = [];

  for (const fileName of fileNames) {
    const filePath = path.join(articlesDir, fileName);
    const fileContents = fs.readFileSync(filePath, "utf-8");

    try {
      const article: Article = JSON.parse(fileContents);
      articles.push(article);
    } catch (e) {
      console.warn(`[getAllArticles] JSON parse error in ${fileName}`);
    }
  }

  return articles;
}
