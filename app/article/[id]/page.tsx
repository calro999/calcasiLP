// app/article/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

// fsモジュールをインポート（サーバーサイドでのみ動作）
import fs from 'fs/promises';
import path from 'path';

// 記事データの型定義
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

// 全記事のIDリストを取得する関数 (generateStaticParams用)
async function getAllArticleIds(): Promise<string[]> {
  const articlesDir = path.join(process.cwd(), 'data', 'articles');
  const filenames = await fs.readdir(articlesDir);
  return filenames.map(filename => path.parse(filename).name); // ファイル名からIDを取得
}

// 特定のIDの記事データを取得する関数
async function getArticleById(id: string): Promise<Article | undefined> {
  const filePath = path.join(process.cwd(), 'data', 'articles', `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading article file for ID ${id}:`, error);
    return undefined;
  }
}

// generateStaticParams を定義して、記事IDに基づいて静的ページを生成
export async function generateStaticParams() {
  const ids = await getAllArticleIds();
  return ids.map((id) => ({
    id: id,
  }));
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);

  if (!article) {
    // 記事が見つからない場合の表示
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen flex flex-col items-center justify-center text-white">
        <Header />
        <section className="text-center p-8">
          <h2 className="text-3xl font-bold text-amber-300 mb-4">記事が見つかりませんでした</h2>
          <p className="text-gray-400 mb-8">お探しの記事は存在しないか、削除された可能性があります。</p>
          <Link href="/latest-news" className="text-blue-400 hover:underline">
            最新情報一覧に戻る
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      <Header />
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <Link href="/latest-news" className="text-blue-400 hover:underline text-sm flex items-center mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  最新情報一覧に戻る
                </Link>
                <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-4">
                  {article.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {article.title}
                </h1>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-4">公開日: {article.date}</span>
                  <span className="mr-4">読了時間: {article.readTime}</span>
                  <span>著者: {article.author}</span>
                </div>
              </div>

              <div className="relative mb-6">
                <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* dangerouslySetInnerHTML を使用してHTMLコンテンツを表示 */}
              <div className="text-gray-300 text-lg leading-relaxed article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </ScrollAnimation>
        </div>
      </section>
      <Footer />
    </main>
  );
}