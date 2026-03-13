import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { BookOpen, CheckCircle, HelpCircle, AlertTriangle, ArrowRight } from "lucide-react"
import ScrollAnimation from "@/components/animations/scroll-animation"
import Shimmer from "@/components/animations/shimmer"
import Particles from "@/components/animations/particles"

// ★ キャッシュを強制的に排除し、常に最新の状態でサーバーがHTMLを生成する設定
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ★ メタデータ（タブタイトルと説明文）を追加
export const metadata: Metadata = {
  title: "Online Casino Beginner Guide | Essential Knowledge for Safe Play",
  description: "New to online casinos? This complete guide covers basic rules, how to choose safe sites in Canada, and step-by-step deposit/withdrawal procedures for Canadian players.",
}

export default function BeginnersGuide() {
  const guides = [
    {
      id: 1,
      title: "What are Online Casinos? The Basics",
      description:
        "Understand the mechanics of online casinos and how they differ from land-based ones. Essential knowledge for every Canadian beginner.",
      icon: <BookOpen className="w-10 h-10 text-amber-400" />,
      image: "/slot.png",
      href: "/beginners-guide/basics", 
    },
    {
      id: 2,
      title: "How to Choose a Safe Casino",
      description:
        "Learn how to identify trustworthy sites and why licensing (like iGaming Ontario or Kahnawake) matters for your security.",
      icon: <CheckCircle className="w-10 h-10 text-amber-400" />,
      image: "/tate.png",
      href: "/beginners-guide/safety", 
    },
    {
      id: 3,
      title: "Registration & Deposit Guide",
      description:
        "A detailed walk-through of account creation and using Canadian-friendly payment methods like Interac.",
      icon: <HelpCircle className="w-10 h-10 text-amber-400" />,
      image: "/touroku.png",
      href: "/beginners-guide/registration", 
    },
    {
      id: 4,
      title: "Mastering Bonuses & T&Cs",
      description:
        "Explore bonus types, effective strategies, and the fine print on wagering requirements to maximize your wins.",
      icon: <AlertTriangle className="w-10 h-10 text-amber-400" />,
      image: "/kin.png",
      href: "/beginners-guide/bonuses", 
    },
  ]

  const faqs = [
    {
      question: "Are online casinos legal in Canada?",
      answer:
        "Yes, Canadians can legally play at online casinos. While some provinces have their own regulated markets (like Ontario's iGaming), it is also legal for Canadians to access offshore sites licensed by reputable international bodies like the Kahnawake Gaming Commission or the Malta Gaming Authority.",
    },
    {
      question: "Is it safe to play online?",
      answer:
        "Playing is safe if you choose a licensed and secure platform. Look for casinos with 128-bit SSL encryption and licenses from recognized authorities. We only recommend sites that meet these high standards of player protection.",
    },
    {
      question: "Can I actually withdraw my winnings?",
      answer:
        "Absolutely. Legitimate online casinos process withdrawals daily. Note that if you're using a bonus, you must meet the wagering requirements first. You'll also likely need to complete a standard ID verification (KYC) for your first withdrawal.",
    },
    {
      question: "Which games are best for beginners?",
      answer:
        "Slots are highly recommended due to their simplicity and high payout potential. Popular titles like 'Gates of Olympus' or 'Sweet Bonanza' are great starting points. If you prefer strategy, Blackjack offers some of the best odds for players.",
    },
    {
      question: "What is the minimum amount I can play with?",
      answer:
        "Most Canadian sites allow you to start with as little as $10 or $20. Some slots even let you spin for as low as 10 cents. It's an accessible way to enjoy casino games without a huge commitment.",
    },
  ]

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden py-20 bg-gradient-to-b from-black to-gray-900">
        <Particles className="absolute inset-0" count={100} color="rgba(255, 215, 0, 0.3)" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation variant="fadeInDown">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                <Shimmer>
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                    Beginner's Guide
                  </span>
                </Shimmer>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover the basics you need to start your online casino journey in Canada.
                We provide a step-by-step guide so even first-timers can play with confidence.
              </p>
            </div>
          </ScrollAnimation>

          {/* ガイド一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {guides.map((guide, index) => (
              <ScrollAnimation key={guide.id} variant="fadeInUp" delay={index * 0.1}>
                <Link href={guide.href} className="block h-full group">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden h-full transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                      <div className="relative md:col-span-1 min-h-[200px] md:min-h-full">
                        <Image
                          src={guide.image}
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
                          Read More
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
                Start Playing in{" "}
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  5 Simple Steps
                </span>
              </h2>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-amber-500/30 hidden md:block"></div>

                <div className="space-y-12">
                  {[
                    {
                      step: 1,
                      title: "Choose a Trustworthy Casino",
                      description:
                        "Check for valid licenses, track records, and user reviews. Our rankings feature only the most reliable Canadian-friendly sites.",
                    },
                    {
                      step: 2,
                      title: "Create Your Account",
                      description:
                        "Fill in the required information on the casino's secure registration page. You'll need to provide an email and basic personal details.",
                    },
                    {
                      step: 3,
                      title: "Make Your First Deposit",
                      description:
                        "Deposit funds using Interac, credit cards, or e-wallets. Don't forget to claim your welcome bonus to boost your balance!",
                    },
                    {
                      step: 4,
                      title: "Pick Your Game & Play",
                      description:
                        "Choose from hundreds of slots or table games. We recommend trying 'Demo' versions first to learn the ropes risk-free.",
                    },
                    {
                      step: 5,
                      title: "Withdraw Your Winnings",
                      description:
                        "When you're ready to cash out, select a withdrawal method. Note that you may need to provide ID/Proof of Address for security.",
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
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  Questions
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
                  Ask Other Questions
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </main>
  )
}