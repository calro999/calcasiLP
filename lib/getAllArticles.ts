import fs from "fs";
import path from "path";

export type Article = {
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

// localeごとのコンテンツ格納ディレクトリ
const CONTENT_DIR_MAP: Record<string, string> = {
  ja: "contents/strategies",
  en: "contents/strategies",
};

export async function getAllArticles(locale: "ja" | "en"): Promise<Article[]> {
  const dirPath = path.join(process.cwd(), CONTENT_DIR_MAP[locale]);

  try {
    const files = fs.readdirSync(dirPath);
    const articles: Article[] = files
      .filter(file => file.endsWith(".json"))
      .map(file => {
        const filePath = path.join(dirPath, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        return {
          ...data,
          id: String(data.id), // IDをstringに変換
          slug: `/${locale}/strategies/${data.id}`
        };
      });

    return articles;
  } catch (err) {
    console.warn(`記事の取得に失敗しました: ${err}`);
    return [];
  }
}
