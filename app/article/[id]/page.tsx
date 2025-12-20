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
  ogUrl?: string;
}

interface Props {
  params: { id: string };
}

async function getArticleBySlugOrId(slug: string): Promise<Article | null> {
  const lang = "ja";
  const dir = path.join(process.cwd(), "contents", "articles", lang);
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const data = await fs.readFile(path.join(dir, file), "utf8");
      const article: Article = JSON.parse(data);
      if (article.id.toString() === slug) return article;
      if (article.ogUrl && article.ogUrl.split('/').pop() === slug) return article;
    }
    return null;
  } catch { return null; }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlugOrId(params.id);
  if (!article) return notFound();

  return (
    <main className="pt-16 pb-20 bg-black min-h-screen text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .premium-article { font-family: sans-serif; line-height: 1.7; color: #cbd5e1; }
        
        /* メインタイトル (h1) - レスポンシブ調整 */
        .main-title {
          font-size: clamp(1.75rem, 5vw, 2.5rem); /* スマホで小さく、PCで適切に */
          font-weight: 900;
          line-height: 1.3;
          margin: 1rem 0 1.5rem;
          color: #ffffff;
        }

        /* セクションタイトル (h2) - サイズを適正化 */
        .gold-border-title { 
          font-size: clamp(1.3rem, 4vw, 1.6rem); /* 大きすぎないサイズ */
          font-weight: 800;
          border-left: 4px solid #fbbf24; 
          padding-left: 0.75rem;
          margin: 2.5rem 0 1.2rem;
          color: #fbbf24;
        }

        /* CTAボタン - スマホ対応 */
        .gorgeous-cta-wrapper { margin: 2.5rem 0; padding: 0 1rem; }
        .gorgeous-cta-button {
          position: relative; display: flex; flex-direction: column; align-items: center;
          padding: 1.25rem 1.5rem; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000; font-weight: 800; border-radius: 1rem; text-decoration: none;
          transition: transform 0.2s; overflow: hidden; max-width: 100%;
        }
        .gorgeous-cta-button .text { font-size: clamp(1rem, 3.5vw, 1.25rem); }
        .gorgeous-cta-button .sub-text { font-size: 0.7rem; opacity: 0.8; margin-top: 4px; }
        
        .shimmer {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg); animation: shine 3.5s infinite;
        }
        @keyframes shine { 100% { left: 200%; } }

        /* カード・テーブルのスマホ最適化 */
        .premium-feature-card, .luxury-bonus-card {
          background: #111827; border: 1px solid rgba(251, 191, 36, 0.2);
          padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem;
        }
        .bonus-amount { font-size: 3.5rem; font-weight: 900; color: #fbbf24; }
        
        .table-responsive { overflow-x: auto; margin: 1.5rem 0; border-radius: 0.75rem; }
        .luxury-table { width: 100%; min-width: 400px; font-size: 0.9rem; }
        .luxury-table th { background: #fbbf24; color: #000; padding: 0.75rem; }
        .luxury-table td { padding: 0.75rem; border-bottom: 1px solid #1f2937; }

        .step-item { display: flex; gap: 1rem; background: #111827; padding: 1.25rem; border-radius: 0.75rem; }
        .step-num { background: #fbbf24; color: #000; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; flex-shrink: 0; font-size: 0.8rem; }
      `}} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <header className="mb-8 pt-4">
          <div className="flex justify-start">
            <span className="bg-amber-500 text-black px-2 py-0.5 text-[10px] font-black uppercase rounded">
              {article.category}
            </span>
          </div>
          <h1 className="main-title">{article.title}</h1>
          <div className="flex flex-wrap items-center text-gray-400 text-[11px] gap-x-4 gap-y-2 border-b border-gray-800 pb-6">
            <span>公開日: {article.date}</span>
            <span>著者: {article.author}</span>
            <span>読了: {article.readTime}</span>
          </div>
        </header>

        {article.image && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-xl border border-gray-800">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          {parse(article.content)}
        </div>
      </article>
    </main>
  );
}