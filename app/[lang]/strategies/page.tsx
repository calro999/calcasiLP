// /app/[lang]/strategies/page.tsx

import Link from "next/link";
import Image from "next/image";
import { getAllStrategies } from "@/lib/getAllStrategies";
import { Strategy } from "@/lib/types";

// ✅ generateStaticParams を一時的にコメントアウトしました
// export async function generateStaticParams() {
//   return [{ lang: "ja" }, { lang: "en" }];
// }

export default async function StrategyListPage({ params }: { params: { lang: "ja" | "en" } }) {
  const strategies: Strategy[] = await getAllStrategies(params.lang);

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">攻略記事一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy) => (
            <Link
              key={strategy.id}
              href={`/${params.lang}/strategies/${strategy.id}`}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition"
            >
              <div className="relative w-full h-48">
                <Image src={strategy.image} alt={strategy.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-2">{strategy.title}</h2>
                <p className="text-gray-300 text-sm line-clamp-3">{strategy.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}