// /app/en/strategies/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";
import { getAllArticles } from "@/lib/getAllArticles";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const articles = await getAllArticles("en");
  const article = articles.find(
    (a) => a.category === "strategies" && String(a.id) === params.id
  );

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested strategy article does not exist.",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://calcasi-lp.vercel.app/en/strategies/${article.id}`,
      images: [
        {
          url: `https://calcasi-lp.vercel.app${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles("en");
  const strategies = articles.filter((a) => a.category === "strategies");
  return strategies.map((a) => ({ id: String(a.id) }));
}

export default async function StrategyDetailPage({ params }: { params: { id: string } }) {
  const articles = await getAllArticles("en");
  const strategy = articles.find(
    (a) => a.category === "strategies" && String(a.id) === params.id
  );

  if (!strategy) return notFound();

  return (
    <main className="pt-20 pb-20 bg-black text-white">
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <Link
                  href="/en/strategies"
                  className="text-blue-400 hover:underline text-sm flex items-center mb-4"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to strategy list
                </Link>
                <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-4">
                  {strategy.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {strategy.title}
                </h1>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-4">Published: {strategy.date}</span>
                  <span className="mr-4">Read time: {strategy.readTime}</span>
                  <span>Author: {strategy.author}</span>
                </div>
              </div>

              <div className="relative mb-6">
                <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                  <Image
                    src={strategy.image || "/placeholder.svg"}
                    alt={strategy.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                className="prose prose-invert max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: strategy.content }}
              />
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
}
