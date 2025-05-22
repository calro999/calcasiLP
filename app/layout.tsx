// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // グローバルCSSのインポート

// ここでは Header や Footer はインポートしません。
// 各ページコンポーネント (.tsx ファイル) で個別に呼び出しているため、
// ここで呼び出すと重複します。

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "calcasiどっとこむ",
  description: "オンラインカジノに関する最新情報を提供します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {/*
          この children は、各ページの内容（例: app/latest-news/page.tsxの内容全体）
          を指します。各ページがそれぞれ Header を持っているため、
          ここでは Header を直接レンダリングしません。
          もしレイアウト全体で共通のヘッダーにする場合は、
          ここに <Header /> を一度だけ置き、各ページからは Header の呼び出しを削除します。
          現在の状況では、各ページに Header があるため、
          ここに Header があると二重になります。
        */}
        {children}
      </body>
    </html>
  );
}