import React from 'react';

// ロゴのデータ定義
const providers = [
  { name: 'Pragmatic Play', id: 'Pragmatic Play', image: '/providers/pragmatic.png' },
  { name: 'Hacksaw Gaming', id: 'Hacksaw Gaming', image: '/providers/hacksaw.png' },
  { name: 'Nolimit City', id: 'Nolimit City', image: '/providers/nolimit.png' },
  { name: 'Play\'n GO', id: 'Play\'n GO', image: '/providers/playngo.png' },
  { name: 'Relax Gaming', id: 'Relax Gaming', image: '/providers/relax.png' },
  { name: 'Push Gaming', id: 'Push Gaming', image: '/providers/push.png' },
  { name: 'Win Fast', id: 'Win Fast', image: '/providers/winfast.png' },
];

interface ProviderLogosProps {
  onProviderSelect?: (providerName: string) => void;
}

export const ProviderLogos: React.FC<ProviderLogosProps> = ({ onProviderSelect }) => {
  return (
    // モバイルでは非表示(hidden)、PCサイズ以上で表示(md:block)
    <section className="hidden md:block py-10 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-sm font-bold text-center mb-8 text-gray-400 tracking-widest uppercase">
          Software Providers
        </h2>
        
        {/* デザインを整えたロゴグリッド */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 max-w-5xl mx-auto">
          {providers.map((p) => (
            <button
              key={p.name}
              onClick={() => onProviderSelect?.(p.id)}
              className="group flex flex-col items-center transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-12 w-32 md:w-40 flex items-center justify-center filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="mt-2 text-[10px] text-gray-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                View Games
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};