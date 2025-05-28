"use client";
import { useEffect, useRef, useState } from "react";
import { rollDice } from "@/lib/roll";
import { useGameStore } from "@/lib/store";
import { Line } from "react-chartjs-2";
import coinSound from "@/assets/roll.mp3";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function StakeDiceFull() {
  const {
    balance,
    updateBalance,
    clientSeed,
    setClientSeed,
    nonce,
    incrementNonce,
    serverSeed,
    betAmount,
    updateBetAmount,
    history,
    addHistory,
  } = useGameStore();

  const [target, setTarget] = useState(50);
  const [isUnder, setIsUnder] = useState(true);
  const [result, setResult] = useState<number | null>(null);
  const [win, setWin] = useState<boolean | null>(null);
  const [payout, setPayout] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [instant, setInstant] = useState(false);
  const [rolling, setRolling] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const winChance = isUnder ? target : 100 - target;
  const multiplier = +(100 / winChance).toFixed(4);

  const totalProfit = history.reduce((sum, h) => sum + h.payout - h.betAmount, 0);

  const chartData = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "利益",
        data: history.reduce<number[]>((acc, h, i) => {
          const profit = h.payout - h.betAmount;
          acc.push((acc[i - 1] || 0) + profit);
          return acc;
        }, []),
        borderColor: "#00FF66",
        backgroundColor: "transparent",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: "#aaa" } },
      y: { ticks: { color: "#aaa" } },
    },
  };

  const play = async () => {
    if (rolling) return;
    setRolling(true);
    if (!instant) audioRef.current?.play();

    const rollResult = await rollDice({ clientSeed, serverSeed, nonce });
    const winFlag = isUnder ? rollResult < target : rollResult > target;
    const payoutAmount = winFlag ? +(betAmount * multiplier).toFixed(2) : 0;
    const newBalance = balance + payoutAmount - betAmount;

    updateBalance(newBalance);
    setResult(rollResult);
    setWin(winFlag);
    setPayout(payoutAmount);
    addHistory({ result: rollResult, win: winFlag, payout: payoutAmount, betAmount, nonce });
    incrementNonce();
    setTimeout(() => setRolling(false), instant ? 50 : 500);
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(play, instant ? 100 : 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, result]);

  return (
    <div className="w-full bg-black text-white py-10 px-4">
      <audio ref={audioRef} src={coinSound} preload="auto" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 統計・グラフ */}
        <div className="bg-[#1c2833] p-5 rounded-md space-y-3">
          <h2 className="text-lg font-bold">📊 ライブ統計</h2>
          <p>利益: ${totalProfit.toFixed(2)}</p>
          <p>勝ち: {history.filter(h => h.win).length}</p>
          <p>負け: {history.filter(h => !h.win).length}</p>
          <p>ベット: ${history.reduce((a, h) => a + h.betAmount, 0).toFixed(2)}</p>
          <Line data={chartData} options={chartOptions} height={150} />
        </div>

        {/* 中央：ベット */}
        <div className="md:col-span-2 bg-[#263747] p-6 rounded-md space-y-5">
          <h2 className="text-xl font-bold">🎲 ダイスベット</h2>

          <input
            type="number"
            value={betAmount}
            onChange={e => updateBetAmount(+e.target.value)}
            className="w-full bg-black text-white p-2 border border-gray-600 rounded"
            placeholder="ベット額"
          />

          <div>
            <input
              type="range"
              min={1}
              max={99}
              step={0.01}
              value={target}
              onChange={(e) => setTarget(+e.target.value)}
              className="w-full"
            />
            <p className="text-sm mt-1 text-gray-300">
              🎯 {target.toFixed(2)} ／ 勝率 {winChance.toFixed(2)}% ／ 倍率 x{multiplier}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsUnder(!isUnder)}
              className="flex-1 bg-blue-500 p-2 rounded-md"
            >
              ロール {isUnder ? "アンダー" : "オーバー"}
            </button>
            <button
              onClick={play}
              className="flex-1 bg-green-500 p-2 rounded-md"
            >
              ROLL
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="flex-1 bg-purple-600 p-2 rounded-md"
            >
              {autoPlay ? "自動停止" : "自動ベット"}
            </button>
            <button
              onClick={() => setInstant(!instant)}
              className="flex-1 bg-gray-600 p-2 rounded-md"
            >
              高速: {instant ? "ON" : "OFF"}
            </button>
          </div>

          {/* 結果バー */}
          <div className="relative w-full h-4 mt-4 bg-gray-700 rounded">
            <div className="absolute h-4 bg-green-500" style={{ width: `${target}%` }} />
            {result !== null && (
              <div
                className={`absolute h-4 w-[2px] ${win ? "bg-blue-300" : "bg-red-500"}`}
                style={{ left: `${result}%` }}
              />
            )}
          </div>

          {result !== null && (
            <p className="text-sm mt-1 text-gray-300">
              出目: {result.toFixed(2)} ／ {win ? "🎉 勝利" : "😢 敗北"} ／ 配当: ${payout.toFixed(2)}
            </p>
          )}

          <div className="mt-4">
            <h3 className="font-semibold mb-2">📜 ベット履歴</h3>
            <button
              onClick={() => location.reload()}
              className="text-xs bg-red-500 px-2 py-1 rounded mb-2"
            >
              履歴リセット
            </button>
            <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
              {history.slice().reverse().map((entry, i) => (
                <li key={i} className="flex justify-between text-xs">
                  <span>{entry.result.toFixed(2)}</span>
                  <span>{entry.win ? "✅" : "❌"}</span>
                  <span>${entry.payout.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
