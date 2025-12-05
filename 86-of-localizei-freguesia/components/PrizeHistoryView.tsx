
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, Wallet, Ticket, Meh, RefreshCw, Loader2, AlertTriangle, Dices, ArrowRight } from 'lucide-react';

// --- Tipos ---
interface PrizeHistoryViewProps {
  userId: string;
  onBack: () => void;
  onGoToSpinWheel: () => void;
}

interface Spin {
  id: string;
  spin_date: string;
  prize_type: 'cashback' | 'cupom' | 'nao_foi_dessa_vez' | 'gire_de_novo';
  prize_label: string;
  status: 'creditado' | 'expirado' | 'pendente' | 'nao_aplicavel';
  expires_at?: string | null;
}

type LoadingStatus = 'idle' | 'loading' | 'loading-more' | 'error' | 'empty' | 'success';

const PAGE_SIZE = 20;

// --- Componentes Internos ---
const StatusBadge: React.FC<{ status: Spin['status'] }> = ({ status }) => {
  const styles = {
    creditado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    expirado: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    nao_aplicavel: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
  };
  return <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${styles[status]}`}>{status.replace('_', ' ')}</span>;
};

const PrizeIcon: React.FC<{ type: Spin['prize_type'] }> = ({ type }) => {
  const iconMap = {
    cashback: <Wallet className="w-4 h-4 text-green-500" />,
    cupom: <Ticket className="w-4 h-4 text-blue-500" />,
    nao_foi_dessa_vez: <Meh className="w-4 h-4 text-gray-500" />,
    gire_de_novo: <RefreshCw className="w-4 h-4 text-purple-500" />,
  };
  return <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">{iconMap[type]}</div>;
};

const SkeletonCard: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3 animate-pulse">
    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    <div className="flex-1 space-y-2">
      <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
    <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
  </div>
);

// --- Componente Principal ---
export const PrizeHistoryView: React.FC<PrizeHistoryViewProps> = ({ userId, onBack, onGoToSpinWheel }) => {
  const [spins, setSpins] = useState<Spin[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('loading');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchSpins = useCallback(async (currentPage: number) => {
    if (!hasMore && currentPage > 0) return;

    setStatus(currentPage === 0 ? 'loading' : 'loading-more');
    
    if (!supabase) {
      setStatus('error');
      console.error("Supabase client is not available.");
      return;
    }

    try {
      const from = currentPage * PAGE_SIZE;
      const { data, error, count } = await supabase
        .from('roulette_spins')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('spin_date', { ascending: false })
        .range(from, from + PAGE_SIZE - 1);

      if (error) throw error;
      
      const newSpins = data as Spin[];
      setSpins(prev => currentPage === 0 ? newSpins : [...prev, ...newSpins]);
      
      if (newSpins.length < PAGE_SIZE || (spins.length + newSpins.length) === count) {
        setHasMore(false);
      }
      
      if ((currentPage === 0 && newSpins.length === 0) || count === 0) {
        setStatus('empty');
      } else {
        setStatus('success');
      }

    } catch (err) {
      console.error("Error fetching spin history:", err);
      setStatus('error');
    }
  }, [userId, hasMore, spins.length]);

  useEffect(() => {
    fetchSpins(0);
  }, [userId]); // Apenas na montagem inicial

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (status === 'loading-more') return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
        fetchSpins(page + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [status, hasMore, fetchSpins, page]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };
  
  const getSubtext = (spin: Spin) => {
      if (spin.prize_type === 'nao_foi_dessa_vez') return "Tente novamente amanhã!";
      if (spin.prize_type === 'cupom') return "Use nas lojas participantes.";
      if (spin.expires_at) return `Válido até ${formatDate(spin.expires_at).split(' ')[0]}`;
      return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-gray-950 font-sans animate-in slide-in-from-right duration-300">
      {/* Header Fixo */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-white font-display">Histórico de Prêmios</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Seus giros na Roleta da Freguesia.</p>
          </div>
        </div>
      </header>

      <main className="p-4 pb-24">
        {status === 'loading' && (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {status === 'empty' && (
          <div className="flex flex-col items-center justify-center text-center pt-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 opacity-60">
                <Dices className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Nenhum giro encontrado</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8 text-sm">Você ainda não girou a Roleta da Freguesia.</p>
            <button onClick={onGoToSpinWheel} className="w-full max-w-xs bg-gradient-to-r from-[#1E5BFF] to-[#4D7CFF] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
              Girar pela primeira vez
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center justify-center text-center pt-12">
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Ocorreu um erro</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8 text-sm">Não foi possível carregar seu histórico.</p>
            <button onClick={() => fetchSpins(0)} className="font-bold text-primary-500 text-sm">
              Tentar Novamente
            </button>
          </div>
        )}
        
        {(status === 'success' || status === 'loading-more') && (
            <div className="space-y-3">
                {spins.map((spin, index) => (
                    <div 
                        key={spin.id}
                        ref={index === spins.length - 1 ? lastElementRef : null}
                        className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                    >
                        <PrizeIcon type={spin.prize_type} />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-gray-800 dark:text-white text-xs">{spin.prize_label}</h3>
                                <StatusBadge status={spin.status} />
                            </div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{formatDate(spin.spin_date)}</p>
                            {getSubtext(spin) && <p className="text-[11px] text-gray-400 mt-1">{getSubtext(spin)}</p>}
                        </div>
                    </div>
                ))}

                {status === 'loading-more' && <SkeletonCard />}
            </div>
        )}
      </main>
    </div>
  );
};
