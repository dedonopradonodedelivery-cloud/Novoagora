
import React from 'react';
import { Utensils, Briefcase, Dog, Heart } from 'lucide-react';

interface IntentExploreSectionProps {
  title?: string;
}

const intents = [
  { id: 1, label: 'Quero comer', icon: <Utensils className="w-7 h-7 text-primary-600" /> },
  { id: 2, label: 'Preciso de um profissional', icon: <Briefcase className="w-7 h-7 text-primary-600" /> },
  { id: 3, label: 'Cuidar do meu pet', icon: <Dog className="w-7 h-7 text-primary-600" /> },
  { id: 4, label: 'Me mimar', icon: <Heart className="w-7 h-7 text-primary-600" /> },
];

const IntentExploreSection: React.FC<IntentExploreSectionProps> = ({ title }) => {
  return (
    <div className="px-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        {title || 'Explorar por intenção'}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {intents.map(item => (
          <div key={item.id} className="rounded-premium bg-white dark:bg-gray-800 shadow-light p-4 flex flex-col items-start border border-gray-100 dark:border-gray-700 active:scale-95 transition-transform cursor-pointer">
            <div className="mb-3 bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">{item.icon}</div>
            <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntentExploreSection;
