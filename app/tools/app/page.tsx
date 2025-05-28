// app/tools/app/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts"

interface GameResult {
  id: number
  profit: number
  roll: number
  target: number
  won: boolean
}

export default function StakeDiceGame() {
  const [betAmount, setBetAmount] = useState("1.00")
  const [betCount, setBetCount] = useState("0")
  const [rollUnder, setRollUnder] = useState([50])
  const [isRollOver, setIsRollOver] = useState(false)
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRolling, setIsRolling] = useState(false)
  const [isTurboMode, setIsTurboMode] = useState(false)
  const [currentRoll, setCurrentRoll] = useState(0)
  const [animatedRoll, setAnimatedRoll] = useState(0)
  const [profit, setProfit] = useState(0)
  const [balance, setBalance] = useState(1000)
  const [totalBetAmount, setTotalBetAmount] = useState(0)
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [recentResults, setRecentResults] = useState<number[]>([])
  const [lastResult, setLastResult] = useState<{ won: boolean; roll: number } | null>(null)
  const [hasRolled, setHasRolled] = useState(false)
  const [rollCounter, setRollCounter] = useState(0)

  const targetValue = isRollOver ? 100 - rollUnder[0] : rollUnder[0]
  const multiplier = (100 / targetValue).toFixed(4)
  const winChance = targetValue.toFixed(4)

  const resetStats = () => {
    setProfit(0)
    setTotalBetAmount(0)
    setWins(0)
    setLosses(0)
    setRecentResults([])
    setLastResult(null)
    setCurrentRoll(0)
    setHasRolled(false)
    setRollCounter(0)
  }

  const resetBalance = () => setBalance(1000)
  const toggleRollMode = () => setIsRollOver(!isRollOver)

  const animateRoll = (finalRoll: number) => {
    setIsRolling(true)
    setAnimatedRoll(0)
    const duration = isTurboMode ? 80 : 400
    const steps = isTurboMode ? 6 : 30
    const stepDuration = duration / steps
    let currentStep = 0
    const animate = () => {
      if (currentStep < steps) {
        const randomRoll = Math.random() * 100
        setAnimatedRoll(randomRoll)
        currentStep++
        setTimeout(animate, stepDuration)
      } else {
        setAnimatedRoll(finalRoll)
        setCurrentRoll(finalRoll)
        setHasRolled(true)
        setIsRolling(false)
      }
    }
    animate()
  }

  const rollDice = () => {
    if (isRolling) return
    const betValue = parseFloat(betAmount)
    if (betValue > balance) {
      alert("残高が不足しています")
      return
    }

    const roll = Math.random() * 100
    const won = isRollOver ? roll > rollUnder[0] : roll < rollUnder[0]
    const profitChange = won ? betValue * (100 / targetValue - 1) : -betValue
    animateRoll(roll)

    const delay = isTurboMode ? 80 : 400
    setTimeout(() => {
      if (won) setWins((prev) => prev + 1)
      else setLosses((prev) => prev + 1)
      setProfit((prev) => prev + profitChange)
      setBalance((prev) => prev + profitChange)
      setTotalBetAmount((prev) => prev + betValue)
      setLastResult({ won, roll })
      setRecentResults((prev) => [roll, ...prev.slice(0, 11)])
      setRollCounter((prev) => prev + 1)
    }, delay)
  }

  useEffect(() => {
    if (!isPlaying || isRolling) return
    const betLimit = Number(betCount)
    if (betLimit > 0 && rollCounter >= betLimit) {
      stopAutoPlay()
      return
    }
    const interval = setTimeout(() => {
      rollDice()
    }, isTurboMode ? 120 : 600)
    return () => clearTimeout(interval)
  }, [isPlaying, isRolling, rollCounter, betCount, isTurboMode])

  const startAutoPlay = () => {
    setIsPlaying(true)
    setIsAutoMode(true)
    setRollCounter(0)
  }

  const stopAutoPlay = () => {
    setIsPlaying(false)
    setIsAutoMode(false)
  }

  const toggleTurboMode = () => setIsTurboMode(!isTurboMode)

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左側の統計パネル */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-300">残高</div>
                <div className="text-xl font-bold text-green-400">${balance.toFixed(2)}</div>
              </div>
              <Button onClick={resetBalance} size="sm" className="bg-blue-600 text-white">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <div className="text-sm text-slate-300 mb-1">最近の結果</div>
              <div className="flex flex-wrap gap-2">
                {recentResults.map((roll, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      isRollOver ? (roll > rollUnder[0] ? "bg-green-500" : "bg-red-500")
                                 : (roll < rollUnder[0] ? "bg-green-500" : "bg-red-500")
                    }`}
                  >
                    {roll.toFixed(2)}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 右側の操作パネル */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="text-sm text-slate-300">ベット額</label>
              <Input
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="mt-1 bg-slate-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">ベット数（自動）</label>
              <Input
                value={betCount}
                onChange={(e) => setBetCount(e.target.value)}
                className="mt-1 bg-slate-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">ロール条件（{isRollOver ? "Over" : "Under"}）</label>
              <Slider
                value={rollUnder}
                onValueChange={setRollUnder}
                max={95}
                min={5}
                step={0.1}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={toggleRollMode}>切り替え: {isRollOver ? "Over" : "Under"}</Button>
              <Button onClick={toggleTurboMode}>
                ターボモード: {isTurboMode ? "ON" : "OFF"}
              </Button>
            </div>

            <div className="flex gap-2">
              {!isPlaying ? (
                <Button onClick={startAutoPlay} className="bg-green-600 hover:bg-green-700 text-white">
                  自動スタート
                </Button>
              ) : (
                <Button onClick={stopAutoPlay} className="bg-red-600 hover:bg-red-700 text-white">
                  停止
                </Button>
              )}
              <Button onClick={rollDice} disabled={isRolling}>
                {isRolling ? "ロール中..." : "ベット"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
