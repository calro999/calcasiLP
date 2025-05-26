// /app/en/strategies/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import ScrollAnimation from "@/components/animations/scroll-animation";
import Shimmer from "@/components/animations/shimmer";
import Particles from "@/components/animations/particles";
import { getAllArticles } from "@/lib/getAllArticles";

export default async function StrategiesPage() {
  const allArticles = await getAllArticles("en");
  const strategies = allArticles.filter(article => article.category === "strategies");

  return (
    <main className="pt-20 pb-20 bg-black text-white relative overflow-hidden">
      <Particles className="absolute inset-0 z-0" count={100} color="rgba(255, 215, 0, 0.2)" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation variant="fadeInDown">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Shimmer>
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  Strategy Articles
                </span>
              </Shimmer>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover practical strategies and techniques to win in casino games.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.length > 0 ? (
            strategies.map((article, index) => (
              <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                <Link href={article.slug} className="block h-full">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/30 transition-shadow duration-300 flex flex-col h-full">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-3">
                        {article.category}
                      </span>
                      <h2 className="text-xl font-bold text-white mb-3 flex-grow">
                        {article.title}
                      </h2>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-gray-500 text-xs mt-auto">
                        <Calendar size={16} className="mr-1" />
                        <span className="mr-3">{article.date}</span>
                        <Clock size={16} className="mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg">
              No strategy articles available.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
