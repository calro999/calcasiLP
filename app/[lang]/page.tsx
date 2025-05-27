import React from "react"
import { Metadata } from "next"
import Hero from "@/components/hero"
import Features from "@/components/features"
import CasinoDetails from "@/components/casino-details"
import PopularGames from "@/components/popular-games"
import CTA from "@/components/cta"
import { getAllArticles } from "@/lib/getAllArticles"

export const metadata: Metadata = {
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
}

export default async function HomePage({ params }: { params: { lang: "ja" | "en" } }) {
  const articles = await getAllArticles(params.lang)

  return (
    <main>
      <Hero />
      <Features />
      <CasinoDetails />
      <PopularGames />
      <CTA />
    </main>
  )
}
