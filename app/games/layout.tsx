import { Metadata } from "next";

export const metadata: Metadata = {
  title: "オンラインカジノ人気ゲーム攻略・徹底比較一覧 | Calcasi",
  description: "プロが厳選した人気スロットの攻略情報を網羅。Gates of Olympus、Sweet Bonanza、Hawaiian Dreamなど、最新のRTP、最大配当、勝つための戦略を詳しく解説。",
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}