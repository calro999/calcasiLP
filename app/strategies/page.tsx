import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";
import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Online Casino Winning Strategies | Calcasi Canada",
  description: "Master the best strategies for Baccarat, Roulette, Slots, and more. From Martingale to pro counting methods, we cover it all to help you win.",
};

interface Strategy {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  ogUrl?: string; // ✅ 追加：JSONからカスタムURLを取得
}

async function getStrategies(): Promise<Strategy[]> {
  const strategiesDir = path.join(process.cwd(), "contents", "strategies");

  let entries;
  try {
    entries = await fs.readdir(strategiesDir, { withFileTypes: true });
  } catch (err) {
    console.warn(`[getStrategies] フォルダが見つかりません: ${strategiesDir}`);
    return [];
  }

  const filenames = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  const strategies = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(strategiesDir, filename);
      const fileContents = await fs.readFile(filePath, "utf-8");
      const strategy = JSON.parse(fileContents);
      return strategy as Strategy;
    })
  );

  return strategies.sort((a, b) => b.id - a.id);
}

export default async function StrategyListPage() {
  const strategies = await getStrategies();

  return (
    <main className="pt-24 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
          Winning Strategies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy, index) => {
            // ✅ リンク先の判定ロジック
            // ogUrlがあればそれを使う。ただし、外部リンク(https://...)の場合はそのまま、
            // 内部リンク（スラッシュから始まる）の場合はNext.jsのルーティングとして扱います。
            const targetHref = strategy.ogUrl 
              ? strategy.ogUrl.replace("https://calcasi.com", "") // ドメイン部分を削って内部パスにする
              : `/strategies/${strategy.id}`;

            return (
              <ScrollAnimation key={strategy.id} variant="fadeInUp" delay={index * 0.1}>
                <Link
                  href={targetHref}
                  className="group block bg-[#111] rounded-xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-300 h-full shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={strategy.image}
                      alt={strategy.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-amber-500 text-black text-xs font-black rounded-full shadow-lg">
                        {strategy.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-[280px]">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {strategy.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {strategy.excerpt}
                    </p>

                    <div className="flex justify-between items-center text-gray-500 text-[10px] mt-auto border-t border-gray-800 pt-4">
                      <span>📅 Published: {strategy.date}</span>
                      <span>⏱️ {strategy.readTime}</span>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </main>
  );
}