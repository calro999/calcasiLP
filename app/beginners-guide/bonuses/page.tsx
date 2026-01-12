import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowLeft, 
  Gift, 
  AlertTriangle, 
  Coins, 
  Zap, 
  CheckCircle2, 
  Info, 
  Calculator,
  Percent,
  ChevronRight
} from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "オンラインカジノのボーナス完全ガイド | 種類・仕組み・賭け条件を解説",
  description: "オンラインカジノのボーナスの仕組みを徹底解説。入金不要ボーナスや初回入金ボーナスの活用法から、出金に不可欠な「賭け条件」の計算方法、注意すべき禁止事項まで網羅。",
  keywords: ["オンラインカジノ ボーナス", "入金不要ボーナス", "初回入金ボーナス", "賭け条件", "出金条件 計算"],
};

export default function BonusGuidePage() {
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
          {/* ヘッダー */}
          <ScrollAnimation variant="fadeInUp">
            <header className="mb-12">
              <div className="flex items-center gap-2 text-amber-500 mb-4">
                <Gift size={24} />
                <span className="font-bold tracking-widest text-sm uppercase">Bonus Master Guide</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent">
                ボーナス活用法と<br />絶対に知っておくべき注意点
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                オンラインカジノの魅力である「ボーナス」。しかし、正しく理解していないと「勝ったのに出金できない」というトラブルに繋がります。仕組みをマスターして賢く活用しましょう。
              </p>
            </header>
          </ScrollAnimation>

          {/* ボーナスの種類 */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-l-4 border-amber-500 pl-4">
                主要なボーナスの種類
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "入金不要ボーナス",
                    desc: "登録するだけで貰える軍資金。リスクゼロでカジノを試せる最大のチャンスです。",
                    tag: "人気No.1"
                  },
                  {
                    title: "初回入金ボーナス",
                    desc: "初めての入金時に、入金額の100%〜200%が付与される強力な特典です。",
                    tag: "高額"
                  },
                  {
                    title: "フリースピン",
                    desc: "特定のスロットを無料で回せる権利。勝利金はボーナスとして加算されます。",
                    tag: "スロット限定"
                  },
                  {
                    title: "キャッシュバック",
                    desc: "負けた金額の一部が戻ってくる制度。精神的な守りとして非常に優秀です。",
                    tag: "リスクヘッジ"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl relative group hover:border-amber-500/50 transition-colors">
                    <span className="absolute top-4 right-4 text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/30">
                      {item.tag}
                    </span>
                    <h3 className="font-bold text-xl mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollAnimation>

          {/* 賭け条件セクション */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-16">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 p-8 md:p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Calculator size={120} />
                </div>
                
                <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-400">
                  <AlertTriangle className="mr-3" /> 最重要：賭け条件（出金条件）とは？
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  ボーナスを「現金」として引き出すためには、一定額以上のプレイが必要になります。これを**賭け条件**と呼びます。
                </p>

                <div className="bg-black/60 border border-gray-800 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-tighter mb-4 flex items-center gap-2">
                    <Info size={16} /> 計算シミュレーション
                  </h3>
                  <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                    <div className="text-center">
                      <span className="block text-xs text-gray-500 mb-1">受け取ったボーナス</span>
                      <span className="text-2xl font-bold">$100</span>
                    </div>
                    <div className="text-amber-500 font-bold text-2xl">×</div>
                    <div className="text-center">
                      <span className="block text-xs text-gray-500 mb-1">賭け条件</span>
                      <span className="text-2xl font-bold">20倍</span>
                    </div>
                    <div className="text-amber-500 font-bold text-2xl">=</div>
                    <div className="bg-amber-500/10 border border-amber-500/50 px-6 py-3 rounded-xl text-center">
                      <span className="block text-xs text-amber-500 mb-1">必要な合計ベット額</span>
                      <span className="text-3xl font-black text-amber-400">$2,000分</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* 注意事項 */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Percent className="text-amber-500" /> 
                ボーナス利用時の注意点
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { title: "消化率の違い", content: "スロットは100%ですが、ライブカジノは10%程度しかカウントされない場合があります。" },
                  { title: "最大ベット制限", content: "ボーナス使用中は1回の賭け金に上限（例：5ドル）が設定されていることが多いです。" },
                  { title: "有効期限", content: "期限内に条件をクリアしないと、ボーナスと勝利金は消滅します。" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white/5 rounded-xl border border-white/5">
                    <CheckCircle2 className="text-amber-500 shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 内部リンク（仮） */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <Link href="/article/bonus" className="group p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-amber-500/50 transition-all">
                  <span className="text-amber-500 text-xs font-bold mb-2 block uppercase tracking-widest">Recommended</span>
                  <h4 className="font-bold text-lg flex items-center justify-between group-hover:text-amber-400 transition-colors">
                    オンラインカジノのボーナス完全解説一覧へ
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </h4>
                </Link>
                <Link href="/article/Registration" className="group p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-amber-500/50 transition-all">
                  <span className="text-amber-500 text-xs font-bold mb-2 block uppercase tracking-widest">Recommended</span>
                  <h4 className="font-bold text-lg flex items-center justify-between group-hover:text-amber-400 transition-colors">
                    オンラインカジノの登録から入金までを徹底解説一覧へ
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </h4>
                </Link>
              </div>
            </section>
          </ScrollAnimation>
        </article>

        {/* コンバージョン */}
        <ScrollAnimation variant="fadeIn">
          <div className="text-center bg-amber-500/5 rounded-3xl p-10 border border-amber-500/20 mt-12">
            <h3 className="text-2xl font-bold mb-6 text-white">条件を理解したら、さっそく遊んでみよう</h3>
            <Shimmer>
              <Link 
                href="/casino-ranking" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black py-4 px-12 rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                2026年最新オンラインカジノランキングを見る
                <Coins size={20} />
              </Link>
            </Shimmer>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  );
}