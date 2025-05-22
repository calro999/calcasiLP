import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import ScrollAnimation from "@/components/animations/scroll-animation"
import Shimmer from "@/components/animations/shimmer"

export default function LatestNews() {
  const featuredArticles = [
    {
      id: 1,
      title: "2023年最新！おすすめオンラインカジノランキングTOP10",
      excerpt:
        "最新のボーナス情報やゲーム数、出金スピードなどを徹底比較。初心者にもおすすめのオンラインカジノをランキング形式で紹介します。",
      image: "/placeholder.svg?height=600&width=1200",
      category: "ランキング",
      date: "2023-05-15",
      readTime: "10分",
    },
    {
      id: 2,
      title: "初心者必見！オンラインカジノの始め方完全ガイド",
      excerpt:
        "アカウント登録から入金方法、ボーナスの活用法まで、オンラインカジノを始めるために必要な情報をわかりやすく解説します。",
      image: "/placeholder.svg?height=600&width=1200",
      category: "初心者ガイド",
      date: "2023-05-10",
      readTime: "15分",
    },
    {
      id: 3,
      title: "勝率アップ！バカラの必勝法と攻略テクニック",
      excerpt:
        "カジノの王様とも呼ばれるバカラで勝つための戦略とテクニックを紹介。初心者から上級者まで使える実践的な攻略法を解説します。",
      image: "/placeholder.svg?height=600&width=1200",
      category: "攻略法",
      date: "2023-05-05",
      readTime: "12分",
    },
  ]

  const latestArticles = [
    {
      id: 4,
      title: "エルドアカジノに新たなボーナスキャンペーンが登場！",
      excerpt:
        "エルドアカジノが新たに週末限定の100%リロードボーナスを開始。最大$500までのボーナスが獲得できるチャンスです。",
      image: "/placeholder.svg?height=400&width=600",
      category: "ボーナス情報",
      date: "2023-05-01",
      readTime: "5分",
    },
    {
      id: 5,
      title: "人気スロット「ムーンプリンセス」の攻略ガイド",
      excerpt:
        "Play'n GOの人気スロット「ムーンプリンセス」の特徴や攻略法を解説。フリースピンの獲得方法やボーナスステージの攻略法を紹介します。",
      image: "/placeholder.svg?height=400&width=600",
      category: "スロット攻略",
      date: "2023-04-28",
      readTime: "8分",
    },
    {
      id: 6,
      title: "仮想通貨で遊べるおすすめオンラインカジノ5選",
      excerpt:
        "ビットコインやイーサリアムなどの仮想通貨で遊べるオンラインカジノを紹介。匿名性の高さと手数料の安さが魅力です。",
      image: "/placeholder.svg?height=400&width=600",
      category: "仮想通貨",
      date: "2023-04-25",
      readTime: "7分",
    },
    {
      id: 7,
      title: "ライブカジノのディーラーになるには？裏側に迫る",
      excerpt:
        "オンラインカジノのライブディーラーの仕事内容や必要なスキル、なり方について解説。実際のディーラーへのインタビューも掲載。",
      image: "/placeholder.svg?height=400&width=600",
      category: "ライブカジノ",
      date: "2023-04-22",
      readTime: "10分",
    },
    {
      id: 8,
      title: "オンラインカジノの税金について知っておくべきこと",
      excerpt: "オンラインカジノの勝利金にかかる税金について解説。確定申告の方法や節税対策についても詳しく紹介します。",
      image: "/placeholder.svg?height=400&width=600",
      category: "法律・税金",
      date: "2023-04-19",
      readTime: "12分",
    },
    {
      id: 9,
      title: "モバイルでも快適！スマホ対応のオンラインカジノ",
      excerpt:
        "スマートフォンやタブレットで快適にプレイできるモバイル対応のオンラインカジノを紹介。アプリの有無や操作性を比較します。",
      image: "/placeholder.svg?height=400&width=600",
      category: "モバイルカジノ",
      date: "2023-04-16",
      readTime: "6分",
    },
  ]

  const categories = [
    "すべて",
    "ランキング",
    "初心者ガイド",
    "攻略法",
    "ボーナス情報",
    "スロット攻略",
    "ライブカジノ",
    "仮想通貨",
    "法律・税金",
  ]

  return (
    <main className="pt-20 pb-20 bg-black">
      <div className="relative overflow-hidden py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <ScrollAnimation variant="fadeInDown">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                <Shimmer>
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                    最新情報
                  </span>
                </Shimmer>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                オンラインカジノの最新ニュースや攻略情報、ボーナス情報などを随時更新しています。
              </p>
            </div>
          </ScrollAnimation>

          {/* カテゴリーフィルター */}
          <ScrollAnimation variant="fadeInUp">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    index === 0 ? "bg-amber-500 text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          {/* 注目記事 */}
          <div className="mb-16">
            <ScrollAnimation variant="fadeInUp">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="w-2 h-8 bg-amber-500 mr-3 rounded-full"></span>
                注目記事
              </h2>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                  <Link href={`/article/${article.id}`} className="block h-full">
                    <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                      <div className="relative">
                        <div className="aspect-[16/9] relative">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-400 mb-4 flex-grow line-clamp-3">{article.excerpt}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={14} className="mr-1" />
                          <span className="mr-4">{article.date}</span>
                          <Clock size={14} className="mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          {/* 最新記事 */}
          <div>
            <ScrollAnimation variant="fadeInUp">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="w-2 h-8 bg-amber-500 mr-3 rounded-full"></span>
                最新記事
              </h2>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article, index) => (
                <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                  <Link href={`/article/${article.id}`} className="block h-full">
                    <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                      <div className="relative">
                        <div className="aspect-[16/9] relative">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-400 mb-3 flex-grow text-sm line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-gray-500 text-sm">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{article.date}</span>
                          </div>
                          <span className="text-amber-400 flex items-center hover:underline">
                            続きを読む
                            <ArrowRight size={14} className="ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation variant="fadeInUp">
              <div className="text-center mt-12">
                <button className="bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 font-bold px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-105">
                  もっと見る
                </button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </main>
  )
}
