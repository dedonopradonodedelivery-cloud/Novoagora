
import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { Loader2, AlertCircle, Lock } from 'lucide-react';
import { CashbackPaymentScreen } from './CashbackPaymentScreen';
import { supabase } from '../lib/supabase';

interface MerchantPayRouteProps {
  merchantId: string;
  user: User | null;
  onLogin: () => void;
  onBack: () => void;
  onComplete: (data: any) => void;
}

export const MerchantPayRoute: React.FC<MerchantPayRouteProps> = ({
  merchantId,
  user,
  onLogin,
  onBack,
  onComplete
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storeData, setStoreData] = useState<{ storeId: string; name: string } | null>(null);

  // 1. Fetch Merchant/Store Data
  useEffect(() => {
    const fetchMerchantData = async () => {
      setLoading(true);
      try {
        // Simulation of fetching store ID based on merchant ID
        // In a real scenario: const { data } = await supabase.from('stores').select('*').eq('owner_id', merchantId).single();
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Network delay simulation

        // Mock resolution
        if (merchantId) {
           setStoreData({
             storeId: 'store_123_freguesia', // In real app, this comes from DB based on merchantId
             name: 'Loja Carregada via QR'
           });
        } else {
           setError('Lojista não identificado.');
        }
      } catch (err) {
        setError('Erro ao carregar dados do lojista.');
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantData();
  }, [merchantId]);

  // 2. Auth Check
  useEffect(() => {
    if (!loading && !user && !error) {
      // If loaded, valid merchant, but no user -> Force Login
      onLogin();
    }
  }, [loading, user, error, onLogin]);

  // --- Renders ---

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 animate-in fade-in">
        <Loader2 className="w-10 h-10 text-[#1E5BFF] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Carregando loja...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ops!</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <button onClick={onBack} className="text-[#1E5BFF] font-bold">Voltar ao início</button>
      </div>
    );
  }

  // Not Logged In State (Auth Modal should be open, but we show a placeholder here)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Acesso Necessário</h2>
        <p className="text-gray-500 mb-6 max-w-xs">
          Para realizar o pagamento com cashback, você precisa estar logado.
        </p>
        <button 
          onClick={onLogin}
          className="bg-[#1E5BFF] text-white font-bold py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          Entrar na minha conta
        </button>
      </div>
    );
  }

  // Success State: Render the Payment Screen
  if (storeData) {
    return (
      <CashbackPaymentScreen
        user={user}
        merchantId={merchantId}
        storeId={storeData.storeId}
        onBack={onBack}
        onComplete={onComplete}
      />
    );
  }

  return null;
};
