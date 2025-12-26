import React from "react";
import Link from "next/link";
import { getAllGames } from "../lib/gameLoader";

export default function HomePage() {
  // 全ゲームから最新の6件をTOPに表示
  const games = getAllGames().slice(0, 6);

  return (
    <main className="min-h-screen bg-[#020617]">
      {/* ヒーローセクション */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter italic uppercase">
            Calcasi <span className="text-blue-600">Review</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
            プロの視点でオンラインカジノゲームを徹底分析。スペック、攻略法、ボーナス情報を最速でお届け。
          </p>
          <Link 
            href="/games" 
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-black hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            ゲーム一覧を見る
          </Link>
        </div>
      </section>

      {/* 人気のゲームセクション（ここを修正しました） */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Popular Games</h2>
              <div className="h-1 w-20 bg-blue-600"></div>
            </div>
            <Link href="/games" className="text-blue-500 font-bold hover:text-blue-400 transition-colors">
              すべて見る →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Link key={game.slug} href={`/games/${game.slug}`} className="group">
                <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={game.imageUrl} 
                      alt={game.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                      {game.provider}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-6">
                      {game.description}
                    </p>
                    <div className="flex justify-between items-center border-t border-gray-800 pt-6">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                        RTP: <span className="text-white font-bold">{game.rtp}</span>
                      </div>
                      <span className="text-blue-500 text-xs font-black group-hover:translate-x-2 transition-transform">
                        DETAILS →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* フッター簡易版 */}
      <footer className="py-20 border-t border-gray-900 text-center">
        <p className="text-gray-600 text-xs tracking-widest uppercase">
          © 2025 Calcasi - Professional Casino Game Reviews
        </p>
      </footer>
    </main>
  );
}