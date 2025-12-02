// /app/[lang]/page.tsx
import React from "react";
import { Metadata } from "next";
import Hero from "@/components/hero";
import Features from "@/components/features";
import CasinoDetails from "@/components/casino-details";
import PopularGames from "@/components/popular-games";
import CTA from "@/components/cta";
import { getAllArticles } from "@/lib/getAllArticles";

export const metadata: Metadata = {
  title: "カジノ比較ならCalcasi！",
  description: "人気オンラインカジノのランキング・ゲーム紹介・初心者ガイドを提供するカジノ比較サイトです。",
};

export default async function LangHome({
  params,
}: {
  params: { lang: "ja" | "en" };
}) {
  const articles = await getAllArticles();

  return (
    <main>
      <Hero />
      <Features />
      <CasinoDetails />
      <PopularGames />
      <CTA />

      {/* 🔽 外部サイトの埋め込み（iframe） */}
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
  )
}
