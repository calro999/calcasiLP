import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllGames } from "../../lib/gameLoader"; // 修正

export const metadata: Metadata = {
  title: "オンラインカジノゲーム徹底解説一覧 | Calcasi",
  description: "人気のスロットから最新ゲームまで、スペックや攻略法を詳しく紹介。",
};

export default function GamesPage() {
  const games = getAllGames();

  return (
    <main className="min-h-screen bg-[#0f172a] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-10 text-center uppercase tracking-widest">Popular Games</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} className="group">
              <div className="bg-gray-800 border border-gray-700 p-8 rounded-3xl hover:border-blue-500 transition-all duration-300 transform group-hover:-translate-y-2 shadow-2xl">
                <p className="text-blue-500 text-xs font-bold mb-2 uppercase">{game.provider}</p>
                <h2 className="text-2xl font-bold text-white mb-4">{game.title}</h2>
                <div className="flex space-x-4 mb-6">
                  <div className="text-xs text-gray-400">RTP: <span className="text-white">{game.rtp}</span></div>
                  <div className="text-xs text-gray-400">FS: <span className="text-white">{game.canBuyFS ? "OK" : "NO"}</span></div>
                </div>
                <div className="text-blue-400 font-bold group-hover:underline text-sm flex items-center">
                  詳細を見る →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}