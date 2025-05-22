import Hero from "@/components/hero"
import Features from "@/components/features"
import CasinoDetails from "@/components/casino-details"
import PopularGames from "@/components/popular-games"
import CTA from "@/components/cta"

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
