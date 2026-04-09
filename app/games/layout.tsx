import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Casino Games and Slot Guides | Calcasi Canada",
  description: "Explore expert slot and casino game guides, including RTP insights, payout potential, volatility, and practical strategy notes for Canadian players.",
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}