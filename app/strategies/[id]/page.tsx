// /workspaces/calcasiLP/app/strategies/[id]/page.tsx
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';

interface Strategy {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  author: string;
  readTime: number;
  category: string;
  difficulty: string;
  expectedValue: string;
  image: string;
  content: string; // HTML文字列
}

// ID一覧取得（静的ルーティング用）
async function getAllStrategyIds(): Promise<string[]> {
  const dir = path.join(process.cwd(), 'contents', 'strategies');
  try {
    const filenames = await fs.readdir(dir);
    return filenames.map(filename => path.parse(filename).name);
  } catch (error) {
    console.error('Error reading strategies directory:', error);
    return [];
  }
}

// IDで1記事取得
async function getStrategyById(id: string): Promise<Strategy | undefined> {
  const filePath = path.join(process.cwd(), 'contents', 'strategies', `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading strategy ${id}:`, error);
    return undefined;
  }
}

// 静的パス生成（SSG）
export async function generateStaticParams() {
  const ids = await getAllStrategyIds();
  return ids.map((id) => ({ id }));
}

// ページ本体
export default async function StrategyDetailPage({ params }: { params: { id: string } }) {
  const strategy = await getStrategyById(params.id);

  if (!strategy) {
    return notFound();
  }

  return (
    <main className="pt-20 pb-20 bg-black text-white">
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <Link href="/strategies" className="text-blue-400 hover:underline text-sm flex items-center mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  攻略記事一覧に戻る
                </Link>
                <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-4">
                  {strategy.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{strategy.title}</h1>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-4">公開日: {strategy.publishedDate}</span>
                  <span className="mr-4">読了時間: {strategy.readTime}分</span>
                  <span>著者: {strategy.author}</span>
                </div>
              </div>

              <div className="relative mb-6">
                <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                  <Image
                    src={strategy.image || '/placeholder.svg'}
                    alt={strategy.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: strategy.content }} />
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
}
