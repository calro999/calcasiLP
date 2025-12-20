import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next" // 追加
import { ArrowLeft, Star, ExternalLink } from "lucide-react"
import { casinoData } from "@/lib/casinoData"

interface Props {
  params: { id: string };
}

// ★ 動的メタデータの生成関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const casino = casinoData.find((c) => c.id === params.id);

  if (!casino) {
    return {
      title: "カジノが見つかりません",
    };
  }

  // カジノごとの情報を動的にメタデータへ反映
  return {
    title: `${casino.name}の評判・ボーナス・登録方法を徹底解説【2025最新】`,
    description: `${casino.name}（${casino.name}）の最新ボーナス情報、入出金方法、実際にプレイした感想を詳しくレビュー。${casino.bonus ? `今なら限定特典：${casino.bonus}` : ""}`,
    openGraph: {
      title: `${casino.name} 完全レビュー｜日本向けボーナス・安全性検証`,
      description: `${casino.name}の魅力をプロが徹底解剖。当サイト限定のボーナス情報も見逃せません！`,
      url: `https://calcasi-lp.vercel.app/casino-detail/${params.id}`,
      images: [
        {
          url: casino.banner || casino.logo || "/default-og.jpg",
          width: 1200,
          height: 630,
          alt: `${casino.name}のバナー画像`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${casino.name}の徹底攻略ガイド`,
      description: `${casino.name}の評判と最新ボーナス情報を今すぐチェック。`,
      images: [casino.banner || casino.logo || "/default-og.jpg"],
    },
  };
}

// ★ ページコンポーネント本体
export default function CasinoDetail({ params }: Props) {
  const casino = casinoData.find((c) => c.id === params.id)

  if (!casino) {
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">カジノが見つかりません</h1>
          <p className="text-xl">指定されたカジノIDには情報がありません。</p>
          <Link href="/casino-ranking" className="text-amber-400 mt-6 block hover:underline">
            <ArrowLeft size={16} className="inline-block mr-1" />
            カジノランキングに戻る
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <Link href="/casino-ranking" className="text-amber-400 hover:underline flex items-center mb-6 w-fit">
          <ArrowLeft size={18} className="mr-2" />
          カジノランキングに戻る
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/3">
            {/* ロゴ表示エリア */}
            <div className="bg-white rounded-xl overflow-hidden p-8 flex items-center justify-center shadow-lg">
              <Image
                src={casino.logo}
                alt={`${casino.name}のロゴ`}
                width={300}
                height={150}
                className="object-contain w-full h-auto mx-auto"
              />
            </div>
            
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-white">{casino.name}</h1>
              {/* 星評価の表示ロジック */}
              <div className="flex items-center mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(casino.rating)
                          ? "text-amber-400 fill-amber-400"
                          : i < casino.rating
                          ? "text-amber-400 fill-amber-400 opacity-50"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white ml-3 font-bold text-lg">{casino.rating}/5.0</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 border-b border-amber-500/30 pb-2">概要</h2>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">{casino.description}</p>

            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-6 rounded-xl mb-8 shadow-inner">
              <div className="text-sm uppercase tracking-widest mb-1 opacity-70">Special Bonus</div>
              <div className="text-xl font-black">🎁 {casino.bonus}</div>
            </div>

            <Link
              href={casino.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-black px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-xl uppercase tracking-tighter"
            >
              公式サイトでボーナスを受け取る
              <ExternalLink size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}