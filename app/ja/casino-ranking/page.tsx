// /app/ja/casino-ranking/page.tsx

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { casinoData } from "@/lib/casinoData"

export default function CasinoRankingPage() {
  return (
    <main className="pt-20 pb-20 bg-black">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">オンラインカジノランキング</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casinoData.map((casino) => (
            <Link
              key={casino.id}
              href={`/casino-detail/${casino.id}`}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition"
            >
              <div className="relative w-full h-32 bg-white rounded-lg mb-4">
                <Image
                  src={casino.logo}
                  alt={`${casino.name}のロゴ`}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{casino.name}</h2>
              <p className="text-gray-300 text-sm mb-2">{casino.description}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(casino.rating)
                        ? "text-amber-400 fill-amber-400"
                        : i < casino.rating
                        ? "text-amber-400 fill-amber-400 opacity-50"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-white text-sm font-bold">{casino.rating}/5.0</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
