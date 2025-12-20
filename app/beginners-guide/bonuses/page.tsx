import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Gift, AlertTriangle, Coins, Zap, Clock, Info, CheckCircle2 } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

// ★ メタデータの設定
export const metadata: Metadata = {
  title: "オンラインカジノのボーナス完全ガイド | 種類・活用法・注意点",
  description: "オンラインカジノのボーナスを賢く使うための必須知識。入金不要ボーナスや初回入金ボーナスの仕組み、出金に不可欠な「賭け条件」の計算方法まで詳しく解説します。",
};

export default function BonusGuidePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* 戻るボタン */}
        <ScrollAnimation variant="fadeIn">
          <Link href="/beginners-guide" className="group text-amber-400 hover:text-amber-300 mb-8 inline-flex items-center text-lg transition-colors">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            初心者ガイド一覧へ戻る
          </Link>
        </ScrollAnimation>

        {/* ヒーローセクション */}
        <ScrollAnimation variant="fadeInUp">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <Shimmer>
                <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-transparent bg-clip-text">
                  ボーナス活用ガイド
                </span>
              </Shimmer>
              <span className="block text-2xl md:text-3xl mt-2 text-white/90">賢く稼ぐための種類と注意点</span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-300 border-l-4 border-amber-500 pl-6 italic">
              オンラインカジノ最大の魅力「ボーナス」。<br />
              しかし、仕組みを知らずに使うと「出金できない！」というトラブルに繋がります。
            </p>
          </header>
        </ScrollAnimation>

        {/* セクション1: ボーナスの種類 */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300 flex items-center">
              <Gift className="mr-3 text-amber-400" /> 主なボーナスの種類
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "入金不要ボーナス",
                  desc: "登録するだけで貰える「お試し資金」。リスクゼロでカジノを体験できます。",
                  icon: <Zap className="text-amber-400" />
                },
                {
                  title: "初回入金ボーナス",
                  desc: "初めての入金時に、入金額の100%〜200%が上乗せされる強力な特典です。",
                  icon: <Coins className="text-amber-400" />
                },
                {
                  title: "フリースピン",
                  desc: "特定のスロットを無料で回せる権利。勝利金はボーナスとして加算されます。",
                  icon: <Gift className="text-amber-400" />
                },
                {
                  title: "キャッシュバック",
                  desc: "負けた金額の一部が戻ってくる救済措置。出金条件が低いことが多いのが魅力です。",
                  icon: <Info className="text-amber-400" />
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl hover:border-amber-500/50 transition-all">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollAnimation>

        {/* セクション2: 賭け条件の解説（重要パート） */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20 bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-amber-400 flex items-center">
              <AlertTriangle className="mr-3 text-amber-400" /> 最重要：賭け条件（出金条件）
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              ボーナスはそのまま現金として引き出すことはできません。出金するには、カジノ側が決めた<strong>「一定額のプレイ（賭け）」</strong>をクリアする必要があります。
            </p>

            {/* 計算例カード */}
            <div className="bg-black/60 border border-gray-700 p-6 rounded-2xl mb-10">
              <h3 className="text-amber-300 font-bold mb-4 flex items-center italic">例：100ドルのボーナス（条件20倍）の場合</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-sm text-gray-400">ボーナス額</div>
                  <div className="text-2xl font-bold">$100</div>
                </div>
                <div className="text-amber-500 text-2xl">×</div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">賭け条件</div>
                  <div className="text-2xl font-bold">20倍</div>
                </div>
                <div className="text-amber-500 text-2xl">=</div>
                <div className="text-center bg-amber-500/10 border border-amber-500/50 px-6 py-2 rounded-xl">
                  <div className="text-sm text-amber-500">必要な合計賭け金額</div>
                  <div className="text-2xl font-black text-amber-400">$2,000</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center"><CheckCircle2 className="mr-2 text-amber-500" size={18} /> ゲームごとの消化率</h4>
                <p className="text-gray-400 text-sm mb-4">全てのゲームが同じように条件を減らしてくれるわけではありません。</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex justify-between border-b border-gray-800 pb-1"><span>スロット</span> <span className="text-amber-400">100%</span></li>
                  <li className="flex justify-between border-b border-gray-800 pb-1"><span>ルーレット・バカラ</span> <span className="text-amber-400">10%〜15%</span></li>
                  <li className="flex justify-between border-b border-gray-800 pb-1"><span>ライブカジノ</span> <span className="text-amber-400">0%〜10%</span></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-bold mb-4 flex items-center"><Clock className="mr-2 text-amber-500" size={18} /> その他の制約</h4>
                <div className="text-sm text-gray-400">
                  <p className="mb-2"><strong className="text-white">有効期限：</strong> 通常30日以内にクリアしないと没収されます。</p>
                  <p><strong className="text-white">ベット上限：</strong> 1回5ドルまで、など賭けられる上限が決まっています。</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* セクション3: 上手に活用するコツ */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300">ボーナスを上手に活用するコツ</h2>
            <div className="space-y-4">
              {[
                { title: "消化率100%のスロットを選ぶ", desc: "テーブルゲームは効率が悪いため、基本的にはスロットで条件を消化するのが定石です。" },
                { title: "禁止ゲームを必ず確認する", desc: "ボーナス中にプレイすると一発で没収される「禁止ゲーム」が存在します。規約のチェックは必須です。" },
                { title: "あえて受け取らない選択", desc: "自由にいつでも出金したいなら、ボーナスを拒否してリアルマネーのみで遊ぶのも賢い戦略です。" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-gray-900/30 rounded-xl border border-gray-800">
                  <div className="bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-black text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollAnimation>

        {/* まとめ */}
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center bg-amber-500 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              自分に合ったボーナスを見つけよう
            </h2>
            <p className="text-black font-medium text-lg mb-8">
              各カジノの具体的なボーナス額や条件は、ランキングページから比較できます。
            </p>
            <Link 
              href="/casino-ranking" 
              className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-xl"
            >
              カジノランキングを見る
            </Link>
          </div>
        </ScrollAnimation>
        
      </div>
    </main>
  );
}