import React from "react";
import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Article {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  content: string;
  ogUrl?: string;
}

// ヘルパー関数: スラグに基づいて特定のJSONファイルを読み込む
async function getArticleData(slug: string): Promise<Article | null> {
  const dir = path.join(process.cwd(), "contents", "articles");
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const data = await fs.readFile(path.join(dir, file), "utf8");
      const article: Article = JSON.parse(data);
      
      // JSON内のogUrlから末尾のスラグを抽出して比較
      const articleSlug = article.ogUrl 
        ? article.ogUrl.split('/').filter(Boolean).pop() 
        : article.id.toString();

      if (articleSlug === slug) {
        return article;
      }
    }
    return null;
  } catch (error) {
    console.error("記事データの取得に失敗しました:", error);
    return null;
  }
}

// ★動的メタデータ生成関数: これがタブの名前（titleタグ）を決定します
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleData(params.slug);

  if (!article) {
    return { title: "記事が見つかりません" };
  }

  // metaTitleがあればそれを優先、なければ通常のtitleを使用
  const displayTitle = article.metaTitle || article.title;

  return {
    title: displayTitle,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.ogTitle || displayTitle,
      description: article.ogDescription || article.excerpt,
      images: [article.ogImage || article.image],
      url: article.ogUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.ogTitle || displayTitle,
      description: article.ogDescription || article.excerpt,
      images: [article.ogImage || article.image],
    },
  };
}

// ページコンポーネント
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleData(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="pt-24 pb-20 bg-black min-h-screen">
      <article className="container mx-auto max-w-4xl px-4 md:px-8">
        {/* ヘッダーセクション */}
        <header className="mb-12 text-center">
          <span className="inline-block px-4 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-gray-500 text-xs border-y border-gray-800 py-4">
            <time>公開日: {article.date}</time>
            <span>著者: {article.author}</span>
            <span>読了: {article.readTime}</span>
          </div>
        </header>

        {/* アイキャッチ画像 */}
        <div className="relative aspect-video rounded-xl overflow-hidden mb-12 border border-gray-800 shadow-2xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 記事コンテンツ（HTML文字列をパース） */}
        <div 
          className="prose prose-invert prose-amber max-w-none text-gray-300
            prose-h2:text-3xl prose-h2:font-bold prose-h2:text-amber-300 prose-h2:mb-6 prose-h2:mt-12
            prose-h3:text-xl prose-h3:font-bold prose-h3:text-white prose-h3:mb-4
            prose-p:mb-6 prose-p:leading-relaxed
            prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-20 pt-10 border-t border-gray-800 flex justify-center">
          <Link 
            href="/latest-news" 
            className="px-8 py-3 bg-gray-900 border border-gray-700 text-amber-400 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            ← 最新ニュース一覧へ戻る
          </Link>
        </footer>
      </article>
    </main>
  );
}