import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import ScrollAnimation from "./animations/scroll-animation"

export default function CasinoDetails() {
  const casinos = [
    {
      id: "goldenpanda",
      name: "ゴールデンパンダ",
      category: "オンラインカジノ",
      image: "/goldenpanda_top.jpg", 
      description: "爆発力の高いスロットと太っ腹なボーナスで人気急上昇中の最新オンラインカジノ。",
      keyword: "ゴールデンパンダの評判・詳細"
    },
    {
      id: "k8",
      name: "K8カジノ",
      category: "オンラインカジノ",
      image: "/k8_logo.png",
      description: "世界的に有名なハイローラー御用達サイト。スポーツ・ライブカジノの品質が圧倒的。",
      keyword: "K8カジノの評判・詳細"
    },
    {
      id: "stake",
      name: "Stakeカジノ",
      category: "オンラインカジノ",
      image: "/stake_logo.png",
      description: "仮想通貨ユーザーから絶大な支持を集めるカジノ。高速出金と独自ゲームが魅力。",
      keyword: "Stakeカジノの評判・詳細"
    },
  ]

  return (
    <section className="py-20 bg-gray-900" aria-labelledby="casino-details-title">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center mb-16">
            <h2 id="casino-details-title" className="text-3xl md:text-4xl font-bold mb-4 text-white">
              おすすめの
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                オンラインカジノ詳細比較
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              2026年最新の信頼できるオンラインカジノを厳選。各カジノの入金不要ボーナスや出金スピードなど、詳細な特徴をチェック。
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casinos.map((casino, index) => {
            // ランキングと同期した星評価
            let rating = 4.0;
            if (index === 0) rating = 5.0;
            else if (index === 1) rating = 4.5;
            else if (index === 2) rating = 4.3;

            return (
              <ScrollAnimation key={casino.id} variant="fadeInUp" delay={0.1 * index}>
                <article className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/10 border border-gray-700">
                  <div className="relative overflow-hidden">
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={casino.image || "/placeholder.svg"}
                        alt={`${casino.name}の公式サイトイメージ`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded">
                        {casino.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{casino.name}</h3>
                      <div className="flex items-center text-amber-400 bg-black/30 px-2 py-0.5 rounded border border-amber-500/20">
                        <Star size={14} fill="currentColor" />
                        <span className="ml-1 text-sm font-bold">{rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                      {casino.description}
                    </p>
                    
                    <Link
                      href={`/casino-detail/${casino.id}`}
                      className="bg-amber-500 hover:bg-amber-600 text-black font-black px-4 py-3 rounded text-xs w-full text-center transform hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
                      title={casino.keyword}
                    >
                      {casino.keyword}
                    </Link>
                  </div>
                </article>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  )
}