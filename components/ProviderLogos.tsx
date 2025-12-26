import React from 'react';

const providers = [
  { name: 'Pragmatic Play', image: '/providers/pragmatic.png' },
  { name: 'Hacksaw Gaming', image: '/providers/hacksaw.png' },
  { name: 'Nolimit City', image: '/providers/nolimit.png' },
  { name: 'Play\'n GO', image: '/providers/playngo.png' },
  { name: 'Relax Gaming', image: '/providers/relax.png' },
  { name: 'Push Gaming', image: '/providers/push.png' },
  { name: 'Win Fast', image: '/providers/winfast.png' },
];

export const ProviderLogos = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">主要プロバイダー</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
          {providers.map((p) => (
            <div key={p.name} className="w-32 md:w-40 flex flex-col items-center">
              <img src={p.image} alt={p.name} className="h-12 object-contain mb-2" />
              <span className="text-xs text-gray-500 font-medium">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};