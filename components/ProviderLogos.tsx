"use client"; // クライアントコンポーネントとして宣言

import React from 'react';

// 追加いただいた画像リストに基づいてプロバイダーデータを定義
const providers = [
  { name: 'Pragmatic Play', id: 'Pragmatic Play', image: '/providers/pragmatic.png' },
  { name: 'Hacksaw Gaming', id: 'Hacksaw Gaming', image: '/providers/hacksaw.png' },
  { name: 'Nolimit City', id: 'Nolimit City', image: '/providers/nolimit.png' },
  { name: 'Play\'n GO', id: 'Play\'n GO', image: '/providers/playngo.png' },
  { name: 'Relax Gaming', id: 'Relax Gaming', image: '/providers/relax.png' },
  { name: 'Push Gaming', id: 'Push Gaming', image: '/providers/push.png' },
  { name: 'Evolution', id: 'Evolution', image: '/providers/evolution.png' },
  { name: 'NetEnt', id: 'NetEnt', image: '/providers/netent.png' },
  { name: 'Big Time Gaming', id: 'Big Time Gaming', image: '/providers/btg.png' },
  { name: 'Quickspin', id: 'Quickspin', image: '/providers/quick.png' },
  { name: 'Red Tiger', id: 'Red Tiger', image: '/providers/redtiger.png' },
  { name: 'Win Fast', id: 'Win Fast', image: '/providers/winfast.png' },
];

interface ProviderLogosProps {
  onProviderSelect?: (providerName: string) => void;
}

export const ProviderLogos: React.FC<ProviderLogosProps> = ({ onProviderSelect }) => {
  return (
    <section className="hidden md:block py-10 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-sm font-bold text-center mb-8 text-gray-400 tracking-widest uppercase">
          Software Providers
        </h2>
        
        {/* ロゴの数が増えたため、中央寄せで綺麗に並ぶよう調整 */}
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 max-w-6xl mx-auto">
          {providers.map((p) => {
            const Wrapper = onProviderSelect ? 'button' : 'div';
            
            return (
              <Wrapper
                key={p.name}
                {...(onProviderSelect ? { onClick: () => onProviderSelect(p.id) } : {})}
                className={`group flex flex-col items-center transition-all duration-300 transform ${
                  onProviderSelect ? 'hover:-translate-y-1 cursor-pointer' : ''
                }`}
              >
                <div className="h-10 w-28 md:w-36 flex items-center justify-center filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {onProviderSelect && (
                  <span className="mt-2 text-[9px] text-gray-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                    View Games
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};