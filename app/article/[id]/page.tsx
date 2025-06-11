export const dynamic = "force-dynamic";
import React from "react";
import fs from "fs/promises";
import path from "path";
import parse from "html-react-parser";
import { notFound } from "next/navigation";

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

async function getLocalArticle(id: number): Promise<Article | null> {
  const lang = "ja";
  const filePath = path.join(process.cwd(), "contents", "articles", lang, `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    console.log("✅ Local article loaded:", filePath);
    return JSON.parse(fileContents);
  } catch (e) {
    console.error("❌ Local article not found:", filePath);
    return null;
  }
}

async function getWpArticle(id: number): Promise<Article | null> {
  const wpId = id - 1000;
  const slug = `news-${wpId}`;
  const baseUrl = "https://calacasi-lp.ct.ws/wp-json/wp/v2/posts";

  try {
    // ① slug で取得
    const slugRes = await fetch(`${baseUrl}?slug=${slug}&_embed`, { cache: "no-store" });
    console.log("Fetching by slug:", slug, "Status:", slugRes.status);

    if (slugRes.ok) {
      const slugData = await slugRes.json();

      // 正常に記事が返ってきたら（配列のはず）
      if (Array.isArray(slugData) && slugData.length > 0) {
        const post = slugData[0];
        return {
          id: post.id + 1000,
          title: post.title.rendered,
          content: post.content.rendered,
          image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/no-image.jpg",
          category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "WordPress",
          date: post.date,
          readTime: "約5分",
          author: post._embedded?.["author"]?.[0]?.name || "WordPress",
        };
      }
    }

    // ② slug で失敗 → IDで直接取得
    const idRes = await fetch(`${baseUrl}/${wpId}?_embed`, { cache: "no-store" });
    console.log("Fallback fetch by ID:", wpId, "Status:", idRes.status);

    if (!idRes.ok) return null;

    const post = await idRes.json();

    return {
      id: post.id + 1000,
      title: post.title.rendered,
      content: post.content.rendered,
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/no-image.jpg",
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "WordPress",
      date: post.date,
      readTime: "約5分",
      author: post._embedded?.["author"]?.[0]?.name || "WordPress",
    };
  } catch (err) {
    console.error("WP記事取得エラー:", err);
    return null;
  }
}

interface Props {
  params: { id: string };
}

export default async function ArticlePage({ params }: Props) {
  const id = parseInt(params.id);
  console.log("🔢 Parsed ID:", id);

  let article: Article | null = null;

  if (id >= 1000) {
    article = await getWpArticle(id);
  } else {
    article = await getLocalArticle(id);
  }

  if (!article) {
    console.error("❌ Article not found:", id);
    notFound();
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      <article className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-300 mb-4">{article.title}</h1>
        <div className="text-gray-400 text-sm mb-6">
          <span className="mr-4">公開日: {article.date}</span>
          <span className="mr-4">カテゴリ: {article.category}</span>
          <span>著者: {article.author}</span>
        </div>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto rounded-lg mb-6"
          />
        )}
        <div className="prose prose-invert max-w-none">{parse(article.content)}</div>
      </article>
    </main>
  );
}
