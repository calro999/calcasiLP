"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StakeDiceGame() {
  const [betAmount, setBetAmount] = useState("10")
  const [balance, setBalance] = useState(1000)
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [isTurboMode, setIsTurboMode] = useState(false)
  const [rollUnder, setRollUnder] = useState(50)
  const [recentResults, setRecentResults] = useState<number[]>([])
  const [currentRoll, setCurrentRoll] = useState(0)
  const [rollCounter, setRollCounter] = useState(0)

  const rollDice = () => {
    const roll = Math.random() * 100
    const win = roll < rollUnder
    const bet = parseFloat(betAmount)

    setCurrentRoll(roll)
    setBalance(prev => prev + (win ? bet * (100 / rollUnder - 1) : -bet))

    setRecentResults(prev => [roll, ...prev.slice(0, 11)])
    setRollCounter(prev => prev + 1)
  }

  useEffect(() => {
    if (isAutoMode) {
      const delay = isTurboMode ? 150 : 600
      const timer = setTimeout(() => {
        rollDice()
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [rollCounter, isAutoMode, isTurboMode])

  const toggleAuto = () => {
    setIsAutoMode(prev => !prev)
    setRollCounter(0)
  }

  const resetBalance = () => setBalance(1000)

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* 残高表示 */}
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <div className="text-sm text-slate-300">残高</div>
          <div className="text-2xl font-bold text-green-400">${balance.toFixed(2)}</div>
        </div>
        <Button onClick={resetBalance} className="bg-blue-600 text-white">残高リセット</Button>
      </div>

      {/* 最近の結果 */}
      <div>
        <div className="text-sm text-slate-300 mb-1">最近の結果</div>
        <div className="flex flex-wrap gap-2">
          {recentResults.map((r, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded font-mono ${
              r < rollUnder ? "bg-green-500" : "bg-red-500"
            }`}>
              {r.toFixed(2)}
            </span>
          ))}
        </div>
      </div>

      {/* コントロール */}
      <div className="space-y-4">
        <div>
          <label className="text-sm text-slate-300">ベット額</label>
          <Input
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="bg-slate-800 text-white mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">ターゲット数値 (Roll Under)</label>
          <Input
            type="number"
            value={rollUnder}
            onChange={(e) => setRollUnder(parseFloat(e.target.value))}
            className="bg-slate-800 text-white mt-1"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={rollDice} className="bg-green-600 text-white">
            1回ロール
          </Button>
          <Button onClick={toggleAuto} className="bg-yellow-600 text-black">
            {isAutoMode ? "自動停止" : "自動スタート"}
          </Button>
          <Button onClick={() => setIsTurboMode(prev => !prev)} className="bg-gray-600 text-white">
            ターボ: {isTurboMode ? "ON" : "OFF"}
          </Button>
        </div>
      </div>
    </div>
  )
}
