// /workspaces/calcasiLP/app/article/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// HeaderやFooterはlayout.tsxで呼び出すのが一般的です
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

import fs from 'fs/promises'; // fs/promises を使用
import path from 'path';
import { notFound } from 'next/navigation'; // next/navigationからnotFoundをインポート

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string; // ここにHTML文字列が格納されることを想定
}

// すべての記事IDを取得するヘルパー関数
async function getAllArticleIds(): Promise<string[]> {
  const articlesDir = path.join(process.cwd(), 'contents', 'articles');
  try {
    const filenames = await fs.readdir(articlesDir);
    return filenames.map(filename => path.parse(filename).name);
  } catch (error) {
    console.error(`Error reading directory ${articlesDir}:`, error);
    // ディレクトリが存在しない、または読み取れない場合は空配列を返す
    return [];
  }
}

// 特定のIDの記事を取得するヘルパー関数
async function getArticleById(id: string): Promise<Article | undefined> {
  const filePath = path.join(process.cwd(), 'contents', 'articles', `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading or parsing article file for ID ${id} at ${filePath}:`, error);
    return undefined; // エラー時は undefined を返す
  }
}

// 静的パスを生成する関数 (SSG用)
export async function generateStaticParams() {
  // === TEMPORARY FIX: Force only ID '1' for troubleshooting ===
  // Vercel でのビルドエラーが解決したら、以下の2行をコメントアウトし、
  // 下の `const ids = await getAllArticleIds();` 以降の元のコードに戻してください。
  console.log("Forcing generateStaticParams to return only article ID '1' for /article/[id] prerendering.");
  return [{ id: '1' }];
  // ==========================================================

  // const ids = await getAllArticleIds();
  // if (ids.length === 0) {
  //   console.warn("No article IDs found for /article. Ensure 'contents/articles' directory and JSON files exist and are readable.");
  //   // 記事が存在しない場合に備え、空の配列を返すか、既知のテストIDを返す
  //   // 例えば、`1.json` が確実に存在する場合
  //   return [{ id: '1' }];
  // }
  // return ids.map((id) => ({
  //   id: id,
  // }));
}

// 記事詳細ページコンポーネント
export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);

  if (!article) {
    // 記事が見つからない場合は Next.js の notFound ページを表示
    notFound();
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      {/* <Header /> は layout.tsx で呼び出すのが一般的です */}
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

              {/* `dangerouslySetInnerHTML` の形式は正しいです */}
              <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </ScrollAnimation>
        </div>
      </section>
      {/* <Footer /> は layout.tsx で呼び出すのが一般的です */}
    </main>
  );
}