import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { ArrowLeft, Star, ExternalLink } from "lucide-react"
import { casinoData } from "@/lib/casinoData"

interface Props {
  params: { id: string };
}

// ランキングと同じ評価計算ロジック
function getRankRating(id: string) {
  const index = casinoData.findIndex((c) => c.id === id);
  if (index === -1) return 4.0;
  const rank = index + 1;
  
  let ratingValue = 4.0; // 変数名を明確化
  if (rank === 1) ratingValue = 5.0;
  else if (rank === 2) ratingValue = 4.5;
  else if (rank === 3) ratingValue = 4.3;
  
  return ratingValue;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const casino = casinoData.find((c) => c.id === params.id);
  if (!casino) return { title: "カジノが見つかりません" };

  return {
    title: `${casino.name}の評判・ボーナス・登録方法を徹底解説【2025最新】`,
    description: `${casino.name}の最新ボーナス情報。今なら限定特典：${casino.bonus}`,
    openGraph: {
      images: [{ url: casino.logo }],
    }
  };
}

export default function CasinoDetail({ params }: Props) {
  const casino = casinoData.find((c) => c.id === params.id)
  const displayRating = getRankRating(params.id);

  if (!casino) {
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">カジノが見つかりません</h1>
          <Link href="/casino-ranking" className="text-amber-400 hover:underline">ランキングに戻る</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen text-white">
      <div className="container mx-auto px-4">
        <Link href="/casino-ranking" className="text-amber-400 hover:underline flex items-center mb-6 w-fit">
          <ArrowLeft size={18} className="mr-2" />
          カジノランキングに戻る
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <div className="bg-white rounded-xl overflow-hidden p-8 flex items-center justify-center shadow-lg border border-gray-700">
              <Image src={casino.logo} alt={casino.name} width={300} height={150} className="object-contain w-full h-auto" />
            </div>
            
            <div className="mt-6">
              <h1 className="text-3xl font-bold">{casino.name}</h1>
              <div className="flex items-center mt-3">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((starIdx) => {
                    const isFull = starIdx <= Math.floor(displayRating);
                    const isPartial = !isFull && starIdx === Math.ceil(displayRating);
                    const decimal = displayRating % 1;
                    return (
                      <div key={starIdx} className="relative">
                        <Star size={24} className="text-gray-700" fill="currentColor" />
                        {isFull && <Star size={24} className="absolute top-0 left-0 text-amber-400" fill="currentColor" />}
                        {isPartial && (
                          <div className="absolute top-0 left-0 overflow-hidden text-amber-400" style={{ width: `${decimal * 100}%` }}>
                            <Star size={24} fill="currentColor" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <span className="ml-3 font-bold text-xl text-amber-400">{displayRating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 border-l-4 border-amber-500 pl-4">カジノ概要</h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">{casino.description}</p>
            
            <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-500/30 p-6 rounded-2xl mb-10 shadow-xl">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Exclusive Bonus</span>
              <div className="text-2xl font-black text-white mt-1">🎁 {casino.bonus}</div>
            </div>

            <Link href={casino.officialLink} target="_blank" className="inline-flex items-center bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-black px-12 py-5 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.4)]">
              ボーナスを受け取って公式サイトへ
              <ExternalLink size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}