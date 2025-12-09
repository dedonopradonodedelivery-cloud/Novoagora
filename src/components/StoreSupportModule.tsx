
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  LifeBuoy
} from 'lucide-react';

interface StoreSupportModuleProps {
  onBack: () => void;
}

const FAQ_ITEMS = [
  { q: "Como alterar o horário de funcionamento?", a: "Acesse o menu 'Minha Loja' e vá até a aba 'Horários'. Lá você pode definir os horários padrão e adicionar exceções para feriados." },
  { q: "Como funciona o pagamento do anúncio?", a: "Os anúncios são cobrados via cartão de crédito cadastrado ou boleto. As cobranças são geradas no dia 5 de cada mês." },
  { q: "O que é o Freguesia Connect?", a: "É o nosso programa exclusivo de networking para lojistas. Você pode se inscrever através do menu principal do painel." },
  { q: "Posso cancelar a qualquer momento?", a: "Sim, não há fidelidade nos planos mensais. O cancelamento deve ser solicitado até 3 dias antes da renovação." },
];

const TICKETS = [
  { id: '#4829', subject: 'Problema com upload de fotos', status: 'closed', date: '10/10/2023' },
  { id: '#5102', subject: 'Dúvida sobre taxa de cashback', status: 'open', date: '05/11/2023' },
];

export const StoreSupportModule: React.FC<StoreSupportModuleProps> = ({ onBack }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getStatusBadge = (status: string) => {
    return status === 'open' 
      ? <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Aberto</span>
      : <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Resolvido</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-20">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Suporte ao Lojista</h1>
      </div>

      <div className="p-5 space-y-8">
        
        {/* Community Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-32 bg-white/10 skew-x-12 -mr-8"></div>
            <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2">Comunidade Oficial</h2>
                <p className="text-blue-100 text-sm mb-6 max-w-[240px]">
                    Entre no nosso grupo de lojistas no WhatsApp para dicas rápidas e avisos importantes.
                </p>
                <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm">
                    <ExternalLink className="w-4 h-4" />
                    Entrar no grupo
                </button>
            </div>
        </div>

        {/* FAQ Section */}
        <section>
            <div className="flex items-center gap-2 mb-4 px-1">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-gray-900 dark:text-white">Perguntas Frequentes</h3>
            </div>
            
            <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
                        <button 
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.q}</span>
                            {openFaqIndex === index ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>
                        {openFaqIndex === index && (
                            <div className="px-4 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 pt-3">
                                {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>

        {/* Tickets Section */}
        <section>
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <LifeBuoy className="w-5 h-5 text-gray-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Meus Chamados</h3>
                </div>
                <button className="flex items-center gap-1 text-[#1E5BFF] text-xs font-bold bg-[#EAF0FF] dark:bg-blue-900/10 px-3 py-1.5 rounded-full">
                    <Plus className="w-3 h-3" /> Novo
                </button>
            </div>

            <div className="space-y-3">
                {TICKETS.map((ticket, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between group cursor-pointer hover:border-[#1E5BFF]/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900 dark:text-white">{ticket.subject}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-400">{ticket.id}</span>
                                    <span className="text-[10px] text-gray-300">•</span>
                                    <span className="text-xs text-gray-400">{ticket.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(ticket.status)}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <div className="text-center pt-8">
            <p className="text-xs text-gray-400">Atendimento de Seg a Sex, das 9h às 18h.</p>
        </div>

      </div>
    </div>
  );
};
