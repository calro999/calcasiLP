// /app/en/casino-ranking/page.tsx
import { getAllArticles } from "@/lib/getAllArticles";

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

export default async function CasinoRankingPage() {
  const allArticles: Article[] = await getAllArticles("en");
  const rankings = allArticles.filter((article: Article) => article.category === "casino-ranking");

  return (
    <main className="pt-20 pb-20 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Casino Rankings</h1>
        {rankings.length > 0 ? (
          <ul className="space-y-4">
            {rankings.map((article) => (
              <li key={article.id} className="p-4 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-400 text-sm">{article.excerpt}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No rankings available.</p>
        )}
      </div>
    </main>
  );
}
