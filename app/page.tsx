import React from "react";
import { Metadata } from "next";
import Hero from "@/components/hero";
import Features from "@/components/features";
import CasinoDetails from "@/components/casino-details";
import PopularGames from "@/components/popular-games";
import CTA from "@/components/cta";
import { getAllArticles } from "@/lib/getAllArticles";

// ブラウザのタブ名と説明（SEO用）
export const metadata: Metadata = {
  title: "カジノ比較ならCalcasi！",
  description: "人気オンラインカジノのランキング・ゲーム紹介・初心者ガイドを提供するカジノ比較サイトです。",
};

export default async function LangHome() {
  // 既存の記事取得ロジック（そのまま維持）
  const articles = await getAllArticles();

  // Googleにサイト名を正しく伝えるための構造化データ（そのまま維持）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "カジノ比較ならCalcasi！",
    "url": "https://calcasi-lp.vercel.app/",
    "alternateName": ["Calcasi", "カルカジ"],
  };

  return (
    <main>
      {/* 構造化データを注入 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ヒーローセクション */}
      <Hero />
      
      {/* サイトの特徴 */}
      <Features />
      
      {/* カジノの詳細（ランキング等） */}
      <CasinoDetails />
      
      {/* 🔽 今回修正した「人気のゲームを紹介！」セクション 
          components/popular-games.tsx で詳細ページへのリンクが自動生成されます */}
      <PopularGames />
      
      {/* 登録誘導ボタン */}
      <CTA />

      {/* 外部サイトの埋め込み（iframe） - 元の構成を100%維持 */}
      <div className="w-full mt-20 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">カルロの動画はこちら</h2>
      
          <iframe 
            src="https://calcasi-lp.vercel.app/videos" 
            width="1200"
            height="800"
            allow="fullscreen"
            className="w-full border-2 border-gray-700 rounded-xl shadow-2xl"
          />
      
          <div className="text-center mt-6">
            <a 
              href="https://calcasi-lp.vercel.app/videos" 
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              もっと見る
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}