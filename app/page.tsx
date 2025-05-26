import { Metadata } from "next";
import Hero from "@/components/hero";
import Features from "@/components/features";
import CasinoDetails from "@/components/casino-details";
import PopularGames from "@/components/popular-games";
import CTA from "@/components/cta";
import { getAllArticles } from "@/lib/getAllArticles";
import Link from "next/link";

// ① SEO 情報
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
};

// ② サーバーコンポーネントにして記事を取得
export default async function Home() {
  const articles = await getAllArticles();
  const latestArticles = articles.slice(0, 5); // 最新5件だけ表示

  return (
    <main>
      <Hero />
      <Features />
      <CasinoDetails />
      <PopularGames />

      <section className="px-4 py-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">最新記事</h2>
        <ul className="space-y-4">
          {latestArticles.map((article) => (
            <li key={article.id} className="border-b pb-4">
              <Link href={article.slug}>
                <div className="text-lg font-semibold text-blue-500 hover:underline">
                  {article.title}
                </div>
                <p className="text-sm text-gray-500">
                  {article.date}・{article.readTime}・{article.category}
                </p>
                <p className="text-sm text-gray-700 mt-1">{article.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTA />
    </main>
  );
}
