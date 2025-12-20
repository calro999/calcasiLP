export const dynamic = "force-dynamic";
import React from "react";
import fs from "fs/promises";
import path from "path";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import { Metadata } from "next"; // メタデータ型をインポート

// JSONの構造に合わせてインターフェースを拡張
interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  // 以下、メタ情報用のプロパティを追加
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

// 記事データを取得する共通関数
async function getLocalArticle(id: number): Promise<Article | null> {
  const lang = "ja";
  const filePath = path.join(process.cwd(), "contents", "articles", lang, `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

// ★ ここでブラウザのタブ名（メタ情報）を生成します
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id);
  const article = await getLocalArticle(id);

  // 記事がない場合はデフォルトのタイトルを返す
  if (!article) {
    return {
      title: "記事が見つかりません",
    };
  }

  // メタ情報がある場合はそれを使い、なければ記事のtitleをフォールバックとして使う
  return {
    title: article.metaTitle || article.title, 
    description: article.metaDescription || "",
    openGraph: {
      title: article.ogTitle || article.metaTitle || article.title,
      description: article.ogDescription || article.metaDescription || "",
      url: article.ogUrl || `https://calcasi-lp.vercel.app/article/${id}`,
      images: [
        {
          url: article.ogImage || article.image || "/default-og.jpg",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle || article.title,
      description: article.metaDescription || "",
      images: [article.ogImage || article.image || "/default-og.jpg"],
    },
  };
}

// 実際のページ表示コンポーネント
export default async function ArticlePage({ params }: Props) {
  const id = parseInt(params.id);
  const article = await getLocalArticle(id);

  if (!article) {
    return notFound();
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      <article className="max-w-3xl mx-auto px-4">
        {/* ページ上の見出しは article.title を使用 */}
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