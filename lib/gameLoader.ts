// 既存のゲーム
import { gameData as gates } from "../data/games/gates-of-olympus";
// 🔽 新しく追加
import { gameData as sweet } from "../data/games/sweet-bonanza";

export const getAllGames = () => {
  // 🔽 新しいゲーム(sweet)を配列に追加
  const allGames = [gates, sweet]; 
  return allGames;
};

export const getGameBySlug = (slug: string) => {
  const allGames = getAllGames();
  return allGames.find((game) => game.slug === slug);
};