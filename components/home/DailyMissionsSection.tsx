
import React from 'react';
import { Target, CheckCircle2, Trophy } from 'lucide-react';

const missions = [
  { id: 1, title: "Descubra 1 loja nova", reward: "+5 XP", icon: <Target className="w-5 h-5 text-blue-500" />, progress: 0, total: 1, completed: false },
  { id: 2, title: "Visite uma categoria", reward: "+3 XP", icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, progress: 1, total: 1, completed: true },
  { id: 3, title: "Veja 3 lojas verificadas", reward: "+10 XP", icon: <Trophy className="w-5 h-5 text-purple-500" />, progress: 1, total: 3, completed: false },
];

const DailyMissionsSection = () => {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Missões do Dia</h2>
        <span className="text-xs font-bold text-gray-400">Reseta em 12h</span>
      </div>
      <div className="flex flex-col gap-3">
        {missions.map(m => (
          <div key={m.id} className={`p-4 rounded-premium border flex items-center justify-between transition-all ${m.completed ? 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-800' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-light'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${m.completed ? 'bg-green-200/50 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                {m.icon}
              </div>
              <div>
                <p className={`text-sm font-bold ${m.completed ? 'text-green-700 dark:text-green-400 line-through opacity-70' : 'text-gray-800 dark:text-gray-200'}`}>
                    {m.title}
                </p>
                <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${m.completed ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${(m.progress / m.total) * 100}%` }}
                    ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${m.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-700'}`}>
                    {m.reward}
                </span>
                <span className="text-[10px] text-gray-400 mt-1 font-medium">{m.progress}/{m.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyMissionsSection;
