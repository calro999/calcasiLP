'use client';
import { useState, useEffect } from 'react';
import { rollDice, getHashedSeed } from '@/lib/roll';
import { useGameStore } from '@/lib/store';
// これを先頭に追加
import React from "react";

export default function DiceGame() {
  const {
    balance,
    updateBalance,
    clientSeed,
    setClientSeed,
    nonce,
    incrementNonce,
    serverSeedHash,
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

  const play = () => {
    const rollResult = rollDice({ clientSeed, serverSeed, nonce });
    const winFlag = isUnder ? rollResult < target : rollResult > target;
    const winChance = isUnder ? target : 100 - target;
    const payoutAmount = winFlag ? +(betAmount * (100 / winChance)).toFixed(2) : 0;
    const newBalance = balance + payoutAmount - betAmount;

    updateBalance(newBalance);
    setResult(rollResult);
    setWin(winFlag);
    setPayout(payoutAmount);
    addHistory({
      result: rollResult,
      win: winFlag,
      payout: payoutAmount,
      betAmount,
      nonce,
    });

    // ベット額の自動調整
    let nextBet = betAmount;
    if (winFlag) {
      nextBet = +(betAmount * (1 + autoSettings.onWin / 100)).toFixed(2);
    } else {
      nextBet = +(betAmount * (1 + autoSettings.onLose / 100)).toFixed(2);
    }
    updateBetAmount(nextBet);
    incrementNonce();
  };

  useEffect(() => {
    if (autoPlay && autoSettings.maxBets > 0) {
      if (autoSettings.maxBets <= history.length || balance <= 0) {
        setAutoPlay(false);
        return;
      }
      const timer = setTimeout(() => play(), autoSettings.delay);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, history]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">🎲 Stake Clone Dice</h2>
      <div className="space-y-2">
        <input
          type="number"
          value={betAmount}
          onChange={e => updateBetAmount(+e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Bet amount"
        />
        <input
          type="number"
          value={target}
          onChange={e => setTarget(+e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Target (0-100)"
        />
        <input
          type="text"
          value={clientSeed}
          onChange={e => setClientSeed(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Client Seed"
        />
        <button onClick={() => setIsUnder(!isUnder)} className="w-full p-2 bg-blue-500 text-white rounded">
          Bet on {isUnder ? 'UNDER' : 'OVER'}
        </button>
        <button onClick={() => play()} className="w-full p-2 bg-green-600 text-white rounded">
          ROLL
        </button>
        <button onClick={() => setAutoPlay(!autoPlay)} className="w-full p-2 bg-purple-500 text-white rounded">
          {autoPlay ? 'STOP' : 'START'} AUTO BET
        </button>
        <p className="mt-2 text-sm">Balance: ${balance.toFixed(2)}</p>
        {result !== null && (
          <div className="mt-2">
            <p>Result: {result.toFixed(2)}</p>
            <p>{win ? '🎉 Win!' : '😢 Lose'}</p>
            <p>Payout: ${payout.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
