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
  const articles = await getAllArticles(params.lang);
  return (
    <main>
      <Hero />
      <Features />
      <CasinoDetails />
      <PopularGames />
      <CTA />
    </main>
  );
}
