// Stakeダイス完全再現：履歴・自動ベット・チャート付き＋SVGダイス演出＋条件分岐＋統計強化
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
  Filler,
  Tooltip, // Tooltipをインポート
  Legend, // Legendをインポート
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend); // 登録

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
  const [isUnder, setIsUnder] = useState(true); // 初期値をtrueに変更 (画像に合わせる)
  const [result, setResult] = useState<number | null>(null);
  const [win, setWin] = useState<boolean | null>(null);
  const [payout, setPayout] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [instant, setInstant] = useState(false);
  const [betCount, setBetCount] = useState(0);
  const [rollsLeft, setRollsLeft] = useState(Infinity);
  const [profitLimit, setProfitLimit] = useState<number | null>(null);
  const [lossLimit, setLossLimit] = useState<number | null>(null);
  const [audio] = useState<HTMLAudioElement | null>(() =>
    typeof window !== "undefined" ? new Audio("/assets/roll.mp3") : null
  );

  // winChance と multiplier の計算を正しいロジックに修正
  const winChance = isUnder ? target : 100 - target;
  const multiplier = +(100 / winChance).toFixed(4);

  const diceRef = useRef<SVGRectElement | null>(null);

  const totalProfit = history.reduce((a, h) => a + h.payout - h.betAmount, 0);

  const play = async () => {
    if (rolling || balance < betAmount) return;
    setRolling(true);
    audio?.play();

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
    setBetCount((prev) => prev + 1);

    if (diceRef.current) {
      // SVGダイスの位置を調整 (0-100の範囲で中央に表示)
      diceRef.current.setAttribute("x", `${rollResult - 1}`); // 幅が2なので中央になるように-1
    }

    setTimeout(() => setRolling(false), instant ? 100 : 800);
  };

  useEffect(() => {
    if (autoPlay && betCount < rollsLeft) {
      if (
        (profitLimit !== null && totalProfit >= profitLimit) ||
        (lossLimit !== null && totalProfit <= -lossLimit)
      ) {
        setAutoPlay(false);
        return;
      }
      const timer = setTimeout(() => play(), instant ? 100 : 1000);
      return () => clearTimeout(timer);
    }
    if (betCount >= rollsLeft) setAutoPlay(false);
  }, [autoPlay, result, totalProfit, rollsLeft, profitLimit, lossLimit]); // 依存配列にrollsLeft, profitLimit, lossLimitを追加

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
          if (!chartArea) return; // chartAreaがない場合は処理を中断

          const gradient = context.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          // 利益がプラスなら緑、マイナスなら赤
          const lastProfit = history.slice(-1)[0]
            ? history.slice(0, history.length).reduce((acc, curr) => acc + curr.payout - curr.betAmount, 0)
            : 0;
          if (lastProfit >= 0) {
            gradient.addColorStop(0, "rgba(34,197,94,0.1)");
            gradient.addColorStop(1, "rgba(34,197,94,0.5)");
          } else {
            gradient.addColorStop(0, "rgba(239,68,68,0.1)");
            gradient.addColorStop(1, "rgba(239,68,68,0.5)");
          }
          return gradient;
        },
        tension: 0.3,
        pointRadius: 0, // 点を非表示
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // アスペクト比を維持しない
    plugins: {
      legend: {
        display: false, // 凡例を非表示
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false, // X軸を非表示
        grid: {
          display: false, // X軸のグリッド線を非表示
        },
      },
      y: {
        display: false, // Y軸を非表示
        grid: {
          display: false, // Y軸のグリッド線を非表示
        },
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 text-white font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* 統計 */}
        <div className="bg-[#1a202c] p-6 rounded-xl shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-200">📊 ライブ統計</h2>
            <select className="bg-[#2d3748] text-gray-200 text-sm py-1 px-2 rounded cursor-pointer">
              <option>すべて</option>
              {/* 他のオプションを追加可能 */}
            </select>
          </div>
          <div className="space-y-3 text-sm text-gray-300 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold">利益</span>
              <span className={`font-bold ${totalProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
                ${totalProfit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">勝ち</span>
              <span className="text-gray-200">{history.filter(h => h.win).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">負け</span>
              <span className="text-gray-200">{history.filter(h => !h.win).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">ベット額</span>
              <span className="text-gray-200">
                ${(history.reduce((a, h) => a + h.betAmount, 0)).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="relative h-48 w-full"> {/* チャートのコンテナ */}
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* 100Kドルレース部分の追加 */}
          <div className="mt-auto pt-6 border-t border-gray-700">
            <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">100Kドルレース</span>
            </div>
            <p className="text-gray-400 text-xs mb-2">レース終了まで残り:</p>
            <div className="flex items-center text-gray-200 text-sm font-semibold mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>6 時間後</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 text-sm mb-1">
                <span>賞金</span>
                <span className="text-green-400 font-bold">$0.00</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 text-sm">
                <span>ベット額</span>
                <span className="text-gray-200 font-bold">$0.57</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '0%' }}></div> {/* プログレスバーの例 */}
            </div>
          </div>
        </div>

        {/* 操作＋表示 */}
        <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg col-span-1 lg:col-span-3 flex flex-col">
          <div className="flex mb-6 border-b border-gray-700 pb-4">
            <button className="px-6 py-2 text-white bg-blue-600 rounded-lg mr-4 font-semibold">
              手動
            </button>
            <button className="px-6 py-2 text-gray-400 bg-[#2d3748] rounded-lg font-semibold">
              自動
            </button>
          </div>

          {/* ベットコントロール */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <label htmlFor="bet-amount" className="block text-sm font-medium text-gray-400 mb-1">
                ベット額
              </label>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <input
                  id="bet-amount"
                  type="number"
                  value={betAmount}
                  onChange={e => updateBetAmount(+e.target.value)}
                  className="w-full bg-transparent text-white p-2 focus:outline-none"
                />
                <button
                  onClick={() => updateBetAmount(betAmount / 2)}
                  className="px-3 py-2 bg-gray-700 text-gray-300 text-sm font-semibold hover:bg-gray-600 transition-colors"
                >
                  ½
                </button>
                <button
                  onClick={() => updateBetAmount(betAmount * 2)}
                  className="px-3 py-2 bg-gray-700 text-gray-300 text-sm font-semibold hover:bg-gray-600 transition-colors"
                >
                  2X
                </button>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="bet-count" className="block text-sm font-medium text-gray-400 mb-1">
                ベット数
              </label>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <input
                  id="bet-count"
                  type="number"
                  value={rollsLeft === Infinity ? "" : rollsLeft}
                  onChange={e => setRollsLeft(+e.target.value || Infinity)}
                  className="w-full bg-transparent text-white p-2 focus:outline-none"
                  placeholder="∞"
                />
              </div>
            </div>
          </div>

          {/* 自動ベット設定 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="on-win" className="block text-sm font-medium text-gray-400 mb-1">
                勝利時
              </label>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <input
                  id="on-win"
                  type="number"
                  className="w-full bg-transparent text-white p-2 focus:outline-none"
                  placeholder="0"
                />
                <select className="bg-gray-700 text-gray-300 text-sm py-2 px-2 rounded-r-lg">
                  <option>%</option>
                  <option>TRX</option> {/* トークンシンボルをTRXに仮定 */}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="on-lose" className="block text-sm font-medium text-gray-400 mb-1">
                敗北時
              </label>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <input
                  id="on-lose"
                  type="number"
                  className="w-full bg-transparent text-white p-2 focus:outline-none"
                  placeholder="0"
                />
                <select className="bg-gray-700 text-gray-300 text-sm py-2 px-2 rounded-r-lg">
                  <option>%</option>
                  <option>TRX</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="profit-limit" className="block text-sm font-medium text-gray-400 mb-1">
                利益停止
              </label>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <input
                  id="profit-limit"
                  type="number"
                  onChange={e => setProfitLimit(+e.target.value || null)}
                  className="w-full bg-transparent text-white p-2 focus:outline-none"
                  placeholder="0.00000000 TRX"
                />
                <span className="text-gray-400 px-3">TRX</span>
              </div>
            </div>
            <div>
              <label htmlFor="loss-limit" className="block text-sm font-medium text-gray-400 mb-1">
                損失停止
              </label>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <input
                  id="loss-limit"
                  type="number"
                  onChange={e => setLossLimit(+e.target.value || null)}
                  className="w-full bg-transparent text-white p-2 focus:outline-none"
                  placeholder="0.00000000 TRX"
                />
                <span className="text-gray-400 px-3">TRX</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`w-full py-3 rounded-lg font-bold text-lg mb-6 ${
              autoPlay ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            } transition-colors`}
          >
            {autoPlay ? "自動停止" : "自動ベット開始"}
          </button>

          {/* ダイスロールバー */}
          <div className="relative w-full h-10 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden mb-6">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center">
              <div
                className="h-full bg-green-500 opacity-30"
                style={{ width: `${target}%`, borderRight: `2px solid ${isUnder ? '#3b82f6' : '#ef4444'}` }} // ターゲットライン
              ></div>
              <div
                className="h-full bg-gray-700 opacity-30"
                style={{ width: `${100 - target}%`, borderLeft: `2px solid ${isUnder ? '#ef4444' : '#3b82f6'}` }}
              ></div>
            </div>

            {result !== null && (
              <svg className="absolute top-0 left-0 right-0 bottom-0 w-full h-full" viewBox="0 0 100 10">
                {/* SVGダイス演出のバーを調整 */}
                <rect
                  ref={diceRef}
                  y="1"
                  width="2"
                  height="8"
                  fill={win ? "#3b82f6" : "#ef4444"}
                  className={rolling ? "transition-all duration-700 ease-out" : ""} // ローリングアニメーション
                />
              </svg>
            )}

            {/* ロールオーバー、倍率、勝率表示 */}
            <div className="absolute inset-0 flex justify-around items-center text-gray-400 text-sm font-bold">
              <span>倍率</span>
              <span className="text-white">x{multiplier}</span>
              <span>ロールオーバー</span>
              <span className="text-white">
                <span className="font-bold text-lg text-blue-400">{target.toFixed(2)}</span>
                <span className="text-xs ml-1">{isUnder ? "未満" : "以上"}</span>
              </span>
              <span>勝利チャンス</span>
              <span className="text-white">{winChance.toFixed(2)}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setIsUnder(true)}
              className={`py-3 rounded-lg font-bold text-lg ${
                isUnder ? "bg-blue-600" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition-colors`}
            >
              ロールアンダー
            </button>
            <button
              onClick={() => setIsUnder(false)}
              className={`py-3 rounded-lg font-bold text-lg ${
                !isUnder ? "bg-blue-600" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition-colors`}
            >
              ロールオーバー
            </button>
            <button
              onClick={play}
              className={`col-span-2 py-4 rounded-lg font-bold text-2xl ${
                rolling ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } transition-colors`}
              disabled={rolling}
            >
              ROLL
            </button>
          </div>

          {result !== null && (
            <p className="text-sm mt-2 text-center">
              出目: <span className="font-bold text-lg">{result.toFixed(2)}</span> ／{" "}
              <span className={`font-bold ${win ? "text-green-400" : "text-red-400"}`}>
                {win ? "🎉 勝利" : "😢 敗北"}
              </span>{" "}
              ／ 配当: <span className="font-bold text-lg">${payout.toFixed(2)}</span>
            </p>
          )}

          {/* ベット履歴 */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-200">📜 ベット履歴</h3>
              <button
                onClick={() => location.reload()}
                className="text-xs bg-red-700 hover:bg-red-800 px-3 py-1 rounded transition-colors"
              >
                履歴リセット
              </button>
            </div>
            <div className="grid grid-cols-5 text-xs text-gray-400 border-b border-gray-700 pb-2 mb-2 font-semibold">
              <span className="text-left">出目</span>
              <span className="text-left">ベット額</span>
              <span className="text-left">倍率</span>
              <span className="text-left">勝敗</span>
              <span className="text-right">利益</span>
            </div>
            <ul className="text-sm max-h-56 overflow-y-auto space-y-1 pr-2 custom-scrollbar"> {/* スクロールバーのスタイルを追加 */}
              {history.slice().reverse().map((entry, i) => (
                <li key={i} className="grid grid-cols-5 text-xs py-1 border-b border-gray-800 last:border-b-0">
                  <span className="text-left text-gray-300">{entry.result.toFixed(2)}</span>
                  <span className="text-left text-gray-300">${entry.betAmount.toFixed(2)}</span>
                  <span className="text-left text-gray-300">x{(100 / (isUnder ? target : 100 - target)).toFixed(2)}</span> {/* 倍率を再計算して表示 */}
                  <span className={`text-left ${entry.win ? "text-green-400" : "text-red-400"}`}>
                    {entry.win ? "✔" : "✘"}
                  </span>
                  <span className={`text-right ${entry.win ? "text-green-400" : "text-red-400"}`}>
                    {entry.win ? `+${(entry.payout - entry.betAmount).toFixed(2)}` : `-${entry.betAmount.toFixed(2)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}