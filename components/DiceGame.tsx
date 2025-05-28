// Stakeダイス完全再現：履歴・自動ベット・チャート付き
"use client";
import { useEffect, useState, useRef } from "react";
import { rollDice } from "@/lib/roll";
import { useGameStore } from "@/lib/store";
import coinSound from "@/public/assets/roll.mp3";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

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
  const [betCount, setBetCount] = useState(0);
  const [rollsLeft, setRollsLeft] = useState(Infinity);

  const winChance = isUnder ? target : 100 - target;
  const multiplier = +(100 / winChance).toFixed(4);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = async () => {
    if (rolling || balance < betAmount) return;
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
    setBetCount(prev => prev + 1);
    setTimeout(() => setRolling(false), instant ? 100 : 800);
  };

  useEffect(() => {
    if (autoPlay && betCount < rollsLeft) {
      const timer = setTimeout(() => play(), instant ? 100 : 1000);
      return () => clearTimeout(timer);
    }
    if (betCount >= rollsLeft) setAutoPlay(false);
  }, [autoPlay, result]);

  const chartData = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "Profit",
        data: history.map((h, i) =>
          history.slice(0, i + 1).reduce((acc, curr) => acc + curr.payout - curr.betAmount, 0)
        ),
        fill: true,
        borderColor: "#22c55e",
        backgroundColor: (ctx: any) => {
          const { chart } = ctx;
          const { ctx: context, chartArea } = chart;
          const gradient = context.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(255,0,0,0.3)");
          gradient.addColorStop(1, "rgba(34,197,94,0.3)");
          return gradient;
        },
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 text-white">
      <audio ref={audioRef} src={coinSound} preload="auto" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 統計 */}
        <div className="bg-[#1e293b] p-4 rounded-xl space-y-4">
          <h2 className="text-xl font-bold">📊 ライブ統計</h2>
          <p>利益: ${(history.reduce((a, h) => a + h.payout - h.betAmount, 0)).toFixed(2)}</p>
          <p>勝ち: {history.filter(h => h.win).length}</p>
          <p>負け: {history.filter(h => !h.win).length}</p>
          <p>ベット: ${(history.reduce((a, h) => a + h.betAmount, 0)).toFixed(2)}</p>
          <Line data={chartData} height={250} />
        </div>

        {/* 操作パネル */}
        <div className="lg:col-span-2 bg-[#0f172a] p-6 rounded-xl space-y-6">
          <h2 className="text-xl font-bold">🎯 ダイスベット</h2>

          <div className="grid grid-cols-2 gap-4">
            <label>
              ベット額
              <input type="number" value={betAmount} onChange={e => updateBetAmount(+e.target.value)} className="w-full bg-black text-white p-2 rounded border border-gray-500" />
            </label>
            <label>
              ベット数（自動）
              <input type="number" value={rollsLeft === Infinity ? 0 : rollsLeft} onChange={e => setRollsLeft(+e.target.value || Infinity)} className="w-full bg-black text-white p-2 rounded border border-gray-500" />
            </label>
          </div>

          <div>
            ターゲット数値: {target.toFixed(2)} ／ 勝率: {winChance.toFixed(2)}% ／ 倍率: x{multiplier}
            <input type="range" min={1} max={99} step={0.01} value={target} onChange={e => setTarget(+e.target.value)} className="w-full" />
          </div>

          <div className="flex gap-2">
            <button onClick={() => setIsUnder(!isUnder)} className="flex-1 p-3 bg-blue-600 rounded">
              ロール {isUnder ? "アンダー" : "オーバー"}
            </button>
            <button onClick={play} className="flex-1 p-3 bg-green-600 rounded">
              ROLL
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setAutoPlay(!autoPlay)} className="flex-1 p-3 bg-purple-500 rounded">
              {autoPlay ? "自動停止" : "自動ベット開始"}
            </button>
            <button onClick={() => setInstant(!instant)} className="flex-1 p-3 bg-gray-700 rounded">
              高速: {instant ? "ON" : "OFF"}
            </button>
          </div>

          <div className="relative w-full h-6 bg-gray-600 rounded overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: `${target}%` }} />
            {result !== null && (
              <div
                className={`absolute top-0 h-full w-1 ${win ? "bg-blue-300" : "bg-red-500"}`}
                style={{ left: `${result}%` }}
              />
            )}
          </div>

          {result !== null && (
            <p className="text-sm mt-2">
              出目: {result.toFixed(2)} ／ {win ? "🎉 勝利" : "😢 敗北"} ／ 配当: ${payout.toFixed(2)}
            </p>
          )}

          <div className="mt-4">
            <h3 className="font-semibold mb-2">📜 ベット履歴</h3>
            <button onClick={() => location.reload()} className="text-xs bg-red-500 px-2 py-1 rounded mb-2">
              履歴リセット
            </button>
            <div className="grid grid-cols-3 text-xs text-gray-300 border-t border-gray-600 pt-2">
              <span>出目</span><span>勝敗</span><span>配当</span>
            </div>
            <ul className="text-sm max-h-40 overflow-y-auto space-y-1">
              {history.slice().reverse().map((entry, i) => (
                <li key={i} className="grid grid-cols-3 text-xs">
                  <span>{entry.result.toFixed(2)}</span>
                  <span className={entry.win ? "text-green-400" : "text-red-400"}>{entry.win ? "✔" : "✘"}</span>
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
