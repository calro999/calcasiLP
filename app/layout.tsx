// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script"; // ✅ GA用に追加

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
      <head>
        {/* ✅ Googleアナリティクスのスクリプト */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-D4M7BJXJWJ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D4M7BJXJWJ');
          `}
        </Script>

        {/* ✅ Google Search Console 用（登録済みなら） */}
        <meta name="google-site-verification" content="DkCMrOjpxPVzY0T8G34bKQQDsDP9Biu83kk2wfz5hz4" />
        
      </head>
      <body className={inter.className}>
        <body className={`${inter.className} bg-black text-white`}>
        <Header />
        {children}
        <Footer />
      </body>
      </body>
    </html>
  );
}
