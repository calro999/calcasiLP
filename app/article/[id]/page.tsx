export const dynamic = "force-dynamic";
import React from "react";
import fs from "fs/promises";
import path from "path";
import parse from "html-react-parser";
import { notFound } from "next/navigation";

// --- 省略（interface、getArticleBySlugOrId は変更なし） ---
interface Article {
  id: number; title: string; content: string; image: string; category: string;
  date: string; readTime: string; author: string; ogUrl?: string;
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

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleBySlugOrId(params.id);
  if (!article) return notFound();

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        .premium-article { max-width: 1000px; margin: 0 auto; line-height: 1.8; color: #cbd5e1; }
        
        /* タイトルサイズを「普通」に固定 */
        .main-title {
          font-size: clamp(1.5rem, 4vw, 2.1rem); 
          font-weight: 800; line-height: 1.4; margin: 1rem 0; color: #fff;
        }
        .gold-border-title { 
          font-size: 1.4rem; font-weight: 700; border-left: 4px solid #fbbf24; 
          padding-left: 1rem; margin: 3rem 0 1.5rem; color: #fbbf24;
        }

        /* PCで横に並べるための設定 */
        @media (min-width: 768px) {
          .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          .step-roadmap { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        }

        /* CTAボタンの横幅をPCで広げすぎない */
        .gorgeous-cta-button {
          display: inline-flex; min-width: 320px; max-width: 500px;
          padding: 1.25rem 2.5rem; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000; font-weight: 800; border-radius: 12px; text-decoration: none;
          position: relative; overflow: hidden; transition: 0.3s;
        }
        .shimmer {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg); animation: shine 3.5s infinite;
        }
        @keyframes shine { 100% { left: 200%; } }

        /* 装飾カード */
        .premium-feature-card, .luxury-bonus-card {
          background: #111; border: 1px solid #333; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;
        }
        .bonus-amount { font-size: 3rem; font-weight: 900; color: #fbbf24; text-align: center; }

        /* テーブル */
        .table-responsive { overflow-x: auto; margin: 2rem 0; }
        .luxury-table { width: 100%; border-collapse: collapse; }
        .luxury-table th { background: #fbbf24; color: #000; padding: 10px; }
        .luxury-table td { padding: 12px; border-bottom: 1px solid #222; text-align: center; }
      `}} />

      <article className="max-w-5xl mx-auto px-6">
        <header className="mb-10">
          <span className="inline-block bg-amber-500 text-black px-2 py-0.5 text-[11px] font-bold rounded mb-4">
            {article.category}
          </span>
          <h1 className="main-title">{article.title}</h1>
          <div className="flex items-center text-gray-400 text-xs gap-4 border-b border-gray-800 pb-6">
            <span>公開日: {article.date}</span>
            <span>著者: {article.author}</span>
            <span>読了: {article.readTime}</span>
          </div>
        </header>

        {article.image && (
          <div className="rounded-xl overflow-hidden mb-12 shadow-2xl">
            <img src={article.image} alt={article.title} className="w-full h-auto max-h-[500px] object-cover" />
          </div>
        )}

        <div className="prose prose-invert max-w-none premium-article">
          {parse(article.content)}
        </div>
      </article>
    </main>
  );
}