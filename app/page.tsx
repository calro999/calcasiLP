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
          <h2 className="text-2xl font-bold text-white mb-4">外部コンテンツ</h2>
          <iframe
            src="https://yt-calro.netlify.app/"
            width="120%"
            height="800"
            allow="fullscreen"
            className="w-full border-2 border-gray-700 rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
