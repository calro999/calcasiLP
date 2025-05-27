import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Strategy } from "@/lib/types";
import DiceGame from "@/components/DiceGame"; // 🎲 追加

interface Params {
  params: {
    id: string;
  };
}

export default async function StrategyDetailPage({ params }: Params) {
  const { id } = params;
  const filePath = path.join(process.cwd(), "contents/strategies", `${id}.json`);

  if (!fs.existsSync(filePath)) return notFound();

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const strategy: Strategy = JSON.parse(fileContents);

  return (
    <main className="pt-20 pb-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-xl border border-gray-700">
          <img
            src={strategy.image}
            alt={strategy.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">{strategy.title}</h1>

        <div className="text-sm text-gray-400 flex flex-wrap gap-4">
          <span>カテゴリ: {strategy.category}</span>
          <span>公開日: {strategy.date}</span>
          <span>読了時間: {strategy.readTime}</span>
          <span>著者: {strategy.author}</span>
        </div>

        <p className="text-lg text-gray-300">{strategy.excerpt}</p>

        <article
          className="prose prose-invert max-w-none text-white 
                     [&_h2]:text-amber-300 
                     [&_h3]:text-white 
                     [&_li]:marker:text-amber-400 
                     [&_strong]:text-white 
                     [&_ul]:list-disc 
                     [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: strategy.content }}
        />

        {/* ✅ includeDiceGame フラグが true の場合にゲームを表示 */}
        {strategy.includeDiceGame && (
          <div className="mt-12 border-t border-gray-700 pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-amber-300">🎲 実際にプレイしてみよう</h2>
            <DiceGame />
          </div>
        )}
      </div>
    </main>
  );
}
