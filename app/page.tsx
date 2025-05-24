import { Metadata } from "next"
import Hero from "@/components/hero"
import Features from "@/components/features"
import CasinoDetails from "@/components/casino-details"
import PopularGames from "@/components/popular-games"
import CTA from "@/components/cta"

// ① ここに SEO 情報を追加します
export const metadata: Metadata = {
  title: "カジノ比較ならCalcasi！",
  description: "Calcasiは、人気オンラインカジノのランキング・ゲーム紹介・初心者ガイドを提供するカジノ比較サイトです。",
  openGraph: {
    title: "カジノ比較ならCalcasi！",
    description: "人気カジノの情報を分かりやすく紹介。あなたに合ったカジノを見つけよう！",
    url: "https://calcasi-lp.vercel.app/",
    images: [
      {
        url: "https://calcasi-lp.vercel.app/ogp.png", // ← 公開したOGP画像のURLに置き換えてね
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

export default function Home() {
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
