// /workspaces/calcasiLP/app/article/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

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

async function getAllArticleIds(): Promise<string[]> {
  const articlesDir = path.join(process.cwd(), 'contents', 'articles');
  try {
    const filenames = await fs.readdir(articlesDir);
    return filenames.map(filename => path.parse(filename).name);
  } catch (error) {
    console.error(`Error reading directory ${articlesDir}:`, error);
    return [];
  }
}

async function getArticleById(id: string): Promise<Article | undefined> {
  const filePath = path.join(process.cwd(), 'contents', 'articles', `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading or parsing article file for ID ${id} at ${filePath}:`, error);
    return undefined;
  }
}

export async function generateStaticParams() {
  console.log("Forcing generateStaticParams to return only article ID '1' for /article/[id] prerendering.");
  return [{ id: '1' }];
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);

  if (!article) {
    return notFound(); // ✅ 修正済み：必ず return を付ける
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <Link href="/latest-news" className="text-blue-400 hover:underline text-sm flex items-center mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  最新情報一覧に戻る
                </Link>
                <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-4">
                  {article.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>
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

              {article.content && (
                <div
                  className="prose prose-invert max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              )}
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
}
