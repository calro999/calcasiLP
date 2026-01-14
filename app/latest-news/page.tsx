import React from "react";
import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "最新オンラインカジノニュース一覧｜2026年最新情報",
  description: "新着カジノの入金不要ボーナスや、2026年最新の攻略ニュースを掲載。プレイヤーに役立つ情報をいち早くお届けします。",
};

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  ogUrl?: string;
}

async function getLocalArticles(): Promise<Article[]> {
  // lang = "ja" を削除し、直下の articles フォルダを参照
  const dir = path.join(process.cwd(), "contents", "articles");

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
    // IDの降順でソート
    return articles.sort((a, b) => Number(b.id) - Number(a.id));
  } catch (error) {
    console.error("記事の取得に失敗しました:", error);
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const urlSlug = article.ogUrl 
                ? article.ogUrl.split('/').filter(Boolean).pop() 
                : article.id.toString();

              return (
                <Link href={`/article/${urlSlug}`} key={article.id} className="group">
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 h-full flex flex-col border border-gray-700 group-hover:border-amber-500/50">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={article.image || "/default-og.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="inline-block px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded mb-3 self-start">
                        {article.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3 flex-grow group-hover:text-amber-300 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex justify-between items-center text-gray-500 text-[11px] mt-auto pt-4 border-t border-gray-700">
                        <span>公開日: {article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}