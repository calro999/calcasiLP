import { gameData as gates } from "../data/games/gates-of-olympus";
import { gameData as sweet } from "../data/games/sweet-bonanza";
import { gameData as hawaiian } from "../data/games/hawaiian-dream";
import { gameData as san } from "../data/games/san-quentin";
import { gameData as wanted } from "../data/games/wanted-dead-or-a-wild";
import { gameData as tome } from "../data/games/tome-of-madness";
import { gameData as outsourced } from "../data/games/outsourced";
import { gameData as princess } from "../data/games/starlight-princess";
import { gameData as mental } from "../data/games/mental";
import { gameData as sugar } from "../data/games/sugar-rush";
import { gameData as bass } from "../data/games/big-bass-splash";
import { gameData as oiran } from "../data/games/oiran-dream";
import { gameData as sugar1000 } from "../data/games/sugar-rush-1000";
import { gameData as moon } from "../data/games/moon-princess";
import { gameData as razor } from "../data/games/razor-shark";

export const getAllGames = () => {
  return [
    gates, sweet, hawaiian, san, wanted, 
    tome, outsourced, princess, mental, 
    sugar, bass, oiran, sugar1000, moon, razor
  ];
};

export const getGameBySlug = (slug: string) => {
  return getAllGames().find((game) => game.slug === slug);
};