
import React from 'react';
import { ChevronLeft, Calendar, MapPin, Clock, Users, CheckCircle, ExternalLink, Zap } from 'lucide-react';

interface FreguesiaConnectDashboardProps {
  onBack: () => void;
}

const EVENTS = [
  {
    id: 1,
    title: "Café de Negócios",
    date: "15/11",
    time: "09:00",
    location: "Padaria Imperial",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400&auto=format&fit=crop",
    attendees: 42
  },
  {
    id: 2,
    title: "Workshop: Vendas no Natal",
    date: "22/11",
    time: "19:00",
    location: "Auditório ACIF",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop",
    attendees: 85
  },
  {
    id: 3,
    title: "Happy Hour de Lojistas",
    date: "30/11",
    time: "20:00",
    location: "Bar do Zé",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop",
    attendees: 120
  }
];

export const FreguesiaConnectDashboard: React.FC<FreguesiaConnectDashboardProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-display leading-tight">
              Freguesia Connect
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Painel do Membro
            </p>
        </div>
      </div>

      <div className="p-5 pb-24">
        
        {/* Status Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-500/20 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <CheckCircle className="w-3.5 h-3.5 text-green-300" />
                    <span className="text-xs font-bold uppercase tracking-wide">Membro Ativo</span>
                </div>
                <Zap className="w-5 h-5 text-indigo-200" />
            </div>
            
            <h2 className="text-2xl font-bold font-display mb-1">Bem-vindo(a)!</h2>
            <p className="text-indigo-100 text-sm mb-6 max-w-[80%]">
                Você faz parte do grupo oficial de networking da Freguesia.
            </p>

            <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Acessar Grupo no WhatsApp
            </button>
        </div>

        {/* Próximos Encontros */}
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Encontros do Mês</h3>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Ver todos</span>
            </div>

            <div className="space-y-4">
                {EVENTS.map((event) => (
                    <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 hover:shadow-md transition-all group">
                        {/* Data Box */}
                        <div className="w-[72px] h-[72px] bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex flex-col items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800">
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                                {event.date.split('/')[1] === '11' ? 'NOV' : 'DEZ'}
                            </span>
                            <span className="text-2xl font-black text-gray-900 dark:text-white leading-none">
                                {event.date.split('/')[0]}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h4 className="font-bold text-gray-900 dark:text-white text-base leading-tight mb-1 truncate">
                                {event.title}
                            </h4>
                            
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {event.time}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {event.location}
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/10 px-2 py-0.5 rounded-md w-fit">
                                <Users className="w-3 h-3" />
                                {event.attendees} confirmados
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Convidar Amigo</span>
            </button>
            <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Sugerir Evento</span>
            </button>
        </div>

      </div>
    </div>
  );
};
