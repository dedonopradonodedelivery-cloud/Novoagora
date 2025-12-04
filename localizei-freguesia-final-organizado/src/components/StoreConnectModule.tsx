
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Users, 
  Zap, 
  Handshake, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Download, 
  ExternalLink,
  Lock
} from 'lucide-react';

interface StoreConnectModuleProps {
  onBack: () => void;
}

type MemberStatus = 'inactive' | 'pending' | 'active';

export const StoreConnectModule: React.FC<StoreConnectModuleProps> = ({ onBack }) => {
  // Toggle this state to simulate different user journeys
  const [status, setStatus] = useState<MemberStatus>('inactive');

  const handleJoin = () => {
    setStatus('pending');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-20">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Freguesia Connect</h1>
      </div>

      <div className="p-5 space-y-6">
        
        {/* --- STATUS BLOCK --- */}
        {status === 'inactive' && (
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold font-display mb-2">Networking Empresarial</h2>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                Faça parte do grupo exclusivo de lojistas da Freguesia. Troque experiências, feche parcerias e acesse eventos VIP.
              </p>
              <button 
                onClick={handleJoin}
                className="w-full bg-white text-indigo-700 font-bold py-3.5 rounded-xl shadow-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
              >
                Quero participar
                <Zap className="w-4 h-4 fill-indigo-700" />
              </button>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4 text-yellow-600 dark:text-yellow-400">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Solicitação Enviada</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Estamos analisando o perfil da sua loja. Em breve você receberá a confirmação de acesso ao grupo.
            </p>
            <button onClick={() => setStatus('active')} className="text-xs text-gray-400 underline">
              (Simular Aprovação)
            </button>
          </div>
        )}

        {status === 'active' && (
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Membro Ativo</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Você tem acesso total aos benefícios.</p>
            </div>
          </div>
        )}

        {/* --- BENEFITS LIST --- */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-1">Benefícios do Programa</h3>
          <div className="grid gap-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex gap-4 items-start">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Parcerias Locais</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Conecte-se com fornecedores e parceiros B2B.</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex gap-4 items-start">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Eventos Exclusivos</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Workshops e encontros presenciais.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- ACTIVE MEMBER CONTENT --- */}
        {status === 'active' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            
            {/* Next Event */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-1">Próximo Encontro</h3>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="h-24 bg-indigo-600 relative p-4 flex items-end">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                  <div className="relative z-10 text-white">
                    <p className="text-xs font-medium opacity-80 uppercase tracking-wide">Workshop</p>
                    <h4 className="font-bold text-lg">Estratégias de Vendas Natal</h4>
                  </div>
                </div>
                <div className="p-4 flex gap-4">
                  <div className="flex flex-col items-center justify-center px-4 border-r border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-gray-400 uppercase">NOV</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">22</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <Clock className="w-3.5 h-3.5" /> 19:00
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <Users className="w-3.5 h-3.5" /> Auditório ACIF
                    </div>
                    <button className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                      Confirmar presença
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Exclusive Materials */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-1">Materiais Exclusivos</h3>
              <div className="grid gap-3">
                <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between group active:scale-[0.98] transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">
                      <Download className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Calendário do Varejo 2024</p>
                      <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                </button>

                <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between group active:scale-[0.98] transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                      <Download className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Kit Marketing Digital</p>
                      <p className="text-xs text-gray-500">ZIP • 15 MB</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
