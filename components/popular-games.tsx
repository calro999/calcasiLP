import React from "react";
import Link from "next/link";
import { getAllGames } from "@/lib/gameLoader";

export default function PopularGames() {
  // 全ゲームデータからTOP用に最初の6件を取得
  const games = getAllGames().slice(0, 6);

  return (
    <section className="py-24 px-4 bg-[#020617]">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー部分 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">
            人気のゲームを紹介！
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-sm md:text-base">
            プロが厳選した、今もっとも熱いオンラインカジノスロットをチェック。
          </p>
        </div>

        {/* ゲームカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {games.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} className="group">
              <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-blue-500 transition-all duration-300 transform group-hover:-translate-y-2 shadow-2xl">
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg text-white">
                    {game.provider}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-6">
                    {game.description}
                  </p>
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-500 border-t border-gray-800 pt-5">
                    <span>還元率(RTP): <span className="text-white">{game.rtp}</span></span>
                    <span className="text-blue-500 flex items-center">
                      詳しく見る <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 🔽 すべて見るボタンを最下部へ配置 */}
        <div className="text-center">
          <Link 
            href="/games" 
            className="inline-flex items-center justify-center px-12 py-5 text-lg font-black text-white bg-transparent border-2 border-blue-600 rounded-2xl hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 group"
          >
            すべてのゲーム攻略を見る
            <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
          </Link>
          <p className="text-gray-600 text-xs mt-6 tracking-widest uppercase">
            Total {getAllGames().length} Games Analyzed
          </p>
        </div>
      </div>
    </section>
  );
}