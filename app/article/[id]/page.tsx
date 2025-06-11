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

  async function safeFetchJson(url: string): Promise<any | null> {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const text = await res.text();

      if (!res.ok || text.startsWith("<")) {
        console.warn(`不正な応答（HTMLや失敗）: ${url}`);
        return null;
      }

      return JSON.parse(text);
    } catch (err) {
      console.error("safeFetchJson エラー:", err);
      return null;
    }
  }

  // slug 試行
  const slugUrl = `${baseUrl}?slug=${slug}&_embed`;
  const slugData = await safeFetchJson(slugUrl);

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

  // ID fallback
  const idUrl = `${baseUrl}/${wpId}?_embed`;
  const post = await safeFetchJson(idUrl);

  if (post && post.id) {
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

  return null;
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
