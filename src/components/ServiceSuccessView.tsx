
import React from 'react';
import { CheckCircle2, Home, FileText, Clock, Users, MessageSquare, ChevronRight } from 'lucide-react';

interface ServiceSuccessViewProps {
  onViewRequests: () => void;
  onHome: () => void;
}

export const ServiceSuccessView: React.FC<ServiceSuccessViewProps> = ({ onViewRequests, onHome }) => {
  
  const steps = [
    { id: 1, label: 'Pedido enviado', icon: FileText, active: true, completed: true },
    { id: 2, label: 'Aguardando respostas', icon: Clock, active: false, completed: false },
    { id: 3, label: 'Profissionais interessados', icon: Users, active: false, completed: false },
    { id: 4, label: 'Chat / Contato', icon: MessageSquare, active: false, completed: false },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      {/* Success Icon */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-lg shadow-green-200 dark:shadow-none animate-bounce-short">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        {/* Decorative particles */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-2 left-0 w-3 h-3 bg-green-300 rounded-full opacity-50 animate-ping animation-delay-300"></div>
      </div>

      {/* Texts */}
      <div className="text-center mb-10 max-w-xs">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          Pedido enviado com sucesso!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Profissionais da Freguesia vão entrar em contato em breve.
        </p>
      </div>

      {/* Status Timeline Box */}
      <div className="w-full max-w-sm bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 mb-10 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 text-center">
            Status do Pedido
        </h3>
        <div className="space-y-6 relative">
            {/* Connecting Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

            {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                    <div key={step.id} className="relative z-10 flex items-center gap-4">
                        <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                                step.active || step.completed
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-600'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className={`text-sm font-bold transition-colors ${
                                step.active || step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'
                            }`}>
                                {step.label}
                            </p>
                        </div>
                        {(step.active || step.completed) && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                    </div>
                );
            })}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <button 
          onClick={onViewRequests}
          className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          Ver meus pedidos
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={onHome}
          className="w-full py-4 text-gray-500 dark:text-gray-400 font-bold text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Voltar ao início
        </button>
      </div>

    </div>
  );
};
