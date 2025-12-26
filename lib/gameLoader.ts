import { gameData as gates } from "../data/games/gates-of-olympus";
import { gameData as sweet } from "../data/games/sweet-bonanza";
import { gameData as hawaiian } from "../data/games/hawaiian-dream";
import { gameData as san } from "../data/games/san-quentin";
import { gameData as wanted } from "../data/games/wanted-dead-or-a-wild";

export const getAllGames = () => {
  return [gates, sweet, hawaiian, san, wanted];
};

export const getGameBySlug = (slug: string) => {
  return getAllGames().find((game) => game.slug === slug);
};