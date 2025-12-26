// データの場所を直接指定します
import { gameData as gates } from "../data/games/gates-of-olympus";

export const getAllGames = () => {
  // ゲームが増えたらここにカンマ区切りで追加します
  const allGames = [gates]; 
  return allGames;
};

export const getGameBySlug = (slug: string) => {
  const allGames = getAllGames();
  return allGames.find((game) => game.slug === slug);
};