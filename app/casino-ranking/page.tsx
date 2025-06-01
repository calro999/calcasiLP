// /app/[lang]/casino-ranking/page.tsx
'use client'; 

import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";
import { motion } from "framer-motion";
// ★ここを修正：Crown と Trophy アイコンをインポート
import { ArrowLeft, Star, ExternalLink, Crown, Trophy } from "lucide-react";

// コンテナのアニメーションバリアント
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // 各子要素が0.1秒遅れてアニメーションを開始
    }
  }
};

// 各アイテムのアニメーションバリアント
const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // 初期状態: 透明で少し下に位置
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } } // 表示状態: 不透明になり元の位置へ
};

export default async function CasinoRankingPage({ params }: { params: { lang: "ja" | "en" } }) {
  const casinos: Casino[] = await getAllCasinos(params.lang);

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">カジノランキング</h1>
        {/* ★ここを修正：グリッドから縦並びのフレックスボックスに変更 */}
        <motion.div
          className="flex flex-col gap-6" // 縦並びとアイテム間のスペースを定義
          variants={containerVariants}
          initial="hidden" // ページの読み込み時にhidden状態から開始
          animate="show"   // show状態へアニメーション
        >
          {casinos.map((casino, index) => {
            const rank = index + 1; // 順位を計算
            return (
              <motion.div
                key={casino.id}
                variants={itemVariants}
                className="w-full" // 各アイテムが全幅を占めるように
              >
                <Link
                  href={`/casino-detail/${casino.id}`}
                  // ★ここを修正：カード内のレイアウトをフレックスボックスに変更
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition flex items-center p-4 space-x-4" // カード内部を横並びにする
                >
                  {/* ★ここから追加：順位アイコンと番号の表示 */}
                  <div className="flex flex-col items-center justify-center flex-shrink-0 w-20"> {/* 順位表示エリア */}
                    {rank === 1 && <Crown size={48} className="text-yellow-400 fill-yellow-400" />}
                    {rank === 2 && <Trophy size={48} className="text-gray-400 fill-gray-400" />}
                    {rank === 3 && <Trophy size={48} className="text-amber-600 fill-amber-600" />} {/* 3位はブロンズっぽい色 */}
                    {rank > 3 && (
                      <div className="text-4xl font-extrabold text-amber-400">
                        {rank}
                      </div>
                    )}
                    <span className="text-lg font-bold text-white mt-1">位</span>
                  </div>
                  {/* ★ここまで追加 */}

                  {/* ★ここを修正：カジノロゴの表示エリアを調整 */}
                  <div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                    <Image src={casino.banner} alt={casino.name} fill className="object-cover" />
                  </div>

                  {/* カジノ情報（名前と概要） */}
                  <div className="flex-1"> {/* 残りのスペースを占有 */}
                    <h2 className="text-xl font-bold text-white mb-1">{casino.name}</h2>
                    <p className="text-gray-300 text-sm line-clamp-2">{casino.description}</p>
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