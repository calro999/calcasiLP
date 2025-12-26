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

// 31-55
import { gameData as rise100 } from "../data/games/rise-of-olympus-100";
import { gameData as gems } from "../data/games/gems-bonanza";
import { gameData as fruit } from "../data/games/fruit-party";
import { gameData as wwg } from "../data/games/wild-west-gold";
import { gameData as multihold } from "../data/games/the-dog-house-multihold";
import { gameData as bonanza } from "../data/games/bonanza";
import { gameData as chilli } from "../data/games/extra-chilli";
import { gameData as danger } from "../data/games/danger-high-voltage";
import { gameData as millionaire } from "../data/games/who-wants-to-be-a-millionaire";
import { gameData as crazy } from "../data/games/crazy-time";
import { gameData as lightning } from "../data/games/lightning-roulette";
import { gameData as monopoly } from "../data/games/monopoly-live";
import { gameData as funky } from "../data/games/funky-time";
import { gameData as tombrip } from "../data/games/tombstone-rip";
import { gameData as fith } from "../data/games/fire-in-the-hole";
import { gameData as folsom } from "../data/games/folsom-prison";
import { gameData as crypt } from "../data/games/the-crypt";
import { gameData as storm } from "../data/games/lightning-storm";
import { gameData as xxxtreme } from "../data/games/xxxtreme-lightning-roulette";
import { gameData as coc } from "../data/games/cash-or-crash";
import { gameData as dream } from "../data/games/dream-catcher";
import { gameData as bookofdead } from "../data/games/book-of-dead";
import { gameData as gemix } from "../data/games/gemix";
import { gameData as legacy } from "../data/games/legacy-of-dead";
import { gameData as ticket2 } from "../data/games/golden-ticket-2";

export const getAllGames = () => {
  return [
    gates, sweet, hawaiian, san, wanted, tome, outsourced, princess, mental, sugar,
    bass, oiran, sugar1000, moon, razor, moneytrain, puglife, chaoscrew, wolfgold, reactoonz,
    fire, doghouse, buffalo, beamboys, ripcity, bigbamboo, gonzomega, sanq2, lebandit, anubis,
    rise100, gems, fruit, wwg, multihold,
    bonanza, chilli, danger, millionaire,
    crazy, lightning, monopoly, funky,
    tombrip, fith, folsom, crypt,
    storm, xxxtreme, coc, dream,
    bookofdead, gemix, legacy, ticket2
  ];
};

export const getGameBySlug = (slug: string) => {
  return getAllGames().find((game) => game.slug === slug);
};