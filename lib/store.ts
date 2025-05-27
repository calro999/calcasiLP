import { create } from 'zustand';

// 型定義
type HistoryEntry = {
  result: number;
  win: boolean;
  payout: number;
  betAmount: number;
  nonce: number;
};

type AutoSettings = {
  onWin: number;
  onLose: number;
  maxBets: number;
  delay: number;
};

type GameState = {
  balance: number;
  betAmount: number;
  clientSeed: string;
  serverSeed: string;
  serverSeedHash: string;
  nonce: number;
  history: HistoryEntry[];
  autoSettings: AutoSettings;
  updateBalance: (value: number) => void;
  updateBetAmount: (value: number) => void;
  setClientSeed: (value: string) => void;
  incrementNonce: () => void;
  addHistory: (entry: HistoryEntry) => void;
  resetHistory: () => void; // ✅ 追加
};

export const useGameStore = create<GameState>((set) => ({
  balance: 1000,
  betAmount: 10,
  clientSeed: 'my-seed',
  serverSeed: 'secret-server-seed',
  serverSeedHash: '',
  nonce: 0,
  history: [],
  autoSettings: {
    onWin: 10,
    onLose: 100,
    maxBets: 10,
    delay: 1000,
  },
  updateBalance: (value) => set({ balance: value }),
  updateBetAmount: (value) => set({ betAmount: value }),
  setClientSeed: (value) => set({ clientSeed: value }),
  incrementNonce: () => set((state) => ({ nonce: state.nonce + 1 })),
  addHistory: (entry) =>
    set((state) => ({
      history: [...state.history, entry].slice(-10),
    })),
  resetHistory: () => set({ history: [] }), // ✅ 実装
}));
