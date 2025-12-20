export const dynamic = "force-dynamic";
import React from "react";
import fs from "fs/promises";
import path from "path";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

interface Props {
  params: { id: string };
}

// 全記事の中から、ID（数字）または ogUrl の末尾が一致するものを探す関数
async function getArticleBySlugOrId(slug: string): Promise<Article | null> {
  const lang = "ja";
  const dir = path.join(process.cwd(), "contents", "articles", lang);

  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      
      const filePath = path.join(dir, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      const article: Article = JSON.parse(fileContents);

      // 1. IDが直接一致する場合 (例: article/13)
      if (article.id.toString() === slug) return article;

      // 2. ogUrlの末尾が一致する場合 (例: article/golden-panda)
      if (article.ogUrl) {
        const urlSlug = article.ogUrl.split('/').pop();
        if (urlSlug === slug) return article;
      }
    }
    return null;
  } catch (error) {
    console.error("記事の取得に失敗しました:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlugOrId(params.id);

  if (!article) {
    return { title: "記事が見つかりません" };
  }

  return {
    title: article.metaTitle || article.title, 
    description: article.metaDescription || "",
    openGraph: {
      title: article.ogTitle || article.metaTitle || article.title,
      description: article.ogDescription || article.metaDescription || "",
      url: article.ogUrl || `https://calcasi-lp.vercel.app/article/${params.id}`,
      images: [{ url: article.ogImage || article.image || "/default-og.jpg" }],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  // 文字列(golden-pandaなど)で記事を特定する
  const article = await getArticleBySlugOrId(params.id);

  if (!article) {
    return notFound();
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      <article className="max-w-3xl mx-auto px-4 text-white">
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

        <div className="prose prose-invert max-w-none">
          {parse(article.content)}
        </div>
      </article>
    </main>
  );
}