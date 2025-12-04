
import React, { useState } from 'react';
import { ChevronLeft, Mail, Copy, CheckCircle, Share2, Heart, Info, MapPin, Crown, Rocket, Star } from 'lucide-react';

interface SimplePageProps {
  onBack: () => void;
}

export const SupportView: React.FC<SimplePageProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const email = "contato.localizeifreguesia@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Suporte</h1>
      </div>
      
      <div className="p-6 flex flex-col items-center pt-12">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 text-blue-500">
            <Mail className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Precisa de ajuda?</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-xs leading-relaxed">
            Fale com a equipe Localizei. Estamos prontos para te ouvir e resolver suas dúvidas.
        </p>

        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold mb-3">Canal Oficial</p>
            <p className="text-sm font-bold text-gray-800 dark:text-white mb-6 break-all text-center bg-white dark:bg-gray-700 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-600 w-full">
                {email}
            </p>
            
            <div className="flex gap-3 w-full">
                <a 
                    href={`mailto:${email}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform active:scale-95"
                >
                    Enviar e-mail
                </a>
                <button 
                    onClick={handleCopy}
                    className="w-14 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors"
                    title="Copiar e-mail"
                >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
            </div>
        </div>
        
        <div className="mt-8 text-center px-4">
            <p className="text-xs text-gray-400">
                Nosso atendimento é feito de segunda a sexta, em horário comercial.
            </p>
        </div>
      </div>
    </div>
  );
};

export const InviteFriendView: React.FC<SimplePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Indique um Amigo</h1>
      </div>
      
      <div className="p-6 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-28 h-28 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-8 text-green-500 shadow-lg shadow-green-100 dark:shadow-none animate-bounce-short">
            <Share2 className="w-12 h-12" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Indique e Ganhe</h2>
        
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-8 max-w-xs leading-relaxed font-medium">
            Em breve você ganhará <strong>cashback</strong> por indicar amigos. Estamos preparando essa novidade para você.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 px-6 py-3 rounded-full text-xs font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Novidade chegando em breve
        </div>
      </div>
    </div>
  );
};

export const AboutView: React.FC<SimplePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Sobre a Localizei</h1>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200 dark:shadow-none">
                <MapPin className="w-10 h-10 text-white fill-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Localizei Freguesia</h2>
            <p className="text-gray-500 text-sm">O Super-app do seu bairro</p>
        </div>

        <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Nossa Missão</h3>
                <p>Conectar moradores e comércios locais, fortalecendo a economia da Freguesia de Jacarepaguá através de tecnologia acessível e benefícios reais como o Cashback.</p>
            </div>
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Nossa Visão</h3>
                <p>Ser a principal referência de busca, serviços e vantagens para quem vive e trabalha na Freguesia.</p>
            </div>
            
            <div className="bg-[#EAF0FF] dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <p className="text-xs text-blue-800 dark:text-blue-200 font-medium text-center">
                    Feito com carinho por moradores,<br/> para moradores. ❤️
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export const FavoritesView: React.FC<SimplePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Minhas lojas favoritas</h1>
      </div>
      
      <div className="p-10 flex flex-col items-center justify-center text-center mt-20">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Você ainda não tem lojas favoritas.</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[240px] leading-relaxed">
            Toque no coração das lojas para salvá-las aqui e acessar rapidamente.
        </p>
      </div>
    </div>
  );
};

export const SponsorInfoView: React.FC<SimplePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans animate-in slide-in-from-right duration-300 text-white">
      <div className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-800">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="font-bold text-lg">Patrocinador Master</h1>
      </div>
      
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-[#1E5BFF] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
            <Crown className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4 font-display text-white">Seja um Destaque</h2>
        <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-sm">
            O <strong>Patrocinador Master</strong> é uma posição exclusiva para marcas que desejam visibilidade máxima e autoridade na Freguesia.
        </p>

        <div className="w-full bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-left space-y-5 mb-8">
            <h3 className="font-bold text-yellow-400 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400" />
                Benefícios Exclusivos
            </h3>
            <ul className="space-y-4 text-sm text-gray-200">
                <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <span>Logo em destaque na abertura e cabeçalho do app.</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <span>Banner fixo de alta visibilidade na tela "Explorar".</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <span>Card exclusivo no Menu de todos os usuários.</span>
                </li>
            </ul>
        </div>

        <p className="text-xs text-gray-500 mb-4">
            Em breve abriremos novos planos para empresas interessadas.
        </p>

        <button 
            disabled 
            className="bg-gray-700 text-gray-400 font-bold py-4 px-8 rounded-full w-full cursor-not-allowed border border-gray-600"
        >
            Quero ser patrocinador
        </button>
      </div>
    </div>
  );
};
