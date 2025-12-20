import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { ArrowLeft, Star, ExternalLink } from "lucide-react"
import { casinoData, Casino } from "@/lib/casinoData"

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

interface Props {
  params: { id: string };
}

// ヘルパー関数：IDまたはSlugでカジノを特定する
const findCasino = (idOrSlug: string) => {
  return casinoData.find((c: Casino) => 
    c.id === idOrSlug || (c as any).slug === idOrSlug
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const casino = findCasino(params.id);
  if (!casino) return { title: "カジノが見つかりません" };

  return {
    title: `${casino.name}の評判・ボーナス徹底解説【2025最新】`,
    description: `${casino.name}の最新ボーナス情報：${casino.bonus}`,
    openGraph: {
      images: [{ url: casino.banner || casino.logo }],
    }
  };
}

export default function CasinoDetail({ params }: Props) {
  const casino = findCasino(params.id);

  if (!casino) {
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">カジノが見つかりません</h1>
          <Link href="/casino-ranking" className="text-amber-400 hover:underline flex items-center justify-center">
            <ArrowLeft size={16} className="mr-2" />
            ランキングへ戻る
          </Link>
        </div>
      </main>
    );
  }

  const currentRating = casino.rating;

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen text-white">
      <div className="container mx-auto px-4">
        <Link href="/casino-ranking" className="text-amber-400 hover:underline flex items-center mb-8 w-fit group">
          <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
          ランキングに戻る
        </Link>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center shadow-2xl border border-gray-800">
              <Image 
                src={casino.logo} 
                alt={`${casino.name}のロゴ`} 
                width={300} 
                height={150} 
                className="object-contain w-full h-auto"
                priority
              />
            </div>
            
            <div className="mt-8 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">{casino.name}</h1>
              <div className="flex items-center justify-center md:justify-start">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const isFull = num <= Math.floor(currentRating);
                    const isPartial = !isFull && num === Math.ceil(currentRating);
                    const partialWidth = (currentRating % 1) * 100;

                    return (
                      <div key={num} className="relative">
                        <Star size={28} className="text-gray-700" fill="currentColor" />
                        {isFull && (
                          <Star size={28} className="absolute top-0 left-0 text-amber-400" fill="currentColor" />
                        )}
                        {isPartial && (
                          <div 
                            className="absolute top-0 left-0 overflow-hidden text-amber-400" 
                            style={{ width: `${partialWidth}%` }}
                          >
                            <Star size={28} fill="currentColor" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <span className="ml-4 text-3xl font-bold text-amber-400">
                  {currentRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 border-l-4 border-amber-500 pl-4">カジノ概要</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {casino.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {casino.features.map((feature, i) => (
                <span key={i} className="bg-gray-800 text-amber-200 px-3 py-1 rounded-full text-sm border border-gray-700">
                  #{feature}
                </span>
              ))}
            </div>

            <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/5 border border-amber-500/30 p-8 rounded-2xl mb-10 shadow-xl">
              <div className="text-2xl md:text-3xl font-black text-white relative z-10">
                🎁 {casino.bonus}
              </div>
            </div>

            <Link 
              href={casino.officialLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-black px-12 py-5 rounded-full hover:scale-105 transition-all shadow-[0_10px_20px_rgba(251,191,36,0.3)] w-full md:w-auto text-center"
            >
              公式サイトでボーナスを受け取る
              <ExternalLink size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}