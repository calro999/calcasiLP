export const dynamic = "force-dynamic";
import React from "react";
import fs from "fs/promises";
import path from "path";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Article {
  id: number; title: string; content: string; image: string; category: string;
  date: string; readTime: string; author: string; metaTitle?: string;
  metaDescription?: string; ogTitle?: string; ogDescription?: string;
  ogImage?: string; ogUrl?: string;
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
    <main className="pt-20 pb-20 bg-[#050505] min-h-screen text-[#cbd5e1]">
      <style dangerouslySetInnerHTML={{ __html: `
        .premium-article { max-width: 850px; margin: 0 auto; line-height: 1.9; }

        /* ヘッダー・メタ情報 */
        .meta-container { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; font-size: 0.95rem; color: #94a3b8; font-weight: 500; margin-bottom: 1.5rem; }
        .category-tag { background: #fbbf24; color: #000; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; font-weight: 900; }
        .article-header { border-bottom: 1px solid #1e293b; padding-bottom: 1.5rem; margin-bottom: 2rem; }
        .main-visual { border-radius: 1.5rem; overflow: hidden; border: 1px solid #1e293b; margin-bottom: 3.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

        /* セクションタイトル */
        .gold-border-title { 
          font-size: 1.6rem; font-weight: 800; color: #fff; margin: 4.5rem 0 2rem;
          padding-left: 1rem; border-left: 4px solid #fbbf24;
        }

        /* 3つの絶対的理由 / 特徴カード */
        .premium-feature-card {
          background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.25rem; margin-bottom: 1.5rem;
        }
        .premium-feature-card h3 { color: #fbbf24; font-size: 1.25rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 10px; }
        .premium-feature-card h3 span { opacity: 0.5; font-family: serif; font-style: italic; }

        /* 至高のボーナス体験 */
        .luxury-bonus-card {
          background: linear-gradient(145deg, #111827, #050505); border: 2px solid #fbbf24;
          padding: 3rem 2rem; border-radius: 2rem; text-align: center; margin: 3rem 0;
          box-shadow: 0 0 30px rgba(251, 191, 36, 0.1);
        }
        .bonus-tag { background: #fbbf24; color: #000; display: inline-block; padding: 0.2rem 1rem; border-radius: 99px; font-size: 0.75rem; font-weight: 900; margin-bottom: 1rem; }
        .bonus-amount { font-size: 4.5rem; font-weight: 900; color: #fbbf24; line-height: 1; margin: 0.5rem 0; }
        .bonus-amount .unit { font-size: 2rem; margin-left: 5px; }
        .bonus-desc { font-size: 1.25rem; color: #fff; font-weight: 700; margin-bottom: 1rem; }

        /* スマートな入出金管理（テーブル） */
        .table-responsive { margin: 2.5rem 0; border-radius: 1rem; overflow: hidden; border: 1px solid #1e293b; }
        .luxury-table { width: 100%; border-collapse: collapse; background: #0a0f1d; }
        .luxury-table th { background: #1e293b; color: #fbbf24; padding: 1.2rem; font-size: 0.9rem; }
        .luxury-table td { padding: 1.2rem; border-top: 1px solid #1e293b; text-align: center; color: #fff; }
        .status-fast { color: #10b981; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .status-fast::before { content: '●'; font-size: 0.6rem; }

        /* 勝利への3ステップ */
        .step-roadmap { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 3rem 0; }
        @media (min-width: 768px) { .step-roadmap { grid-template-columns: repeat(3, 1fr); } }
        .step-item {
          background: #0f172a; border: 1px solid #1e293b; padding: 2rem 1.5rem; border-radius: 1.5rem;
          text-align: center; position: relative; transition: 0.3s;
        }
        .step-item:hover { border-color: #fbbf24; transform: translateY(-5px); }
        .step-num {
          width: 40px; height: 40px; background: #fbbf24; color: #000; font-size: 1.25rem;
          font-weight: 900; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 1.2rem;
        }
        .step-item strong { display: block; color: #fff; font-size: 1.1rem; margin-bottom: 0.5rem; }
        .step-item span { font-size: 0.85rem; color: #94a3b8; line-height: 1.5; display: block; }

        /* CTAボタン */
        .gorgeous-cta-wrapper { text-align: center; margin: 4.5rem 0; }
        .gorgeous-cta-button {
          display: inline-flex; align-items: center; justify-content: center; gap: 12px;
          padding: 1.25rem 3rem; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000; font-weight: 900; font-size: 1.35rem; border-radius: 9999px;
          text-decoration: none; box-shadow: 0 10px 40px rgba(217, 119, 6, 0.4);
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden;
        }
        .gorgeous-cta-button:hover { transform: scale(1.03); }
        .cta-note { font-size: 0.85rem; color: #64748b; margin-top: 15px; }
        .shimmer { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%); transform: skewX(-25deg); animation: shine 3.5s infinite; }
        @keyframes shine { 100% { left: 200%; } }

        /* 内部リンクカード */
        .next-read-wrapper { margin-top: 6rem; border-top: 1px solid #1e293b; padding-top: 3rem; }
        .next-read-title { font-size: 1.4rem; font-weight: 900; color: #fbbf24; margin-bottom: 2rem; display: flex; align-items: center; gap: 10px; }
        .related-card-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 768px) { .related-card-grid { grid-template-columns: 1fr 1fr; } }
        .related-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 1.25rem; padding: 1.5rem; text-decoration: none; transition: 0.3s; display: flex; flex-direction: column; justify-content: space-between; }
        .related-card:hover { border-color: #fbbf24; transform: translateY(-5px); }
        .related-card-label { font-size: 0.7rem; color: #fbbf24; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem; }
        .related-card-title { font-size: 1.05rem; font-weight: 700; color: #fff; line-height: 1.4; }
        .related-card-arrow { margin-top: 1.5rem; color: #fbbf24; font-size: 0.85rem; font-weight: bold; }
      `}} />

      <article className="max-w-5xl mx-auto px-6">
        <header className="article-header">
          <div className="meta-container">
            <span className="category-tag">{article.category}</span>
            <span className="meta-divider">|</span>
            <div className="meta-item">⏱️ {article.readTime}</div>
            <span className="meta-divider">/</span>
            <div className="meta-item">👤 {article.author}</div>
            <span className="meta-divider">/</span>
            <div className="meta-item">📅 {article.date}</div>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">{article.title}</h1>
        </header>

        {article.image && (
          <div className="main-visual">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="premium-article">
          {parse(article.content.replace(
            /<a href="([^"]+)"[^>]*class="gorgeous-cta-button">.*?<\/a>/g,
            `<div class="gorgeous-cta-wrapper">
              <a href="$1" target="_blank" rel="noopener noreferrer" class="gorgeous-cta-button">
                <span class="shimmer"></span>
                <span>🎁</span><span>今すぐ200%ボーナスを受け取る</span><span>🎁</span>
              </a>
              <p class="cta-note">※期間限定オファーにつきお急ぎください</p>
            </div>`
          ))}

          <div className="next-read-wrapper">
            <h3 className="next-read-title">🔍 さらに詳しく知る</h3>
            <div className="related-card-grid">
              <a href="/article/golden-panda-bonus" className="related-card">
                <div><div className="related-card-label">Bonus Strategy</div><div className="related-card-title">【攻略】Golden Panda 200%ボーナスの賭け条件と賢い活用術</div></div>
                <div className="related-card-arrow">記事を読む →</div>
              </a>
              <a href="/article/golden-panda-deposit" className="related-card">
                <div><div className="related-card-label">Payment Guide</div><div className="related-card-title">銀行振込は使える？Golden Pandaの最新入出金ガイド</div></div>
                <div className="related-card-arrow">記事を読む →</div>
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}