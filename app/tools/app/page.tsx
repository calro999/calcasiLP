"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, RotateCcw, X, ChevronDown, Zap } from "lucide-react"
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
  const [winOnIncrease, setWinOnIncrease] = useState("0")
  const [lossOnIncrease, setLossOnIncrease] = useState("0")
  const [stopOnWin, setStopOnWin] = useState("0.00")
  const [stopOnLoss, setStopOnLoss] = useState("0.00")
  const [gameHistory, setGameHistory] = useState<GameResult[]>([])
  const [graphData, setGraphData] = useState([{ game: 0, profit: 0 }])
  const [lastResult, setLastResult] = useState<{ won: boolean; roll: number } | null>(null)
  const [recentResults, setRecentResults] = useState<number[]>([])
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
    setGameHistory([])
    setGraphData([{ game: 0, profit: 0 }])
    setRecentResults([])
    setLastResult(null)
    setCurrentRoll(0)
    setHasRolled(false)
    setRollCounter(0)
  }

  const resetBalance = () => {
    setBalance(1000)
  }

  const toggleRollMode = () => {
    setIsRollOver(!isRollOver)
  }

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

    const betValue = Number.parseFloat(betAmount) || 0
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
      if (won) {
        setWins((prev) => prev + 1)
      } else {
        setLosses((prev) => prev + 1)
      }

      const newProfit = profit + profitChange
      const newBalance = balance + profitChange
      setProfit(newProfit)
      setBalance(newBalance)
      setTotalBetAmount((prev) => prev + betValue)
      setLastResult({ won, roll })

      setGraphData((prev) => {
        const newData = [...prev, { game: prev.length, profit: newProfit }]
        return newData.slice(-50)
      })

      const newResult: GameResult = {
        id: Date.now(),
        profit: profitChange,
        roll: roll,
        target: isRollOver ? rollUnder[0] : rollUnder[0],
        won: won,
      }
      setGameHistory((prev) => [newResult, ...prev.slice(0, 9)])

      setRecentResults((prev) => {
        const newResults = [roll, ...prev.slice(0, 12)]
        return newResults
      })

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

  const toggleTurboMode = () => {
    setIsTurboMode(!isTurboMode)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <div>
          <div className="text-sm text-slate-300 mb-2">残高</div>
          <div className="text-xl font-bold text-green-400">${balance.toFixed(2)}</div>
        </div>
        <Button onClick={resetBalance} className="bg-blue-600 hover:bg-blue-700 text-white">残高リセット</Button>
      </div>

      <div className="p-4">
        <div className="text-sm text-slate-300 mb-2">最近の結果（サイドバー用）</div>
        <div className="flex gap-2 flex-wrap">
          {recentResults.map((roll, i) => (
            <span key={i} className={`px-2 py-1 rounded text-xs ${
              isRollOver ? (roll > rollUnder[0] ? "bg-green-500" : "bg-red-500")
                         : (roll < rollUnder[0] ? "bg-green-500" : "bg-red-500")
            }`}>{roll.toFixed(2)}</span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <Button onClick={toggleTurboMode} className="mr-2">
          ターボモード: {isTurboMode ? "ON" : "OFF"}
        </Button>
        {!isPlaying ? (
          <Button onClick={startAutoPlay}>自動スタート</Button>
        ) : (
          <Button onClick={stopAutoPlay}>停止</Button>
        )}
      </div>
    </div>
  )
}
