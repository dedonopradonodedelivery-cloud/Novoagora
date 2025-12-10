
import React from 'react';
import { ChevronLeft, ShieldCheck, FileText } from 'lucide-react';

interface ServiceTermsViewProps {
  onBack: () => void;
}

export const ServiceTermsView: React.FC<ServiceTermsViewProps> = ({ onBack }) => {
  const currentDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 relative">
      
      {/* Giant Hero Banner */}
      <div className="relative w-full h-[320px] bg-gradient-to-br from-[#1E5BFF] to-[#4D7CFF]">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-5 pt-6 z-20 flex items-center">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Banner Content */}
        <div className="absolute bottom-12 left-0 right-0 px-6 z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mb-4 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white uppercase tracking-wide">Segurança & Transparência</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3 font-display drop-shadow-sm leading-tight">
            Termos de Uso da Solicitação de Orçamentos
          </h1>
          <p className="text-blue-50 text-sm leading-relaxed max-w-sm font-medium">
            Entenda como funciona a intermediação entre você e os profissionais da Freguesia.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-20 -mt-8 bg-white dark:bg-gray-900 rounded-t-[32px] px-6 py-8 pb-16 min-h-[60vh] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        
        <div className="mb-8 flex items-center gap-2 text-xs text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800 pb-4">
            <FileText className="w-4 h-4" />
            <span>Última atualização: {currentDate}</span>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <p className="mb-6 font-medium">
                Ao utilizar a funcionalidade de solicitação de orçamentos do Localizei Freguesia, você concorda com os termos abaixo:
            </p>

            <div className="space-y-8">
                <section>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Natureza da Plataforma</h3>
                    <p className="text-sm leading-relaxed">
                        O Localizei Freguesia é apenas uma plataforma de intermediação, cujo objetivo é aproximar usuários de profissionais e prestadores de serviços da região. Não realizamos, executamos ou supervisionamos qualquer serviço oferecido pelos profissionais cadastrados.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. Responsabilidade pelos Serviços</h3>
                    <p className="text-sm leading-relaxed">
                        Todos os serviços, prazos, valores, visitas, garantias, pagamentos e resultados são de responsabilidade exclusiva do profissional contratado e do usuário. O Localizei Freguesia não participa da negociação, contratação, execução ou acompanhamento dos serviços.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Qualidade e Veracidade das Informações</h3>
                    <p className="text-sm leading-relaxed">
                        Os profissionais são responsáveis pelas informações fornecidas, incluindo descrição, experiência, valores e disponibilidade. O Localizei Freguesia não garante a veracidade, qualidade ou adequação das informações apresentadas por terceiros.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">4. Relação entre Usuário e Profissional</h3>
                    <p className="text-sm leading-relaxed">
                        Qualquer relação comercial estabelecida entre usuário e profissional ocorre de forma direta, sem vínculo com o Localizei Freguesia. O usuário é responsável por avaliar o profissional e decidir se deseja prosseguir com a contratação.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">5. Limitação de Responsabilidade</h3>
                    <p className="text-sm leading-relaxed">
                        O Localizei Freguesia não se responsabiliza por danos materiais, financeiros, físicos, morais ou de qualquer natureza decorrentes de serviços mal executados, atrasos, acordos não cumpridos, pagamentos, fraudes ou conflitos entre as partes. O uso da plataforma acontece por conta e risco do usuário.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">6. Segurança e Cuidados</h3>
                    <p className="text-sm leading-relaxed">
                        Recomendamos que o usuário valide a identidade do profissional, solicite referências, combine detalhes do serviço por escrito, utilize meios de pagamento seguros e evite fornecer informações sensíveis sem necessidade.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">7. Atualizações do Termo</h3>
                    <p className="text-sm leading-relaxed">
                        Este termo pode ser atualizado a qualquer momento. A versão mais recente estará sempre disponível na plataforma.
                    </p>
                </section>
            </div>
        </div>

        {/* Footer Button */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-center">
            <button 
                onClick={onBack}
                className="text-[#1E5BFF] font-bold text-sm hover:text-[#1749CC] transition-colors flex items-center gap-2 px-6 py-3 rounded-full bg-[#EAF0FF] dark:bg-blue-900/10"
            >
                <ChevronLeft className="w-4 h-4" />
                Voltar para Serviços
            </button>
        </div>

      </div>
    </div>
  );
};
