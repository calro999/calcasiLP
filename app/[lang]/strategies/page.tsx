// 完全統合された攻略記事一覧ページ：app/[lang]/strategies/page.tsx

import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import ScrollAnimation from "@/components/ScrollAnimation";

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

async function getStrategies(lang: string): Promise<Strategy[]> {
  const dir = path.join(process.cwd(), "contents", "strategies", lang);
  const filenames = await fs.readdir(dir);

  const strategies = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = await fs.readFile(filePath, "utf-8");
      return JSON.parse(fileContent);
    })
  );

  return strategies.sort((a, b) => b.id - a.id);
}

export default async function StrategyListPage({ params }: { params: { lang: string } }) {
  const strategies = await getStrategies(params.lang);

  return (
    <main className="pt-20 pb-20 bg-black">
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <h2 className="text-4xl font-bold text-amber-300 text-center mb-12">
              攻略記事一覧
            </h2>
          </ScrollAnimation>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {strategies.map((strategy, index) => (
              <ScrollAnimation key={strategy.id} variant="fadeInUp" delay={index * 0.1}>
                <Link href={`/${params.lang}/strategies/${strategy.id}`} className="block">
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={strategy.image}
                        alt={strategy.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
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
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
