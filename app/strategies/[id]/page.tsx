// /app/strategies/[id]/page.tsx
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";
import DiceGame from "@/app/tools/app/tools/page"; // ダイスゲームのトップコンポーネント

// 型定義：JSONデータの構造に合わせる
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
}

interface ParamsProps {
  params: {
    id: string;
  };
}

/**
 * 動的メタデータの生成
 * JSON内のSEO/OGP用データを優先的に使用します
 */
export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { id } = params;
  const filePath = path.join(process.cwd(), "contents/strategies", `${id}.json`);
  
  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    const strategy: StrategyData = JSON.parse(fileContents);
    
    // サイトのベースURL（必要に応じて変更してください）
    const baseUrl = "https://calcasi.com"; 

    return {
      title: strategy.metaTitle || `${strategy.title} | calcasiどっとこむ`,
      description: strategy.metaDescription || strategy.excerpt,
      openGraph: {
        title: strategy.title,
        description: strategy.excerpt,
        images: [strategy.ogImage || strategy.image],
        type: "article",
        url: `${baseUrl}/strategies/${id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: strategy.title,
        description: strategy.excerpt,
        images: [strategy.ogImage || strategy.image],
      }
    };
  } catch {
    return { title: "攻略記事が見つかりません" };
  }
}

/**
 * 攻略記事詳細ページコンポーネント
 */
export default async function StrategyDetailPage({ params }: ParamsProps) {
  const { id } = params;
  const filePath = path.join(process.cwd(), "contents/strategies", `${id}.json`);

  let strategy: StrategyData;

  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    strategy = JSON.parse(fileContents);
  } catch (error) {
    // ファイルが存在しない、またはパースエラーの場合は404へ
    return notFound();
  }

  return (
    <main className="pt-24 pb-20 bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* アイキャッチ画像セクション */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <img
            src={strategy.image}
            alt={strategy.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 記事タイトル・属性情報 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 bg-amber-500 text-black text-xs font-black rounded-md shadow-lg">
                {strategy.category}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            {strategy.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400 border-b border-gray-800 pb-6 font-medium">
            <span>👤 著者: {strategy.author}</span>
            <span>📅 公開日: {strategy.date}</span>
            <span>⏱️ 読了時間: {strategy.readTime}</span>
          </div>
        </div>

        {/* 導入テキスト（要約） */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-xl border-l-4 border-amber-500 shadow-inner">
          <p className="text-lg text-gray-200 leading-relaxed italic font-medium">
            {strategy.excerpt}
          </p>
        </div>

        {/* 記事本文：Tailwind Typography (prose) を使用 */}
        <article
          className="prose prose-invert max-w-none 
                     prose-h2:text-amber-300 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-amber-500/20 prose-h2:pb-2 prose-h2:font-black
                     prose-h3:text-white prose-h3:text-xl prose-h3:mt-8 prose-h3:font-bold
                     prose-p:text-gray-300 prose-p:leading-8 prose-p:mb-6
                     prose-li:text-gray-300 prose-li:marker:text-amber-400 
                     prose-strong:text-amber-200 prose-strong:font-bold
                     prose-ul:list-disc prose-ul:pl-6
                     prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: strategy.content }}
        />
      </div>

      {/* ✅ ツール連携セクション（JSONのincludeDiceGameがtrueの場合のみ表示） */}
      {strategy.includeDiceGame && (
        <div className="mt-24 border-t border-gray-900 pt-20 max-w-[1400px] mx-auto px-4">
          <div className="bg-[#050505] p-6 md:p-12 rounded-[2rem] border border-amber-500/10 shadow-[0_0_50px_rgba(251,191,36,0.05)]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200 text-transparent bg-clip-text">
                🎲 ストラテジー・シミュレーター
              </h2>
              <p className="text-gray-400">
                上記の攻略理論を、自作のダイスゲームで今すぐテストプレイできます。
              </p>
            </div>
            
            {/* 慎重に呼び出し：DiceGameコンポーネント */}
            <div className="relative z-10">
               <DiceGame />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}