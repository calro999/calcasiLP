// これはステーク風の完全なUI設計をもとにしたDiceゲームコンポーネントの基本構成です。
// 実際の動きや横スライダーなどはTailwind + useSpring or framer-motionで再現できます。
// まずはレイアウトと機能ブロックを模倣したベースUI構造を設計します。

"use client";
import { useState, useEffect } from "react";
import { rollDice } from "@/lib/roll";
import { useGameStore } from "@/lib/store";

export default function StakeStyleDiceGame() {
  const {
    balance,
    updateBalance,
    clientSeed,
    setClientSeed,
    nonce,
    incrementNonce,
    serverSeed,
    autoSettings,
    history,
    addHistory,
    updateBetAmount,
    betAmount,
  } = useGameStore();

  const [target, setTarget] = useState(50.5);
  const [isUnder, setIsUnder] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [win, setWin] = useState<boolean | null>(null);
  const [payout, setPayout] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const winChance = isUnder ? target : 100 - target;
  const multiplier = +(100 / winChance).toFixed(4);

  const play = async () => {
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
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => play(), autoSettings.delay);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, result]);

  return (
    <div className="grid grid-cols-3 gap-4 bg-[#0e1a24] text-white p-6 rounded-xl shadow-lg">
      {/* 左カラム：ライブ統計 */}
      <div className="bg-[#14212e] p-4 rounded-lg space-y-4">
        <h2 className="font-bold text-lg">📊 ライブ統計</h2>
        <div className="text-sm space-y-1">
          <p>利益: ${history.reduce((acc, h) => acc + h.payout - h.betAmount, 0).toFixed(2)}</p>
          <p>勝ち: {history.filter(h => h.win).length}</p>
          <p>負け: {history.filter(h => !h.win).length}</p>
          <p>ベット額: ${history.reduce((acc, h) => acc + h.betAmount, 0).toFixed(2)}</p>
        </div>
      </div>

      {/* 中央：ベット設定 */}
      <div className="col-span-2 bg-[#1a2b3c] p-6 rounded-lg">
        <h2 className="font-bold text-xl mb-4">🎲 ダイスベット</h2>
        <div className="space-y-2">
          <label className="block">
            <span>💰 ベット額</span>
            <input type="number" value={betAmount} onChange={e => updateBetAmount(+e.target.value)} className="w-full bg-[#0e1a24] border border-gray-600 p-2 rounded text-white" />
          </label>

          <label className="block">
            <span>🎯 ターゲット</span>
            <input type="range" min={1} max={99} step={0.1} value={target} onChange={e => setTarget(+e.target.value)} className="w-full" />
            <p className="text-xs mt-1">🎯 {target.toFixed(2)} ／ 勝率: {winChance.toFixed(2)}% ／ 倍率: x{multiplier}</p>
          </label>

          <div className="flex gap-4 mt-4">
            <button onClick={() => setIsUnder(!isUnder)} className="flex-1 p-2 bg-blue-600 rounded">
              ロール {isUnder ? "アンダー" : "オーバー"}
            </button>
            <button onClick={play} className="flex-1 p-2 bg-green-600 rounded">
              ROLL
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">結果バー</h3>
            <div className="relative w-full h-4 bg-gray-700 rounded">
              <div
                className="absolute top-0 h-4 bg-green-500"
                style={{ width: `${target}%` }}
              />
              {result !== null && (
                <div
                  className="absolute top-0 h-4 w-1 bg-red-500"
                  style={{ left: `${result}%` }}
                />
              )}
            </div>
            {result !== null && (
              <p className="mt-2">出目: {result.toFixed(2)} ／ {win ? "🎉 勝利" : "😢 敗北"}</p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">📜 ベット履歴</h3>
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
    </div>
  );
}
