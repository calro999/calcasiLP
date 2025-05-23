// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed w-full bg-black bg-opacity-70 backdrop-blur-md z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/icon.png"
            alt="サイトロゴ"
            width={40}
            height={40}
            className="rounded-full"
          />
          {/* サイト名を「calcasiどっとこむ」に修正 */}
          <span className="text-white text-2xl font-bold tracking-tight">
            calcasiどっとこむ
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-lg font-semibold">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/latest-news" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-lg font-semibold">
                最新情報
              </Link>
            </li>
            {/* ここから追加するリンク */}
            <li>
              <Link href="/beginners-guide" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-lg font-semibold">
                初心者ガイド
              </Link>
            </li>
            <li>
              <Link href="/strategies" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-lg font-semibold">
                攻略法
              </Link>
            </li>
            <li>
              <Link href="/casino-ranking" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-lg font-semibold">
                カジノランキング
              </Link>
            </li>
            {/* ここまで追加するリンク */}
            <li>
              {/* お問い合わせボタンとしてスタイルを変更 */}
              <Link href="/contact" className="px-5 py-2 bg-amber-500 text-black text-lg font-semibold rounded-full hover:bg-amber-600 transition-colors duration-200">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}