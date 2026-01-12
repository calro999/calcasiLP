'use client';

import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, ExternalLink, Crown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

// ★ 重要：'use client' のファイルでは export const revalidate = 0 は使えません。
// 代わりに dynamic = 'force-dynamic' だけを記述することで、キャッシュを無効化しビルドエラーを回避します。
export const dynamic = 'force-dynamic';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CasinoRankingPage({ params }: { params: { lang?: "ja" | "en" } }) {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // params.lang が undefined の場合のフォールバックを追加
  const lang = params?.lang || "ja";

  useEffect(() => {
    async function loadCasinos() {
      setIsLoading(true);
      try {
        const data = await getAllCasinos(lang);
        setCasinos(data);
      } catch (error) {
        console.error("Failed to load casinos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCasinos();
  }, [lang]);

  if (isLoading) return <div className="min-h-screen bg-black" />;

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">
          2026年最新カジノランキング
        </h1>

        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {casinos.map((casino, index) => {
            const rank = index + 1;

            // ★ 評価ロジック
            let rating = 4.0;
            if (rank === 1) rating = 5.0;
            else if (rank === 2) rating = 4.5;
            else if (rank === 3) rating = 4.3;
            else rating = 4.0;
            
            return (
              <motion.div key={casino.id} variants={itemVariants} className="w-full">
                <Link
                  href={`/casino-detail/${casino.id}`}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition flex items-center p-6 md:p-8 space-x-6 md:space-x-8 border border-gray-700 hover:border-amber-500/50"
                >
                  {/* 順位表示 */}
                  <div className="flex flex-col items-center justify-center flex-shrink-0 w-24 border-r border-gray-700 pr-6 text-white">
                    {rank === 1 && <Crown size={40} className="text-yellow-400 fill-yellow-400 mb-1" />}
                    {(rank === 2 || rank === 3) && <Trophy size={40} className={rank === 2 ? "text-gray-300 fill-gray-300" : "text-amber-600 fill-amber-600"} />}
                    <div className={`text-3xl font-black ${rank <= 3 ? 'text-white' : 'text-gray-500'}`}>
                      {rank}<span className="text-sm ml-1">位</span>
                    </div>
                  </div>

                  {/* ロゴバナー */}
                  <div className="relative flex-shrink-0 w-48 h-28 rounded-lg overflow-hidden border border-gray-600 shadow-md bg-gray-900 text-white">
                    <Image src={casino.banner} alt={casino.name} fill className="object-cover" />
                  </div>

                  {/* 情報エリア */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h2 className="text-2xl font-bold text-white leading-tight">{casino.name}</h2>
                      
                      <div className="flex items-center">
                        <div className="flex text-amber-400 mr-2">
                          {[1, 2, 3, 4, 5].map((starIdx) => {
                            const isFull = starIdx <= Math.floor(rating);
                            const decimal = rating % 1;
                            const isPartial = !isFull && starIdx === Math.ceil(rating);
                            
                            return (
                              <div key={starIdx} className="relative">
                                <Star size={16} className="text-gray-600" fill="currentColor" />
                                {isFull && (
                                  <Star size={16} className="absolute top-0 left-0 text-amber-400" fill="currentColor" />
                                )}
                                {isPartial && (
                                  <div 
                                    className="absolute top-0 left-0 overflow-hidden text-amber-400" 
                                    style={{ width: `${decimal * 100}%` }}
                                  >
                                    <Star size={16} fill="currentColor" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <span className="text-amber-400 font-bold text-sm leading-none">{rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">{casino.description}</p>

                    {casino.bonus && (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-300 text-[11px] font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                          🎁 {casino.bonus}
                        </span>
                        <div className="flex items-center text-gray-500 text-[11px]">
                          <ExternalLink size={12} className="ml-1" />
                          <span className="ml-1">レビュー</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        {/* ▼▼▼ ランキング下部SEOコンテンツ（SEO対策用・完全版） ▼▼▼ */}
        <section className="mt-24 text-gray-300 leading-relaxed">
          <h2 className="text-3xl font-bold text-white mb-6">
            オンラインカジノおすすめランキングを選ぶ前に必ず理解しておくべき重要ポイント
          </h2>

          <p>
            「オンラインカジノおすすめ」「オンカジおすすめ」と検索している多くのユーザーは、
            単純な人気順や広告露出の多さではなく、
            <strong>実際に安全に遊べて、長期的に信頼できるオンラインカジノ</strong>
            を探しています。
            特に2026年現在は、オンカジ市場の急拡大により、
            優良サイトと注意すべきサイトの差が以前よりも大きくなっています。
          </p>

          <p>
            本ページでは、ランキング結果だけでなく、
            なぜこれらのオンラインカジノがおすすめできるのか、
            どのような基準で評価しているのかを明確にすることで、
            ユーザー自身が納得して選べる情報を提供しています。
          </p>

          <h2 className="text-3xl font-bold text-white mt-14 mb-6">
            オンカジ2026年おすすめ基準として最重要となる安全性と信頼性
          </h2>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            国際的に認められたカジノライセンスの有無
          </h3>

          <p>
            オンラインカジノおすすめサイトを見極める上で、
            最も基本かつ重要な要素が
            <strong>正式なカジノライセンスを保有しているかどうか</strong>
            です。
            キュラソー政府、マルタゲーミング局（MGA）などの
            国際的に認知されたライセンスを取得しているカジノは、
            定期的な監査と厳格な運営ルールの下でサービスを提供しています。
          </p>

          <p>
            ライセンス情報が不明確なオンカジや、
            公式サイトに明記されていない場合は、
            出金拒否やサポート未対応といったトラブルに発展する可能性があるため、
            利用は避けるべきです。
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            長期運営実績とユーザー評価の蓄積
          </h3>

          <p>
            本当に信頼できるオンラインカジノおすすめサイトは、
            短期間で立ち上げられた新規サイトではなく、
            数年以上にわたって安定した運営実績を積み重ねています。
            運営歴が長いオンカジほど、
            出金処理やサポート対応のノウハウが蓄積されており、
            トラブルが起きにくい傾向があります。
          </p>

          <h2 className="text-3xl font-bold text-white mt-14 mb-6">
            オンカジおすすめ比較で明確な差が出る出金スピードと対応決済手段
          </h2>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            出金スピードが早いオンラインカジノは信頼性が高い
          </h3>

          <p>
            2026年のオンカジおすすめ比較において、
            出金スピードは非常に重要な評価指標です。
            勝利金が迅速に処理され、
            数時間から数日以内に着金するオンラインカジノは、
            資金管理が健全である証拠と言えます。
          </p>

          <p>
            一方で、理由なく出金が遅延する、
            追加書類の提出を繰り返し求められるオンカジは、
            利用者側のリスクが高まるため注意が必要です。
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            仮想通貨・電子ウォレット対応の重要性
          </h3>

          <p>
            最近のオンラインカジノおすすめサイトでは、
            ビットコインやUSDTなどの仮想通貨決済、
            電子ウォレットへの対応が標準化しています。
            これらの決済手段は、
            出金処理が早く、手数料が抑えられる点で、
            2026年現在のオンカジ利用において大きなメリットとなっています。
          </p>

          <h2 className="text-3xl font-bold text-white mt-14 mb-6">
            オンカジ2026年おすすめサイトに共通するボーナス設計の考え方
          </h2>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            ボーナス金額だけで判断してはいけない理由
          </h3>

          <p>
            高額ボーナスを前面に押し出しているオンカジは多く存在しますが、
            本当にオンラインカジノおすすめと言えるかどうかは、
            <strong>賭け条件（ワager条件）の現実性</strong>
            によって決まります。
          </p>

          <p>
            条件が厳しすぎる場合、
            実際には出金まで到達できず、
            ボーナスが形だけになってしまうケースも少なくありません。
            数字の大きさではなく、
            条件の内容を確認することが重要です。
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            初心者でも使いやすい特典が用意されているか
          </h3>

          <p>
            オンカジ初心者におすすめできるサイトは、
            フリーベットやノーデポジットボーナスなど、
            入金リスクを抑えて試せる特典が用意されています。
            こうした設計は、
            長期的にユーザーと向き合う姿勢の表れと言えます。
          </p>

          <h2 className="text-3xl font-bold text-white mt-14 mb-6">
            日本人ユーザーにとって重要なサポート体制と使いやすさ
          </h2>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            日本語対応サポートの有無
          </h3>

          <p>
            オンラインカジノおすすめランキングを見る際、
            日本語で問い合わせができるかどうかは、
            安心して利用するための重要な判断材料です。
            トラブル発生時に迅速な対応が受けられるかどうかで、
            利用体験は大きく変わります。
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            モバイル対応と操作性の快適さ
          </h3>

          <p>
            2026年現在では、
            スマートフォンからオンカジを利用するユーザーが主流となっています。
            モバイル表示に最適化され、
            直感的に操作できるオンラインカジノは、
            長時間のプレイでもストレスが少なく、
            おすすめ度が高くなります。
          </p>

          <h2 className="text-3xl font-bold text-white mt-14 mb-6">
            オンラインカジノおすすめランキングを最大限活用するために
          </h2>

          <p>
            本ランキングは、
            単なる人気順や広告順ではなく、
            安全性・出金実績・サポート品質・ボーナス条件を
            総合的に評価した結果を掲載しています。
          </p>

          <p>
            本ページの情報を参考にしながら、
            自分のプレイスタイルに合った
            <strong>オンカジ2026年おすすめサイト</strong>
            を選ぶことで、
            より安全で快適なオンラインカジノ体験が可能になります。
          </p>
        </section>

      </div>
    </main>
  );
}