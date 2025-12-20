import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ShieldCheck, Landmark, Lock, Users, Search, AlertTriangle, FileText } from 'lucide-react';
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";

// ★ メタデータの設定
export const metadata: Metadata = {
  title: "安全なオンラインカジノの選び方 | ライセンスと信頼性を見分けるコツ",
  description: "オンラインカジノを安全に楽しむための必須チェックポイントを解説。厳格な運営ライセンスの種類、セキュリティ対策、第三者機関の監査など、信頼できるサイトの条件を網羅しています。",
};

export default function OnlineCasinoSafetyPage() {
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
                  安全な選び方ガイド
                </span>
              </Shimmer>
              <span className="block text-2xl md:text-3xl mt-2 text-white/90">信頼できるカジノを見極める3つの鉄則</span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-300 border-l-4 border-amber-500 pl-6 italic">
              「怪しいサイトに騙されたくない」「本当に出金できるの？」<br />
              そんな不安を解消するために、プロがチェックしている安全基準を公開します。
            </p>
          </header>
        </ScrollAnimation>

        {/* セクション1: ライセンス */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300 flex items-center">
              <Landmark className="mr-3 text-amber-400" /> 1. 運営ライセンスの信頼性
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              オンラインカジノが合法的に運営されている最大の証拠が<strong>「運営ライセンス」</strong>です。政府や規制機関の厳しい審査をクリアしたサイトだけが取得できます。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "マルタ (MGA)",
                  level: "最高峰",
                  desc: "EU加盟国のマルタ政府が発行。世界で最も厳格な審査基準を持ち、プレイヤー保護が極めて手厚いのが特徴です。"
                },
                {
                  name: "キュラソー (Curacao)",
                  level: "標準的",
                  desc: "多くの人気カジノが取得しているライセンス。仮想通貨決済に対応しやすく、一定の信頼性と柔軟性を兼ね備えています。"
                },
                {
                  name: "ジブラルタル (GRA)",
                  level: "高信頼",
                  desc: "取得の難易度が非常に高く、このライセンスを持つカジノは財務状況や運営体制が非常に安定していると評価されます。"
                },
                {
                  name: "英国 (UKGC)",
                  level: "厳格",
                  desc: "イギリス国内向けですが、これを保持している運営会社は世界トップレベルのコンプライアンスを誇ります。"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-bl-lg">
                    {item.level}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollAnimation>

        {/* セクション2: セキュリティ */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-amber-400 flex items-center">
              <Lock className="mr-3 text-amber-400" /> 2. 技術的セキュリティと保護
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-amber-500/10 p-4 rounded-2xl shrink-0">
                  <ShieldCheck className="text-amber-500" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">SSL暗号化通信</h3>
                  <p className="text-gray-400 leading-relaxed">
                    サイトとの通信を暗号化し、個人情報や決済情報の漏洩を防ぎます。ブラウザのアドレスバーに「鍵マーク」があることが必須条件です。
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-amber-500/10 p-4 rounded-2xl shrink-0">
                  <FileText className="text-amber-500" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">責任あるギャンブルの推進</h3>
                  <p className="text-gray-400 leading-relaxed">
                    優良なカジノは、プレイヤーの依存を防ぐために「入金制限」や「プレイ時間制限」などの自己規制ツールを必ず提供しています。
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* セクション3: 評判と第三者機関 */}
        <ScrollAnimation variant="fadeInUp">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-amber-300 flex items-center">
              <Users className="mr-3 text-amber-400" /> 3. 運営実績と外部監査
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              ライセンス以外にも、実際の利用者からの評判や、公平性をチェックする「第三者機関」の存在が重要です。
            </p>

            <div className="bg-gray-900/30 border border-gray-700 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center"><Search className="mr-2 text-amber-500" size={20} /> ここをチェック！</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <p className="text-gray-300 font-medium">運営歴が長く、SNSや掲示板で「出金拒否」の噂が頻発していないか</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <p className="text-gray-300 font-medium">eCOGRAやGLIなどの第三者機関によって、ゲームの還元率(RTP)が監査されているか</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <p className="text-gray-300 font-medium">運営会社名と住所がサイトのフッター（最下部）に明記されているか</p>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-start gap-4">
              <AlertTriangle className="text-red-500 shrink-0" size={24} />
              <div>
                <p className="font-bold text-red-400 mb-1">注意！ライセンスなしのサイトは危険</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  ライセンス表記がないサイトや、どこの国で運営されているか不明なサイトでのプレイは、資金が戻ってこないリスクが非常に高いため、絶対に使用しないでください。
                </p>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* まとめ */}
        <ScrollAnimation variant="fadeInUp">
          <div className="text-center bg-amber-500 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              安全なカジノは当サイトが厳選済み
            </h2>
            <p className="text-black font-medium text-lg mb-8">
              当サイトのランキングでは、すべてライセンス確認済みの安全なサイトのみを紹介しています。
            </p>
            <Link 
              href="/casino-ranking" 
              className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-xl"
            >
              厳選カジノランキングへ
            </Link>
          </div>
        </ScrollAnimation>
        
      </div>
    </main>
  );
}