// /app/[lang]/casino-ranking/page.tsx
'use client'; 

import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";
import { motion } from "framer-motion";

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
        {/* コンテナ全体をmotion.divでラップし、アニメーションバリアントを適用 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden" // ページの読み込み時にhidden状態から開始
          animate="show"   // show状態へアニメーション
        >
          {casinos.map((casino, index) => ( // ★ここを修正：第二引数に index を追加
            // 各カジノアイテムをmotion.divでラップし、アイテムのアニメーションバリアントを適用
            <motion.div
              key={casino.id}
              variants={itemVariants}
            >
              <Link
                href={`/casino-detail/${casino.id}`}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition block h-full"
              >
                <div className="relative w-full h-48">
                  <Image src={casino.banner} alt={casino.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  {/* ★ここから追加：ランキング番号の表示 */}
                  <div className="text-3xl font-extrabold text-amber-400 mb-2">
                    {index + 1}位
                  </div>
                  {/* ★ここまで追加 */}
                  <h2 className="text-xl font-bold text-white mb-2">{casino.name}</h2>
                  <p className="text-gray-300 text-sm line-clamp-3">{casino.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}