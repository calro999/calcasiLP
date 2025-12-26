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

// 56-59
import { gameData as dwarf } from "../data/games/battle-dwarf";
import { gameData as goldfrog } from "../data/games/dreams-of-gold";
import { gameData as hawaiianboost } from "../data/games/hawaiian-dream-boost";
import { gameData as engeki } from "../data/games/engeki-rising";

// 60-63
import { gameData as amazon } from "../data/games/big-bass-amazon-xtreme";
import { gameData as dragonmegaways } from "../data/games/floating-dragon-ultra-megaways";
import { gameData as tropicana } from "../data/games/club-tropicana";
import { gameData as pizza } from "../data/games/pizza-pizza-pizza";

// 64-67
import { gameData as jammin } from "../data/games/jammin-jars";
import { gameData as razorreturns } from "../data/games/razor-returns";
import { gameData as fatsanta } from "../data/games/fat-santa";
import { gameData as retrotapes } from "../data/games/retro-tapes";

// 68-71
import { gameData as templetumble } from "../data/games/temple-tumble";
import { gameData as ironbank } from "../data/games/iron-bank";
import { gameData as netgains } from "../data/games/net-gains";
import { gameData as hellcatraz } from "../data/games/hellcatraz";

// 72-75
import { gameData as dragonluck } from "../data/games/dragons-luck-megaways";
import { gameData as piggyriches } from "../data/games/piggy-riches-megaways";
import { gameData as gonzort } from "../data/games/gonzos-quest-megaways-rt";
import { gameData as primal } from "../data/games/primal-frontier";

// 76-79
import { gameData as sakura } from "../data/games/sakura-fortune";
import { gameData as wolfmega } from "../data/games/big-bad-wolf-megaways";
import { gameData as bandits } from "../data/games/sticky-bandits";
import { gameData as emeralds } from "../data/games/eastern-emeralds";

// 80-83 (Play'n GO 追加分)
import { gameData as riseolympus } from "../data/games/rise-of-olympus";
import { gameData as wildblood2 } from "../data/games/wild-blood-2";
import { gameData as honeyrush } from "../data/games/honey-rush";
import { gameData as goldenticket } from "../data/games/golden-ticket";

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
    bookofdead, gemix, legacy, ticket2,
    dwarf, goldfrog, hawaiianboost, engeki,
    amazon, dragonmegaways, tropicana, pizza,
    jammin, razorreturns, fatsanta, retrotapes,
    templetumble, ironbank, netgains, hellcatraz,
    dragonluck, piggyriches, gonzort, primal,
    sakura, wolfmega, bandits, emeralds,
    riseolympus, wildblood2, honeyrush, goldenticket
  ];
};

export const getGameBySlug = (slug: string) => {
  return getAllGames().find((game) => game.slug === slug);
};