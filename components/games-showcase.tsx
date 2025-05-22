import Image from "next/image"
import Link from "next/link"
import ScrollAnimation from "./animations/scroll-animation"
import CardFlip from "./animations/card-flip"

export default function GamesShowcase() {
  const games = [
    { id: 1, name: "ゴールデンルーレット", category: "テーブルゲーム", image: "/placeholder.svg?height=400&width=600" },
    {
      id: 2,
      name: "ロイヤルブラックジャック",
      category: "テーブルゲーム",
      image: "/placeholder.svg?height=400&width=600",
    },
    { id: 3, name: "フォーチュンスロット", category: "スロット", image: "/placeholder.svg?height=400&width=600" },
    { id: 4, name: "VIPポーカー", category: "テーブルゲーム", image: "/placeholder.svg?height=400&width=600" },
    { id: 5, name: "ラッキーセブン", category: "スロット", image: "/placeholder.svg?height=400&width=600" },
    { id: 6, name: "ドラゴンバカラ", category: "テーブルゲーム", image: "/placeholder.svg?height=400&width=600" },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              人気の
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                ゲーム
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              当カジノで最も人気のあるゲームをご紹介します。初心者から上級者まで楽しめる多彩なゲームをご用意しています。
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <ScrollAnimation key={game.id} variant="fadeInUp" delay={0.1 * index}>
              <CardFlip
                flipOnHover={true}
                flipOnClick={false}
                front={
                  <div className="relative overflow-hidden rounded-xl h-full">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block px-3 py-1 bg-amber-500/80 text-black text-xs font-bold rounded-full mb-2">
                        {game.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">人気度: ★★★★★</span>
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div className="bg-gray-800 rounded-xl h-full flex flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">{game.name}</h3>
                      <p className="text-gray-300 mb-4">
                        本格的な{game.category}
                        の興奮をお楽しみください。高品質なグラフィックと公正なゲームプレイで、リアルカジノの臨場感を体験できます。
                      </p>
                      <div className="mb-4">
                        <span className="text-amber-400 font-bold">最低ベット:</span>
                        <span className="text-white ml-2">¥100</span>
                      </div>
                      <div className="mb-4">
                        <span className="text-amber-400 font-bold">最高ベット:</span>
                        <span className="text-white ml-2">¥100,000</span>
                      </div>
                    </div>
                    <Link
                      href={`/games/${game.id}`}
                      className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-md text-sm w-full text-center transform hover:scale-105 transition-transform"
                    >
                      今すぐプレイ
                    </Link>
                  </div>
                }
                className="h-full"
              />
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation variant="fadeInUp" delay={0.6}>
          <div className="text-center mt-12">
            <Link
              href="/games"
              className="inline-flex items-center bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 font-bold px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              すべてのゲームを見る
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
