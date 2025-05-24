import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';
import fs from 'fs/promises';
import path from 'path';

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

// Next.js App Router expects a type like this:
type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'contents', 'articles');
  const filenames = await fs.readdir(dir);
  return filenames.map((filename) => ({
    id: path.parse(filename).name,
  }));
}

export default async function Page({ params }: PageProps) {
  const filePath = path.join(
    process.cwd(),
    'contents',
    'articles',
    `${params.id}.json`
  );

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const article: Article = JSON.parse(fileContents);

    return (
      <main className="pt-20 pb-20 bg-black">
        <section className="bg-gray-900 py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <ScrollAnimation variant="fadeInUp" delay={0}>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 md:p-8">
                <div className="mb-6">
                  <Link
                    href="/latest-news"
                    className="text-blue-400 hover:underline text-sm flex items-center mb-4"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
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

                <div
                  className="prose prose-invert max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('記事の読み込みに失敗しました:', error);
    return notFound();
  }
}
