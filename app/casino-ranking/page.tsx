// /app/[lang]/casino-ranking/page.tsx
'use client'; 

import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ExternalLink, Crown, Trophy } from "lucide-react";

// コンテナのアニメーションバリアント
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// 各アイテムのアニメーションバリアント
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default async function CasinoRankingPage({ params }: { params: { lang: "ja" | "en" } }) {
  const casinos: Casino[] = await getAllCasinos(params.lang);

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">カジノランキング</h1>
        <motion.div
          className="flex flex-col gap-6" // 縦並びとアイテム間のスペースを定義
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {casinos.map((casino, index) => {
            const rank = index + 1;
            return (
              <motion.div
                key={casino.id}
                variants={itemVariants}
                className="w-full"
              >
                <Link
                  href={`/casino-detail/${casino.id}`}
                  // ★ここを修正：カード内部のレイアウトとパディングを調整
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition flex items-center p-6 space-x-6" // パディングとスペースを少し増やし、内部を横並びにする
                >
                  {/* 順位アイコンと番号の表示 (変更なし) */}
                  <div className="flex flex-col items-center justify-center flex-shrink-0 w-20">
                    {rank === 1 && <Crown size={48} className="text-yellow-400 fill-yellow-400" />}
                    {rank === 2 && <Trophy size={48} className="text-gray-400 fill-gray-400" />}
                    {rank === 3 && <Trophy size={48} className="text-amber-600 fill-amber-600" />}
                    {rank > 3 && (
                      <div className="text-4xl font-extrabold text-amber-400">
                        {rank}
                      </div>
                    )}
                    <span className="text-lg font-bold text-white mt-1">位</span>
                  </div>

                  {/* ★ここを修正：カジノロゴの表示エリアを長方形に */}
                  <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden"> {/* 幅40、高さ24の長方形に */}
                    <Image src={casino.banner} alt={casino.name} fill className="object-cover" />
                  </div>

                  {/* カジノ情報（名前、概要、ボーナス） */}
                  {/* ★ここを修正：テキストコンテンツのレイアウトを調整 */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-white mb-1">{casino.name}</h2>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-2">{casino.description}</p>
                    {/* ★ここから追加：ボーナス情報の表示 */}
                    {casino.bonus && ( // casino.bonus が存在する場合のみ表示
                      <div className="text-amber-300 text-xs font-bold bg-amber-500/10 p-1.5 rounded-md self-start">
                        🎁 {casino.bonus}
                      </div>
                    )}
                    {/* ★ここまで追加 */}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}