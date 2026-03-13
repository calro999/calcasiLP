'use client';

import Link from "next/link";
import Image from "next/image";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { Casino } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, ExternalLink, Crown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CasinoRankingPage({ params }: { params: { lang?: "ja" | "en" } }) {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lang = params?.lang || "ja";

  useEffect(() => {
    async function loadCasinos() {
      setIsLoading(true);
      try {
        const data = await getAllCasinos(lang);
        setCasinos(data);
      } catch (error) {
        console.error("Failed to load casinos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCasinos();
  }, [lang]);

  if (isLoading) return <div className="min-h-screen bg-black" />;

  return (
    <main className="pt-20 pb-24 bg-black min-h-screen text-gray-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-10 border-l-4 border-amber-500 pl-4">
          Top Online Casino Rankings for Canadians 2026
        </h1>

        {/* ===== ランキング ===== */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {casinos.map((casino, index) => {
            const rank = index + 1;
            const rating = rank === 1 ? 5.0 : rank === 2 ? 4.5 : rank === 3 ? 4.3 : 4.0;

            return (
              <motion.div key={casino.id} variants={itemVariants}>
                <Link
                  href={`/casino-detail/${casino.id}`}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition flex items-center p-6 space-x-6 border border-gray-700 hover:border-amber-500/50"
                >
                  <div className="w-24 text-center text-white">
                    {rank === 1 && <Crown size={36} className="mx-auto text-yellow-400 fill-yellow-400 mb-1" />}
                    {(rank === 2 || rank === 3) && <Trophy size={36} className="mx-auto text-amber-500 fill-amber-500 mb-1" />}
                    <div className="text-3xl font-black">Rank {rank}</div>
                  </div>

                  <div className="relative w-48 h-28 rounded-lg overflow-hidden border border-gray-600">
                    <Image src={casino.banner} alt={casino.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{casino.name}</h2>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">{casino.description}</p>
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                      <Star size={14} /> {rating.toFixed(1)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ===== SEO Content ===== */}
        <section className="mt-24 bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-2xl p-10 shadow-xl text-gray-300">
          <h2 className="text-3xl font-bold text-white mb-6">
            Complete Guide to Choosing the Best Online Casinos in Canada
          </h2>

          <p className="mb-6 leading-relaxed">
            On this page, we don't just show rankings; we provide the 
            <strong> criteria for choosing an online casino safely and rationally</strong> 
            in the Canadian market. Especially in 2026, as the market expands, it's vital to have the right knowledge to avoid risks.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            Key Factors for Canadian Beginners
          </h3>
          <p className="leading-relaxed">
            If you're new to online gambling, prioritize things like Interac support, license validity (like Kahnawake, MGA, or iGaming Ontario), and withdrawal history. For a more detailed walkthrough, check our guide below.
          </p>

          <div className="mt-4">
            <Link href="https://calcasi-lp.vercel.app/beginners-guide" className="text-amber-400 underline hover:text-amber-300 transition-colors">
              ▶ View Online Casino Beginner Guide
            </Link>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            Why Crypto Casinos are Surging in 2026
          </h3>
          <p className="leading-relaxed">
            Casinos that support Bitcoin, USDT, and Ethereum offer near-instant withdrawals and lower fees. This is becoming a preferred method for tech-savvy Canadians who value privacy and speed.
          </p>

          <div className="mt-4">
            <Link href="https://calcasi-lp.vercel.app/latest-news" className="text-amber-400 underline hover:text-amber-300 transition-colors">
              ▶ Latest Casino News & Updates
            </Link>
          </div>



          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">
            Increase Your Odds: Strategies & Popular Games
          </h3>
          <p className="leading-relaxed">
            Winning at a casino isn't just about luck; it's about choosing the right games and managing your bankroll effectively.
          </p>

          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              <Link href="https://calcasi-lp.vercel.app/strategies" className="text-amber-400 underline hover:text-amber-300 transition-colors">
                ▶ Online Casino Strategies List
              </Link>
            </li>
            <li>
              <Link href="https://calcasi-lp.vercel.app/games" className="text-amber-400 underline hover:text-amber-300 transition-colors">
                ▶ Featured Online Casino Games
              </Link>
            </li>
          </ul>
        </section>

        {/* ===== FAQ Schema ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is it safe for Canadians to play at online casinos?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, as long as the casino holds a valid international license (MGA, Kahnawake, Curacao) or is provincially regulated, it is safe for Canadian players."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What should I look for in a 2026 casino?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Fast withdrawal speeds, Interac/Crypto support, and 24/7 customer service are key factors for a top-tier experience."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can beginners actually win?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, by utilizing welcome bonuses and playing high-RTP slots, beginners can increase their chances of winning."
                  }
                }
              ]
            })
          }}
        />

        {/* ===== ホームへ戻る ===== */}
        <div className="mt-20 text-center">
          <Link
            href="https://calcasi-lp.vercel.app/"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold px-10 py-4 rounded-full transition shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
