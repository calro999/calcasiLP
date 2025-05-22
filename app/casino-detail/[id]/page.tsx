import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Check, ExternalLink } from "lucide-react"
import ScrollAnimation from "@/components/animations/scroll-animation"
import Shimmer from "@/components/animations/shimmer"
import Particles from "@/components/animations/particles"

// このページは動的に生成されますが、デモのために静的なデータを使用します
export default function CasinoDetail({ params }: { params: { id: string } }) {
  // 実際のアプリケーションでは、IDに基づいてデータベースやAPIからデータを取得します
  const casino = {
    id: params.id,
    name: "エルドアカジノ",
    logo: "/placeholder.svg?height=200&width=400",
    banner: "/placeholder.svg?height=600&width=1200",
    bonus: "初回入金100%ボーナス（最大$500）",
    rating: 4.9,
    description:
      "エルドアカジノは、豊富なゲーム数と高額ボーナスが魅力のオンラインカジノです。日本語サポートも充実しており、初心者から上級者まで安心してプレイできます。特に出金スピードが業界トップクラスで、最短10分での出金が可能です。",
    longDescription:
      "エルドアカジノは2018年に設立された比較的新しいオンラインカジノですが、短期間で多くの日本人プレイヤーから支持を集めています。その最大の魅力は、業界トップクラスの出金スピードと豊富なゲーム数です。最短10分での出金処理が可能なため、獲得した賞金をすぐに手に入れることができます。\n\nゲーム数は2,000種類以上あり、人気プロバイダーのスロットやテーブルゲーム、ライブカジノなど幅広いジャンルをカバーしています。特に日本人に人気の高いバカラやブラックジャックのテーブル数が多いのが特徴です。\n\nボーナス面では、初回入金時に100%のマッチボーナス（最大$500）が提供されるほか、2回目以降の入金でも継続的にボーナスを獲得できます。また、VIPプログラムも充実しており、プレイヤーのランクに応じて様々な特典が用意されています。\n\n日本語サポートは24時間体制で、ライブチャットやメールでの問い合わせに迅速に対応してくれます。初心者でも安心してプレイできる環境が整っているため、オンラインカジノデビューにもおすすめです。",
    features: [
      "2,000種類以上のゲーム",
      "最短10分の高速出金",
      "24時間日本語サポート",
      "豊富なボーナスとプロモーション",
      "VIPプログラム",
      "モバイル対応",
      "安全なライセンス取得済み",
    ],
    paymentMethods: [
      { name: "クレジットカード", processing: "即時", withdrawal: "1-3営業日" },
      { name: "エコペイズ", processing: "即時", withdrawal: "10分-24時間" },
      { name: "ビットコイン", processing: "即時", withdrawal: "10分-1時間" },
      { name: "銀行振込", processing: "1-3営業日", withdrawal: "3-5営業日" },
      { name: "ヴィーナスポイント", processing: "即時", withdrawal: "24-48時間" },
    ],
    games: [
      { name: "スロット", count: "1,500+" },
      { name: "テーブルゲーム", count: "100+" },
      { name: "ライブカジノ", count: "150+" },
      { name: "ジャックポット", count: "50+" },
      { name: "ビデオポーカー", count: "30+" },
    ],
    pros: [
      "業界最速クラスの出金スピード",
      "豊富なゲーム数と種類",
      "充実した日本語サポート",
      "魅力的なボーナス条件",
      "安全性の高いライセンス",
    ],
    cons: ["一部の国からのアクセス制限", "電話サポートがない", "一部のゲームはモバイル非対応"],
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      <div className="relative overflow-hidden">
        {/* ヒーローセクション */}
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src={casino.banner || "/placeholder.svg"}
            alt={`${casino.name}のバナー`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black"></div>
          <Particles className="absolute inset-0" count={50} color="rgba(255, 215, 0, 0.3)" />

          <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
            <Link href="/casino-ranking" className="flex items-center text-amber-400 mb-4 hover:underline">
              <ArrowLeft size={16} className="mr-1" />
              カジノランキングに戻る
            </Link>

            <div className="flex items-center mb-4">
              <div className="relative w-24 h-24 mr-6 bg-white rounded-lg p-2">
                <Image src={casino.logo || "/placeholder.svg"} alt={casino.name} fill className="object-contain" />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <Shimmer>
                    <span>{casino.name}</span>
                  </Shimmer>
                </h1>

                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < Math.floor(casino.rating)
                            ? "text-amber-400 fill-amber-400"
                            : i < casino.rating
                              ? "text-amber-400 fill-amber-400 opacity-50"
                              : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-bold">{casino.rating}/5.0</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 max-w-3xl">{casino.description}</p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メイン情報 */}
            <div className="lg:col-span-2">
              <ScrollAnimation variant="fadeInUp">
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">カジノ情報</h2>
                  <div className="prose prose-invert max-w-none">
                    {casino.longDescription.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-300 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation variant="fadeInUp" delay={0.1}>
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">特徴</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {casino.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Check size={18} className="text-amber-400 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>

              <ScrollAnimation variant="fadeInUp" delay={0.2}>
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">入出金方法</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 px-4 text-amber-400">決済方法</th>
                          <th className="py-3 px-4 text-amber-400">入金処理時間</th>
                          <th className="py-3 px-4 text-amber-400">出金処理時間</th>
                        </tr>
                      </thead>
                      <tbody>
                        {casino.paymentMethods.map((method, index) => (
                          <tr key={index} className="border-b border-gray-700 last:border-0">
                            <td className="py-3 px-4 text-white">{method.name}</td>
                            <td className="py-3 px-4 text-gray-300">{method.processing}</td>
                            <td className="py-3 px-4 text-gray-300">{method.withdrawal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation variant="fadeInUp" delay={0.3}>
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">メリット・デメリット</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-green-500 mb-3">メリット</h3>
                      <ul className="space-y-2">
                        {casino.pros.map((pro, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-500 mb-3">デメリット</h3>
                      <ul className="space-y-2">
                        {casino.cons.map((con, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="text-red-500 mr-2 mt-1 flex-shrink-0">✕</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <ScrollAnimation variant="fadeInRight">
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8 sticky top-24">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">ボーナス情報</h3>
                    <div className="bg-amber-500/20 text-amber-400 font-bold py-3 px-4 rounded-lg mb-4">
                      {casino.bonus}
                    </div>
                    <Link
                      href="#"
                      className="block bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-6 py-3 rounded-md transition-all transform hover:scale-105 w-full"
                    >
                      公式サイトへ
                      <ExternalLink size={16} className="inline-block ml-2" />
                    </Link>
                    <p className="text-gray-400 text-sm mt-2">
                      *利用規約が適用されます。責任あるギャンブルを心がけましょう。
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">ゲーム数</h3>
                    <ul className="space-y-2">
                      {casino.games.map((game, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center text-gray-300 py-2 border-b border-gray-700 last:border-0"
                        >
                          <span>{game.name}</span>
                          <span className="font-bold text-amber-400">{game.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">関連記事</h3>
                    <ul className="space-y-3">
                      {[
                        "エルドアカジノの登録方法",
                        "エルドアカジノの出金方法と注意点",
                        "エルドアカジノのボーナス攻略法",
                        "エルドアカジノのおすすめスロット5選",
                      ].map((article, index) => (
                        <li key={index}>
                          <Link href="#" className="text-amber-400 hover:underline flex items-center">
                            <span className="mr-2">→</span>
                            <span>{article}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
