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

      <div className="w-full mt-20 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Watch Our Latest Videos</h2>
          <iframe 
            src="https://calcasi-lp.vercel.app/videos" 
            width="1200"
            height="800"
            allow="fullscreen"
            className="w-full border-2 border-gray-700 rounded-xl shadow-2xl"
          />
          <div className="text-center mt-6">
            <a 
              href="https://calcasi-lp.vercel.app/videos" 
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Watch More
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}