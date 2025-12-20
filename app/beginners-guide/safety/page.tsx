import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ShieldCheck, Landmark, Lock, Users, Search, AlertTriangle } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "安全なオンラインカジノの選び方 | ライセンスと信頼性を見分けるコツ",
  description: "オンラインカジノを安全に楽しむための必須チェックポイントを解説。ライセンス、セキュリティ、第三者機関の監査など、信頼できるサイトの条件を網羅。",
};

export default function OnlineCasinoSafetyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-amber-300">安全なオンラインカジノの選び方</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {[
              { name: "マルタ (MGA)", level: "最高峰", desc: "世界で最も厳格な審査基準を持ち、プレイヤー保護が手厚い。" },
              { name: "キュラソー", level: "標準的", desc: "多くのカジノが取得。柔軟性が高く仮想通貨にも対応。" }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl relative">
                <span className="absolute top-2 right-2 text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-bold">{item.level}</span>
                <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-start gap-4">
            <AlertTriangle className="text-red-500 shrink-0" size={24} />
            <p className="text-sm text-gray-400">ライセンス表記がないサイトは非常に危険です。絶対に利用しないでください。</p>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  );
}