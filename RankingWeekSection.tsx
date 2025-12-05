
import React from 'react';

const mockRanking = [
  { id: 1, name: 'Burger Freguesia', rating: 4.9, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600' },
  { id: 2, name: 'Padaria do Vale', rating: 4.8, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600' },
  { id: 3, name: 'Studio Vida Fitness', rating: 4.7, image: 'https://images.unsplash.com/photo-1554344058-8d1d1dbc5960?w=600' }
];

const RankingWeekSection = () => {
  return (
    <div className="px-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Top da Semana</h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {mockRanking.map(item => (
          <div key={item.id} className="min-w-[160px] rounded-premium bg-white dark:bg-gray-800 shadow-light overflow-hidden border border-gray-100 dark:border-gray-700">
            <img src={item.image} className="h-24 w-full object-cover" alt={item.name} />
            <div className="p-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
              <p className="text-xs text-yellow-500 font-bold flex items-center gap-1">
                {item.rating} ⭐
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingWeekSection;
