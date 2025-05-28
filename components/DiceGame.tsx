// Stakeダイス完全再現：履歴・自動ベット・チャート付き
"use client";

import { useEffect, useState, useRef } from "react";
import { rollDice } from "@/lib/roll";
import { useGameStore } from "@/lib/store";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

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
  const [isUnder, setIsUnder] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [win, setWin] = useState<boolean | null>(null);
  const [payout, setPayout] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [instant, setInstant] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const winChance = isUnder ? target : 100 - target;
  const multiplier = +(100 / winChance).toFixed(4);

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

    setTimeout(() => setRolling(false), instant ? 100 : 600);
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => play(), instant ? 100 : 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, result]);

  const chartData = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "Profit",
        data: history.map(h => h.payout - h.betAmount),
        fill: false,
        borderColor: "#22c55e",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="grid grid-cols-3 gap-4 bg-[#0e1a24] text-white p-6 rounded-lg w-full max-w-screen-xl mx-auto">
      <audio ref={audioRef} src="/assets/roll.mp3" preload="auto" />

      {/* 統計 + チャート */}
      <div className="bg-[#14212e] p-4 rounded space-y-4 text-sm">
        <h2 className="font-bold">📊 ライブ統計</h2>
        <p>利益: ${(history.reduce((a, h) => a + h.payout - h.betAmount, 0)).toFixed(2)}</p>
        <p>勝ち: {history.filter(h => h.win).length}</p>
        <p>負け: {history.filter(h => !h.win).length}</p>
        <p>ベット: ${(history.reduce((a, h) => a + h.betAmount, 0)).toFixed(2)}</p>
        <Line data={chartData} height={120} />
      </div>

      {/* 中央のベット操作 */}
      <div className="col-span-2 bg-[#1a2b3c] p-6 rounded space-y-4">
        <h2 className="text-xl font-bold">🎯 ダイスベット</h2>

        <input
          type="number"
          value={betAmount}
          onChange={(e) => updateBetAmount(+e.target.value)}
          className="w-full bg-black text-white p-2 rounded border border-gray-500"
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
          <p className="text-sm text-gray-400 mt-1">
            🎯 {target.toFixed(2)} ／ 勝率 {winChance.toFixed(2)}% ／ 倍率 x{multiplier}
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setIsUnder(!isUnder)} className="flex-1 bg-blue-500 p-2 rounded">
            ロール {isUnder ? "アンダー" : "オーバー"}
          </button>
          <button onClick={play} className="flex-1 bg-green-500 p-2 rounded">
            ROLL
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setAutoPlay(!autoPlay)} className="flex-1 bg-purple-600 p-2 rounded">
            {autoPlay ? "自動停止" : "自動ベット"}
          </button>
          <button onClick={() => setInstant(!instant)} className="flex-1 bg-gray-600 p-2 rounded">
            高速: {instant ? "ON" : "OFF"}
          </button>
        </div>

        <div className="relative w-full h-4 mt-4 bg-gray-700 rounded">
          <div className="absolute top-0 h-4 bg-green-500" style={{ width: `${target}%` }} />
          {result !== null && (
            <div
              className={`absolute top-0 h-4 w-1 ${win ? "bg-blue-300" : "bg-red-500"}`}
              style={{ left: `${result}%` }}
            />
          )}
        </div>

        {result !== null && (
          <p className="text-sm mt-1">
            出目: {result.toFixed(2)} ／ {win ? "🎉 勝利" : "😢 敗北"} ／ 配当: ${payout.toFixed(2)}
          </p>
        )}

        <div className="mt-4">
          <h3 className="font-semibold mb-2">📜 ベット履歴</h3>
          <button onClick={() => location.reload()} className="text-xs bg-red-500 px-2 py-1 rounded mb-2">
            履歴リセット
          </button>
          <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
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
  );
}
