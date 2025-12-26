import React from "react";
import { Metadata } from "next";
import Hero from "@/components/hero";
import Features from "@/components/features";
import CasinoDetails from "@/components/casino-details";
import PopularGames from "@/components/popular-games";
import CTA from "@/components/cta";
import { getAllArticles } from "@/lib/getAllArticles";
import Link from "next/link"; // 追加

export const metadata: Metadata = {
  title: "カジノ比較ならCalcasi！",
  description: "人気オンラインカジノのランキング・ゲーム紹介・初心者ガイドを提供するカジノ比較サイトです。",
};

export default async function LangHome() {
  const articles = await getAllArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "カジノ比較ならCalcasi！",
    "url": "https://calcasi-lp.vercel.app/",
    "alternateName": ["Calcasi", "カルカジ"],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <Features />
      <CasinoDetails />

      {/* 🔽 人気のゲームセクション（リンクを追加） */}
      <section className="bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <PopularGames />
          <div className="text-center mt-10">
            <Link href="/games" className="inline-block px-10 py-4 bg-transparent border-2 border-blue-600 text-blue-400 font-bold rounded-full hover:bg-blue-600 hover:text-white transition duration-300">
              すべてのゲーム解説を見る
            </Link>
          </div>
        </div>
      </section>

      <CTA />

      <div className="w-full mt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">カルロの動画はこちら</h2>
          <iframe src="https://calcasi-lp.vercel.app/videos" 
            width="1200"
            height="800"
            allow="fullscreen"
            className="w-full border-2 border-gray-700 rounded-xl"
          />
          <div className="text-center mt-6">
            <a href="https://calcasi-lp.vercel.app/videos" className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
              もっと見る
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}