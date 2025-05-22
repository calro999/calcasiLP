import Image from "next/image"
import { Star } from "lucide-react"
import ScrollAnimation from "./animations/scroll-animation"
import Parallax from "./animations/parallax"

export default function PopularGames() {
  const games = [
    {
      id: 1,
      name: "ムーンプリンセス",
      provider: "Play'n GO",
      image: "/placeholder.svg?height=300&width=500",
      rating: 5,
    },
    {
      id: 2,
      name: "スターバースト",
      provider: "NetEnt",
      image: "/placeholder.svg?height=300&width=500",
      rating: 5,
    },
    {
      id: 3,
      name: "ブックオブデッド",
      provider: "Play'n GO",
      image: "/placeholder.svg?height=300&width=500",
      rating: 4,
    },
    {
      id: 4,
      name: "ハワイアンドリーム",
      provider: "JTG",
      image: "/placeholder.svg?height=300&width=500",
      rating: 5,
    },
    {
      id: 5,
      name: "ゴンゾーズクエスト",
      provider: "NetEnt",
      image: "/placeholder.svg?height=300&width=500",
      rating: 4,
    },
    {
      id: 6,
      name: "ボナンザ",
      provider: "Big Time Gaming",
      image: "/placeholder.svg?height=300&width=500",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <Parallax speed={0.2} direction="up" className="absolute inset-0 z-0 opacity-5">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="aspect-square bg-amber-500/20 rounded-full"></div>
          ))}
        </div>
      </Parallax>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              人気の
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                ゲーム
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              オンラインカジノで人気のスロットゲームをご紹介します。高いペイアウト率と面白いゲーム性が魅力です。
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <ScrollAnimation key={game.id} variant="fadeInUp" delay={0.2 * index} className="h-full">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden h-full transition-all duration-500 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transform hover:translate-y-[-5px]">
                <div className="relative aspect-[16/9]">
                  <Image src={game.image || "/placeholder.svg"} alt={game.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-lg">{game.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{game.provider}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < game.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
