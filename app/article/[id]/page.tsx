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
    <main className="pt-20 pb-20 bg-black min-h-screen text-white">
      {/* デザインを適用するためのスタイルタグ */}
      <style dangerouslySetInnerHTML={{ __html: `
        .premium-article { font-family: 'sans-serif'; line-height: 1.8; color: #e2e8f0; }
        
        /* タイトル装飾 */
        .gold-border-title { 
          font-size: 1.75rem; font-weight: 800; border-left: 5px solid #fbbf24; 
          padding-left: 1rem; margin: 3rem 0 1.5rem; color: #fbbf24;
          text-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
        }

        /* ゴージャスなCTAボタン */
        .gorgeous-cta-wrapper { text-align: center; margin: 3rem 0; }
        .gorgeous-cta-button {
          position: relative; display: inline-flex; flex-direction: column; align-items: center;
          padding: 1.5rem 3rem; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000; font-weight: 900; border-radius: 9999px; text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s; overflow: hidden;
          box-shadow: 0 10px 25px rgba(251, 191, 36, 0.4);
        }
        .gorgeous-cta-button:hover { transform: scale(1.05); box-shadow: 0 15px 35px rgba(251, 191, 36, 0.6); }
        
        /* 光るアニメーション (Shimmer) */
        .shimmer {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg); animation: shine 3s infinite;
        }
        @keyframes shine { 100% { left: 200%; } }

        /* カードデザイン */
        .premium-feature-card, .luxury-bonus-card {
          background: rgba(31, 41, 55, 0.5); border: 1px solid rgba(251, 191, 36, 0.2);
          padding: 2rem; border-radius: 1.5rem; margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        .luxury-bonus-card { text-align: center; border: 2px solid #fbbf24; background: rgba(251, 191, 36, 0.05); }
        .bonus-amount { font-size: 5rem; font-weight: 900; color: #fbbf24; line-height: 1; margin: 1rem 0; }

        /* テーブル装飾 */
        .luxury-table { width: 100%; border-collapse: collapse; margin: 2rem 0; background: #111; border-radius: 1rem; overflow: hidden; }
        .luxury-table th { background: #fbbf24; color: #000; padding: 1rem; }
        .luxury-table td { padding: 1rem; border-bottom: 1px solid #333; text-align: center; }
        
        /* ロードマップ */
        .step-roadmap { display: grid; gap: 1.5rem; margin-top: 2rem; }
        .step-item { display: flex; align-items: flex-start; gap: 1rem; background: #1f2937; padding: 1.5rem; border-radius: 1rem; }
        .step-num { background: #fbbf24; color: #000; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; flex-shrink: 0; }
      `}} />

      <article className="max-w-4xl mx-auto px-4">
        <header className="mb-12 text-center">
          <span className="text-amber-400 font-bold tracking-widest uppercase text-sm">{article.category}</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 leading-tight">{article.title}</h1>
          <div className="flex justify-center items-center text-gray-400 text-sm gap-6">
            <span>📅 {article.date}</span>
            <span>✍️ {article.author}</span>
            <span>⏱️ {article.readTime}</span>
          </div>
        </header>

        {article.image && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-gray-800 shadow-2xl">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          {parse(article.content)}
        </div>
      </article>
    </main>
  );
}