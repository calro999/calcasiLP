// /workspaces/calcasiLP/app/strategies/page.tsx
import Image from "next/image"
import Link from "next/link"
import { BookOpen, TrendingUp, AlertTriangle, DollarSign, ArrowRight } from "lucide-react"
import ScrollAnimation from "@/components/animations/scroll-animation"
import Shimmer from "@/components/animations/shimmer"
import Particles from "@/components/animations/particles"

export default function Strategies() {
  const strategies = [
    {
      id: 1,
      title: "バカラの必勝法と攻略テクニック",
      description:
        "カジノの王様とも呼ばれるバカラで勝つための戦略とテクニックを紹介。初心者から上級者まで使える実践的な攻略法を解説します。",
      iconName: "TrendingUp", // アイコンコンポーネントではなく、名前を文字列で渡す
      image: "/placeholder.svg?height=400&width=600",
      category: "テーブルゲーム",
      difficulty: "中級",
    },
    {
      id: 2,
      title: "ブラックジャックのカードカウンティング入門",
      description:
        "ブラックジャックで勝率を上げるカードカウンティングの基本から応用まで。実践的な方法と注意点を詳しく解説します。",
      iconName: "BookOpen", // アイコンコンポーネントではなく、名前を文字列で渡す
      image: "/placeholder.svg?height=400&width=600",
      category: "テーブルゲーム",
      difficulty: "上級",
    },
    {
      id: 3,
      title: "スロットで勝つための効果的な資金管理法",
      description:
        "スロットで長く楽しく遊ぶための資金管理術。ベット額の調整や勝利金の管理など、実践的なテクニックを紹介します。",
      iconName: "DollarSign", // アイコンコンポーネントではなく、名前を文字列で渡す
      image: "/placeholder.svg?height=400&width=600",
      category: "スロット",
      difficulty: "初級",
    },
    {
      id: 4,
      title: "ルーレットのベッティングシステム比較",
      description:
        "マーチンゲール法やフィボナッチ法など、様々なルーレットのベッティングシステムを比較。それぞれのメリット・デメリットを解説します。",
      iconName: "AlertTriangle", // アイコンコンポーネントではなく、名前を文字列で渡す
      image: "/placeholder.svg?height=400&width=600",
      category: "テーブルゲーム",
      difficulty: "中級",
    },
  ]

  const tips = [
    {
      title: "ボーナスの出金条件を確認する",
      description:
        "ボーナスを受け取る前に、必ず出金条件（ワグジャー条件）を確認しましょう。条件が厳しすぎるボーナスは避けるのが賢明です。",
      icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
    },
    {
      title: "RTP（還元率）の高いゲームを選ぶ",
      description:
        "RTP（Return To Player）が高いゲームを選ぶことで、長期的に見た場合の損失を抑えることができます。96%以上のRTPを目安にしましょう。",
      icon: <TrendingUp className="w-8 h-8 text-amber-400" />,
    },
    {
      title: "資金管理を徹底する",
      description:
        "遊ぶ前に予算を決め、その範囲内でプレイすることが重要です。勝っても負けても、予定していた予算を超えてプレイしないようにしましょう。",
      icon: <DollarSign className="w-8 h-8 text-amber-400" />,
    },
    {
      title: "感情に左右されない",
      description:
        "連敗しても冷静さを保ち、取り戻そうとして大きな賭けに出ないようにしましょう。また、大勝ちした後も調子に乗らないことが大切です。",
      icon: <BookOpen className="w-8 h-8 text-amber-400" />,
    },
  ]

  // アイコン名を元にアイコンコンポーネントを返すヘルパー関数
  const getIconComponent = (iconName: string, className: string) => {
    switch (iconName) {
      case "TrendingUp": return <TrendingUp className={className} />;
      case "BookOpen": return <BookOpen className={className} />;
      case "AlertTriangle": return <AlertTriangle className={className} />;
      case "DollarSign": return <DollarSign className={className} />;
      default: return null;
    }
  };


  return (
    <main className="pt-20 pb-20 bg-black">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden py-20 bg-gradient-to-b from-black to-gray-900">
        <Particles className="absolute inset-0" count={100} color="rgba(255, 215, 0, 0.3)" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation variant="fadeInDown">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                <Shimmer>
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                    攻略法
                  </span>
                </Shimmer>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                オンラインカジノで勝率を上げるための攻略法や戦略を紹介します。
                各ゲームの特性を理解し、効果的な方法でプレイしましょう。
              </p>
            </div>
          </ScrollAnimation>

          {/* 攻略法一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {strategies.map((strategy, index) => (
              <ScrollAnimation key={strategy.id} variant="fadeInUp" delay={index * 0.1}>
                {/* ここを修正: /strategies/${strategy.id} へリンク */}
                <Link href={`/strategies/${strategy.id}`} className="block h-full">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden h-full transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={strategy.image || "/placeholder.svg"}
                        alt={strategy.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                          {strategy.category}
                        </span>
                        <span className="inline-block px-3 py-1 bg-gray-700 text-white text-xs font-bold rounded-full">
                          難易度: {strategy.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col">
                      <div className="mb-4">
                        {/* iconNameを使ってアイコンをレンダリング */}
                        {getIconComponent(strategy.iconName, "w-10 h-10 text-amber-400")}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{strategy.title}</h3>
                      <p className="text-gray-400 mb-4 flex-grow">{strategy.description}</p>
                      <span className="text-amber-400 flex items-center text-sm font-medium">
                        詳しく見る
                        <ArrowRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {/* 勝率アップのコツ */}
          <ScrollAnimation variant="fadeInUp">
            <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-20">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                オンラインカジノで
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  勝率を上げるコツ
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tips.map((tip, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        {tip.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{tip.title}</h3>
                      <p className="text-gray-400}>{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* 責任あるギャンブル */}
          <ScrollAnimation variant="fadeInUp">
            <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  責任あるギャンブル
                </span>
                を心がけましょう
              </h2>

              <p className="text-gray-300 text-center mb-6 max-w-3xl mx-auto">
                オンラインカジノは娯楽として楽しむものです。以下のポイントを守り、健全にプレイしましょう。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "予算を設定する",
                    description: "遊ぶ前に使える金額を決め、その範囲内でプレイしましょう。",
                  },
                  {
                    title: "時間を管理する",
                    description: "プレイ時間を決めておき、長時間のプレイは避けましょう。",
                  },
                  {
                    title: "冷静さを保つ",
                    description: "感情的になったら一度休憩し、冷静になってからプレイしましょう。",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 text-gray-400 text-sm">
                <p>
                  ギャンブル依存症の兆候が見られる場合は、専門機関に相談することをおすすめします。
                  <Link href="#" className="text-amber-400 hover:underline ml-1">
                    ギャンブル依存症について詳しく見る
                  </Link>
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </main>
  )
}