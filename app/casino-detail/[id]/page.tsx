// /app/casino-detail/[id]/page.tsx

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, ExternalLink } from "lucide-react"
import { casinoData } from "@/lib/casinoData"

export default function CasinoDetail({ params }: { params: { id: string } }) {
  const casino = casinoData.find((c) => c.id === params.id)

  if (!casino) {
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">カジノが見つかりません</h1>
          <p className="text-xl">指定されたカジノIDには情報がありません。</p>
          <Link href="/casino-ranking" className="text-amber-400 mt-6 block hover:underline">
            <ArrowLeft size={16} className="inline-block mr-1" />
            カジノランキングに戻る
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      <div className="container mx-auto px-4">
        <Link href="/casino-ranking" className="text-amber-400 hover:underline flex items-center mb-6">
          <ArrowLeft size={18} className="mr-2" />
          カジノランキングに戻る
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <div className="bg-white rounded-xl overflow-hidden p-4">
              <Image
                src={casino.logo}
                alt={`${casino.name}のロゴ`}
                width={300}
                height={150}
                className="object-contain w-full h-auto mx-auto"
              />
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-white">{casino.name}</h1>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(casino.rating)
                        ? "text-amber-400 fill-amber-400"
                        : i < casino.rating
                        ? "text-amber-400 fill-amber-400 opacity-50"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-white ml-2 font-bold">{casino.rating}/5.0</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">概要</h2>
            <p className="text-gray-300 mb-4">{casino.description}</p>

            <div className="bg-amber-500/10 text-amber-300 p-4 rounded-lg mb-4 font-bold">
              🎁 ボーナス: {casino.bonus}
            </div>

            <Link
              href={casino.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-black font-bold px-6 py-3 rounded-md transition-all transform hover:scale-105"
            >
              公式サイトへ
              <ExternalLink size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
