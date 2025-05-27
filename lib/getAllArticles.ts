// lib/getAllArticles.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article } from "@/types/article";

const articlesDirectory = path.join(process.cwd(), "contents/articles");

export async function getAllArticles(): Promise<Article[]> {
  const categories = fs.readdirSync(articlesDirectory);
  const articles: Article[] = [];

  for (const category of categories) {
    const categoryPath = path.join(articlesDirectory, category);
    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      articles.push({
        ...(data as Article),
        slug: `/${category}/${data.id}`,
        category,
      });
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
