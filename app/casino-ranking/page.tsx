// /app/[lang]/casino-ranking/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";

export default async function CasinoRankingPage({ params }: { params: { lang: "ja" | "en" } }) {
  const casinos: Casino[] = await getAllCasinos(params.lang);

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">カジノランキング</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casinos.map((casino) => (
            <Link
              key={casino.id}
              href={`/casino-detail/${casino.id}`}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition"
            >
              <div className="relative w-full h-48">
                <Image src={casino.banner} alt={casino.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-2">{casino.name}</h2>
                <p className="text-gray-300 text-sm line-clamp-3">{casino.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
