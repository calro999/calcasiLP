"use client";
import { useState, useEffect } from "react";
import { rollDice } from "@/lib/roll";
import { useGameStore } from "@/lib/store";

export default function DiceGame() {
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

  const [target, setTarget] = useState(49.5);
  const [isUnder, setIsUnder] = useState(true);
  const [result, setResult] = useState<number | null>(null);
  const [win, setWin] = useState<boolean | null>(null);
  const [payout, setPayout] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const winChance = isUnder ? target : 100 - target;
  const multiplier = +(100 / winChance).toFixed(2);

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

    let nextBet = betAmount;
    nextBet = winFlag
      ? +(betAmount * (1 + autoSettings.onWin / 100)).toFixed(2)
      : +(betAmount * (1 + autoSettings.onLose / 100)).toFixed(2);
    updateBetAmount(nextBet);
    incrementNonce();
  };

  useEffect(() => {
    if (autoPlay && autoSettings.maxBets > 0) {
      if (history.length >= autoSettings.maxBets || balance <= 0) {
        setAutoPlay(false);
        return;
      }
      const timer = setTimeout(() => play(), autoSettings.delay);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, history]);

  const resetHistory = () => {
    location.reload();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-black text-yellow-300 rounded-xl shadow-xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">🎲 カスタムダイスゲーム</h2>

      <div className="space-y-3">
        <label className="block">
          <span>💰 ベット額</span>
          <input type="number" value={betAmount} onChange={e => updateBetAmount(+e.target.value)} className="w-full bg-black border border-yellow-400 p-2 rounded text-yellow-200" />
        </label>

        <label className="block">
          <span>🎯 ターゲット（0〜100）</span>
          <input type="number" value={target} onChange={e => setTarget(+e.target.value)} className="w-full bg-black border border-yellow-400 p-2 rounded text-yellow-200" />
        </label>

        <label className="block">
          <span>🔑 クライアントシード</span>
          <input type="text" value={clientSeed} onChange={e => setClientSeed(e.target.value)} className="w-full bg-black border border-yellow-400 p-2 rounded text-yellow-200" />
        </label>

        <p className="text-sm">勝率：{winChance.toFixed(2)}% ／ 倍率：x{multiplier}</p>

        <div className="flex gap-2">
          <button onClick={() => setIsUnder(!isUnder)} className="flex-1 p-2 bg-yellow-500 text-black rounded">
            BET ON {isUnder ? "UNDER" : "OVER"}
          </button>
          <button onClick={play} className="flex-1 p-2 bg-green-500 text-black rounded">
            ROLL
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setAutoPlay(!autoPlay)} className="flex-1 p-2 bg-purple-500 text-white rounded">
            {autoPlay ? "STOP" : "START"} AUTO BET
          </button>
          <button onClick={resetHistory} className="flex-1 p-2 bg-red-600 text-white rounded">
            履歴リセット
          </button>
        </div>

        <p className="text-sm">残高：${balance.toFixed(2)}</p>

        {result !== null && (
          <div className="mt-4">
            <p>🎲 出目: {result.toFixed(2)}</p>
            <div className="relative h-4 w-full bg-yellow-100 rounded">
              <div
                className="absolute top-0 h-4 bg-yellow-400 opacity-50"
                style={{ width: `${target}%` }}
              />
              <div
                className={`absolute top-0 h-4 rounded ${win ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ left: `${result}%`, width: '2px' }}
              />
            </div>
            <p className="text-sm mt-2">{win ? "🎉 勝利！" : "😢 敗北…"} 配当: ${payout.toFixed(2)}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">📜 ロール履歴</h3>
            <ul className="text-sm space-y-1 max-h-48 overflow-y-auto pr-1">
              {history.slice().reverse().map((entry, index) => (
                <li key={index} className="flex justify-between border-b border-yellow-700 pb-1">
                  <span>🎲 {entry.result.toFixed(2)}</span>
                  <span>{entry.win ? '✅ WIN' : '❌ LOSE'}</span>
                  <span>${entry.payout.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
