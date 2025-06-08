// Path: /Users/calro/Downloads/calcasiLP/calcasiLP/app/tools/app/tools/page.tsx

"use client"

import { useState, useEffect } from "react"
// パスは現在の構造のままで維持します
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Slider } from "./components/ui/slider"
import { Card, CardContent } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { TrendingUp, RotateCcw, X, ChevronDown, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts"
import Head from "next/head";

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

      // グラフデータを更新
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

      setTimeout(() => {
        setRecentResults((prev) => {
          const newResults = [roll, ...prev.slice(0, 12)]
          return newResults
        })
      }, 100)
    }, delay)
  }

  const startAutoPlay = () => {
    setIsPlaying(true)
    setIsAutoMode(true)
  }

  const stopAutoPlay = () => {
    setIsPlaying(false)
    setIsAutoMode(false)
  }

  const toggleTurboMode = () => {
    setIsTurboMode(!isTurboMode)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && isAutoMode && !isRolling) {
      const intervalTime = isTurboMode ? 120 : 600
      interval = setInterval(() => {
        rollDice()
      }, intervalTime)
    }
    return () => clearInterval(interval)
  }, [isPlaying, isAutoMode, isRolling, rollUnder, betAmount, isTurboMode, balance])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div className="w-full flex justify-center overflow-x-hidden">
        <div className="min-h-screen bg-slate-900 text-white flex flex-row w-full max-w-[1600px] scale-[0.8] md:scale-100 origin-top-left">

        {/* Left Sidebar */}
        <div className="w-[288px] min-w-[288px] bg-slate-800 border-r border-slate-700 flex-col flex-shrink-0">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center gap-2">

            <TrendingUp className="w-4 h-4" />
            <span className="font-medium text-white">ライブ統計</span>
          </div>
          <X className="w-4 h-4 cursor-pointer hover:text-slate-300" />
        </div>

        <div className="p-4 space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white">全て</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <RotateCcw className="w-4 h-4 cursor-pointer hover:text-slate-300" onClick={resetStats} />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-300">利益</span>
              <span className={`text-sm font-medium ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                ${profit.toFixed(2)} 💎
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-300">ベット額</span>
              <span className="text-sm font-medium text-yellow-400">${totalBetAmount.toFixed(2)} 💎</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-sm text-slate-300">勝ち</div>
                <div className="text-lg font-bold text-green-400">{wins}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-300">負け回数</div>
                <div className="text-lg font-bold text-red-400">{losses}</div>
              </div>
            </div>
          </div>

          {/* Chart - 修正されたグラフ */}
          <div className="bg-slate-700 rounded p-3 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData}>
                <XAxis hide />
                <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
                <ReferenceLine y={0} stroke="#64748b" strokeDasharray="2 2" strokeWidth={2} />
                <Line
                  type="linear"
                  dataKey="profit"
                  stroke={profit >= 0 ? "#10b981" : "#ef4444"}
                  strokeWidth={2}
                  dot={false}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">最近の結果</div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {gameHistory.slice(0, 5).map((result) => (
                <div
                  key={result.id}
                  className="flex justify-between items-center text-xs bg-slate-700 rounded px-2 py-1"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${result.won ? "bg-green-400" : "bg-red-400"}`}></div>
                    <span className="text-white">{result.roll.toFixed(2)}</span>
                  </div>
                  <span className={`font-medium ${result.won ? "text-green-400" : "text-red-400"}`}>
                    {result.won ? "+" : ""}
                    {result.profit.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banner Area */}
        <div className="p-4 border-t border-slate-700">
          <a href="https://k8.io/?invite=calron"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded p-3 text-center">
              <div className="text-sm font-medium text-white">🎯 k8で</div>
              <div className="text-xs text-slate-200 mt-1">実際にプレイ！</div>
            </div>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-900 flex flex-col">
        {/* Top Bar with Balance */}
        {/* モバイルで要素が折り返し、バランス表示が適切になるように調整 */}
        <div className="p-4 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex-1 w-full sm:w-auto mb-4 sm:mb-0"> {/* モバイルで幅いっぱい、PCで自動幅。下マージン調整 */}
            <div className="text-sm text-slate-300 mb-2">最近の結果</div>
            <div className="flex flex-wrap gap-2">
              {recentResults.length > 0 ? (
                recentResults.map((result, index) => {
                  const won = isRollOver ? result > rollUnder[0] : result < rollUnder[0]
                  return (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        won ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {result.toFixed(2)}
                    </div>
                  )
                })
              ) : (
                <div className="text-slate-400 text-xs">ゲームを開始すると結果が表示されます</div>
              )}
            </div>
          </div>

          {/* Balance Display - モバイルでは幅いっぱいに、PCでは固定幅 */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 w-full sm:w-48 flex-shrink-0">
            <div className="flex items-center justify-between"> {/* モバイルで両端寄せ */}
              <div>
                <div className="text-sm text-slate-300">残高</div>
                <div className={`text-xl font-bold ${balance >= 0 ? "text-green-400" : "text-red-400"}`}>
                  ${balance.toFixed(2)}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 border-slate-500 hover:bg-slate-600 text-white"
                onClick={resetBalance}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Core Game UI - モバイル時に全体を縮小・中央寄せするラッパー */}
        {/* w-full max-w-6xl mx-auto でモバイルでも中央寄せに */}
        <div className="p-4 sm:p-6 flex-1 flex justify-center items-start"> {/* パディングをモバイルで調整 */}
        <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

            {/* Control Panel */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-0">
                <Tabs defaultValue="manual" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-700 rounded-none">
                    <TabsTrigger value="manual" className="data-[state=active]:bg-slate-600 rounded-none text-white text-sm sm:text-base"> {/* テキストサイズ調整 */}
                      手動
                    </TabsTrigger>
                    <TabsTrigger value="auto" className="data-[state=active]:bg-slate-600 rounded-none text-white text-sm sm:text-base"> {/* テキストサイズ調整 */}
                      自動
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-4 sm:p-4"> {/* パディング調整 */}
                    {/* 自動モードの高さに合わせて固定 - モバイルでは高さを固定しない */}
                    <div className="h-auto sm:h-96"> {/* モバイルでh-autoに */}
                      <TabsContent value="manual" className="space-y-3 sm:space-y-4 mt-0"> {/* スペース調整 */}
                        <div>
                          <div className="flex justify-between items-center mb-1 sm:mb-2"> {/* マージン調整 */}
                            <label className="text-sm text-slate-300">ベット額</label>
                            <span className="text-xs text-slate-400">0.00000000 TRX</span>
                          </div>
                          <div className="relative">
                            <Input
                              value={betAmount}
                              onChange={(e) => setBetAmount(e.target.value)}
                              className="bg-slate-700 border-slate-600 pr-16 text-white h-9 sm:h-10" // 高さ調整
                              placeholder="0.00"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-400">
                                💰
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-white">
                                1/2
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-white">
                                2x
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="auto" className="mt-0 h-full">
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between items-center mb-0.5">
                              <label className="text-xs text-slate-300">ベット額</label>
                              <span className="text-xs text-slate-400">0.00000000 TRX</span>
                            </div>
                            <Input
                              value={betAmount}
                              onChange={(e) => setBetAmount(e.target.value)}
                              className="bg-slate-700 border-slate-600 text-white h-8"
                              placeholder="0.00"
                            />
                          </div>

                          <div>
                            <label className="text-xs text-slate-300 block mb-0.5">ベット数</label>
                            <div className="flex items-center gap-2">
                              <Input
                                value={betCount}
                                onChange={(e) => setBetCount(e.target.value)}
                                className="bg-slate-700 border-slate-600 flex-1 text-white h-8"
                                placeholder="0"
                              />
                              <span className="text-slate-300">∞</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs text-slate-300 block mb-0.5">勝利</label>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-xs text-slate-300">リセット</span>
                              <span className="text-xs text-slate-300">増加：</span>
                              <Input
                                value={winOnIncrease}
                                onChange={(e) => setWinOnIncrease(e.target.value)}
                                className="bg-slate-700 border-slate-600 w-16 h-7 text-white"
                              />
                              <span className="text-xs text-slate-300">%</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs text-slate-300 block mb-0.5">損失</label>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-xs text-slate-300">リセット</span>
                              <span className="text-xs text-slate-300">増加：</span>
                              <Input
                                value={lossOnIncrease}
                                onChange={(e) => setLossOnIncrease(e.target.value)}
                                className="bg-slate-700 border-slate-600 w-16 h-7 text-white"
                              />
                              <span className="text-xs text-slate-300">%</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-0.5">
                              <label className="text-xs text-slate-300">勝ち切り</label>
                              <span className="text-xs text-slate-400">0.00000000 TRX</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                value={stopOnWin}
                                onChange={(e) => setStopOnWin(e.target.value)}
                                className="bg-slate-700 border-slate-600 flex-1 text-white h-8"
                              />
                              <Button size="sm" variant="ghost" className="text-green-400 h-7 w-7 p-0">
                                💰
                              </Button>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-0.5">
                              <label className="text-xs text-slate-300">損切り</label>
                              <span className="text-xs text-slate-400">0.00000000 TRX</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                value={stopOnLoss}
                                onChange={(e) => setStopOnLoss(e.target.value)}
                                className="bg-slate-700 border-slate-600 flex-1 text-white h-8"
                              />
                              <Button size="sm" variant="ghost" className="text-green-400 h-7 w-7 p-0">
                                💰
                              </Button>
                            </div>
                          </div>

                          <div className="pt-2">
                            {!isPlaying ? (
                              <Button
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 font-medium"
                                onClick={startAutoPlay}
                                disabled={isRolling}
                              >
                                自動ベットを開始
                              </Button>
                            ) : (
                              <Button
                                className="w-full bg-red-500 hover:bg-red-600 text-white py-1.5 font-medium"
                                onClick={stopAutoPlay}
                              >
                                自動ベットを停止
                              </Button>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Game Area */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="h-96 flex flex-col justify-between">
                  {/* Roll Display */}
                  <div className="text-center h-20 flex flex-col justify-center">
                    {(hasRolled || isRolling) && (
                      <>
                        <div
                          className={`text-4xl font-bold mb-2 transition-all duration-300 text-white ${
                            isRolling ? "animate-pulse" : ""
                          }`}
                        >
                          {isRolling ? animatedRoll.toFixed(2) : currentRoll.toFixed(2)}
                        </div>
                        {!isRolling && lastResult && (
                          <div className={`text-lg font-medium ${lastResult.won ? "text-green-400" : "text-red-400"}`}>
                            {lastResult.won ? "勝利!" : "敗北"}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="space-y-4 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>

                    <div className="relative px-2">
                      <div className="absolute inset-0 h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                      <Slider
                        value={rollUnder}
                        onValueChange={setRollUnder}
                        max={95}
                        min={5}
                        step={0.01}
                        className="relative [&>span:first-child]:bg-transparent [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:w-8 [&_[role=slider]]:h-8 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg"
                      />

                      {/* アニメーション効果 */}
                      {isRolling && (
                        <div
                          className="absolute top-0 w-3 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg animate-pulse transition-all duration-100"
                          style={{ left: `calc(${(animatedRoll / 100) * 100}% - 6px)` }}
                        />
                      )}

                      {/* 結果位置のインジケーター */}
                      {hasRolled && !isRolling && (
                        <div
                          className={`absolute top-0 w-3 h-6 rounded-full shadow-lg border-2 border-white ${
                            lastResult?.won ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ left: `calc(${(currentRoll / 100) * 100}% - 6px)` }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-center h-20">
                    <div>
                      <div className="text-sm text-slate-300 mb-1">倍率</div>
                      <div className="text-xl font-bold text-white">{multiplier}</div>
                      <div className="text-xs text-slate-400">✕</div>
                    </div>
                    <div>
                      <div
                        className="text-sm text-slate-300 mb-1 cursor-pointer hover:text-white"
                        onClick={toggleRollMode}
                      >
                        {isRollOver ? "ロールオーバー" : "ロールアンダー"}
                      </div>
                      <div className="text-xl font-bold text-white">{rollUnder[0].toFixed(2)}</div>
                      <div className="text-xs text-slate-400">🔄</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-300 mb-1">勝利チャンス</div>
                      <div className="text-xl font-bold text-white">{winChance}</div>
                      <div className="text-xs text-slate-400">%</div>
                    </div>
                  </div>

                  {/* Turbo Mode and Bet Buttons */}
                  <div className="text-center mt-4 space-y-2">
                    <Button
                      onClick={toggleTurboMode}
                      variant={isTurboMode ? "default" : "outline"}
                      className={`${
                        isTurboMode
                          ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                          : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                      } font-medium`}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      ターボモード {isTurboMode ? "ON" : "OFF"}
                    </Button>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 font-medium"
                      onClick={rollDice}
                      disabled={isRolling}
                    >
                      {isRolling ? "ロール中..." : "ベット"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </div>
  </>
  )
}
