// /app/ja/strategies/[id]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import { getStrategyById } from "@/lib/getStrategyData"

type Props = {
  params: {
    id: string
  }
}

export default function StrategyDetailPage({ params }: Props) {
  const strategy = getStrategyById(params.id)

  if (!strategy) return notFound()

  return (
    <main className="pt-20 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6">
          <div className="relative w-full h-64 mb-6">
            <Image
              src={strategy.image}
              alt={strategy.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{strategy.title}</h1>
          <p className="text-gray-300 text-lg">{strategy.description}</p>
        </div>
      </div>
    </main>
  )
}
