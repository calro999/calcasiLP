import React from "react";
import { Metadata } from "next";
import { getGameBySlug, getAllGames } from "../../../lib/gameLoader";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGameBySlug(params.slug);
  if (!game) return { title: "Game Not Found" };
  return { title: `${game.title}の徹底解説・攻略ガイド | Calcasi`, description: game.seoDescription };
}

export default function GameDetailPage({ params }: Props) {
  const game = getGameBySlug(params.slug);
  if (!game) notFound();

  const Star = ({ count }: { count: number }) => (
    <span className="text-yellow-400">{"★".repeat(count)}{"☆".repeat(5 - count)}</span>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 pb-20">
      {/* ヒーローヘッダー */}
      <div className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
        <img src={game.imageUrl} className="absolute w-full h-full object-cover opacity-10 blur-md scale-110" alt="" />
        <div className="relative z-10 text-center px-4">
          <nav className="text-[10px] text-blue-400 font-black mb-6 tracking-[0.3em] uppercase">
            <Link href="/" className="hover:text-white">Home</Link> 
            <span className="mx-3 text-gray-700">/</span> 
            <Link href="/games" className="hover:text-white">Game Analysis</Link> 
            <span className="mx-3 text-gray-700">/</span> 
            <span className="text-gray-500">{game.title}</span>
          </nav>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white uppercase italic">{game.title}</h1>
          <div className="flex justify-center items-center gap-6">
            <span className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">{game.provider}</span>
            <div className="h-px w-12 bg-gray-700"></div>
            <span className="text-sm font-bold text-gray-400">RTP: {game.rtp}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        {/* 外部リンク：アフィリエイトボタン */}
        <div className="mb-16">
          <a 
            href={game.affiliateUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative block w-full text-center py-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 text-[#0f172a] text-2xl font-black rounded-3xl shadow-[0_20px_50px_rgba(234,179,8,0.4)] hover:scale-[1.01] transition-all duration-300 overflow-hidden"
          >
            <div className="relative z-10">ゴールデンパンダで入金不要をもらってプレイ</div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* メインカラム */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-2 h-8 bg-blue-600 mr-4 rounded-full"></span>
                ゲーム詳細レビュー
              </h2>
              <p className="leading-loose text-gray-300 text-lg mb-8">{game.description}</p>
              <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2rem]">
                <h3 className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-sm">Key Highlight</h3>
                <p className="leading-relaxed text-gray-200 italic text-xl">「{game.features}」</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-2 h-8 bg-blue-600 mr-4 rounded-full"></span>
                配当ルールと遊び方
              </h2>
              <div className="bg-gray-900/40 p-10 rounded-[2rem] border border-gray-800 text-gray-300 leading-loose whitespace-pre-wrap">
                {game.rules}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-2 h-8 bg-green-500 mr-4 rounded-full"></span>
                プロが教える攻略のコツ
              </h2>
              <div className="bg-green-500/5 border border-green-500/20 p-10 rounded-[2rem] text-gray-300 whitespace-pre-wrap leading-loose shadow-inner">
                {game.strategy}
              </div>
            </section>

            {/* Pros/Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-3xl">
                <h3 className="font-bold text-blue-400 mb-6 flex items-center">メリット</h3>
                <ul className="space-y-4 text-sm">
                  {game.pros.map((p: string, i: number) => <li key={i} className="flex items-start">✅ <span className="ml-3">{p}</span></li>)}
                </ul>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
                <h3 className="font-bold text-red-400 mb-6 flex items-center">デメリット</h3>
                <ul className="space-y-4 text-sm">
                  {game.cons.map((c: string, i: number) => <li key={i} className="flex items-start">⚠️ <span className="ml-3">{c}</span></li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* サイドバー（スペック表） */}
          <aside className="space-y-8">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] sticky top-24">
              <h3 className="text-center font-black text-xl mb-8 tracking-widest">TECHNICAL</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-gray-500 text-xs uppercase">Provider</span>
                  <span className="font-bold text-blue-400">{game.provider}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-gray-500 text-xs uppercase">Fun Rating</span>
                  <Star count={game.ratingFun} />
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-gray-500 text-xs uppercase">Explosive</span>
                  <Star count={game.ratingExplosive} />
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-gray-500 text-xs uppercase">RTP</span>
                  <span className="font-mono text-white">{game.rtp}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-800">
                  <span className="text-gray-500 text-xs uppercase">Volatility</span>
                  <span className="text-xs text-right">{game.volatility}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500 text-xs uppercase">Buy FS</span>
                  <span className="text-xs">{game.canBuyFS ? "✅ ENABLED" : "❌ DISABLED"}</span>
                </div>
              </div>

              {/* 内部リンク：一覧へ戻る */}
              <div className="mt-12">
                <Link 
                  href="/games" 
                  className="block w-full text-center py-4 rounded-xl bg-gray-800 text-xs font-bold hover:bg-gray-700 transition"
                >
                  ← ALL GAMES
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({ slug: game.slug }));
}