"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getAllGames } from "../../lib/gameLoader";
import { ProviderLogos } from "@/components/ProviderLogos";

export default function GamesPage() {
  const allGames = getAllGames();
  const [selectedProvider, setSelectedProvider] = useState<string>("All");

  const providers = ["All", ...Array.from(new Set(allGames.map(g => g.provider)))];

  const filteredGames = selectedProvider === "All" 
    ? allGames 
    : allGames.filter(g => g.provider === selectedProvider);

  // ロゴクリック時にフィルタリングを適用する関数
  const handleProviderClick = (providerName: string) => {
    setSelectedProvider(providerName);
    // クリック後にゲーム一覧までスムーズスクロールさせる場合
    document.getElementById('game-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#020617] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-4 text-center">人気のゲームを紹介！</h1>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-400 text-center mb-12 text-sm">プロによる最新スロット攻略・分析データ一覧</p>

        {/* ロゴセクション：クリック時にhandleProviderClickを実行 */}
        <div className="mb-10">
          <ProviderLogos onProviderSelect={handleProviderClick} />
        </div>

        {/* プロバイダー絞り込みタグ */}
        <div id="game-list" className="flex flex-wrap justify-center gap-2 mb-16 pt-10">
          {providers.map(p => (
            <button
              key={p}
              onClick={() => setSelectedProvider(p)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                selectedProvider === p 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {p === "All" ? "すべて" : p}
            </button>
          ))}
        </div>

        {/* ゲームリスト */}
        <div className="space-y-8">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <Link key={game.slug} href={`/games/${game.slug}`} className="group block">
                <div className="bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col md:flex-row shadow-2xl">
                  <div className="w-full md:w-[400px] h-64 md:h-auto overflow-hidden">
                    <img 
                      src={game.imageUrl} 
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-blue-500 text-[10px] font-black tracking-widest uppercase bg-blue-500/10 px-2 py-1 rounded">
                          {game.provider}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                        {game.title}
                      </h2>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {game.description}
                      </p>
                      <div className="flex gap-6 mb-2">
                        <div className="text-xs text-gray-500 font-mono">RTP: <span className="text-white font-bold">{game.rtp}</span></div>
                        <div className="text-xs text-gray-500 font-mono">最大配当: <span className="text-white font-bold">{game.maxWin}</span></div>
                      </div>
                    </div>
                    <div className="mt-6 text-blue-500 text-xs font-bold flex items-center">
                      攻略情報を詳しく読む <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 py-20">該当するゲームが見つかりませんでした。</p>
          )}
        </div>
        
        <div className="mt-20 text-center">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
             ← TOPページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}