
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
  Lock,
  Info,
  X,
  Target,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';

interface StoreConnectModuleProps {
  onBack: () => void;
}

type MemberStatus = 'inactive' | 'pending' | 'active';

export const StoreConnectModule: React.FC<StoreConnectModuleProps> = ({ onBack }) => {
  const [status, setStatus] = useState<MemberStatus>('inactive');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleJoinRequest = () => {
    setShowInfoModal(false);
    setStatus('pending');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-20 relative">
      
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
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold font-display mb-3 leading-tight">
                Rede de Networking Empresarial
              </h2>
              
              <ul className="space-y-2 mb-6 text-indigo-100 text-sm font-medium">
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-300 shrink-0" />
                    Parcerias B2B estratégicas
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-300 shrink-0" />
                    Eventos presenciais e online
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-300 shrink-0" />
                    Benefícios exclusivos para lojistas
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-300 shrink-0" />
                    Aumento de vendas e autoridade
                </li>
              </ul>

              <button 
                onClick={() => setShowInfoModal(true)}
                className="w-full bg-white text-indigo-700 font-bold py-3.5 rounded-xl shadow-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                <Info className="w-4 h-4" />
                Entenda como funciona
              </button>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-6 flex flex-col items-center text-center animate-in fade-in">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4 text-yellow-600 dark:text-yellow-400">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Solicitação Enviada</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Estamos analisando o nicho da sua loja para garantir a exclusividade do grupo. Em breve você receberá a confirmação.
            </p>
            <button onClick={() => setStatus('active')} className="text-xs text-gray-400 underline">
              (Simular Aprovação)
            </button>
          </div>
        )}

        {status === 'active' && (
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-3xl p-6 flex items-center gap-4 animate-in fade-in">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Membro Ativo</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Você tem acesso total à rede Freguesia Connect.</p>
            </div>
          </div>
        )}

        {/* --- BENEFITS LIST --- */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-1">O que você ganha</h3>
          <div className="grid gap-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex gap-4 items-start">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Conexões Reais</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Negócios fechados diretamente entre membros, sem intermediários.</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex gap-4 items-start">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Eventos VIP</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cafés da manhã de negócios e workshops focados no varejo local.</p>
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

      {/* --- EXPLANATORY MODAL --- */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300">
            <div 
                className="bg-white dark:bg-gray-900 w-full max-w-md h-[90vh] rounded-t-3xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-10">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sobre o Programa</h2>
                    <button 
                        onClick={() => setShowInfoModal(false)}
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-8">
                    
                    {/* Intro */}
                    <div className="text-center">
                        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                            <Handshake className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display">
                            Mais que um grupo.<br/>Uma aliança de crescimento.
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            O Freguesia Connect foi criado para lojistas que querem ir além da venda balcão e construir relacionamentos duradouros no bairro.
                        </p>
                    </div>

                    {/* Regras de Ouro */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-indigo-500" />
                            Regras de Exclusividade
                        </h4>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center font-bold text-sm text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-600 shrink-0">
                                    25
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white text-sm">Limite de Lojistas</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        Grupos pequenos para garantir que todos tenham voz e oportunidades reais.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center font-bold text-sm text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-gray-600 shrink-0">
                                    <Target className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white text-sm">Exclusividade de Nicho</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        Apenas 1 empresa por segmento por grupo. Se você é a "Hamburgueria" do Grupo A, nenhuma outra entra. Sem concorrência interna.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Real Use Cases */}
                    <div>
                        <h4 className="text-base font-bold text-gray-900 dark:text-white mb-4">O que acontece lá dentro?</h4>
                        <div className="grid gap-3">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-2">"Fechei o fornecimento de café da manhã para 3 escritórios de contabilidade que conheci no evento presencial."</p>
                                <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">— Padaria Estrela</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-2">"Consegui uma parceria com uma academia para dar descontos aos meus alunos de inglês. Win-win."</p>
                                <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">— Escola Talk</p>
                            </div>
                        </div>
                    </div>

                    {/* Objection Handling */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Vale o investimento?</h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                            O valor para participar é simbólico comparado ao retorno de uma única parceria B2B bem-sucedida. Além disso, você ganha acesso a treinamentos que custariam muito mais fora daqui.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-indigo-900/20 px-3 py-2 rounded-lg w-fit">
                            <Award className="w-3 h-3" />
                            Retorno sobre investimento garantido
                        </div>
                    </div>

                </div>

                {/* Modal Footer CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                    <button 
                        onClick={handleJoinRequest}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Solicitar minha vaga
                        <ChevronLeft className="w-5 h-5 rotate-180" />
                    </button>
                    <p className="text-[10px] text-center text-gray-400 mt-2">
                        Sujeito a disponibilidade de vaga no seu nicho.
                    </p>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};
