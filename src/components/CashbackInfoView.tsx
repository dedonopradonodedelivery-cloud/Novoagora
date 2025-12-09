
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { ChevronLeft, Store, Sparkles, ArrowRight, Lock, Clock } from 'lucide-react';
import { CashbackIcon } from './CashbackIcon';

interface CashbackInfoViewProps {
  user: User | null;
  userRole: 'cliente' | 'lojista' | null;
  hasActiveStore?: boolean;
  onBack: () => void;
  onLogin: () => void;
  onNavigate: (view: string) => void;
}

const CASHBACK_LAUNCH = new Date('2025-12-20T12:00:00-03:00');

const CountdownDisplay = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +CASHBACK_LAUNCH - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-1.5 shadow-sm transition-colors">
        <span className="font-mono text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-center gap-2 mb-4 text-[#1E5BFF] dark:text-blue-400">
        <Clock className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest">Lançamento Oficial em</span>
      </div>
      <div className="flex justify-center gap-3">
        <TimeUnit value={timeLeft.days} label="Dias" />
        <TimeUnit value={timeLeft.hours} label="H" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="S" />
      </div>
    </div>
  );
};

export const CashbackInfoView: React.FC<CashbackInfoViewProps> = ({ 
  user, 
  userRole, 
  hasActiveStore = true, // Mock inicial assumindo que lojista tem loja
  onBack, 
  onLogin, 
  onNavigate 
}) => {

  const renderContent = () => {
    // CASO 1: NÃO LOGADO
    if (!user) {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <CashbackIcon className="w-32 h-32" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Cashback Localizei está chegando!
          </h2>

          <CountdownDisplay />

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8 max-w-xs">
            Contagem regressiva ativada! Daqui a 10 dias começa o Cashback Localizei: 5% de volta em todas as suas compras na Freguesia. Garanta seu cadastro e saia na frente.
          </p>
          
          <button 
            onClick={onLogin}
            className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Criar minha conta
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
          
          <p className="mt-4 text-xs text-gray-400">
            Já tem conta? <button onClick={onLogin} className="text-[#1E5BFF] font-bold hover:underline">Entrar</button>
          </p>
        </div>
      );
    }

    // CASO 2: LOJISTA COM LOJA ATIVA
    if (userRole === 'lojista' && hasActiveStore) {
      return (
        <div className="w-full">
          <div className="flex items-center gap-3 mb-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800">
            <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-xl text-indigo-600 dark:text-indigo-300">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">Área do Parceiro</h3>
              <p className="text-xs text-indigo-700 dark:text-indigo-400">Fidelize seus clientes com cashback</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Como vai funcionar para o seu negócio
          </h3>

          <div className="space-y-4">
            {[
              { id: 1, text: "Ativar o cashback no painel da loja." },
              { id: 2, text: "Definir a porcentagem de cashback (ex: 5%, 10%)." },
              { id: 3, text: "Clientes compram e acumulam saldo automaticamente." },
              { id: 4, text: "O lojista recebe o valor devido e pode pedir resgate via Pix." }
            ].map((step) => (
              <div key={step.id} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-sm text-gray-600 dark:text-gray-300 shrink-0 border border-gray-200 dark:border-gray-700">
                  {step.id}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 pt-1.5 leading-snug">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-500 mb-2">Status da ferramenta:</p>
            <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
              <Lock className="w-3 h-3" />
              Em desenvolvimento
            </span>
          </div>
        </div>
      );
    }

    // CASO 3: CLIENTE LOGADO (Default)
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-6">
            <CashbackIcon className="w-32 h-32" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Olá, {user.displayName?.split(' ')[0] || 'Cliente'}!
        </h2>

        <CountdownDisplay />
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-xs leading-relaxed font-medium">
          Daqui a 10 dias começa o Cashback Localizei: 5% de volta em todas as suas compras na Freguesia. Fique de olho!
        </p>

        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 text-left">
            <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">Enquanto isso...</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Navegue pelas lojas parceiras e confira as ofertas que já estão disponíveis.
            </p>
        </div>

        <button 
          onClick={() => onNavigate('explore')}
          className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Explorar lojas
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-5 h-16 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-bold text-gray-900 dark:text-white text-base">Cashback Localizei</span>
        <div className="w-8"></div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 pb-24 flex flex-col items-center min-h-[calc(100vh-64px)]">
        {renderContent()}
      </div>

    </div>
  );
};
