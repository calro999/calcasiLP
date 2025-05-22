import Image from "next/image"
import { Star } from "lucide-react"
import ScrollAnimation from "./animations/scroll-animation"
import Parallax from "./animations/parallax"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "田中 健太",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "ゴールデンカジノは他のオンラインカジノとは一線を画しています。ゲームの種類が豊富で、特にライブディーラーゲームは臨場感があって最高です。初回ボーナスも太っ腹で、すぐに楽しめました。",
    },
    {
      id: 2,
      name: "佐藤 美咲",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "初めてのオンラインカジノでしたが、とても使いやすく安心して遊べました。カスタマーサポートの対応も素晴らしく、質問にすぐに答えてくれます。入出金も簡単で、ストレスなく楽しめています。",
    },
    {
      id: 3,
      name: "鈴木 大輔",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      text: "スロットの種類が豊富で、毎日新しいゲームを試せるのが楽しいです。ボーナスも定期的にもらえるので、長く遊べるのが魅力。モバイル対応も完璧で外出先でも楽しめます。",
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
              お客様の
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">声</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              実際にゴールデンカジノをご利用いただいたお客様からの声をご紹介します
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation key={testimonial.id} variant="fadeInUp" delay={0.2 * index} className="h-full">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-500 h-full transform hover:translate-y-[-5px] hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/10">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"
                          } ${i < testimonial.rating ? "animate-pulse" : ""}`}
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.text}"</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
