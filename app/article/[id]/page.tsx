export const dynamic = "force-dynamic";
import React from "react";
import fs from "fs/promises";
import path from "path";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// インターフェース定義
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

// 記事データを取得する関数（slug または ID で検索）
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

      // 1. IDが直接一致する場合
      if (article.id.toString() === slug) return article;

      // 2. ogUrlの末尾が一致する場合
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

// メタデータ生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlugOrId(params.id);
  if (!article) return { title: "記事が見つかりません" };

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

// メインページコンポーネント
export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlugOrId(params.id);

  if (!article) {
    return notFound();
  }

  return (
    <main className="pt-20 pb-20 bg-[#050505] min-h-screen text-[#cbd5e1] selection:bg-amber-500/30">
      <style dangerouslySetInnerHTML={{ __html: `
        /* 記事コンテナ */
        .premium-article { 
          max-width: 850px; 
          margin: 0 auto; 
          line-height: 2; 
          font-size: 1.05rem;
          color: #d1d5db;
        }
        
        /* 読みやすさのための段落間隔 */
        .premium-article p { margin-bottom: 2rem; }

        /* セクションタイトル（h2相当） */
        .gold-border-title { 
          font-size: 1.6rem; font-weight: 800; color: #ffffff;
          margin: 4.5rem 0 2rem; padding-bottom: 0.8rem;
          border-bottom: 1px solid #262626; position: relative;
        }
        .gold-border-title::after {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 80px; height: 3px; background: linear-gradient(90deg, #fbbf24, transparent);
        }

        /* 特徴カード・ボーナスカード（視覚的ブロック） */
        .premium-feature-card, .luxury-bonus-card {
          background: #0f1115; border: 1px solid #1f2937;
          padding: 2.5rem; border-radius: 20px; margin: 2.5rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .premium-feature-card h3 { color: #fbbf24; margin-bottom: 1.2rem; font-size: 1.3rem; font-weight: 700; }

        /* レスポンシブ・グリッド */
        @media (min-width: 1024px) {
          .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        }

        /* アニメーション付きCTAボタン */
        .gorgeous-cta-wrapper { text-align: center; margin: 4.5rem 0; }
        .gorgeous-cta-button {
          display: inline-flex; flex-direction: column; align-items: center;
          padding: 1.2rem 3.5rem;
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000; font-weight: 900; font-size: 1.25rem;
          border-radius: 16px; text-decoration: none;
          box-shadow: 0 15px 35px rgba(217, 119, 6, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative; overflow: hidden;
        }
        .gorgeous-cta-button:hover { transform: translateY(-5px); box-shadow: 0 20px 45px rgba(217, 119, 6, 0.5); }
        .gorgeous-cta-button .sub-text { font-size: 0.75rem; font-weight: 700; margin-top: 4px; opacity: 0.9; }
        
        .shimmer {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg); animation: shine 3.5s infinite;
        }
        @keyframes shine { 100% { left: 200%; } }

        /* 洗練されたテーブル */
        .table-responsive { 
          margin: 3rem 0; border-radius: 16px; border: 1px solid #1f2937; 
          overflow: hidden; background: #0a0a0a; 
        }
        .luxury-table { width: 100%; border-collapse: collapse; text-align: left; }
        .luxury-table th { background: #161616; color: #fbbf24; padding: 1.2rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .luxury-table td { padding: 1.2rem; border-top: 1px solid #1f2937; color: #fff; }

        /* ボーナス数字 */
        .bonus-amount { 
          font-size: clamp(3rem, 8vw, 5rem); font-weight: 950; 
          background: linear-gradient(to bottom, #fbbf24, #d97706);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          line-height: 1; margin: 1rem 0;
        }

        /* 内部リンク */
        .next-read-box {
          border-top: 1px solid #262626; padding-top: 4rem; margin-top: 6rem;
        }
        .next-read-box h3 { color: #fbbf24; font-size: 1.2rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .next-read-box ul { list-style: none; padding: 0; }
        .next-read-box li { margin-bottom: 1rem; }
        .next-read-box a { 
          color: #fff; text-decoration: none; font-weight: 600;
          transition: color 0.2s; display: block; padding: 1rem;
          background: #111; border-radius: 8px; border: 1px solid #222;
        }
        .next-read-box a:hover { border-color: #fbbf24; color: #fbbf24; }
      `}} />

      <article className="max-w-5xl mx-auto px-6">
        {/* 記事ヘッダー */}
        <header className="mb-12 border-b border-gray-900 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-amber-500 text-black px-3 py-0.5 text-[10px] font-black uppercase tracking-tighter rounded">
              {article.category}
            </span>
            <span className="text-gray-500 text-[11px]">⏱️ {article.readTime} read</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-8 leading-snug">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">👤</div>
              <span>{article.author}</span>
            </div>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </header>

        {/* メインビジュアル */}
        {article.image && (
          <div className="rounded-3xl overflow-hidden mb-16 border border-gray-900 shadow-2xl">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
          </div>
        )}

        {/* 記事本文 */}
        <div className="premium-article">
          {parse(article.content)}
        </div>

        {/* フッター内部リンク */}
        <footer className="next-read-box">
          <h3><span>🔍</span> あわせて読みたい最新情報</h3>
          <ul>
            <li>
              <a href="/article/golden-panda-bonus">
                → 【攻略】Golden Panda 200%ボーナスの賭け条件と賢い活用術
              </a>
            </li>
            <li>
              <a href="/article/golden-panda-deposit">
                → 銀行振込は使える？Golden Pandaの最新入出金ガイド
              </a>
            </li>
          </ul>
        </footer>
      </article>
    </main>
  );
}