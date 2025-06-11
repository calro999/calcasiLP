import React from "react";
import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import Link from "next/link";

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
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

          {/* 検索バーとカテゴリフィルター */}
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

          {/* 記事グリッド */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link href={`/article/${article.id}`} key={article.id} className="block">
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={article.image}
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
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-gray-500 text-sm mt-auto">
                      <span>公開日: {article.date}</span>
                      <span>読了時間: {article.readTime}</span>
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
