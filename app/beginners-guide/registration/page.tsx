import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowLeft, 
  UserPlus, 
  Wallet, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Camera, 
  AlertCircle,
  CreditCard,
  Building2,
  Bitcoin,
  ChevronRight
} from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "オンラインカジノの登録・入金手順ガイド｜スムーズに遊び始めるための全手順",
  description: "オンラインカジノのアカウント登録から入金までのステップを初心者向けに詳しく解説。失敗しないための本人確認（KYC）の準備や、おすすめの入金方法も紹介します。",
  keywords: ["オンラインカジノ 登録方法", "オンカジ 入金方法", "KYC 本人確認", "オンカジ 初め方", "オンラインカジノ 銀行振込"],
};

export default function RegistrationAndDepositGuidePage() {
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
                <UserPlus size={24} />
                <span className="font-bold tracking-widest text-sm uppercase">Quick Start Guide</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent">
                登録から入金までの流れ<br />完全マニュアル
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                オンラインカジノを始めるのは非常に簡単です。ただし、**「出金時に困らないための正確な登録」**が何より重要。スムーズにプレイを開始するための手順を解説します。
              </p>
            </header>
          </ScrollAnimation>

          {/* ステップセクション */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-20 relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 via-gray-800 to-transparent hidden md:block" />
              
              <div className="space-y-10">
                {[
                  { 
                    icon: <UserPlus className="text-amber-500" />,
                    step: "STEP 01", 
                    title: "公式サイトでアカウント登録", 
                    desc: "氏名、住所、生年月日、メールアドレスを入力します。出金時の本人確認と照合されるため、必ず本名で登録してください。",
                    point: "偽名や住所の間違いは出金拒否の最大の原因になります。"
                  },
                  { 
                    icon: <CheckCircle2 className="text-amber-500" />,
                    step: "STEP 02", 
                    title: "メール認証を完了させる", 
                    desc: "登録したアドレスに届く認証メール内のリンクをクリック。これでアカウントが有効化され、ログイン可能になります。",
                    point: "メールが届かない場合は、迷惑メールフォルダを確認しましょう。"
                  },
                  { 
                    icon: <Wallet className="text-amber-500" />,
                    step: "STEP 03", 
                    title: "入金して軍資金をチャージ", 
                    desc: "キャッシャー（入金画面）から希望の方法を選択。入金不要ボーナスがある場合は、この時点で反映されているか確認します。",
                    point: "入金ボーナスを希望する場合は、チェックボックスの確認を忘れずに！"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative md:pl-20">
                    <div className="md:absolute md:left-4 md:top-0 w-10 h-10 rounded-full bg-black border-2 border-amber-500 flex items-center justify-center z-10 mb-4 md:mb-0">
                      {item.icon}
                    </div>
                    <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-amber-500/30 transition-colors">
                      <span className="text-amber-500 font-black text-sm tracking-tighter mb-2 block">{item.step}</span>
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">{item.desc}</p>
                      <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                        <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-200/80">{item.point}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollAnimation>

          {/* 入金方法のバリエーション */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-20">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-l-4 border-amber-500 pl-4">
                主な入金方法
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Building2, title: "銀行送金", desc: "ネットバンキングから即時振込。最も一般的で安心な方法。" },
                  { icon: CreditCard, title: "クレジットカード", desc: "手軽に入金可能。ただし、出金には別の方法が必要です。" },
                  { icon: Bitcoin, title: "仮想通貨", desc: "爆速の入出金と高い匿名性。BTCやUSDTに対応。" }
                ].map((method, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
                    <method.icon className="mx-auto text-amber-500 mb-4" size={32} />
                    <h3 className="font-bold mb-2">{method.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{method.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollAnimation>

          {/* KYCセクション (重要) */}
          <ScrollAnimation variant="fadeInUp">
            <section className="mb-16 bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <ShieldCheck size={160} />
              </div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Camera className="text-amber-500" /> 
                出金に必須！「本人確認（KYC）」の準備
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                オンラインカジノでは、マネーロンダリング防止のため、初めての出金前に**本人確認書類の提出**が求められます。早めに準備しておくと、出金がスムーズです。
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <li className="flex items-center gap-3 text-gray-300 bg-black/40 p-4 rounded-xl border border-gray-800">
                  <CheckCircle2 size={16} className="text-amber-500" />
                  <span>身分証明書（免許証・パスポート等）</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 bg-black/40 p-4 rounded-xl border border-gray-800">
                  <CheckCircle2 size={16} className="text-amber-500" />
                  <span>住所確認書類（住民票・公共料金請求書等）</span>
                </li>
              </ul>
            </section>
          </ScrollAnimation>

          {/* リンク誘導（仮リンク） */}
          <ScrollAnimation variant="fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/article/Registration" className="group p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-amber-500/50 transition-all">
                <h4 className="font-bold text-lg flex items-center justify-between group-hover:text-amber-400 transition-colors">
                  入出金方法の詳しい解説
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-gray-500 text-sm mt-2">銀行送金や電子決済サービスの使い方を詳しく見る</p>
              </Link>
              <Link href="/article/bonus" className="group p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-amber-500/50 transition-all">
                <h4 className="font-bold text-lg flex items-center justify-between group-hover:text-amber-400 transition-colors">
                  オンラインカジノのボーナス完全解説！
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-gray-500 text-sm mt-2">種類と賭け条件を理解して賢くプレイ</p>
              </Link>
            </div>
          </ScrollAnimation>
        </article>

        {/* コンバージョン */}
        <ScrollAnimation variant="fadeIn">
          <div className="text-center mt-20">
            <Shimmer>
              <Link 
                href="/casino-ranking" 
                className="inline-flex items-center gap-2 bg-amber-500 text-black font-black py-4 px-12 rounded-full hover:bg-amber-400 transition-all hover:scale-105 shadow-xl"
              >
                まずは登録して特典を受け取ろう
                <ArrowRight size={20} />
              </Link>
            </Shimmer>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  );
}