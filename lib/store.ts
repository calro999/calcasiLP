import { create } from 'zustand';

export const useGameStore = create((set) => ({
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
  updateBalance: (value: number) => set({ balance: value }),
  updateBetAmount: (value: number) => set({ betAmount: value }),
  setClientSeed: (value: string) => set({ clientSeed: value }),
  incrementNonce: () => set((state) => ({ nonce: state.nonce + 1 })),
  addHistory: (entry) => set((state) => ({ history: [...state.history, entry].slice(-10) })),
}));
