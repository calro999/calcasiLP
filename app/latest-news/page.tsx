import React from "react";
import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next"; // メタデータ型を追加

// メタデータの追加
export const metadata: Metadata = {
  title: "最新オンラインカジノニュース・お得なボーナス情報一覧",
  description: "2025年最新のオンラインカジノ入金不要ボーナス、新着カジノレビュー、攻略法など、プレイヤーに役立つ最新情報を随時更新中。",
  openGraph: {
    title: "最新オンラインカジノニュース一覧 | 2025年最新版",
    description: "お得な入金不要ボーナスや最新カジノのリリース情報をチェック！",
    url: "https://calcasi-lp.vercel.app/latest-news",
    type: "website",
  },
};

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content?: string;
}

async function getLocalArticles(): Promise<Article[]> {
  const lang = "ja";
  const dir = path.join(process.cwd(), "contents", "articles", lang);

  try {
    const files = await fs.readdir(dir);
    const articles = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (file) => {
          const data = await fs.readFile(path.join(dir, file), "utf8");
          return JSON.parse(data);
        })
    );
    // ★ ここを修正：日付ではなく、IDの降順（大きい順）でソート
    return articles.sort((a, b) => b.id - a.id);
  } catch {
    return [];
  }
}

export default async function LatestNewsPage() {
  const articles = await getLocalArticles();

  return (
    <main className="pt-20 pb-20 bg-black">
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-amber-300 text-center mb-12">最新情報</h2>

          {/* カテゴリフィルター（重複削除して表示） */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:gap-4">
            <input
              type="text"
              placeholder="記事を検索..."
              className="w-full md:w-1/2 px-4 py-2 rounded bg-white text-black mb-4 md:mb-0"
            />
            <div className="flex gap-2 flex-wrap">
              {[...new Set(articles.map(a => a.category))].map(category => (
                <span key={category} className="px-3 py-1 bg-white text-black text-sm rounded-full">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link href={`/article/${article.id}`} key={article.id} className="block">
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative aspect-[16/9]">
                    {/* 画像のプレースホルダー対応 */}
                    <Image
                      src={article.image || "/default-og.jpg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 flex-grow">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-gray-500 text-sm mt-auto">
                      <span>公開日: {article.date}</span>
                      <span>読了: {article.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}