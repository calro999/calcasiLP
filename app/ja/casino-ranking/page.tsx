import Link from "next/link"
import Image from "next/image"
import { casinoData } from "@/lib/casinoData"
import ScrollAnimation from "@/components/animations/scroll-animation"
import Shimmer from "@/components/animations/shimmer"
import Particles from "@/components/animations/particles"

export default function CasinoRankingPage() {
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
            {casinoData.map((casino, index) => (
              <ScrollAnimation key={casino.id} variant="fadeInUp" delay={index * 0.1}>
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden transform transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                    <div className="md:col-span-1 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-xl">
                        {casino.rank}
                      </div>
                    </div>

                    <div className="md:col-span-3 flex items-center justify-center">
                      <div className="relative w-full h-24">
                        <Image
                          src={casino.logo}
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
                            <span
                              key={i}
                              className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-400 mb-4 line-clamp-2">{casino.description}</p>

                        <div className="mt-auto flex flex-col sm:flex-row gap-3">
                          <Link
                            href={`/casino-detail/${casino.id}`}
                            className="bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500/10 px-4 py-2 rounded-md text-center transition-colors"
                          >
                            詳細を見る
                          </Link>
                          <Link
                            href="#"
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
