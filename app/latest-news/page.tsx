import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";
import fs from "fs/promises";
import path from "path";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
}

async function getArticles(lang: "ja" | "en" = "ja"): Promise<Article[]> {
  const articlesDir = path.join(process.cwd(), "contents", "articles", lang);

  let entries;
  try {
    entries = await fs.readdir(articlesDir, { withFileTypes: true });
  } catch (err) {
    console.warn(`[getArticles] フォルダが見つかりません: ${articlesDir}`);
    return [];
  }

  const filenames = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  const articlesPromises = filenames.map(async (filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = await fs.readFile(filePath, "utf8");
    const article = JSON.parse(fileContents);
    return article;
  });

  const articles = await Promise.all(articlesPromises);
  return articles.sort((a, b) => b.id - a.id);
}

export default async function LatestNewsPage() {
  const allArticles = await getArticles("ja"); // 言語固定。将来は動的対応可

  const fixedArticles = allArticles.filter(article => article.id >= 1 && article.id <= 6);
  const otherArticles = allArticles.filter(article => article.id > 6);

  return (
    <main className="pt-20 pb-20 bg-black">
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <h2 className="text-4xl font-bold text-amber-300 text-center mb-12">
              最新情報
            </h2>
          </ScrollAnimation>

          <div className="mb-8 flex flex-col md:flex-row md:items-center md:gap-4">
            <input
              type="text"
              placeholder="記事を検索..."
              className="w-full md:w-1/2 px-4 py-2 rounded bg-white text-black mb-4 md:mb-0"
            />
            <div className="flex gap-2 flex-wrap">
              {[...new Set(allArticles.map(a => a.category))].map(category => (
                <span key={category} className="px-3 py-1 bg-white text-black text-sm rounded-full">
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* 固定記事 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {fixedArticles.map((article, index) => (
              <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                <Link href={`/article/${article.id}`} className="block">
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
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-gray-500 text-sm mt-auto">
                        <span>公開日: {article.date}</span>
                        <span>読了時間: {article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {/* 通常記事 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherArticles.slice(0, 9).map((article, index) => (
              <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                <Link href={`/article/${article.id}`} className="block">
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
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-gray-500 text-sm mt-auto">
                        <span>公開日: {article.date}</span>
                        <span>読了時間: {article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {/* ページネーション */}
          <div className="mt-12 flex justify-center gap-4">
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300">前のページ</button>
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300">次のページ</button>
          </div>
        </div>
      </section>
    </main>
  );
}
