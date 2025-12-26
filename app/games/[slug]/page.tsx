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

  // 星を表示する部品
  const Star = ({ count }: { count: number }) => (
    <span className="text-yellow-400">{"★".repeat(count)}{"☆".repeat(5 - count)}</span>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": "Game", "name": game.title, "author": { "@type": "Organization", "name": game.provider } },
    "reviewRating": { "@type": "Rating", "ratingValue": game.ratingFun, "bestRating": "5" },
    "author": { "@type": "Organization", "name": "Calcasi" }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="bg-gradient-to-b from-blue-900/40 to-[#0f172a] pt-32 pb-16 px-4 text-center">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-white">TOP</Link> / <Link href="/games" className="hover:text-white">ゲーム一覧</Link> / {game.title}
        </nav>
        <p className="text-blue-400 font-bold tracking-tighter mb-2">{game.provider}</p>
        <h1 className="text-4xl md:text-6xl font-black mb-6">{game.title}</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-lg font-bold mb-4 flex items-center">📊 ゲームスペック</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>面白さ</span><Star count={game.ratingFun} /></div>
              <div className="flex justify-between"><span>爆発力</span><Star count={game.ratingExplosive} /></div>
              <div className="flex justify-between border-t border-gray-700 pt-3"><span>還元率 (RTP)</span><span className="text-blue-400 font-mono">{game.rtp}</span></div>
              <div className="flex justify-between"><span>FS購入</span><span className={game.canBuyFS ? "text-green-400" : "text-red-400"}>{game.canBuyFS ? "可能" : "不可"}</span></div>
            </div>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-2xl border border-blue-500/30">
            <h2 className="text-lg font-bold mb-4 text-blue-400">✅ メリット・デメリット</h2>
            {/* 🔽 ここのエラー（pとiの型）を修正しました */}
            <ul className="text-sm space-y-2 mb-4">
              {game.pros.map((p: string, i: number) => (
                <li key={i} className="flex items-start">👍 {p}</li>
              ))}
            </ul>
            <ul className="text-sm space-y-2 text-gray-400 italic">
              {game.cons.map((c: string, i: number) => (
                <li key={i} className="flex items-start">⚠️ {c}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-600 pl-4">基本ルールと特徴</h2>
          <p className="text-gray-300 leading-loose whitespace-pre-wrap bg-gray-800/30 p-6 rounded-xl">
            {game.rules}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">よくある質問</h2>
          <div className="bg-gray-800/80 p-5 rounded-lg">
            <p className="font-bold text-blue-300 mb-1">Q. このゲームは勝てる？</p>
            <p className="text-gray-400 text-sm">A. {game.title}は{game.ratingExplosive >= 4 ? "高ボラティリティなため、短時間での爆発力が期待できますが、慎重なプレイも必要です。" : "安定感があり、長く楽しむのに向いています。"}</p>
          </div>
        </section>

        <div className="text-center mt-20">
          <Link href="/games" className="px-8 py-3 bg-gray-700 rounded-full hover:bg-gray-600 transition">
            一覧ページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({ slug: game.slug }));
}