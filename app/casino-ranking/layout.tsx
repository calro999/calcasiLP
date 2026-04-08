import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Online Casino Canada Ranking 2026 | Safest & Trusted Picks",
  description: "Experts reviewed the top 7 online casinos in Canada for 2026. Comparing payout speed, Interac support, and massive loyalty rewards for high-rollers.",
  openGraph: {
    title: "Best Online Casino Canada Ranking 2026 | Safest & Trusted Picks",
    description: "Experts reviewed the top 7 online casinos in Canada for 2026. Comparing payout speed, Interac support, and massive loyalty rewards for high-rollers.",
    url: "https://calcasi-lp.vercel.app/casino-ranking",
    images: ["/top.png"], // Image for ranking
    type: "website",
  },
};

export default function CasinoRankingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
