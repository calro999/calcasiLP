import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { ArrowLeft, Star, ExternalLink } from "lucide-react"
import { casinoData, Casino } from "@/lib/casinoData" // 型(Casino)もインポート

interface Props {
  params: { id: string };
}

// ランクに基づいて星評価を返す関数
function getRankRating(casino: Casino | undefined): number {
  if (!casino) return 4.0;
  const rank = casino.rank;
  if (rank === 1) return 5.0;
  if (rank === 2) return 4.5;
  if (rank === 3) return 4.3;
  return 4.0;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const casino = casinoData.find((c: Casino) => c.id === params.id);
  if (!casino) return { title: "カジノが見つかりません" };

  return {
    title: `${casino.name}の評判・ボーナス徹底解説【2025】`,
    description: `${casino.name}の最新ボーナス特典：${casino.bonus}`,
  };
}

export default function CasinoDetail({ params }: Props) {
  const casino = casinoData.find((c: Casino) => c.id === params.id);
  const displayRating = getRankRating(casino);

  if (!casino) {
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">カジノが見つかりません</h1>
          <Link href="/casino-ranking" className="text-amber-400 hover:underline">ランキングへ戻る</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen text-white">
      <div className="container mx-auto px-4">
        <Link href="/casino-ranking" className="text-amber-400 hover:underline flex items-center mb-8 w-fit">
          <ArrowLeft size={18} className="mr-2" />ランキングに戻る
        </Link>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center shadow-2xl border border-gray-800">
              <Image src={casino.logo} alt={casino.name} width={300} height={150} className="object-contain" />
            </div>
            <div className="mt-8 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">{casino.name}</h1>
              <div className="flex items-center justify-center md:justify-start">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="relative">
                      <Star size={24} className="text-gray-700" fill="currentColor" />
                      {s <= Math.floor(displayRating) && <Star size={24} className="absolute top-0 left-0 text-amber-400" fill="currentColor" />}
                      {s === Math.ceil(displayRating) && displayRating % 1 !== 0 && (
                        <div className="absolute top-0 left-0 overflow-hidden text-amber-400" style={{ width: "40%" }}>
                          <Star size={24} fill="currentColor" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <span className="ml-4 text-2xl font-bold text-amber-400">{displayRating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 border-l-4 border-amber-500 pl-4">カジノ詳細</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{casino.description}</p>
            <div className="bg-gradient-to-r from-amber-500/20 to-transparent border border-amber-500/30 p-8 rounded-2xl mb-10">
              <div className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Exclusive Offer</div>
              <div className="text-2xl font-black">🎁 {casino.bonus}</div>
            </div>
            <Link href={casino.officialLink} target="_blank" className="inline-flex items-center bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-black px-12 py-5 rounded-full hover:scale-105 transition-transform shadow-lg">
              公式サイトでボーナスを受け取る <ExternalLink size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}