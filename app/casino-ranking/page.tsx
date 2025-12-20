'use client';

import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, ExternalLink, Crown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CasinoRankingPage({ params }: { params: { lang: "ja" | "en" } }) {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lang = params.lang || "ja";

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
          2025年最新カジノランキング
        </h1>

        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {casinos.map((casino, index) => {
            const rank = index + 1;

            // ★ 新しい評価ロジック
            // 1位: 5.0 / 2位: 4.5 / 3位: 4.3 / 4位以降: 4.0 固定
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
                  <div className="flex flex-col items-center justify-center flex-shrink-0 w-24 border-r border-gray-700 pr-6">
                    {rank === 1 && <Crown size={40} className="text-yellow-400 fill-yellow-400 mb-1" />}
                    {(rank === 2 || rank === 3) && <Trophy size={40} className={rank === 2 ? "text-gray-300 fill-gray-300" : "text-amber-600 fill-amber-600"} />}
                    <div className={`text-3xl font-black ${rank <= 3 ? 'text-white' : 'text-gray-500'}`}>
                      {rank}<span className="text-sm ml-1">位</span>
                    </div>
                  </div>

                  {/* ロゴバナー */}
                  <div className="relative flex-shrink-0 w-48 h-28 rounded-lg overflow-hidden border border-gray-600 shadow-md bg-gray-900">
                    <Image src={casino.banner} alt={casino.name} fill className="object-cover" />
                  </div>

                  {/* 情報エリア */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h2 className="text-2xl font-bold text-white leading-tight">{casino.name}</h2>
                      
                      {/* 星評価の精密描画 */}
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
      </div>
    </main>
  );
}