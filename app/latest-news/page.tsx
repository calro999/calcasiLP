// app/latest-news/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

// fsモジュールをインポート（サーバーサイドでのみ動作）
import fs from 'fs/promises';
import path from 'path';

// 記事データの型定義 (必要であればもう少し詳細に)
interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  content: string; // contentプロパティも追加
}

// 記事データを取得するサーバーコンポーネント関数
async function getArticles(): Promise<Article[]> {
  const articlesDir = path.join(process.cwd(), 'contents', 'articles');
  const filenames = await fs.readdir(articlesDir);

  const articlesPromises = filenames.map(async (filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const article = JSON.parse(fileContents);
    return {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt, // 最新情報ページで使うexcerptもJSONに入れる
      image: article.image,
      category: article.category,
      date: article.date,
      readTime: article.readTime,
      content: article.content, // contentも読み込むがここでは使わない
    };
  });

  const allArticles = await Promise.all(articlesPromises);

  // IDでソート（必要であれば）
  return allArticles.sort((a, b) => b.id - a.id);
}


export default async function LatestNews() { // async function に変更
  const allArticles = await getArticles(); // 記事データを取得

  // 注目記事と最新記事を分けるロジック
  const featuredArticles = allArticles.slice(0, 3); // 例: 最新の3件を注目記事とする
  const latestArticles = allArticles.slice(3);     // それ以降を最新記事とする

  return (
    <main className="pt-20 pb-20 bg-black">
      <Header />
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-300 mb-12">
              最新情報
            </h2>
          </ScrollAnimation>

          {/* 注目記事セクション */}
          <ScrollAnimation variant="fadeInUp" delay={0.2}>
            <h3 className="text-3xl font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">
              注目記事
            </h3>
          </ScrollAnimation>
          {featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredArticles.map((article, index) => (
                <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                  <Link href={`/article/${article.id}`} className="block h-full">
                    <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                      <div className="relative">
                        <div className="aspect-[16/9] relative">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex justify-between items-center text-gray-500 text-xs">
                          <span>{article.date}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center mb-16">注目記事がありません。</p>
          )}


          {/* 最新記事セクション */}
          <ScrollAnimation variant="fadeInUp" delay={0.3}>
            <h3 className="text-3xl font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">
              最新記事
            </h3>
          </ScrollAnimation>
          {latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article, index) => (
                <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                  <Link href={`/article/${article.id}`} className="block h-full">
                    <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                      <div className="relative">
                        <div className="aspect-[16/9] relative">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex justify-between items-center text-gray-500 text-xs">
                          <span>{article.date}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">最新記事がありません。</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}