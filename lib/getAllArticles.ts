import fs from "fs/promises";
import path from "path";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  slug: string;
  image: string;
};

export async function getAllArticles(locale: "ja" | "en"): Promise<Article[]> {
  try {
    const articlesDir = path.join(process.cwd(), "articles", locale);
    const fileNames = await fs.readdir(articlesDir);
    const jsonFiles = fileNames.filter((file) => file.endsWith(".json"));

    const articles = await Promise.all(
      jsonFiles.map(async (fileName) => {
        const filePath = path.join(articlesDir, fileName);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const article = JSON.parse(fileContent);
        return article as Article;
      })
    );

    return articles;
  } catch (error) {
    console.error("記事読み込み中にエラー:", error);
    return [];
  }
}
