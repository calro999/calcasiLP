import Image from "next/image"
import Link from "next/link"
import { BookOpen, CheckCircle, HelpCircle, AlertTriangle, ArrowRight } from "lucide-react"
import ScrollAnimation from "@/components/animations/scroll-animation"
import Shimmer from "@/components/animations/shimmer"
import Particles from "@/components/animations/particles"

export default function BeginnersGuide() {
  const guides = [
    {
      id: 1,
      title: "オンラインカジノとは？基本を理解しよう",
      description:
        "オンラインカジノの基本的な仕組みや、実際のカジノとの違いについて解説します。初心者が知っておくべき基礎知識を紹介します。",
      icon: <BookOpen className="w-10 h-10 text-amber-400" />,
      image: "/slot.png?height=400&width=600",
      href: "/beginners-guide/basics", // ★修正点: 新しいページのURLパス
    },
    {
      id: 2,
      title: "安全なオンラインカジノの選び方",
      description:
        "信頼できるオンラインカジノを見分けるポイントや、ライセンスの重要性について解説します。安全にプレイするための選び方を紹介します。",
      icon: <CheckCircle className="w-10 h-10 text-amber-400" />,
      image: "/placeholder.svg?height=400&width=600",
      href: "/beginners-guide/safety", // 例: 必要に応じて追加
    },
    {
      id: 3,
      title: "アカウント登録から入金までの流れ",
      description:
        "オンラインカジノのアカウント登録方法や、入金・出金の手順について詳しく解説します。初めての方でも安心して始められます。",
      icon: <HelpCircle className="w-10 h-10 text-amber-400" />,
      image: "/placeholder.svg?height=400&width=600",
      href: "/beginners-guide/registration", // 例: 必要に応じて追加
    },
    {
      id: 4,
      title: "ボーナスの活用方法と注意点",
      description:
        "各種ボーナスの種類や効果的な活用方法、出金条件などの注意点について解説します。お得にプレイするためのコツを紹介します。",
      icon: <AlertTriangle className="w-10 h-10 text-amber-400" />,
      image: "/placeholder.svg?height=400&width=600",
      href: "/beginners-guide/bonuses", // 例: 必要に応じて追加
    },
  ]

  const faqs = [
    {
      question: "オンラインカジノは日本で合法ですか？",
      answer:
        "日本国内にオンラインカジノの運営拠点を置くことは違法ですが、海外のライセンスを取得して運営されているオンラインカジノは合法で運営しています。ただし、日本からのプレイは法律で禁止されています。法律の解釈は変わる可能性があるため、最新の情報を確認することをおすすめします。",
    },
    {
      question: "オンラインカジノは安全ですか？",
      answer:
        "信頼できるライセンスを取得し、適切なセキュリティ対策を施しているオンラインカジノは安全です。マルタ政府やキュラソー政府などの厳格なライセンスを取得しているカジノを選ぶことで、安全性を高めることができます。また、SSL暗号化技術を採用しているかどうかも確認しましょう。",
    },
    {
      question: "オンラインカジノの勝利金は出金できますか？",
      answer:
        "はい、正規のオンラインカジノであれば勝利金は出金可能です。ただし、ボーナスを利用している場合は、出金条件（ワグジャー条件）を満たす必要があります。また、本人確認書類の提出が必要な場合もあります。",
    },
    {
      question: "初心者におすすめのゲームは何ですか？",
      answer:
        "初心者には、ルールがシンプルで運の要素が強いスロットがおすすめです。特に「Book of Dead」や「Starburst」などの人気スロットは操作も簡単です。テーブルゲームに挑戦したい場合は、ブラックジャックやバカラが比較的シンプルなルールで始めやすいでしょう。",
    },
    {
      question: "最低いくらから遊べますか？",
      answer:
        "オンラインカジノによって異なりますが、多くの場合、スロットは1回転あたり10円程度から、テーブルゲームは100円程度から遊べるものが多いです。少額から楽しめるのがオンラインカジノの魅力の一つです。",
    },
  ]

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
                    初心者ガイド
                  </span>
                </Shimmer>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                オンラインカジノを始めるために必要な基礎知識をわかりやすく解説します。
                初めての方でも安心してスタートできるよう、ステップバイステップでご案内します。
              </p>
            </div>
          </ScrollAnimation>

          {/* ガイド一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {guides.map((guide, index) => (
              <ScrollAnimation key={guide.id} variant="fadeInUp" delay={index * 0.1}>
                {/* ★ここをLinkコンポーネントでラップしました */}
                <Link href={guide.href} className="block h-full group">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden h-full transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                      <div className="relative md:col-span-1">
                        <Image
                          src={guide.image || "/placeholder.svg"}
                          alt={guide.title}
                          fill
                          className="object-cover h-full"
                        />
                      </div>
                      <div className="p-6 md:col-span-2 flex flex-col">
                        <div className="mb-4">{guide.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-3">{guide.title}</h3>
                        <p className="text-gray-400 mb-4 flex-grow">{guide.description}</p>
                        <span className="text-amber-400 flex items-center text-sm font-medium">
                          詳しく見る
                          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {/* 初心者向けステップガイド */}
          <ScrollAnimation variant="fadeInUp">
            <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-20">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                オンラインカジノを始める
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  5つのステップ
                </span>
              </h2>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-amber-500/30 hidden md:block"></div>

                <div className="space-y-12">
                  {[
                    {
                      step: 1,
                      title: "信頼できるオンラインカジノを選ぶ",
                      description:
                        "ライセンスの有無、運営歴、ユーザーレビューなどを確認し、信頼できるオンラインカジノを選びましょう。当サイトのカジノランキングも参考にしてください。",
                    },
                    {
                      step: 2,
                      title: "アカウントを登録する",
                      description:
                        "選んだオンラインカジノのサイトで、必要事項を入力してアカウントを作成します。メールアドレスや個人情報の入力が必要です。",
                    },
                    {
                      step: 3,
                      title: "入金する",
                      description:
                        "クレジットカードや電子決済サービス、仮想通貨などを使って入金します。初回入金ボーナスがある場合は、条件を確認しましょう。",
                    },
                    {
                      step: 4,
                      title: "ゲームを選んでプレイする",
                      description:
                        "スロット、ブラックジャック、ルーレットなど、好きなゲームを選んでプレイします。無料版で練習してから実際にお金を賭けるのもおすすめです。",
                    },
                    {
                      step: 5,
                      title: "出金する",
                      description:
                        "勝利金を出金する際は、本人確認書類の提出が必要な場合があります。出金方法や手数料、処理時間なども確認しておきましょう。",
                    },
                  ].map((item) => (
                    <div key={item.step} className="relative flex flex-col md:flex-row">
                      <div className="md:w-16 md:text-center flex-shrink-0 flex md:block">
                        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-black font-bold md:mx-auto">
                          {item.step}
                        </div>
                        <div className="hidden md:block absolute top-0 left-0 w-16 h-full"></div>
                      </div>
                      <div className="flex-grow pt-1 md:pt-0 md:pl-8">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* よくある質問 */}
          <ScrollAnimation variant="fadeInUp">
            <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                よくある
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  質問
                </span>
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 pb-6 last:border-0">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-start">
                      <span className="text-amber-400 mr-2">Q.</span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-400 pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-8 py-3 rounded-md transition-all duration-300 shadow-lg shadow-amber-500/20 transform hover:scale-105"
                >
                  その他の質問はこちら
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </main>
  )
}