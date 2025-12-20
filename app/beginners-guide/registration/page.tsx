import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, UserPlus, Wallet, Key, Mail, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

// ★ メタデータの設定
export const metadata: Metadata = {
  title: "オンラインカジノの登録・入金ガイド | スムーズに始める手順解説",
  description: "オンラインカジノのアカウント登録方法から、クレジットカード・電子決済・仮想通貨での入金手順までをステップ解説。スムーズにプレイを開始するための注意点も紹介します。",
};

export default function RegistrationAndDepositGuidePage() {
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
                  登録と入金の流れ
                </span>
              </Shimmer>
              <span className="block text-2xl md:text-3xl mt-2 text-white/90">最短5分でプレイ開始！手順徹底解説</span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-300 border-l-4 border-amber-500 pl-6 italic">
              「登録はどうやるの？」「お金を入れるのは怖くない？」<br />
              そんな不安を解消するため、実際の画面を想定した手順をご案内します。
            </p>
          </header>
        </ScrollAnimation>

        {/* セクション1: アカウント登録 */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300 flex items-center">
              <UserPlus className="mr-3 text-amber-400" /> 1. アカウント登録の手順
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  step: "Step 01",
                  title: "公式サイトへアクセス",
                  desc: "当サイトのリンクから各カジノの公式サイトへ移動し、「登録」や「サインアップ」ボタンをクリックします。",
                  icon: <ArrowRight size={18} />
                },
                {
                  step: "Step 02",
                  title: "正確な個人情報の入力",
                  desc: "氏名、生年月日、現住所、電話番号を入力します。偽名を使うと勝利金が出金できなくなるため、必ず本名を使いましょう。",
                  icon: <Key size={18} />
                },
                {
                  step: "Step 03",
                  title: "メール・電話認証",
                  desc: "登録したアドレスに届く認証URLをクリック、またはスマホに届くSMSコードを入力してアカウントを有効化します。",
                  icon: <Mail size={18} />
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex gap-6 items-start">
                  <div className="bg-amber-500 text-black font-black px-3 py-1 rounded text-xs mt-1 shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-amber-500/10 border border-amber-500/30 p-6 rounded-xl flex items-start gap-4">
              <AlertCircle className="text-amber-500 shrink-0" size={24} />
              <div>
                <p className="font-bold text-amber-400 mb-1">注意ポイント：通貨設定</p>
                <p className="text-sm text-gray-300">
                  一度設定した通貨（USD、JPY、BTCなど）は後から変更できないカジノが多いです。自分の使い勝手の良いものを選びましょう。
                </p>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* セクション2: 資金の入金 */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300 flex items-center">
              <Wallet className="mr-3 text-amber-400" /> 2. 資金の入金方法
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              登録が完了したら、次は軍資金の入金です。カジノ内の「入金（Deposit）」ボタンから進みます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { name: "クレジットカード", features: "即時反映 / 手軽", detail: "Visa, Mastercard, JCBなど" },
                { name: "電子決済サービス", features: "出金もスムーズ", detail: "Vega Wallet, Payz, MuchBetter" },
                { name: "仮想通貨", features: "匿名性が高い", detail: "BTC, ETH, USDTなど" },
                { name: "銀行送金", features: "日本円で安心", detail: "ネットバンキングから振込可能" }
              ].map((method, idx) => (
                <div key={idx} className="bg-black/60 border border-gray-700 p-5 rounded-xl hover:border-gray-500 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white text-lg">{method.name}</span>
                    <span className="text-[10px] bg-gray-800 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">{method.features}</span>
                  </div>
                  <p className="text-sm text-gray-400">{method.detail}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center"><CheckCircle2 className="mr-2 text-amber-500" /> 入金の具体的ステップ</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-amber-500 font-bold">1.</span>
                  <span className="text-gray-300">入金画面で希望の決済手段を選択する</span>
                </li>
                <li className="flex gap-3 border-t border-gray-800 pt-4">
                  <span className="text-amber-500 font-bold">2.</span>
                  <span className="text-gray-300">入金したい金額を入力する（最低入金額に注意！）</span>
                </li>
                <li className="flex gap-3 border-t border-gray-800 pt-4">
                  <span className="text-amber-500 font-bold">3.</span>
                  <span className="text-gray-300">利用可能なボーナスがあればここで選択する</span>
                </li>
                <li className="flex gap-3 border-t border-gray-800 pt-4">
                  <span className="text-amber-500 font-bold">4.</span>
                  <span className="text-gray-300">決済情報を入力し、実行。即座にアカウントに反映されます。</span>
                </li>
              </ul>
            </div>
          </section>
        </ScrollAnimation>

        {/* セクション3: 本人確認（KYC）について */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300 flex items-center">
              <ShieldCheck className="mr-3 text-amber-400" /> 出金に必須：本人確認（KYC）
            </h2>
            <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-2xl">
              <p className="text-gray-300 mb-6 leading-relaxed">
                初めての出金前には、必ず「本人確認資料」の提出が求められます。これはマネーロンダリング防止のための国際的なルールです。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3 text-white flex items-center">必要なもの：</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex items-center"><CheckCircle2 size={14} className="mr-2 text-amber-500" /> 身分証明書（免許証・パスポート等）</li>
                    <li className="flex items-center"><CheckCircle2 size={14} className="mr-2 text-amber-500" /> 住所確認書類（住民票・公共料金明細等）</li>
                  </ul>
                </div>
                <div className="text-sm text-gray-400 leading-relaxed bg-black/40 p-4 rounded-lg">
                  スマホで写真を撮ってアップロードするだけ！早めに済ませておくと、出金がスムーズになります。
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* まとめ */}
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center bg-amber-500 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              準備はすべて整いました！
            </h2>
            <p className="text-black font-medium text-lg mb-8">
              まずは信頼できるカジノを選び、アカウントを作成してみましょう。
            </p>
            <Link 
              href="/casino-ranking" 
              className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-xl"
            >
              おすすめカジノランキングへ
            </Link>
          </div>
        </ScrollAnimation>
        
      </div>
    </main>
  );
}