// 1-10
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

// 11-20
import { gameData as bass } from "../data/games/big-bass-splash";
import { gameData as oiran } from "../data/games/oiran-dream";
import { gameData as sugar1000 } from "../data/games/sugar-rush-1000";
import { gameData as moon } from "../data/games/moon-princess";
import { gameData as razor } from "../data/games/razor-shark";
import { gameData as moneytrain } from "../data/games/money-train-4";
import { gameData as puglife } from "../data/games/pug-life";
import { gameData as chaoscrew } from "../data/games/chaos-crew-2";
import { gameData as wolfgold } from "../data/games/wolf-gold";
import { gameData as reactoonz } from "../data/games/reactoonz";

// 21-30
import { gameData as fire } from "../data/games/fire-in-the-hole-2";
import { gameData as doghouse } from "../data/games/the-dog-house-megaways";
import { gameData as buffalo } from "../data/games/buffalo-king-megaways";
import { gameData as beamboys } from "../data/games/beam-boys";
import { gameData as ripcity } from "../data/games/rip-city";
import { gameData as bigbamboo } from "../data/games/big-bamboo";
import { gameData as gonzomega } from "../data/games/gonzos-quest-megaways";
import { gameData as sanq2 } from "../data/games/san-quentin-2";
import { gameData as lebandit } from "../data/games/le-bandit";
import { gameData as anubis } from "../data/games/hand-of-anubis";

// 31-35 (重複修正済み)
import { gameData as rise100 } from "../data/games/rise-of-olympus-100";
import { gameData as gems } from "../data/games/gems-bonanza";
import { gameData as fruit } from "../data/games/fruit-party";
import { gameData as wwg } from "../data/games/wild-west-gold";
import { gameData as multihold } from "../data/games/the-dog-house-multihold";

export const getAllGames = () => {
  return [
    gates, sweet, hawaiian, san, wanted, tome, outsourced, princess, mental, sugar,
    bass, oiran, sugar1000, moon, razor, moneytrain, puglife, chaoscrew, wolfgold, reactoonz,
    fire, doghouse, buffalo, beamboys, ripcity, bigbamboo, gonzomega, sanq2, lebandit, anubis,
    rise100, gems, fruit, wwg, multihold
  ];
};

export const getGameBySlug = (slug: string) => {
  return getAllGames().find((game) => game.slug === slug);
};