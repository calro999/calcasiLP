'use client'; 

import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, ExternalLink, Crown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CasinoRankingPage({ params }: { params: { lang: "ja" | "en" } }) {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const lang = params.lang || "ja"; // デフォルトを日本語に

  useEffect(() => {
    async function loadCasinos() {
      const data = await getAllCasinos(lang);
      setCasinos(data);
    }
    loadCasinos();
  }, [lang]);

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
            return (
              <motion.div key={casino.id} variants={itemVariants} className="w-full">
                <Link
                  href={`/casino-detail/${casino.id}`}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition flex items-center p-6 md:p-8 space-x-6 md:space-x-8 border border-gray-700 hover:border-amber-500/50"
                >
                  {/* 順位表示エリア */}
                  <div className="flex flex-col items-center justify-center flex-shrink-0 w-24 border-r border-gray-700 pr-6">
                    {rank === 1 && <Crown size={48} className="text-yellow-400 fill-yellow-400 mb-1" />}
                    {rank === 2 && <Trophy size={48} className="text-gray-400 fill-gray-400 mb-1" />}
                    {rank === 3 && <Trophy size={48} className="text-amber-600 fill-amber-600 mb-1" />}
                    
                    <div className={`text-3xl font-extrabold ${rank <= 3 ? 'text-white' : 'text-gray-400'}`}>
                      {rank}<span className="text-sm ml-1">位</span>
                    </div>
                  </div>

                  {/* カジノバナー */}
                  <div className="relative flex-shrink-0 w-48 h-28 rounded-lg overflow-hidden border border-gray-600 shadow-inner">
                    <Image 
                      src={casino.banner} 
                      alt={casino.name} 
                      fill 
                      className="object-cover" 
                      unoptimized // 外部URLからの画像表示が多い場合は追加
                    />
                  </div>

                  {/* カジノ情報 */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-white">{casino.name}</h2>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">{casino.description}</p>
                    {casino.bonus && (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-300 text-xs font-bold bg-amber-500/20 px-3 py-1.5 rounded-full border border-amber-500/30">
                          🎁 {casino.bonus}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs">
                           <ExternalLink size={12} className="ml-1" /> 詳細を見る
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