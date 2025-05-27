// 修正済み /app/[lang]/page.tsx
import React from "react"
import Hero from "@/components/hero"
import Features from "@/components/features"
import CasinoDetails from "@/components/casino-details"
import PopularGames from "@/components/popular-games"
import CTA from "@/components/cta"
import { getAllArticles } from "@/lib/getAllArticles"

interface Props {
  params: {
    lang: "ja" | "en"
  }
}

export default async function Home({ params }: Props) {
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
