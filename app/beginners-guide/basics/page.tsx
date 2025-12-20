import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowLeft, Globe, ShieldCheck, Zap, Laptop, Smartphone, HelpCircle } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

// ★ メタデータの設定
export const metadata: Metadata = {
  title: "オンラインカジノの基礎知識 | 初心者が知るべき仕組みと安全性",
  description: "オンラインカジノとは何か？仕組みから実際のカジノとの違い、ライセンスの重要性まで徹底解説。初心者が安全に遊ぶための必須知識を凝縮した基礎ガイドです。",
};

export default function WhatIsOnlineCasinoPage() {
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
                  オンラインカジノとは？
                </span>
              </Shimmer>
              <span className="block text-2xl md:text-3xl mt-2 text-white/90">基本の仕組みと安全性を理解しよう</span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-300 border-l-4 border-amber-500 pl-6 italic">
              「オンラインカジノって何？」「本当に安全なの？」<br />
              そんな疑問を持つ初心者のために、基礎知識をどこよりも分かりやすく解説します。
            </p>
          </header>
        </ScrollAnimation>

        {/* セクション1: 仕組み */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300 flex items-center">
              <Globe className="mr-3" /> オンラインカジノの仕組み
            </h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-xl">
              <p className="text-lg mb-6 leading-relaxed text-gray-300">
                オンラインカジノ（オンカジ）は、インターネットを通じて本物の現金を賭けて遊べる<strong>仮想のギャンブルプラットフォーム</strong>です。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 p-6 rounded-xl border border-gray-700">
                  <Laptop className="text-amber-400 mb-4" size={32} />
                  <h3 className="font-bold text-xl mb-2 text-white">24時間いつでもプレイ</h3>
                  <p className="text-gray-400 text-sm">PCやスマホがあれば、場所を選ばず24時間いつでも好きな時にアクセス可能です。</p>
                </div>
                <div className="bg-black/40 p-6 rounded-xl border border-gray-700">
                  <Zap className="text-amber-400 mb-4" size={32} />
                  <h3 className="font-bold text-xl mb-2 text-white">多彩なゲーム</h3>
                  <p className="text-gray-400 text-sm">スロット、ブラックジャック、バカラ、ルーレットに加え、ライブ中継のディーラーと対戦もできます。</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* セクション2: 実際との違い（カード型に改善） */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300">実際のカジノとの違い</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "アクセス性", content: "実際のカジノは海外へ行く必要がありますが、オンラインなら自宅のソファが会場になります。" },
                { label: "ゲームの種類", content: "物理的なスペース制限がないため、一つのサイトで3,000種類以上のゲームを遊べることも珍しくありません。" },
                { label: "ボーナス制度", content: "「入金不要ボーナス」など、軍資金が増えるプロモーションはオンライン特有の大きなメリットです。" },
                { label: "プライバシー", content: "他の客の目を気にせず、匿名性を保ちながらリラックスして自分のペースでプレイできます。" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start p-5 bg-gray-900/30 border-b border-gray-800 hover:bg-gray-800/40 transition-colors">
                  <div className="min-w-[120px] font-bold text-amber-500">{item.label}</div>
                  <div className="text-gray-300">{item.content}</div>
                </div>
              ))}
            </div>
          </section>
        </ScrollAnimation>

        {/* セクション3: 安全性（強調表示） */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20 bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-amber-400 flex items-center">
              <ShieldCheck className="mr-3 text-amber-400" /> 安全に利用するために
            </h2>
            <p className="mb-8 text-gray-300 text-lg">
              初心者が最も不安に思う「不正やイカサマ」を防ぐため、以下の4項目は必ずチェックしましょう。
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-amber-500/10 p-3 rounded-lg h-fit">
                  <span className="text-amber-500 font-bold">01</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">政府公認のライセンス</h3>
                  <p className="text-gray-400">マルタ(MGA)やキュラソーなどの政府機関が発行する許可証は、そのカジノが合法的に運営されている証です。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-amber-500/10 p-3 rounded-lg h-fit">
                  <span className="text-amber-500 font-bold">02</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">RNG（乱数発生器）の採用</h3>
                  <p className="text-gray-400">ゲームの結果が完全にランダムであることを保証するシステム。これにより、カジノ側が結果を操作することは不可能です。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-amber-500/10 p-3 rounded-lg h-fit">
                  <span className="text-amber-500 font-bold">03</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">SSL暗号化通信</h3>
                  <p className="text-gray-400">個人情報やクレジットカード情報を保護するための必須技術。サイトURLが「https」で始まっているか確認してください。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-amber-500/10 p-3 rounded-lg h-fit">
                  <span className="text-amber-500 font-bold">04</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">日本語サポートの質</h3>
                  <p className="text-gray-400">トラブル時に日本語でチャット相談できるか。24時間体制であればより安心して利用できます。</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* まとめ */}
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center bg-amber-500 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center justify-center">
              <HelpCircle className="mr-2" /> 準備はできましたか？
            </h2>
            <p className="text-black font-medium text-lg mb-8">
              基本を理解したら、次は「安全なカジノの選び方」をチェックしましょう。
            </p>
            <Link 
              href="/beginners-guide/safety" 
              className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-xl"
            >
              選び方ガイドへ進む
            </Link>
          </div>
        </ScrollAnimation>
        
      </div>
    </main>
  );
}