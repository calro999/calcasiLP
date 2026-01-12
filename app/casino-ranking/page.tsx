'use client';

import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, ExternalLink, Crown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

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
    <main className="pt-20 pb-24 bg-black min-h-screen text-gray-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-10 border-l-4 border-amber-500 pl-4">
          2026年最新オンラインカジノおすすめランキング
        </h1>

        {/* ===== ランキング ===== */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {casinos.map((casino, index) => {
            const rank = index + 1;
            const rating = rank === 1 ? 5.0 : rank === 2 ? 4.5 : rank === 3 ? 4.3 : 4.0;

            return (
              <motion.div key={casino.id} variants={itemVariants}>
                <Link
                  href={`/casino-detail/${casino.id}`}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition flex items-center p-6 space-x-6 border border-gray-700 hover:border-amber-500/50"
                >
                  <div className="w-24 text-center text-white">
                    {rank === 1 && <Crown size={36} className="mx-auto text-yellow-400 fill-yellow-400 mb-1" />}
                    {(rank === 2 || rank === 3) && <Trophy size={36} className="mx-auto text-amber-500 fill-amber-500 mb-1" />}
                    <div className="text-3xl font-black">{rank}位</div>
                  </div>

                  <div className="relative w-48 h-28 rounded-lg overflow-hidden border border-gray-600">
                    <Image src={casino.banner} alt={casino.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{casino.name}</h2>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">{casino.description}</p>
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                      <Star size={14} /> {rating.toFixed(1)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ===== SEOコンテンツ ===== */}
        <section className="mt-24 bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-2xl p-10 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-6">
            オンラインカジノおすすめを2026年に選ぶための完全ガイド
          </h2>

          <p className="mb-6">
            本ページでは、単なるランキング表示だけでなく、
            <strong>オンカジおすすめを安全かつ合理的に選ぶための判断基準</strong>
            を詳しく解説しています。
            特に2026年現在は、オンラインカジノ市場が拡大する一方で、
            正しい知識を持たないまま利用するとリスクが高まる状況です。
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            初心者がオンカジおすすめサイトを選ぶ際に重視すべきポイント
          </h3>
          <p>
            初めてオンラインカジノを利用する方は、
            日本語サポートの有無、出金実績、操作のわかりやすさを最優先で確認してください。
            詳細は初心者向けガイドで解説しています。
          </p>

          <div className="mt-4">
            <Link href="https://calcasi-lp.vercel.app/beginners-guide" className="text-amber-400 underline">
              ▶ オンラインカジノ初心者ガイドを見る
            </Link>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            仮想通貨対応オンカジが2026年におすすめされる理由
          </h3>
          <p>
            ビットコインやUSDTなどの仮想通貨決済に対応したオンラインカジノは、
            出金スピードが早く、手数料が抑えられる点で大きなメリットがあります。
            最新の対応状況や注意点は、最新情報ページで随時更新しています。
          </p>

          <div className="mt-4">
            <Link href="https://calcasi-lp.vercel.app/latest-news" className="text-amber-400 underline">
              ▶ オンカジ最新ニュース・アップデート情報
            </Link>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            管理者カルロが実際にプレイしている動画で確認する安心感
          </h3>
          <p>
            当サイトでは、管理者のカルロが実際にオンラインカジノをプレイしている動画を公開しています。
            実際の入金・プレイ・出金の流れを確認することで、
            安心してオンカジを選ぶことができます。
          </p>

          <div className="mt-4">
            <Link href="https://calcasi-lp.vercel.app/videos" className="text-amber-400 underline">
              ▶ 実際のプレイ動画を見る
            </Link>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            勝率を高めたい人向けの攻略法・人気ゲーム情報
          </h3>
          <p>
            オンカジは運だけでなく、ゲーム選びや資金管理によって結果が大きく変わります。
            当サイトでは攻略法や人気ゲーム情報も詳しく解説しています。
          </p>

          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              <Link href="https://calcasi-lp.vercel.app/strategies" className="text-amber-400 underline">
                ▶ オンラインカジノ攻略法一覧
              </Link>
            </li>
            <li>
              <Link href="https://calcasi-lp.vercel.app/games" className="text-amber-400 underline">
                ▶ 人気オンラインカジノゲーム特集
              </Link>
            </li>
          </ul>
        </section>

        {/* ===== FAQ Schema ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "オンラインカジノは日本人が利用しても安全ですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "正式なライセンスを取得している海外オンラインカジノであれば、日本人でも比較的安全に利用できます。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "2026年におすすめのオンラインカジノの特徴は？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "出金スピードが早く、日本語対応があり、仮想通貨決済に対応している点が重要です。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "初心者でも勝てるオンラインカジノはありますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "初心者向けボーナスや低リスクで遊べるゲームが用意されているカジノがおすすめです。"
                  }
                }
              ]
            })
          }}
        />

        {/* ===== ホームへ戻る ===== */}
        <div className="mt-20 text-center">
          <Link
            href="https://calcasi-lp.vercel.app/"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold px-10 py-4 rounded-full transition shadow-lg"
          >
            ホームへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
