import { Dice5, Shield, CreditCard, Trophy, Clock, Gift } from "lucide-react"
import ScrollAnimation from "./animations/scroll-animation"
import Floating from "./animations/floating"

export default function Features() {
  const features = [
    {
      icon: <Dice5 size={28} className="text-amber-400" />,
      title: "豊富なゲーム",
      description: "スロット、ポーカー、ブラックジャック、ルーレットなど、500種類以上のゲームをご用意しています。",
    },
    {
      icon: <Shield size={28} className="text-amber-400" />,
      title: "安全なプレイ環境",
      description: "最新の暗号化技術と厳格なセキュリティ対策で、お客様の情報とお金を守ります。",
    },
    {
      icon: <CreditCard size={28} className="text-amber-400" />,
      title: "簡単な入出金",
      description: "クレジットカード、電子マネー、仮想通貨など、多様な決済方法に対応しています。",
    },
    {
      icon: <Trophy size={28} className="text-amber-400" />,
      title: "豪華な賞金",
      description: "業界トップクラスの高額賞金と、定期的に開催される特別トーナメントをお楽しみいただけます。",
    },
    {
      icon: <Clock size={28} className="text-amber-400" />,
      title: "24時間サポート",
      description: "経験豊富なカスタマーサポートチームが、24時間365日お客様のお問い合わせにお答えします。",
    },
    {
      icon: <Gift size={28} className="text-amber-400" />,
      title: "豪華ボーナス",
      description: "初回登録ボーナスやリロードボーナス、フリースピンなど、お得なプロモーションを常時開催中です。",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                ゴールデンカジノ
              </span>
              の特徴
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              他のカジノとは一線を画す、当カジノならではの魅力をご紹介します
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollAnimation key={index} variant="fadeInUp" delay={0.1 * index} className="h-full">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/10 h-full transform hover:translate-y-[-5px] hover:scale-[1.02]">
                <Floating amplitude={5} duration={3} delay={index * 0.5}>
                  <div className="w-14 h-14 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                </Floating>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
