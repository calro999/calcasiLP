import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  content: string;
  image: string;
};

export async function getAllArticles(locale: "ja" | "en"): Promise<Article[]> {
  const dirPath = path.join(process.cwd(), "articles", locale);
  const files = fs.readdirSync(dirPath);

  const articles = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      const id = path.basename(file, ".md");

      return {
        id,
        slug: `/${locale}/strategies/${id}`,
        title: data.title || "",
        excerpt: data.excerpt || "",
        date: data.date || "",
        readTime: data.readTime || "",
        author: data.author || "",
        category: data.category || "",
        content,
        image: data.image || "/placeholder.svg",
      };
    });

  return articles;
}
