// /lib/getAllArticles.ts
import fs from "fs";
import path from "path";

export type Article = {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  slug: string;
  locale: string;
};

const CATEGORIES = ["strategies"]; // 必要に応じて増やす（例: casino-ranking 等）
const LOCALES = ["ja", "en"]; // 多言語対応

export async function getAllArticles(locale: string): Promise<Article[]> {
  if (!LOCALES.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const allArticles: Article[] = [];

  for (const category of CATEGORIES) {
    const articlesDir = path.join(process.cwd(), "app", locale, category, "articles");
    if (!fs.existsSync(articlesDir)) continue;

    const files = fs.readdirSync(articlesDir).filter(file => file.endsWith(".json"));

    for (const file of files) {
      const filePath = path.join(articlesDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const json = JSON.parse(raw);

      allArticles.push({
        ...json,
        category,
        locale,
        slug: `/${locale}/${category}/${json.id}`,
      });
    }
  }

  // 日付順で並べ替え（新しい順）
  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allArticles;
}
