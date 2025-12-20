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
  slug: string;
  ogUrl?: string; // ogUrlをインターフェースに追加
}

// lang引数は残しておきますが、内部では使用しないように変更してエラーを防ぎます
export async function getAllArticles(lang: string = "ja"): Promise<Article[]> {
  // contents/articles 直下を見るように修正
  const dir = path.join(process.cwd(), "contents", "articles");

  try {
    const files = await fs.readdir(dir);
    const articles = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const data = JSON.parse(await fs.readFile(path.join(dir, file), "utf8"));
          
          // ogUrlがある場合はその末尾を、ない場合はIDをスラッグにする
          const urlPart = data.ogUrl 
            ? data.ogUrl.split('/').filter(Boolean).pop() 
            : data.id.toString();

          return {
            ...data,
            slug: `/article/${urlPart}`, // 正しいURL形式に統一
          };
        })
    );

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("記事の読み込みエラー:", error);
    return [];
  }
}