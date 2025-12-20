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

        /* メタ情報の1行レイアウト */
        .meta-container { 
          display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; 
          font-size: 0.95rem; color: #94a3b8; font-weight: 500; margin-bottom: 1.5rem;
        }
        .category-tag { background: #fbbf24; color: #000; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; font-weight: 900; text-transform: uppercase; }
        .meta-item { display: flex; align-items: center; gap: 0.4rem; }
        .meta-divider { color: #334155; }

        /* ヘッダー・画像 */
        .article-header { border-bottom: 1px solid #1e293b; padding-bottom: 1.5rem; margin-bottom: 2rem; }
        .main-visual { border-radius: 1.5rem; overflow: hidden; border: 1px solid #1e293b; margin-bottom: 3.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

        .gold-border-title { 
          font-size: 1.6rem; font-weight: 800; color: #fff; margin: 4rem 0 2rem;
          padding-left: 1rem; border-left: 4px solid #fbbf24;
        }

        /* 内部リンクカードセクション */
        .next-read-wrapper { margin-top: 6rem; border-top: 1px solid #1e293b; pt-4rem; }
        .next-read-title { font-size: 1.4rem; font-weight: 900; color: #fbbf24; margin: 3rem 0 1.5rem; display: flex; align-items: center; gap: 10px; }
        
        .related-card-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 768px) { .related-card-grid { grid-template-columns: 1fr 1fr; } }
        
        .related-card {
          background: #0f172a; border: 1px solid #1e293b; border-radius: 1.25rem;
          padding: 1.5rem; text-decoration: none; transition: all 0.3s ease;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .related-card:hover { border-color: #fbbf24; transform: translateY(-5px); background: #161e31; }
        .related-card-label { font-size: 0.75rem; color: #fbbf24; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem; }
        .related-card-title { font-size: 1.1rem; font-weight: 700; color: #fff; line-height: 1.4; }
        .related-card-arrow { margin-top: 1.5rem; color: #fbbf24; font-weight: bold; font-size: 0.9rem; display: flex; align-items: center; gap: 5px; }

        /* CTAボタン */
        .gorgeous-cta-wrapper { text-align: center; margin: 4.5rem 0; }
        .gorgeous-cta-button {
          display: inline-flex; align-items: center; justify-content: center; gap: 12px;
          padding: 1.25rem 2.5rem; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000; font-weight: 900; font-size: 1.3rem; border-radius: 9999px;
          text-decoration: none; box-shadow: 0 10px 40px rgba(217, 119, 6, 0.4);
          transition: 0.3s; position: relative; overflow: hidden;
        }
        .gorgeous-cta-button:hover { transform: scale(1.03); }
        .cta-note { font-size: 0.85rem; color: #64748b; margin-top: 15px; font-weight: 500; }
        
        .shimmer {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg); animation: shine 3.5s infinite;
        }
        @keyframes shine { 100% { left: 200%; } }
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
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
            {article.title}
          </h1>
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

          {/* 内部リンクカードセクション */}
          <div className="next-read-wrapper">
            <h3 className="next-read-title"><span>🔍</span> さらに詳しく知る</h3>
            <div className="related-card-grid">
              <a href="/article/golden-panda-bonus" className="related-card">
                <div>
                  <div className="related-card-label">Bonus Strategy</div>
                  <div className="related-card-title">【攻略】Golden Panda 200%ボーナスの賭け条件と賢い活用術</div>
                </div>
                <div className="related-card-arrow">記事を読む <span>→</span></div>
              </a>
              <a href="/article/golden-panda-deposit" className="related-card">
                <div>
                  <div className="related-card-label">Payment Guide</div>
                  <div className="related-card-title">銀行振込は使える？Golden Pandaの最新入出金ガイド</div>
                </div>
                <div className="related-card-arrow">記事を読む <span>→</span></div>
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}