// app/[lang]/page.tsx
import React from "react";
import { Metadata } from "next";
import Hero from "@/components/hero";
import Features from "@/components/features";
import CasinoDetails from "@/components/casino-details";
import PopularGames from "@/components/popular-games";
import CTA from "@/components/cta";
import { getAllArticles } from "@/lib/getAllArticles";
import { notFound } from "next/navigation";

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "カジノ比較ならCalcasi！",
    description: "Calcasiは、人気オンラインカジノのランキング・ゲーム紹介・初心者ガイドを提供するカジノ比較サイトです。",
    openGraph: {
      title: "カジノ比較ならCalcasi！",
      description: "人気カジノの情報を分かりやすく紹介。あなたに合ったカジノを見つけよう！",
      url: "https://calcasi-lp.vercel.app/",
      images: [
        {
          url: "https://calcasi-lp.vercel.app/ogp.png",
          width: 1200,
          height: 630,
          alt: "Calcasi カジノ比較イメージ",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL("https://calcasi-lp.vercel.app/"),
  };
}

export default async function LangHome({ params }: Props) {
  const { lang } = params;

  if (!["ja", "en"].includes(lang)) return notFound();

  const articles = await getAllArticles(lang); // ✅ 言語別記事取得

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
