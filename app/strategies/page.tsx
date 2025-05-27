// /app/strategies/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";
import fs from "fs/promises";
import path from "path";

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
    <main className="pt-20 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          攻略法一覧
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy, index) => (
            <ScrollAnimation key={strategy.id} variant="fadeInUp" delay={index * 0.1}>
              <Link
                href={`/strategies/${strategy.id}`}
                className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={strategy.image}
                    alt={strategy.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-3">
                    {strategy.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 flex-grow">
                    {strategy.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {strategy.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-gray-500 text-sm mt-auto">
                    <span>公開日: {strategy.date}</span>
                    <span>読了時間: {strategy.readTime}</span>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </main>
  );
}
