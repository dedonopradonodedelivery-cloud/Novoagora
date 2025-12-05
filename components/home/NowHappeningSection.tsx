
import React from 'react';

const mockNow = [
  { id: 1, title: 'Promoção no Hortifruti', subtitle: 'Válido até 14h', image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?w=600&auto=format&fit=crop' },
  { id: 2, title: 'Novidade: Studio de Pilates', subtitle: 'Aberto hoje', image: 'https://images.unsplash.com/photo-1554344058-8d1d1dbc5960?w=600&auto=format&fit=crop' },
  { id: 3, title: 'Top Avaliado da Semana', subtitle: '4.9 ⭐', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop' }
];

const NowHappeningSection = () => {
  return (
    <div className="px-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Acontecendo agora na Freguesia</h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {mockNow.map(item => (
          <div key={item.id} className="min-w-[220px] rounded-premium shadow-light bg-white dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-700">
            <img src={item.image} className="h-28 w-full object-cover" alt={item.title} />
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowHappeningSection;
