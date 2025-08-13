// components/casino-details.tsx
import Image from "next/image"
import Link from "next/link"
import ScrollAnimation from "./animations/scroll-animation"

export default function CasinoDetails() {
  const casinos = [
    {
      id: "1xbet", // app/casino-detail/[id]/page.tsx のIDと一致させる
      name: "1xBET",
      category: "オンラインカジノ",
      image: "/1xbet_top.jpg?height=400&width=600", // 実際の画像パスに置き換え
      description: "老舗のスポーツベット特化カジノ",
    },
    {
      id: "duelbits", // app/casino-detail/[id]/page.tsx のIDと一致させる
      name: "デュエルビッツ",
      category: "オンラインカジノ",
      image: "/duelbits_logo.png?height=400&width=600", // 実際の画像パスに置き換え
      description: "仮想通貨特化！独自のオリジナルゲームと豪華VIP特典が魅力の次世代カジノ。",
    },
    {
      id: "kachiwin", // app/casino-detail/[id]/page.tsx のIDと一致させる
      name: "勝win",
      category: "オンラインカジノ",
      image: "/katsu.jpg?height=400&width=600", // 実際の画像パスに置き換え
      description: "カジノもスポーツベットも楽しめる！日本人向けのサービスが充実。",
    },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              おすすめの
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                カジノの詳細
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              当サイトが厳選したおすすめのオンラインカジノをご紹介します。各カジノの特徴や魅力をチェックしてみましょう。
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casinos.map((casino, index) => (
            <ScrollAnimation key={casino.id} variant="fadeInUp" delay={0.1 * index}>
              <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/10">
                <div className="relative overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={casino.image || "/placeholder.svg"}
                      alt={casino.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-amber-500/80 text-black text-xs font-bold rounded-full">
                      {casino.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{casino.name}</h3>
                  <p className="text-gray-300 mb-4 flex-grow">{casino.description}</p>
                  <Link
                    href={`/casino-detail/${casino.id}`}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-md text-sm w-full text-center transform hover:scale-105 transition-transform"
                  >
                    詳細はこちら
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}