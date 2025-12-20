import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Globe, ShieldCheck, Zap, Laptop, Smartphone, HelpCircle } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "オンラインカジノの基礎知識 | 初心者が知るべき仕組みと安全性",
  description: "オンラインカジノとは何か？仕組みから実際のカジノとの違い、ライセンスの重要性まで徹底解説。初心者が安全に遊ぶための必須知識を凝縮した基礎ガイドです。",
};

export default function WhatIsOnlineCasinoPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollAnimation variant="fadeIn">
          <Link href="/beginners-guide" className="group text-amber-400 hover:text-amber-300 mb-8 inline-flex items-center text-lg transition-colors">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            初心者ガイド一覧へ戻る
          </Link>
        </ScrollAnimation>

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

        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300 flex items-center">
              <Globe className="mr-3" /> オンラインカジノの仕組み
            </h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-xl">
              <p className="text-lg mb-6 leading-relaxed text-gray-300">
                オンラインカジノは、ネットを通じて本物の現金を賭けて遊べる仮想のギャンブルプラットフォームです。
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

        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20 bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-amber-400 flex items-center">
              <ShieldCheck className="mr-3 text-amber-400" /> 安全に利用するために
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-amber-500/10 p-3 rounded-lg h-fit text-amber-500 font-bold">01</div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">政府公認のライセンス</h3>
                  <p className="text-gray-400 text-sm">マルタやキュラソー等のライセンスは合法運営の証。フッターのロゴを確認しましょう。</p>
                </div>
              </div>
              <div className="flex gap-4 border-t border-gray-800 pt-6">
                <div className="bg-amber-500/10 p-3 rounded-lg h-fit text-amber-500 font-bold">02</div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">RNG（乱数発生器）の採用</h3>
                  <p className="text-gray-400 text-sm">ゲーム結果が完全にランダムであることを保証し、カジノ側の不正を防止します。</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </div>
    </main>
  );
}