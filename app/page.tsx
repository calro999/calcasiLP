import React from "react";
import { Metadata } from "next";
import Hero from "@/components/hero";
import Features from "@/components/features";
import CasinoDetails from "@/components/casino-details";
import PopularGames from "@/components/popular-games";
import CTA from "@/components/cta";
import { ProviderLogos } from "@/components/ProviderLogos";
import { getAllArticles } from "@/lib/getAllArticles";

export const metadata: Metadata = {
  title: "Calcasi | The Best Online Casino Comparison Site in Canada",
  description: "Find the best online casinos in Canada. We offer rankings, game reviews, and beginner guides for Canadian players.",
};

export default async function LangHome() {
  const articles = await getAllArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Calcasi | Best Casino Comparison for Canadians",
    "url": "https://calcasi-lp.vercel.app/",
    "alternateName": ["Calcasi"],
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

      {/* 関数を渡さず、表示専用として呼び出す */}
      <ProviderLogos />
      
      <PopularGames />
      <CTA />


    </main>
  );
}