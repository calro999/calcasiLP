import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Gift, AlertTriangle, Coins, Zap } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "オンラインカジノのボーナス完全ガイド | 活用法と注意点",
  description: "入金不要ボーナスや初回入金ボーナスの仕組み、出金に不可欠な「賭け条件」の計算方法まで詳しく解説。",
};

export default function BonusGuidePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollAnimation variant="fadeIn">
          <Link href="/beginners-guide" className="group text-amber-400 hover:text-amber-300 mb-8 inline-flex items-center text-lg transition-colors">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            初心者ガイド一覧へ戻る
          </Link>
        </ScrollAnimation>

        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-amber-300">ボーナス活用法と注意点</h1>
        
        <div className="bg-gray-900/50 border border-amber-500/30 p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-400">
            <AlertTriangle className="mr-2" /> 賭け条件の計算例
          </h2>
          <div className="text-center bg-black/40 p-6 rounded-xl border border-gray-800">
            <p className="text-sm text-gray-400 mb-2">100ドルのボーナス（20倍条件）なら</p>
            <p className="text-3xl font-black text-white">$100 × 20 = <span className="text-amber-400">$2,000分</span>のプレイが必要</p>
          </div>
        </div>
      </div>
    </main>
  );
}