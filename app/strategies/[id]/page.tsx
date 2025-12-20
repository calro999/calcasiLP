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
    id: string; // ここには '1' や 'Parlay' が入ってきます
  };
}

/**
 * 全てのJSONファイルを走査して、IDまたはogUrlが一致するデータを探す関数
 */
async function findStrategy(slugOrId: string): Promise<StrategyData | null> {
  const strategiesDir = path.join(process.cwd(), "contents", "strategies");
  
  try {
    const filenames = await fs.readdir(strategiesDir);
    
    for (const filename of filenames) {
      if (!filename.endsWith(".json")) continue;
      
      const filePath = path.join(strategiesDir, filename);
      const fileContents = await fs.readFile(filePath, "utf-8");
      const strategy: StrategyData = JSON.parse(fileContents);
      
      // 1. ファイル名（ID）が一致する場合
      if (filename.replace(".json", "") === slugOrId) return strategy;
      
      // 2. ogUrl の末尾（スラッグ）が一致する場合
      if (strategy.ogUrl) {
        const urlSlug = strategy.ogUrl.split("/").pop(); // URLの最後（Parlayなど）を取得
        if (urlSlug === slugOrId) return strategy;
      }
    }
  } catch (e) {
    console.error("Error finding strategy:", e);
  }
  return null;
}

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const strategy = await findStrategy(params.id);
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
  const strategy = await findStrategy(params.id);

  if (!strategy) {
    return notFound();
  }

  return (
    <main className="pt-24 pb-20 bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-800">
          <img src={strategy.image} alt={strategy.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
             <span className="px-3 py-1 bg-amber-500 text-black text-xs font-black rounded-md">{strategy.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            {strategy.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400 border-b border-gray-800 pb-6">
            <span>👤 著者: {strategy.author}</span>
            <span>📅 公開日: {strategy.date}</span>
            <span>⏱️ 読了時間: {strategy.readTime}</span>
          </div>
        </div>

        <div className="bg-gray-900/40 p-6 rounded-xl border-l-4 border-amber-500">
          <p className="text-lg text-gray-200 leading-relaxed italic">{strategy.excerpt}</p>
        </div>

        <article
          className="prose prose-invert max-w-none 
                     prose-h2:text-amber-300 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-amber-500/20 prose-h2:pb-2
                     prose-h3:text-white prose-h3:text-xl prose-h3:mt-8
                     prose-p:text-gray-300 prose-p:leading-8 prose-p:mb-6
                     prose-li:text-gray-300 prose-li:marker:text-amber-400 
                     prose-strong:text-amber-200 prose-strong:font-bold
                     prose-ul:list-disc prose-ul:pl-6
                     prose-a:text-amber-400 prose-a:font-bold hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: strategy.content }}
        />
      </div>

      {strategy.includeDiceGame && (
        <div className="mt-20 border-t border-gray-800 pt-16 max-w-[1400px] mx-auto px-4">
          <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-3xl border border-amber-500/20">
            <h2 className="text-3xl font-black mb-8 text-center bg-gradient-to-r from-amber-200 to-yellow-500 text-transparent bg-clip-text">
              🎲 ストラテジーをシミュレーションする
            </h2>
            <DiceGame />
          </div>
        </div>
      )}
    </main>
  );
}