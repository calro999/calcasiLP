// app/latest-news/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

// fsモジュールとpathモジュールをインポート（サーバーサイドでのみ動作）
import fs from 'fs/promises';
import path from 'path';

// 記事データの型定義 (必要に応じてexcerptも追加)
interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string; // 著者を追加
  content: string; // contentも読み込むがここでは使わない
}

// 記事データを取得するサーバーコンポーネント関数
async function getArticles(): Promise<Article[]> {
  const articlesDir = path.join(process.cwd(), 'contents', 'articles'); // 'contents' フォルダ名に合わせる
  const filenames = await fs.readdir(articlesDir);

  const articlesPromises = filenames.map(async (filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const article = JSON.parse(fileContents);
    return {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || '', // excerptがない場合を考慮
      image: article.image,
      category: article.category,
      date: article.date,
      readTime: article.readTime,
      author: article.author || '不明', // authorがない場合を考慮
      content: article.content,
    };
  });

  // ファイル名に基づいてソート（新しい記事が上に来るようにIDで降順ソート）
  const articles = await Promise.all(articlesPromises);
  return articles.sort((a, b) => b.id - a.id);
}

export default async function LatestNewsPage() {
  const articles = await getArticles();

  return (
    <main className="pt-20 pb-20 bg-black">
      <Header />
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <h2 className="text-4xl font-bold text-amber-300 text-center mb-12">
              最新情報
            </h2>
          </ScrollAnimation>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
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
        </div>
      </section>
      <Footer />
    </main>
  );
}