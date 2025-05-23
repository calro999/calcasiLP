// /workspaces/calcasiLP/app/strategies/page.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";
import Particles from "@/components/animations/particles";

// インターフェースの定義 (JSONファイルの構造に合わせて調整してください)
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
  contentHtml: string; // 一覧表示では通常は使いませんが、型定義としては含めます
}

async function getAllStrategies(): Promise<Strategy[]> {
  const strategiesDirectory = path.join(process.cwd(), 'contents/strategies');
  try {
    const filenames = fs.readdirSync(strategiesDirectory);
    const allStrategies = filenames.map(filename => {
      const filePath = path.join(strategiesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Strategy;
    });
    // 必要に応じて日付順などでソート
    return allStrategies.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  } catch (error) {
    console.error("Error reading strategies directory:", error);
    return [];
  }
}

export default async function StrategiesPage() {
  const strategies = await getAllStrategies();

  return (
    <main className="pt-20 pb-20 bg-black text-white relative overflow-hidden">
      <Particles className="absolute inset-0 z-0" count={100} color="rgba(255, 215, 0, 0.2)" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation variant="fadeInDown">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Shimmer>
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  攻略記事一覧
                </span>
              </Shimmer>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              カジノゲームで勝つための実践的な攻略法とテクニックを紹介します。
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.length > 0 ? (
            strategies.map((strategy, index) => (
              <ScrollAnimation key={strategy.id} variant="fadeInUp" delay={index * 0.1}>
                <Link href={`/strategies/${strategy.id}`} className="block h-full">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/30 transition-shadow duration-300 flex flex-col h-full">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={strategy.image || "/placeholder.svg"}
                        alt={strategy.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-3">
                        {strategy.category}
                      </span>
                      <h2 className="text-xl font-bold text-white mb-3 flex-grow">
                        {strategy.title}
                      </h2>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {strategy.description}
                      </p>
                      <div className="flex items-center text-gray-500 text-xs mt-auto">
                        <Calendar size={16} className="mr-1" />
                        <span className="mr-3">{strategy.publishedDate}</span>
                        <Clock size={16} className="mr-1" />
                        <span>{strategy.readTime}分</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg">
              現在、攻略記事はありません。
            </div>
          )}
        </div>
      </div>
    </main>
  );
}