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
    <main className="pt-20 pb-20 bg-[#050505] min-h-screen text-[#cbd5e1]">
      <style dangerouslySetInnerHTML={{ __html: `
        .premium-article { max-width: 850px; margin: 0 auto; line-height: 1.9; }

        /* ヘッダー周りの視認性向上 */
        .meta-text { font-size: 0.95rem !important; color: #94a3b8 !important; font-weight: 500; }
        .category-tag { background: #fbbf24; color: #000; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; font-weight: 900; }

        /* タイトル下の余白詰め */
        .article-header { border-bottom: 1px solid #1e293b; padding-bottom: 1.5rem; margin-bottom: 1.5rem; }
        .main-visual { border-radius: 1.5rem; overflow: hidden; border: 1px solid #1e293b; margin-bottom: 3rem; }

        /* セクションタイトル */
        .gold-border-title { 
          font-size: 1.6rem; font-weight: 800; color: #fff; margin: 4rem 0 2rem;
          padding-left: 1rem; border-left: 4px solid #fbbf24;
        }

        /* 改良版CTAボタン */
        .gorgeous-cta-wrapper { text-align: center; margin: 4rem 0; }
        .gorgeous-cta-button {
          display: inline-flex; align-items: center; justify-content: center; gap: 15px;
          padding: 1.25rem 3rem; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000; font-weight: 900; font-size: 1.4rem; border-radius: 9999px;
          text-decoration: none; box-shadow: 0 10px 40px rgba(217, 119, 6, 0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden;
        }
        .gorgeous-cta-button:hover { transform: scale(1.05); }
        .cta-note { font-size: 0.85rem; color: #94a3b8; margin-top: 12px; font-weight: 500; }
        
        .shimmer {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg); animation: shine 3s infinite;
        }
        @keyframes shine { 100% { left: 200%; } }

        /* 勝利への3ステップ：コネクテッドカード形式 */
        .step-roadmap { display: flex; flex-direction: column; gap: 2rem; position: relative; margin: 3rem 0; }
        @media (min-width: 768px) {
          .step-roadmap { flex-direction: row; align-items: stretch; }
          .step-item::after {
            content: '→'; position: absolute; right: -1.5rem; top: 50%; transform: translateY(-50%);
            color: #fbbf24; font-size: 1.5rem; font-weight: bold;
          }
          .step-item:last-child::after { display: none; }
        }
        .step-item {
          flex: 1; background: #111827; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.5rem;
          position: relative; text-align: center; transition: border-color 0.3s;
        }
        .step-item:hover { border-color: #fbbf24; }
        .step-num {
          width: 45px; height: 45px; background: #fbbf24; color: #000; font-size: 1.4rem;
          font-weight: 900; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 1.5rem;
        }
        .step-item p strong { display: block; color: #fff; font-size: 1.2rem; margin-bottom: 0.5rem; }
        .step-item p span { font-size: 0.9rem; color: #94a3b8; line-height: 1.5; display: block; }

        /* ボーナス・特徴カード */
        .premium-feature-card, .luxury-bonus-card {
          background: #0f172a; border: 1px solid #1e293b; padding: 2.5rem; border-radius: 1.5rem; margin: 2.5rem 0;
        }
        .bonus-amount { font-size: 4rem; font-weight: 900; color: #fbbf24; text-align: center; margin-bottom: 0.5rem; }

        /* テーブル */
        .table-responsive { margin: 2rem 0; border-radius: 1rem; overflow: hidden; border: 1px solid #1e293b; }
        .luxury-table { width: 100%; border-collapse: collapse; background: #0a0f1d; }
        .luxury-table th { background: #1e293b; color: #fbbf24; padding: 1rem; text-align: center; }
        .luxury-table td { padding: 1rem; border-top: 1px solid #1e293b; text-align: center; color: #fff; }
      `}} />

      <article className="max-w-5xl mx-auto px-6">
        <header className="article-header">
          <div className="flex items-center gap-4 mb-6">
            <span className="category-tag">{article.category}</span>
            <span className="meta-text">⏱️ {article.readTime} read</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 meta-text">
            <span className="flex items-center gap-2">👤 {article.author}</span>
            <span>•</span>
            <span>📅 {article.date}</span>
          </div>
        </header>

        {article.image && (
          <div className="main-visual">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="premium-article">
          {/* JSONのcontentを表示（CTAやステップのクラスを反映） */}
          {parse(article.content.replace(
            /<a href="([^"]+)"[^>]*class="gorgeous-cta-button">.*?<\/a>/g,
            `<div class="gorgeous-cta-wrapper">
              <a href="$1" target="_blank" rel="noopener noreferrer" class="gorgeous-cta-button">
                <span class="shimmer"></span>
                <span>🎁</span>
                <span>今すぐ200%ボーナスを受け取る</span>
                <span>🎁</span>
              </a>
              <p class="cta-note">※期間限定オファーにつきお急ぎください</p>
            </div>`
          ))}
        </div>
      </article>
    </main>
  );
}