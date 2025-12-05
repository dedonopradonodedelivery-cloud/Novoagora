
import React from 'react';

const mockPosts = [
  { id: 1, user: "Padaria do Vale", text: "Pão quentinho saindo agora! 🔥", time: "5 min atrás" },
  { id: 2, user: "Pet Club Freguesia", text: "Promoção de banho & tosa hoje!", time: "20 min atrás" },
  { id: 3, user: "Studio Vida Fitness", text: "Aula experimental gratuita!", time: "1h atrás" },
];

const LocalFeedSection = () => {
  return (
    <div className="px-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Da nossa comunidade</h2>
      <div className="flex flex-col gap-3">
        {mockPosts.map(post => (
          <div key={post.id} className="p-3 rounded-premium bg-white dark:bg-gray-800 shadow-light border border-gray-100 dark:border-gray-700">
            <p className="font-semibold text-sm text-gray-900 dark:text-white">{post.user}</p>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{post.text}</p>
            <p className="text-xs text-gray-400 mt-2">{post.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalFeedSection;
