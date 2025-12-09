import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Clock, DollarSign, User, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface MerchantCashbackRequestsProps {
  merchantId: string; // ID do lojista logado
  onBack: () => void;
}

interface ExtendedCashbackTransaction {
  id?: string;
  merchant_id: string;
  store_id: string;
  customer_id: string;
  customer_name?: string;
  total_amount_cents: number;
  cashback_used_cents: number;
  cashback_to_earn_cents: number;
  amount_to_pay_now_cents: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  approved_at?: string;
  rejected_at?: string;
}

export const MerchantCashbackRequests: React.FC<MerchantCashbackRequestsProps> = ({ merchantId, onBack }) => {
  const [requests, setRequests] = useState<ExtendedCashbackTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ExtendedCashbackTransaction | null>(null);

  // --- Realtime & Fetch ---
  useEffect(() => {
    fetchPendingRequests();

    if (!supabase) return;

    // Listener para MUDANÇAS em tempo real
    // Escuta INSERT (nova compra) e UPDATE (aprovada/rejeitada) na tabela
    const channel = supabase
      .channel('merchant_transactions_channel')
      .on(
        'postgres_changes',
        {
          event: '*', 
          schema: 'public',
          table: 'cashback_transactions',
          filter: `merchant_id=eq.${merchantId}`,
        },
        (payload) => {
          // Recarrega a lista para garantir consistência e ordenação
          // Em um cenário de altíssimo volume, faríamos manipulação otimista do state array
          fetchPendingRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [merchantId]);

  const fetchPendingRequests = async () => {
    if (!supabase) {
        // Mock data if no supabase configured in env
        setRequests([
            {
                id: 'mock-1',
                merchant_id: merchantId,
                store_id: 'store-1',
                customer_id: 'cust-1',
                customer_name: 'Maria Silva (Simulação)',
                total_amount_cents: 15000,
                cashback_used_cents: 500,
                cashback_to_earn_cents: 725,
                amount_to_pay_now_cents: 14500,
                status: 'pending',
                created_at: new Date().toISOString()
            }
        ]);
        setLoading(false);
        return;
    }

    try {
      const { data, error } = await supabase
        .from('cashback_transactions')
        .select('*') 
        .eq('merchant_id', merchantId)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests((data as any) || []);
    } catch (err) {
      console.error('Erro ao buscar solicitações:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- Actions ---

  const handleApprove = async (tx: ExtendedCashbackTransaction) => {
    setProcessingId(tx.id || '');

    try {
      if (supabase) {
          // Atualiza status no banco.
          // O Trigger do banco (definido na Parte 3) cuidará de atualizar o saldo do usuário.
          const { error: updateError } = await supabase
            .from('cashback_transactions')
            .update({ 
                status: 'approved',
                approved_at: new Date().toISOString()
            })
            .eq('id', tx.id);

          if (updateError) throw updateError;
      } else {
          // Simulation delay
          await new Promise(r => setTimeout(r, 1000));
      }

      // Atualização otimista da UI (remove da lista)
      setRequests((prev) => prev.filter((r) => r.id !== tx.id));
      setSelectedRequest(null); 

    } catch (err: any) {
      console.error("Erro ao aprovar:", err);
      alert(`Erro ao aprovar: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (tx: ExtendedCashbackTransaction) => {
    setProcessingId(tx.id || '');

    try {
      if (supabase) {
          const { error } = await supabase
            .from('cashback_transactions')
            .update({ 
                status: 'rejected',
                rejected_at: new Date().toISOString()
            })
            .eq('id', tx.id);

          if (error) throw error;
      } else {
          // Simulation delay
          await new Promise(r => setTimeout(r, 1000));
      }

      setRequests((prev) => prev.filter((r) => r.id !== tx.id));
      setSelectedRequest(null);

    } catch (err: any) {
      console.error("Erro ao rejeitar:", err);
      alert(`Erro ao recusar: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  // Formatadores
  const formatMoney = (cents: number) => {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Solicitações Pendentes</h1>
      </div>

      <div className="p-5 pb-24">
        {!supabase && (
            <div className="mb-4 bg-yellow-50 text-yellow-800 text-xs p-3 rounded-xl border border-yellow-200">
                Modo Demonstração (Supabase não configurado). Dados são simulados.
            </div>
        )}

        {loading ? (
            <div className="flex justify-center pt-10">
                <Loader2 className="w-8 h-8 text-[#1E5BFF] animate-spin" />
            </div>
        ) : requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-20 text-center">
                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tudo limpo!</h2>
                <p className="text-gray-500 text-sm mt-1">Nenhuma solicitação pendente no momento.</p>
                <p className="text-xs text-gray-400 mt-4 animate-pulse">Aguardando novas transações em tempo real...</p>
            </div>
        ) : (
            <div className="space-y-4">
                {requests.map((req) => (
                    <div 
                        key={req.id} 
                        onClick={() => setSelectedRequest(req)}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                    >
                        {/* Indicador de Novo */}
                        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-bl-lg animate-pulse"></div>

                        {/* Top Info */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span>
                                    {req.created_at ? formatTime(req.created_at) : '--:--'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                                <User className="w-3.5 h-3.5 text-gray-500" />
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                                    {req.customer_name || 'Cliente'}
                                </span>
                            </div>
                        </div>

                        {/* Resumo Valores */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold mb-0.5">Total da Compra</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                    {formatMoney(req.total_amount_cents)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-[#1E5BFF] uppercase font-bold mb-0.5">A Receber</p>
                                <p className="text-xl font-black text-[#1E5BFF]">
                                    {formatMoney(req.amount_to_pay_now_cents)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* DETALHE MODAL (BottomSheet) */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
            <div 
                className="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-[2rem] p-6 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Handle */}
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Confirmar Transação</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Verifique os dados antes de aprovar.
                    </p>
                </div>

                {/* Info Box */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 mb-8 space-y-4">
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                        <span className="text-gray-500 text-sm">Cliente</span>
                        <span className="font-bold text-gray-900 dark:text-white">{selectedRequest.customer_name || 'Cliente'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Valor Total</span>
                        <span className="font-bold text-gray-900 dark:text-white text-lg">{formatMoney(selectedRequest.total_amount_cents)}</span>
                    </div>

                    <div className="flex justify-between items-center text-red-500">
                        <span className="text-sm font-medium">Uso de Cashback</span>
                        <span className="font-bold">- {formatMoney(selectedRequest.cashback_used_cents)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-base font-bold text-gray-900 dark:text-white">Cliente Paga Agora</span>
                        <span className="text-2xl font-black text-[#1E5BFF]">
                            {formatMoney(selectedRequest.amount_to_pay_now_cents)}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button 
                        onClick={() => handleReject(selectedRequest)}
                        disabled={!!processingId}
                        className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        {processingId === selectedRequest.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                        Recusar
                    </button>
                    <button 
                        onClick={() => handleApprove(selectedRequest)}
                        disabled={!!processingId}
                        className="flex-[2] bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {processingId === selectedRequest.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                        Aprovar
                    </button>
                </div>

                <button 
                    onClick={() => setSelectedRequest(null)}
                    className="w-full mt-4 py-3 text-sm font-bold text-gray-400 hover:text-gray-600"
                >
                    Cancelar
                </button>
            </div>
        </div>
      )}

    </div>
  );
};