import Link from "next/link"
import Image from "next/image"
import ScrollAnimation from "./animations/scroll-animation"
import Typing from "./animations/typing"
import Particles from "./animations/particles"
import CountUp from "./animations/count-up"
import Shimmer from "./animations/shimmer"

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="カジノの背景"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10"></div>
      <Particles className="z-5" count={100} color="rgba(255, 215, 0, 0.5)" />

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation variant="fadeInDown" duration={0.8}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              <span className="block">オンカジ最新</span>
              <Shimmer interval={5000}>
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  ニュース情報局
                </span>
              </Shimmer>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation variant="fadeInUp" delay={0.3} duration={0.8}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              オンカジの「今」を知るならカルカジ！最速で情報をお届け。
            </p>
          </ScrollAnimation>

          <ScrollAnimation variant="fadeIn" delay={0.6} duration={0.8}>
            <div className="flex justify-center mb-12">
              <Link
                href="/latest-news"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-8 py-4 rounded-md transition-all duration-300 shadow-lg shadow-amber-500/20 text-lg transform hover:scale-105 active:scale-95"
              >
                今すぐプレイ
              </Link>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="fadeInUp" delay={0.9} duration={0.8}>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-amber-400">
                  <CountUp end={500} suffix="+" />
                </p>
                <p className="text-gray-400">カジノ</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-amber-400">
                  <Typing text="24/7" speed={100} />
                </p>
                <p className="text-gray-400">更新</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
