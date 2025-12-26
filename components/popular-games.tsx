import React from "react";
import Link from "next/link";
import { getAllGames } from "@/lib/gameLoader";

export default function PopularGames() {
  // 全ゲームデータからTOP用に最初の6件を取得
  const games = getAllGames().slice(0, 6);

  return (
    <section className="py-24 px-4 bg-[#020617]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Popular Games</h2>
            <div className="h-1 w-20 bg-blue-600"></div>
          </div>
          <Link href="/games" className="text-blue-500 font-bold hover:underline">
            すべて見る →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} className="group">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 transform group-hover:-translate-y-2 shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-[10px] font-black px-2 py-1 rounded">
                    {game.provider}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {game.description}
                  </p>
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 border-t border-gray-800 pt-4">
                    <span>RTP: <span className="text-white">{game.rtp}</span></span>
                    <span className="text-blue-500">READ MORE →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}