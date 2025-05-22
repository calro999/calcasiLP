// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed w-full bg-black bg-opacity-70 backdrop-blur-md z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* srcをダミーのplaceholder.svgに変更 */}
          <Image
            src="/placeholder.svg" // ここを修正
            alt="サイトロゴ"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-white text-2xl font-bold tracking-tight">
            Casino Insight
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
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-lg font-semibold">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}