// /app/strategies/[id]/page.tsx
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";
import DiceGame from "@/app/tools/app/tools/page";

interface StrategyData {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  includeDiceGame?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

interface ParamsProps {
  params: {
    id: string; // 'Parlay' や 'Martingale' など
  };
}

/**
 * 全てのJSONファイルを走査して、ogUrl内のスラッグが一致するものを最優先で探す
 */
async function findStrategyBySlugOrId(target: string): Promise<StrategyData | null> {
  const strategiesDir = path.join(process.cwd(), "contents", "strategies");
  
  try {
    const filenames = await fs.readdir(strategiesDir);
    const strategies: StrategyData[] = [];

    // まず全てのJSONを読み込む
    for (const filename of filenames) {
      if (!filename.endsWith(".json")) continue;
      const filePath = path.join(strategiesDir, filename);
      const fileContents = await fs.readFile(filePath, "utf-8");
      strategies.push(JSON.parse(fileContents));
    }

    // 1. ogUrlの末尾（スラッグ）が一致するものを探す（最優先）
    const bySlug = strategies.find(s => {
      if (!s.ogUrl) return false;
      const slug = s.ogUrl.split("/").pop();
      return slug?.toLowerCase() === target.toLowerCase();
    });
    if (bySlug) return bySlug;

    // 2. IDが一致するものを探す
    const byId = strategies.find(s => s.id.toString() === target);
    if (byId) return byId;

  } catch (e) {
    console.error("Error finding strategy:", e);
  }
  return null;
}

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const strategy = await findStrategyBySlugOrId(params.id);
  if (!strategy) return { title: "攻略記事が見つかりません" };

  const finalUrl = strategy.ogUrl || `https://calcasi.com/strategies/${strategy.id}`;

  return {
    title: strategy.metaTitle || `${strategy.title} | calcasiどっとこむ`,
    description: strategy.metaDescription || strategy.excerpt,
    openGraph: {
      title: strategy.title,
      description: strategy.excerpt,
      images: [strategy.ogImage || strategy.image],
      type: "article",
      url: finalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: strategy.title,
      description: strategy.excerpt,
      images: [strategy.ogImage || strategy.image],
    }
  };
}

export default async function StrategyDetailPage({ params }: ParamsProps) {
  const strategy = await findStrategyBySlugOrId(params.id);

  if (!strategy) {
    return notFound();
  }

  return (
    <main className="pt-24 pb-20 bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* アイキャッチ */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-800 shadow-2xl">
          <img src={strategy.image} alt={strategy.title} className="w-full h-full object-cover" />
        </div>

        {/* タイトルエリア */}
        <div className="space-y-4">
          <div className="flex items-center">
             <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-black rounded-md tracking-tighter uppercase">
                {strategy.category}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            {strategy.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-gray-500 border-b border-gray-800 pb-6 uppercase tracking-widest">
            <span>Author: {strategy.author}</span>
            <span>Date: {strategy.date}</span>
            <span>Read: {strategy.readTime}</span>
          </div>
        </div>

        {/* 抜粋 */}
        <div className="bg-gray-900/40 p-6 rounded-xl border-l-4 border-amber-500 shadow-inner">
          <p className="text-lg text-gray-200 leading-relaxed italic font-light">
            {strategy.excerpt}
          </p>
        </div>

        {/* 本文 */}
        <article
          className="prose prose-invert max-w-none 
                     prose-h2:text-amber-300 prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-amber-500/20 prose-h2:pb-4 prose-h2:font-black
                     prose-h3:text-white prose-h3:text-xl prose-h3:mt-10 prose-h3:font-bold
                     prose-p:text-gray-300 prose-p:leading-8 prose-p:mb-6 prose-p:text-[17px]
                     prose-li:text-gray-300 prose-li:marker:text-amber-400 prose-li:mb-2
                     prose-strong:text-amber-200 prose-strong:font-bold
                     prose-ul:list-disc prose-ul:pl-6
                     prose-a:text-amber-400 prose-a:font-bold hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: strategy.content }}
        />
      </div>

      {/* ダイスゲーム表示判定 */}
      {strategy.includeDiceGame && (
        <div className="mt-20 border-t border-gray-800 pt-16 max-w-[1400px] mx-auto px-4">
          <div className="bg-gradient-to-b from-gray-900 to-black p-4 md:p-12 rounded-[2rem] border border-amber-500/20 shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)]">
            <h2 className="text-2xl md:text-4xl font-black mb-12 text-center bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-transparent bg-clip-text uppercase tracking-tighter">
              Live Simulation
            </h2>
            <DiceGame />
          </div>
        </div>
      )}
    </main>
  );
}