// /app/en/strategies/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/getAllArticles";
import ScrollAnimation from "@/components/ScrollAnimation";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  slug: string;
  image: string;
};

export default async function StrategiesPage() {
  const allArticles: Article[] = await getAllArticles("en");
  const strategies = allArticles.filter((article: Article) => article.category === "strategies");

  return (
    <main className="pt-20 pb-20 bg-black text-white relative overflow-hidden">
      <section className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Strategy Articles</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {strategies.map((article: Article) => (
            <ScrollAnimation key={article.id} variant="fadeInUp" delay={0}>
              <Link
                href={`/en/strategies/${article.id}`}
                className="block bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-400 text-sm mb-2">{article.excerpt}</p>
                  <p className="text-gray-500 text-xs">
                    {article.date} ・ {article.readTime} ・ {article.author}
                  </p>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </main>
  );
}
