import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Landmark, 
  Lock, 
  Users, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "【2026年版】安全なオンラインカジノの選び方｜信頼性を見分ける5つの鉄則",
  description: "オンラインカジノで安全に遊ぶための必須知識。ライセンスの有無、運営企業の透明性、第三者機関の監査など、初心者でも失敗しない「信頼できるサイト」の見分け方をプロが徹底解説します。",
  keywords: ["オンラインカジノ 安全", "オンカジ ライセンス", "オンラインカジノ 信頼性", "オンカジ 初心者", "マルタライセンス"],
};

export default function OnlineCasinoSafetyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-amber-500/30">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* ナビゲーション */}
        <ScrollAnimation variant="fadeIn">
          <Link href="/beginners-guide" className="group text-amber-400 hover:text-amber-300 mb-8 inline-flex items-center text-lg transition-colors">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            初心者ガイド一覧へ戻る
          </Link>
        </ScrollAnimation>

        <article>
          {/* ヘッダーセクション */}
          <ScrollAnimation variant="fadeInUp">
            <header className="mb-12">
              <div className="flex items-center gap-2 text-amber-500 mb-4">
                <ShieldCheck size={24} />
                <span className="font-bold tracking-widest text-sm uppercase">Safety & Security Guide</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent">
                安全なオンラインカジノの<br />選び方と信頼性の見分け方
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                オンラインカジノを始める際、最も重要なのが「サイトの安全性」です。
                詐欺サイトや不正操作のリスクを回避し、安心してプレイするためのチェックポイントを完全網羅しました。
              </p>
            </header>
          </ScrollAnimation>

          {/* ライセンスセクション */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-l-4 border-amber-500 pl-4">
                <Landmark className="text-amber-500" />
                1. 政府発行の運営ライセンス
              </h2>
              <p className="text-gray-300 mb-6">
                健全なカジノは必ず政府（または公的機関）が発行したライセンスを保有しています。
                以下の主要なライセンスは、特に信頼性が高いことで知られています。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { 
                    name: "マルタ (MGA)", 
                    level: "最高ランク", 
                    desc: "EU加盟国の厳しい基準。プレイヤー保護、資金管理、ゲームの公平性において世界トップクラスの厳格さを誇ります。",
                    color: "border-amber-500/50"
                  },
                  { 
                    name: "キュラソー (Curacao)", 
                    level: "標準的・一般的", 
                    desc: "現在最も普及しているライセンス。仮想通貨決済に対応しやすく、多くの有名サイトが取得しています。",
                    color: "border-blue-500/50"
                  },
                  { 
                    name: "ジブラルタル", 
                    level: "厳格", 
                    desc: "取得審査が非常に厳しく、大手老舗ブックメーカーなどが多く保有しています。",
                    color: "border-emerald-500/50"
                  },
                  { 
                    name: "アイル・オブ・マン", 
                    level: "最高水準", 
                    desc: "プレイヤーの資金隔離管理が徹底されており、倒産リスクに対する保護が非常に強力です。",
                    color: "border-purple-500/50"
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`bg-gray-900/40 border ${item.color} p-6 rounded-2xl relative hover:bg-gray-800/60 transition-all duration-300`}>
                    <span className="absolute top-4 right-4 text-[10px] bg-white/10 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full font-bold border border-amber-500/30">
                      {item.level}
                    </span>
                    <h3 className="font-bold text-xl mb-3 text-white">{item.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="text-red-500 shrink-0" size={28} />
                <div>
                  <h4 className="text-red-500 font-bold mb-1">注意！未認可サイトの危険性</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    サイトのフッター部分にライセンスロゴとリンクがないカジノは、絶対に利用しないでください。
                    個人情報の流出や、勝利金の出金拒否といったトラブルに遭う可能性が極めて高いです。
                  </p>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* セキュリティ・第三者機関 */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-l-4 border-amber-500 pl-4">
                <Lock className="text-amber-500" />
                2. セキュリティと第三者機関の監査
              </h2>
              <div className="space-y-6">
                <div className="flex gap-5 p-6 bg-white/5 rounded-2xl">
                  <div className="bg-amber-500/20 p-3 rounded-lg h-fit">
                    <Search className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-amber-200">RNG（乱数発生器）の搭載</h3>
                    <p className="text-gray-400 text-sm">
                      ゲームの結果が完全にランダムであることを保証するシステムです。
                      カジノ側が意図的に勝率を操作できない仕組みになっているかを確認しましょう。
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 p-6 bg-white/5 rounded-2xl">
                  <div className="bg-amber-500/20 p-3 rounded-lg h-fit">
                    <ShieldAlert className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-amber-200">第三者機関（eCOGRA等）の認定</h3>
                    <p className="text-gray-400 text-sm">
                      eCOGRA（エコグラ）やGLIなどの独立した専門機関から定期的な監査を受けているサイトは、最高水準の公平性が担保されています。
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* まとめチェックリスト */}
          <ScrollAnimation variant="fadeInUp">
            <section className="bg-gradient-to-b from-gray-900 to-black border border-amber-500/20 rounded-3xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-center text-amber-400 flex justify-center items-center gap-2">
                <CheckCircle2 /> 安全性チェックリスト
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "政府発行の有効なライセンスがあるか",
                  "SSL通信（https）で暗号化されているか",
                  "日本語サポートが丁寧に対応してくれるか",
                  "運営会社の所在地と情報が明記されているか",
                  "利用規約に不当な制限が書かれていないか",
                  "出金条件（賭け条件）が明確か"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                    </div>
                    <span className="text-sm font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollAnimation>

          {/* FAQセクション (SEO対策) */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <HelpCircle className="text-amber-500" />
                よくある質問
              </h2>
              <div className="space-y-4">
                <details className="group bg-gray-900/30 border border-gray-800 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-amber-200 list-none flex justify-between items-center">
                    ライセンスがないカジノで遊ぶとどうなりますか？
                    <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                    法的保護を受けられないだけでなく、勝利金の不払いや、登録した個人情報が闇サイトへ売却されるリスクがあります。絶対に避けてください。
                  </p>
                </details>
                <details className="group bg-gray-900/30 border border-gray-800 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-amber-200 list-none flex justify-between items-center">
                    キュラソーライセンスは安全ですか？
                    <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                    はい、安全です。かつては審査が緩いと言われていましたが、近年は規制が強化されています。
                    ベラジョンカジノや遊雅堂など、日本で最も有名なカジノの多くもこのライセンスを採用しています。
                  </p>
                </details>
              </div>
            </section>
          </ScrollAnimation>
        </article>

        {/* 下部リンク */}
        <ScrollAnimation variant="fadeIn">
          <div className="text-center">
            <Shimmer>
              <Link 
                href="/best-casinos" 
                className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold py-4 px-10 rounded-full hover:bg-amber-400 transition-all hover:scale-105"
              >
                信頼できる推奨カジノランキングを見る
                <ExternalLink size={20} />
              </Link>
            </Shimmer>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  );
}