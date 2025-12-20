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

interface Props {
  params: { id: string };
}

async function getArticleBySlugOrId(slug: string): Promise<Article | null> {
  // lang = "ja" を削除
  const dir = path.join(process.cwd(), "contents", "articles");
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const data = await fs.readFile(path.join(dir, file), "utf8");
      const article: Article = JSON.parse(data);
      
      // ID一致チェック
      if (article.id.toString() === slug) return article;
      
      // Slug（URL末尾）一致チェック
      if (article.ogUrl) {
        const urlPart = article.ogUrl.split('/').filter(Boolean).pop();
        if (urlPart === slug) return article;
      }
    }
    return null;
  } catch (error) {
    console.error("記事詳細の取得に失敗しました:", error);
    return null;
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlugOrId(params.id);
  if (!article) return notFound();

  const options: any = {
    replace: (domNode: any) => {
      if (domNode.attribs && domNode.attribs.class === 'next-read-box') {
        const listItems = domNode.children.find((c: any) => c.name === 'ul');
        if (listItems && listItems.children) {
          const links = listItems.children
            .filter((li: any) => li.name === 'li')
            .map((li: any) => {
              const a = li.children.find((c: any) => c.name === 'a');
              return {
                href: a?.attribs?.href || "#",
                text: a?.children[0]?.data || ""
              };
            });

          return (
            <div className="next-read-wrapper">
              <h3 className="next-read-title"><span>🔍</span> さらに詳しく知る</h3>
              <div className="related-card-grid">
                {links.map((link: { href: string; text: string }, i: number) => (
                  <a key={i} href={link.href} className="related-card">
                    <div>
                      <div className="related-card-label">{i === 0 ? "Bonus Strategy" : "Payment Guide"}</div>
                      <div className="related-card-title">{link.text}</div>
                    </div>
                    <div className="related-card-arrow">記事を読む <span>→</span></div>
                  </a>
                ))}
              </div>
            </div>
          );
        }
      }

      if (domNode.attribs && domNode.attribs.class === 'gorgeous-cta-wrapper') {
        const anchor = domNode.children.find((c: any) => c.name === 'a');
        const href = anchor?.attribs?.href || "#";
        return (
          <div className="gorgeous-cta-wrapper">
            <a href={href} target="_blank" rel="noopener noreferrer" className="gorgeous-cta-button">
              <span className="shimmer"></span>
              <span>🎁</span>
              <span>今すぐボーナスを受け取る</span>
              <span>🎁</span>
            </a>
            <p className="cta-note">※期間限定オファーにつきお急ぎください</p>
          </div>
        );
      }
    }
  };

  return (
    <main className="pt-20 pb-20 bg-[#050505] min-h-screen text-[#cbd5e1]">
      <style dangerouslySetInnerHTML={{ __html: `
        .premium-article { max-width: 850px; margin: 0 auto; line-height: 1.9; }
        .meta-container { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8rem; font-size: 0.95rem; color: #94a3b8; font-weight: 500; margin-bottom: 1.5rem; }
        .category-tag { background: #fbbf24; color: #000; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; font-weight: 900; }
        .meta-divider { color: #334155; }
        .article-header { border-bottom: 1px solid #1e293b; padding-bottom: 1.5rem; margin-bottom: 2rem; }
        .main-visual { border-radius: 1.5rem; overflow: hidden; border: 1px solid #1e293b; margin-bottom: 3.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .gold-border-title { font-size: 1.6rem; font-weight: 800; color: #fff; margin: 4rem 0 2rem; padding-left: 1rem; border-left: 4px solid #fbbf24; }
        .premium-feature-card { background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.25rem; margin-bottom: 1.5rem; }
        .premium-feature-card h3 { color: #fbbf24; font-size: 1.25rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 10px; }
        .luxury-bonus-card { background: linear-gradient(145deg, #111827, #050505); border: 2px solid #fbbf24; padding: 3rem 2rem; border-radius: 2rem; text-align: center; margin: 3rem 0; }
        .bonus-amount { font-size: 4.5rem; font-weight: 900; color: #fbbf24; line-height: 1; }
        .bonus-amount .unit { font-size: 2rem; }
        .step-roadmap { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 3rem 0; }
        @media (min-width: 768px) { .step-roadmap { grid-template-columns: repeat(3, 1fr); } }
        .step-item { background: #0f172a; border: 1px solid #1e293b; padding: 2rem 1.5rem; border-radius: 1.5rem; text-align: center; }
        .step-num { width: 40px; height: 40px; background: #fbbf24; color: #000; font-size: 1.25rem; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.2rem; }
        .table-responsive { margin: 2.5rem 0; border-radius: 1rem; overflow: hidden; border: 1px solid #1e293b; }
        .luxury-table { width: 100%; border-collapse: collapse; background: #0a0f1d; }
        .luxury-table th { background: #1e293b; color: #fbbf24; padding: 1.2rem; }
        .luxury-table td { padding: 1.2rem; border-top: 1px solid #1e293b; text-align: center; color: #fff; }
        .gorgeous-cta-wrapper { text-align: center; margin: 4.5rem 0; }
        .gorgeous-cta-button {
          display: inline-flex; align-items: center; justify-content: center; gap: 12px;
          padding: 1.25rem 2.5rem; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000; font-weight: 900; font-size: 1.3rem; border-radius: 9999px;
          text-decoration: none; box-shadow: 0 10px 40px rgba(217, 119, 6, 0.4);
          position: relative; overflow: hidden; white-space: nowrap;
        }
        .shimmer { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%); transform: skewX(-25deg); animation: shine 3.5s infinite; }
        @keyframes shine { 100% { left: 200%; } }
        .cta-note { font-size: 0.85rem; color: #64748b; margin-top: 15px; font-weight: 500; }
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
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">{article.title}</h1>
        </header>

        {article.image && (
          <div className="main-visual">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="premium-article">
          {parse(article.content, options)}
        </div>
      </article>
    </main>
  );
}