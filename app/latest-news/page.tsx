// ✅ 検索・カテゴリ絞り込み・パフォーマンス対応付き 最新情報ページ
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import ScrollAnimation from '@/components/ScrollAnimation';
import { cache } from 'react';

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

const PAGE_SIZE = 6;
const PINNED_IDS = new Set(['1', '2', '3', '4', '5', '6']);

const getArticles = cache(async (): Promise<Article[]> => {
  const articlesDir = path.join(process.cwd(), 'contents', 'articles');
  const filenames = await fs.readdir(articlesDir);

  const articlesPromises = filenames.map(async (filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const article = JSON.parse(fileContents);
    return {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || '',
      image: article.image,
      category: article.category,
      date: article.date,
      readTime: article.readTime,
      author: article.author || '不明',
      content: article.content,
    };
  });

  const articles = await Promise.all(articlesPromises);
  return articles.sort((a, b) => b.id - a.id);
});

export default async function LatestNewsPage({
  searchParams,
}: {
  searchParams?: { page?: string; category?: string; q?: string };
}) {
  const currentPage = Number(searchParams?.page || 1);
  const categoryFilter = searchParams?.category;
  const keyword = searchParams?.q?.toLowerCase();

  const allArticles = await getArticles();

  const pinned = allArticles.filter((a) => PINNED_IDS.has(String(a.id)));
  let filtered = allArticles.filter((a) => !PINNED_IDS.has(String(a.id)));

  if (categoryFilter) {
    filtered = filtered.filter((a) => a.category === categoryFilter);
  }

  if (keyword) {
    filtered = filtered.filter(
      (a) => a.title.toLowerCase().includes(keyword) || a.excerpt.toLowerCase().includes(keyword)
    );
  }

  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const searchParamsBase = new URLSearchParams();
  if (categoryFilter) searchParamsBase.set('category', categoryFilter);
  if (keyword) searchParamsBase.set('q', keyword);

  return (
    <main className="pt-20 pb-20 bg-black">
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <h2 className="text-4xl font-bold text-amber-300 text-center mb-8">最新情報</h2>
          </ScrollAnimation>

          {/* 🔍 フィルター・検索バー */}
          <form method="GET" className="mb-12 flex flex-wrap gap-4 justify-center">
            <select name="category" defaultValue={categoryFilter || ''} className="px-3 py-2 rounded">
              <option value="">全カテゴリ</option>
              {[...new Set(allArticles.map((a) => a.category))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              name="q"
              placeholder="記事を検索"
              defaultValue={keyword || ''}
              className="px-3 py-2 rounded w-64"
            />
            <button type="submit" className="bg-amber-500 text-black px-4 py-2 rounded">検索</button>
          </form>

          {/* 📌 固定記事 */}
          {currentPage === 1 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
              {pinned.map((article, index) => (
                <ArticleCard key={article.id} article={article} delay={index * 0.1} />
              ))}
            </div>
          )}

          {/* 通常記事 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((article, index) => (
              <ArticleCard key={article.id} article={article} delay={index * 0.1} />
            ))}
          </div>

          {/* ページネーション */}
          <div className="flex justify-center mt-12 gap-4">
            {currentPage > 1 && (
              <Link href={`/latest-news?${searchParamsBase.toString()}&page=${currentPage - 1}`}>
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">前のページ</button>
              </Link>
            )}
            {currentPage < totalPages && (
              <Link href={`/latest-news?${searchParamsBase.toString()}&page=${currentPage + 1}`}>
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">次のページ</button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleCard({ article, delay }: { article: Article; delay: number }) {
  return (
    <ScrollAnimation variant="fadeInUp" delay={delay}>
      <Link href={`/article/${article.id}`} className="block">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
          <div className="relative aspect-[16/9]">
            <Image src={article.image} alt={article.title} fill className="object-cover" />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-3">
              {article.category}
            </span>
            <h3 className="text-xl font-bold text-white mb-3 flex-grow">{article.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex justify-between items-center text-gray-500 text-sm mt-auto">
              <span>公開日: {article.date}</span>
              <span>読了時間: {article.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </ScrollAnimation>
  );
}
