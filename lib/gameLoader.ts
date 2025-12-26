// 既存の15タイトル
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

// 今回追加した8タイトル
import { gameData as moneytrain } from "../data/games/money-train-4";
import { gameData as puglife } from "../data/games/pug-life";
import { gameData as chaoscrew } from "../data/games/chaos-crew-2";
import { gameData as wolfgold } from "../data/games/wolf-gold";
import { gameData as reactoonz } from "../data/games/reactoonz";
import { gameData as fire } from "../data/games/fire-in-the-hole-2";
import { gameData as doghouse } from "../data/games/the-dog-house-megaways";
import { gameData as buffalo } from "../data/games/buffalo-king-megaways";

export const getAllGames = () => {
  return [
    // 1-5
    gates,
    sweet,
    hawaiian,
    san,
    wanted,
    // 6-10
    tome,
    outsourced,
    princess,
    mental,
    sugar,
    // 11-15
    bass,
    oiran,
    sugar1000,
    moon,
    razor,
    // 16-23 (今回追加分)
    moneytrain,
    puglife,
    chaoscrew,
    wolfgold,
    reactoonz,
    fire,
    doghouse,
    buffalo,
  ];
};

export const getGameBySlug = (slug: string) => {
  return getAllGames().find((game) => game.slug === slug);
};