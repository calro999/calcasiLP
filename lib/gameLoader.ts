import { gameData as gates } from "@/data/games/gates-of-olympus";
// 🔽 ゲームを増やしたら、ここにインポートを追加するだけ
// import { gameData as sugar } from "@/data/games/sugar-rush";

export const getAllGames = () => {
  // 🔽 増やしたゲームをこの配列に入れる
  const allGames = [gates]; 
  return allGames;
};

export const getGameBySlug = (slug: string) => {
  const allGames = getAllGames();
  return allGames.find((game) => game.slug === slug);
};