export type Game = {
  slug: string;
  title: string;
  provider: string;
  imageUrl: string;
  ratingFun: 1 | 2 | 3 | 4 | 5;
  ratingExplosive: 1 | 2 | 3 | 4 | 5;
  canBuyFS: boolean;
  rtp: string;
  maxWin: string;
  volatility: string;
  description: string;
  rules: string;
  features: string;
  strategy: string;
  pros: string[];
  cons: string[];
  seoDescription: string;
  affiliateUrl: string;
};

export const gameData: Game = {
  slug: "gates-of-olympus",
  title: "Gates of Olympus",
  provider: "Pragmatic Play",
  imageUrl: "/gates-of-olympus.webp",
  ratingFun: 5,
  ratingExplosive: 5,
  canBuyFS: true,
  rtp: "96.50%",
  maxWin: "5,000x",
  volatility: "High",
  description: "A legendary slot themed after Zeus from Greek mythology. Features the innovative 'Pay Anywhere' system where wins occur if 8 or more identical symbols appear anywhere on the grid. Known for massive multipliers up to 500x, it's a top-tier explosive slot.",
  rules: "[Basic Payouts]\n- Wins are triggered when 8 or more identical symbols appear on the 6x5 grid.\n- Features a 'Tumble' mechanic where winning symbols vanish and new ones fall in.\n\n[Multipliers]\n- Zeus can randomly cast lightning to drop multipliers ranging from 2x up to 500x.\n- Multiple multipliers in a single spin are summed together.\n\n[Free Spins]\n- 4 or more Scatters (Zeus's face) trigger 15 free spins.\n- During free spins, any multiplier that contributes to a win is added to a 'Total Multiplier' that applies to all subsequent wins, creating massive payout potential.",
  features: "The biggest draw is the 'Accumulating Multiplier' during free spins. As the multiplier grows throughout the session, even small wins can turn into massive payouts of 1000x or more.",
  strategy: "1. We recommend turning on the Ante Bet (25% extra stake) to double your chances of hitting free spins.\n2. Bonus Buys (100x stake) are effective for high-stakes play if your bankroll allows for high volatility.\n3. Focus on long-term play; manage your funds to weather the swings while waiting for high-value symbol chains.",
  pros: ["Massive multipliers up to 500x", "Multiplier accumulation in free spins allows for huge max wins", "Tumble mechanics keep the base game engaging"],
  cons: ["High volatility means the balance can drain quickly during dry spells", "Can be Frustrating if no multipliers appear during the bonus round"],
  seoDescription: "In-depth strategy guide for Gates of Olympus. Learn tips to increase your win probability, the pros and cons of bonus buys, and detailed RTP and volatility analysis.",
  affiliateUrl: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
};