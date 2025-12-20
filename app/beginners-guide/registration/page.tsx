import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, UserPlus, Wallet, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "オンラインカジノの登録・入金ガイド | 手順解説",
  description: "アカウント登録から入金までのステップを詳しく解説。本人確認（KYC）の重要性についても触れています。",
};

export default function RegistrationAndDepositGuidePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollAnimation variant="fadeIn">
          <Link href="/beginners-guide" className="group text-amber-400 hover:text-amber-300 mb-8 inline-flex items-center text-lg transition-colors">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            初心者ガイド一覧へ戻る
          </Link>
        </ScrollAnimation>

        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-amber-300">登録から入金までの流れ</h1>
        
        <div className="space-y-6 mb-16">
          {[
            { step: "01", title: "公式サイトで登録", desc: "氏名や生年月日を正確に入力します。偽名は出金トラブルの元です。" },
            { step: "02", title: "メール認証", desc: "届いたメールのリンクをクリックしてアカウントを有効化します。" },
            { step: "03", title: "入金", desc: "カードや銀行送金、仮想通貨など自分に合った方法を選びます。" }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900/30 border border-gray-800 p-6 rounded-2xl flex gap-6">
              <span className="text-3xl font-black text-amber-500/20">{item.step}</span>
              <div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}