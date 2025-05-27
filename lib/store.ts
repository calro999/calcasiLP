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
  onWin: number;   // 勝利時に何％増やすか（例：10）
  onLose: number;  // 敗北時に何％増やすか（例：100）
  maxBets: number; // 自動ベット最大回数
  delay: number;   // 自動ベット間隔（ms）
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
};

// Zustandストアの作成
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
}));
