export interface Casino {
  id: string;
  rank: number;
  name: string;
  logo: string;
  banner: string;
  bonus: string;
  rating: number; 
  description: string;
  officialLink: string;
  features: string[];
}

export const casinoData: Casino[] = [
  {
    id: "goldenpanda",
    rank: 1,
    name: "Golden Panda",
    logo: "/goldenpanda_top.jpg",
    banner: "/goldenpanda_top.jpg",
    bonus: "100% First Deposit Bonus + Exclusive Slot Campaigns",
    rating: 5.0,
    description: "A fast-growing online casino known for its high-volatility slots. It attracts players with luxurious bonuses and high-probability jackpots, now becoming a top choice for global players.",
    officialLink: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
    features: ["High Volatility Slots", "New Releases Frequent", "24/7 Global Support"]
  },
  {
    id: "stake",
    rank: 2,
    name: "Stake Casino",
    logo: "/stake_logo.png",
    banner: "/stake_logo.png",
    bonus: "200% First Deposit Bonus (up to $2,000) + $14 No-Deposit Bonus",
    rating: 4.5,
    description: "The world's leading crypto casino. Offering lightning-fast withdrawals, exclusive original games, and premium VIP treatment, it is the top pick for Bitcoin and Altcoin users.",
    officialLink: "https://stake.com/?c=411c9bbd82&offer=calro",
    features: ["Crypto Focused", "Elite VIP Program", "Instant Withdrawals"]
  },
  {
    id: "k8",
    rank: 3,
    name: "K8 Casino",
    logo: "/k8_logo.png",
    banner: "/k8_logo.png",
    bonus: "100% First Deposit Bonus (up to $800) + 288 Free Spins",
    rating: 4.3,
    description: "A favorite among high rollers. K8 offers a massive selection of high-RTP slots and classic gaming machines, with flexible betting limits to suit any strategy.",
    officialLink: "https://k8.io/?invite=calron",
    features: ["Diverse Slot Library", "High Limit Tables", "Fast Payouts"]
  },
  {
    id: "duelbits",
    rank: 4,
    name: "Duelbits",
    logo: "/duelbits_logo.png",
    banner: "/duelbits_logo.png",
    bonus: "Up to $1,000 Welcome Package",
    rating: 4.0,
    description: "A next-generation casino specializing in crypto. Features unique original games like Crash and Dice, combined with rewarding VIP perks that prioritize the player.",
    officialLink: "https://affiliates.duelbits.com/visit/?bta=35925&nci=5768",
    features: ["Crypto Support", "Exclusive Originals", "Rewarding VIP System"]
  },
  {
    id: "kachiwin",
    rank: 5,
    name: "Katsuwina",
    logo: "/katsu.jpg",
    banner: "/katsu.jpg",
    bonus: "Up to $1,000 Welcome Bonus",
    rating: 4.0,
    description: "A comprehensive casino and sports betting platform. Highly rated for its user-friendly interface and support for a wide variety of payment methods including Interac.",
    officialLink: "https://tracker.katsuwinaffiliates.ai/link?btag=90306436_414265",
    features: ["Canadian Friendly", "Sports & Casino", "Interac & Crypto"]
  },
  {
    id: "wonder",
    rank: 6,
    name: "Wonder Casino",
    logo: "/wondercasino_logo.png",
    banner: "/wondercasino_logo.png",
    bonus: "$30 Signup Bonus! 100% First Deposit Bonus (up to $500)",
    rating: 4.0,
    description: "Known for its '30-second withdrawals' and reliable support. The generous sign-up bonus makes it a popular entry point for new casino enthusiasts.",
    officialLink: "https://tracker-pm2.casino-wonder.com/link?btag=96420424_437635",
    features: ["Low Wagering Bonus", "Massive Game Collection", "Ultra-Fast Withdrawals"]
  },
  {
    id: "1xbet",
    rank: 7,
    name: "1xBet",
    logo: "/1xbet_top.jpg",
    banner: "/1xbet_top.jpg",
    bonus: "Big Welcome Package + Frequent Promotions",
    rating: 4.0,
    description: "A world-class bookmaker. Enjoy sports betting and thousands of casino games simultaneously. Use promo code 'CALRO777' for an enhanced start.",
    officialLink: "https://affpa.top/L?tag=d_4455915m_1236c_&site=4455915&ad=1236",
    features: ["24/7 Live Support", "High Payout Bonuses", "Crypto & Interac Support"]
  }
];