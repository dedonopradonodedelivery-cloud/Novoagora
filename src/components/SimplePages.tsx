
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Mail, 
  Copy, 
  CheckCircle, 
  Share2, 
  Heart, 
  Info, 
  MapPin, 
  Crown, 
  Rocket, 
  Star, 
  Loader2, 
  ArrowRight, 
  Store as StoreIcon,
  Compass,
  ShieldCheck,
  TrendingUp,
  Users,
  Lightbulb,
  Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { auth } from '../lib/firebase';
import { Store, AdType } from '../types';

interface SimplePageProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-20">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Institucional</h1>
      </div>
      
      <div className="p-5 space-y-8">
        
        {/* Hero Identity */}
        <div className="flex flex-col items-center text-center mt-4">
            <div className="w-20 h-20 bg-[#1E5BFF] rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-500/20 transform rotate-3">
                <MapPin className="w-10 h-10 text-white fill-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white leading-tight">Localizei Freguesia</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">O Ecossistema do Bairro</p>
        </div>

        {/* Missão & Visão (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-[#1E5BFF] dark:text-blue-400 mb-4">
                        <Rocket className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Missão</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Criar a infraestrutura digital que impulsiona o crescimento dos negócios locais, conecta moradores à melhor experiência de consumo da Freguesia e fortalece a economia do bairro através de tecnologia simples, acessível e inteligente.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                        <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Visão</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Ser a plataforma local mais confiável e indispensável da Freguesia — referência nacional em ecossistemas de bairro — oferecendo oportunidades reais para pequenos empreendedores prosperarem e para moradores viverem melhor.
                    </p>
                </div>
            </div>
        </div>

        {/* Valores (List) */}
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 px-1 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Nossos Valores
            </h3>
            <div className="space-y-4">
                {[
                    { icon: Heart, color: 'text-red-500', bg: 'bg-red-50', title: "Impacto real", desc: "Decisões baseadas no que melhora a vida das pessoas." },
                    { icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50', title: "Transparência", desc: "Relações claras e honestas com lojistas e usuários." },
                    { icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', title: "Crescimento compartilhado", desc: "Quando o bairro cresce, todos ganham." },
                    { icon: Users, color: 'text-purple-500', bg: 'bg-purple-50', title: "Proximidade", desc: "Construído por quem vive a Freguesia." },
                    { icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50', title: "Excelência simples", desc: "Tecnologia funcional, bonita e fácil de usar." }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg} dark:bg-opacity-10`}>
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Manifesto (Highlight) */}
        <div className="relative w-full rounded-[32px] bg-gradient-to-br from-[#1E5BFF] to-[#1749CC] p-8 text-white shadow-xl shadow-blue-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <Lightbulb className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                </div>
                
                <h3 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-4">Manifesto</h3>
                
                <p className="text-lg font-medium leading-relaxed mb-6">
                    "A Localizei nasce para iluminar o comércio da Freguesia, conectar pessoas ao que o bairro tem de melhor e fortalecer cada empreendedor que faz a economia local acontecer."
                </p>
                
                <p className="text-sm text-blue-100 leading-relaxed font-light mb-6">
                    Somos tecnologia com propósito, comunidade com força e a ponte entre quem vende e quem procura.
                </p>

                <div className="bg-white/10 px-6 py-3 rounded-full border border-white/20 backdrop-blur-sm">
                    <p className="text-sm font-bold">O bairro é grande. Os negócios, maiores ainda.</p>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 pb-2">
            <p className="text-xs text-gray-400 font-medium">
                Feito com 💙 na Freguesia
            </p>
        </div>

      </div>
    </div>
  );
};

export const FavoritesView: React.FC<SimplePageProps> = ({ onBack, onNavigate }) => {
  const [favorites, setFavorites] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("businesses(*)")
          .eq("user_id", user.uid);

        if (error) throw error;

        // Mapear a resposta para o formato Store
        const mappedStores: Store[] = (data || []).map((item: any) => {
          const b = item.businesses;
          return {
            id: b.id,
            name: b.name,
            category: b.category,
            subcategory: b.subCategory,
            image: b.imageUrl || 'https://via.placeholder.com/100',
            rating: b.rating || 0,
            description: b.description || '',
            distance: 'Freguesia • RJ', // Campo calculado/fictício por enquanto
            adType: AdType.ORGANIC,
            reviewsCount: 0,
            verified: true // Assumindo verificado por padrão na lista de favoritos
          };
        });

        setFavorites(mappedStores);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Função para remover da lista local imediatamente ao desfavoritar
  const handleRemove = async (storeId: string) => {
    if (!user || !supabase) return;
    
    // Optimistic update
    setFavorites(prev => prev.filter(s => s.id !== storeId));

    try {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .match({ user_id: user.uid, business_id: storeId });
        
        if (error) throw error;
    } catch(err) {
        console.error(err);
        // Em um app real, reverteríamos o estado aqui
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Minhas lojas favoritas</h1>
      </div>
      
      <div className="p-5 pb-24">
        {loading ? (
            <div className="flex justify-center pt-20">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-20">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-gray-400 fill-gray-200 dark:fill-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 px-8">
                    Você ainda não salvou nenhuma loja.
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[240px] leading-relaxed mb-8">
                    Explore o aplicativo e adicione seus favoritos para acessá-los rapidamente aqui!
                </p>
                {onNavigate && (
                    <button 
                        onClick={() => onNavigate('explore')}
                        className="bg-[#1E5BFF] text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2 active:scale-95 transition-transform"
                    >
                        Explorar Lojas
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-4">
                {favorites.map(store => (
                    <div key={store.id} className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 items-center group">
                        <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                            {store.image ? (
                                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <StoreIcon className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{store.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{store.category}</p>
                            <div className="flex items-center gap-1 mt-1.5 text-xs font-medium text-yellow-500">
                                <Star className="w-3 h-3 fill-yellow-500" />
                                <span>{store.rating || 'New'}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleRemove(store.id)}
                            className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full hover:bg-red-100 transition-colors active:scale-90"
                        >
                            <Heart className="w-5 h-5 fill-red-500" />
                        </button>
                    </div>
                ))}
            </div>
        )}
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
