import Image from "next/image"
import Link from "next/link"
import ScrollAnimation from "@/components/animations/scroll-animation"
import Shimmer from "@/components/animations/shimmer"
import Particles from "@/components/animations/particles"

export default function CasinoRanking() {
  const casinos = [
    {
      id: 1,
      rank: 1,
      name: "ワンダーカジノ",
      logo: "/wondercasino_logo.png",
      bonus: "入金不要ボー $30(4,300円相当)",
      features: ["日本語サポート", "豊富なゲーム数", "高速出金", "仮想通貨対応"],
      rating: 4.9,
      description:
        "ワンダーカジノは、豊富なゲーム数と高額ボーナスが魅力のオンラインカジノです。日本語サポートも充実しており、初心者から上級者まで安心してプレイできます。特に出金スピードが業界トップクラスで、最短10分での出金が可能です。",
      detailLink: "/casino-detail/wonder",
      officialLink: "https://tracker-pm2.casino-wonder.com/link?btag=96420424_437635"
    },
    {
      id: 2,
      rank: 2,
      name: "デュエルビッツ",
      logo: "/duelbits_logo.png",
      bonus: "初回入金最大50%レーキバック（20%即時+30%段階解放）",
      features: ["仮想通貨特化", "レーキバック", "オリジナルゲーム", "スポーツベット"],
      rating: 4.8,
      description:
        "デュエルビッツは、仮想通貨に特化したゲーミフィケーション要素が豊富なカジノです。高いレーキバックとオリジナルゲームが人気で、スポーツベットも楽しめます。コミュニティも活発で、新しいゲーム体験を求める方におすすめです。",
      detailLink: "/casino-detail/duelbits",
      officialLink: "https://affiliates.duelbits.com/visit/?bta=35925&nci=5768"
    },
    {
      id: 3,
      rank: 3,
      name: "K8",
      logo: "/k8_logo.png",
      bonus: "初回入金100%ボーナス（最大$2,000）",
      features: ["仮想通貨対応", "高額ボーナス", "多彩なプロモーション", "VIP制度"],
      rating: 4.7,
      description:
        "K8は、高額な初回入金ボーナスと豊富なプロモーションが魅力の仮想通貨カジノです。スロット、ライブカジノ、スポーツベットなど幅広いゲームを提供しており、手厚いVIPプログラムも用意されています。",
      detailLink: "/casino-detail/k8",
      officialLink: "https://k8.io/?invite=calron"
    },
    {
      id: 4,
      rank: 4,
      name: "パリマッチ",
      logo: "/parimatch_logo.png",
      bonus: "初回入金150%ボーナス（最大$1,500）",
      features: ["スポーツベット強化", "豊富なプロモーション", "日本語サポート"],
      rating: 4.6,
      description:
        "パリマッチは、特にスポーツベットに強みを持つ世界的に有名なブックメーカー兼オンラインカジノです。多彩なスポーツイベントに賭けることができ、カジノゲームも充実しています。新規ユーザー向けのボーナスも魅力的です。",
      detailLink: "/casino-detail/parimatch",
      officialLink: "https://affcl.org/?serial=61314390&creative_id=4261"
    },
    {
      id: 5,
      rank: 5,
      name: "Stake",
      logo: "/stake_logo.png",
      bonus: "初回入金200%ボーナス（最大$2,000）",
      features: ["仮想通貨専門", "オリジナルゲーム", "レーキバック", "グローバル人気"],
      rating: 4.5,
      description:
        "Stakeは、仮想通貨専門カジノの代表格であり、世界中で絶大な人気を誇ります。独自のオリジナルゲームと、ベット額に応じたレーキバックシステムが特徴です。ライブカジノやスポーツベットも充実しています。",
      detailLink: "/casino-detail/stake",
      officialLink: "stake.com/?c=aLjELsQU&offer=calro200"
    },
  ]

  return (
    <main className="pt-20 pb-20 bg-black">
      <div className="relative overflow-hidden py-20 bg-gradient-to-b from-black to-gray-900">
        <Particles className="absolute inset-0" count={100} color="rgba(255, 215, 0, 0.3)" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation variant="fadeInDown">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                <Shimmer>
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                    カジノランキング
                  </span>
                </Shimmer>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                当サイト厳選のオンラインカジノランキングをご紹介します。ボーナス、ゲーム数、出金スピードなど様々な観点から評価しました。
              </p>
            </div>
          </ScrollAnimation>

          <div className="space-y-8">
            {casinos.map((casino, index) => (
              <ScrollAnimation key={casino.id} variant="fadeInUp" delay={index * 0.1}>
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden transform transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                    <div className="md:col-span-1 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-xl">
                        {casino.rank}
                      </div>
                    </div>

                    <div className="md:col-span-3 flex items-center justify-center">
                      {/* ★ここを h-48 に変更しました */}
                      <div className="relative w-full h-48">
                        <Image
                          src={casino.logo || "/placeholder.svg"}
                          alt={casino.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-8">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-2xl font-bold text-white">{casino.name}</h2>
                          <div className="bg-amber-500/20 px-3 py-1 rounded-full text-amber-400 font-bold">
                            評価: {casino.rating}/5.0
                          </div>
                        </div>

                        <div className="mb-3">
                          <span className="text-amber-400 font-bold">ボーナス: </span>
                          <span className="text-white">{casino.bonus}</span>
                        </div>

                        <div className="mb-3 flex flex-wrap gap-2">
                          {casino.features.map((feature, i) => (
                            <span key={i} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-400 mb-4 line-clamp-2">{casino.description}</p>

                        <div className="mt-auto flex flex-col sm:flex-row gap-3">
                          <Link
                            href={casino.detailLink || "#"}
                            className="bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500/10 px-4 py-2 rounded-md text-center transition-colors"
                          >
                            詳細を見る
                          </Link>
                          <Link
                            href={casino.officialLink || "#"}
                            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-4 py-2 rounded-md text-center transition-all transform hover:scale-105"
                          >
                            公式サイトへ
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}