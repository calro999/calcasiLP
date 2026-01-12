import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowLeft, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Laptop, 
  Smartphone, 
  HelpCircle, 
  Trophy, 
  Coins, 
  Users, 
  TrendingUp 
} from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "オンラインカジノとは？初心者が知るべき仕組み・還元率・安全性を徹底解説",
  description: "オンラインカジノの基礎知識を完全ガイド。実際のカジノとの違いや、高い還元率の秘密、政府公認ライセンスによる安全な仕組みまで、初心者が安心して始めるための情報を網羅しました。",
  keywords: ["オンラインカジノとは", "オンカジ 仕組み", "オンラインカジノ 初心者", "還元率", "オンカジ 安全性"],
};

export default function WhatIsOnlineCasinoPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-amber-500/30">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 戻るボタン */}
        <ScrollAnimation variant="fadeIn">
          <Link href="/beginners-guide" className="group text-amber-400 hover:text-amber-300 mb-8 inline-flex items-center text-lg transition-colors">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            初心者ガイド一覧へ戻る
          </Link>
        </ScrollAnimation>

        <article>
          {/* ヒーローセクション */}
          <ScrollAnimation variant="fadeInUp">
            <header className="mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm font-bold mb-6 tracking-widest">
                ENTRY LEVEL GUIDE
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
                <Shimmer>
                  <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-transparent bg-clip-text">
                    オンラインカジノとは？
                  </span>
                </Shimmer>
                <span className="block text-2xl md:text-4xl mt-4 text-white/90">
                  仕組み・還元率・安全性を完全ガイド
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-400 border-l-4 border-amber-500 pl-6">
                「ネットでカジノができるの？」「仕組みはどうなっているの？」<br className="hidden md:block" />
                そんな疑問を解消し、安心して第一歩を踏み出すための基礎知識をプロが詳しく解説します。
              </p>
            </header>
          </ScrollAnimation>

          {/* 仕組みセクション */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-3">
                <Globe className="text-amber-500" /> 
                1. オンラインカジノの基本的な仕組み
              </h2>
              <div className="bg-gray-900/30 border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] -z-10" />
                <p className="text-lg mb-10 leading-relaxed text-gray-300">
                  オンラインカジノ（オンカジ）とは、インターネットを通じて**本物の現金を賭けてカジノゲームを楽しむことができる**プラットフォームです。海外の政府公認ライセンスを取得し、合法的に運営されています。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Laptop, title: "マルチデバイス", desc: "PC・スマホ・タブレット対応。ブラウザ一つで完結。" },
                    { icon: Zap, title: "圧倒的ゲーム数", desc: "スロットからライブバカラまで3,000種類以上。" },
                    { icon: Users, title: "ライブ体験", desc: "海外のディーラーとリアルタイムで真剣勝負。" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/50 p-6 rounded-2xl border border-gray-700/50 hover:border-amber-500/50 transition-colors group">
                      <item.icon className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                      <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* 還元率セクション (SEO強化) */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                <TrendingUp className="text-amber-500" /> 
                2. なぜ勝てる？他のギャンブルとの比較
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                オンラインカジノの最大の特徴は、**「還元率（RTP）」の圧倒的な高さ**にあります。実店舗を持たないため運営コストが低く、その分プレイヤーに還元される仕組みです。
              </p>
              <div className="bg-gray-900/20 border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-4 font-bold text-amber-500">ギャンブル種類</th>
                      <th className="p-4 font-bold text-amber-500">平均還元率</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-sm md:text-base">
                    <tr className="border-t border-gray-800 bg-amber-500/5 font-bold text-white">
                      <td className="p-4 flex items-center gap-2"><Trophy size={16} className="text-amber-500"/> オンラインカジノ</td>
                      <td className="p-4">約 95.0% 〜 98.0%</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="p-4">パチンコ・パチスロ</td>
                      <td className="p-4">約 80.0% 〜 85.0%</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="p-4">競馬・競艇</td>
                      <td className="p-4">約 70.0% 〜 80.0%</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="p-4">宝くじ</td>
                      <td className="p-4">約 45.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </ScrollAnimation>

          {/* 安全性セクション */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-3">
                <ShieldCheck className="text-amber-500" /> 
                3. 安全に利用するための「三権分立」
              </h2>
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-amber-500/30 rounded-3xl p-8 md:p-12">
                <p className="text-gray-300 mb-10 leading-relaxed text-center italic">
                  オンラインカジノは、主に3つの組織が互いを監視することで公平性を保っています。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-4 rounded-xl h-fit text-amber-500 font-black text-xl">01</div>
                    <div>
                      <h3 className="font-bold text-xl text-amber-200 mb-2">政府（ライセンス発行者）</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        マルタやキュラソーなどの政府。運営会社の経営能力や透明性を厳格に審査し、合法的な運営権を与えます。
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-4 rounded-xl h-fit text-amber-500 font-black text-xl">02</div>
                    <div>
                      <h3 className="font-bold text-xl text-amber-200 mb-2">ソフトウェア会社（ゲーム提供）</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        EvolutionやNetEnt等。カジノ側が勝率を操作できないよう、ゲーム機本体を独立して管理しています。
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:col-span-2 border-t border-gray-800 pt-8">
                    <div className="bg-amber-500/10 p-4 rounded-xl h-fit text-amber-500 font-black text-xl">03</div>
                    <div>
                      <h3 className="font-bold text-xl text-amber-200 mb-2">第三者監査機関（eCOGRA等）</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        RNG（乱数発生器）が正しく動作しているか、常に「イカサマ」がないかを外部から監視する専門機関です。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* よくある質問 */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-20">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <HelpCircle className="text-amber-500" />
                よくある質問
              </h2>
              <div className="space-y-4">
                {[
                  { q: "未成年でもプレイできますか？", a: "いいえ、できません。多くのカジノは18歳以上（カジノによっては21歳以上）の年齢制限があり、身分証による本人確認（KYC）が必須です。" },
                  { q: "日本語サポートはありますか？", a: "当サイトが推奨するカジノはすべて完全日本語対応です。ライブチャットやメールで日本人スタッフに相談できるため安心です。" }
                ].map((faq, i) => (
                  <details key={i} className="group bg-gray-900/30 border border-gray-800 rounded-2xl p-6 cursor-pointer hover:border-gray-700 transition-all">
                    <summary className="font-bold text-lg text-white list-none flex justify-between items-center">
                      {faq.q}
                      <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <p className="mt-4 text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </ScrollAnimation>
        </article>

        {/* コンバージョンボタン */}
        <ScrollAnimation variant="fadeIn">
          <div className="text-center bg-amber-500/5 rounded-3xl p-10 border border-amber-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">準備はできましたか？</h3>
            <Shimmer>
              <Link 
                href="/casino-ranking" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black py-4 px-12 rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                おすすめのカジノランキングを見る
                <Coins size={20} />
              </Link>
            </Shimmer>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  );
}