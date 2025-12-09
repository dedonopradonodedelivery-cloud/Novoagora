
import React, { useEffect } from 'react';
import { User } from 'firebase/auth';
import { Lock } from 'lucide-react';
import { CashbackPaymentScreen } from './CashbackPaymentScreen';

interface CashbackPayFromQrScreenProps {
  merchantId: string;
  user: User | null;
  onLogin: () => void;
  onBack: () => void;
  onComplete: (transactionData: any) => void;
}

export const CashbackPayFromQrScreen: React.FC<CashbackPayFromQrScreenProps> = ({
  merchantId,
  user,
  onLogin,
  onBack,
  onComplete
}) => {

  // Se não houver usuário, solicita login
  useEffect(() => {
    if (!user) {
      onLogin();
    }
  }, [user, onLogin]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Login Necessário</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs text-sm font-medium">
          Para realizar o pagamento com cashback, é necessário estar logado na sua conta.
        </p>
        <button 
          onClick={onLogin}
          className="bg-[#1E5BFF] text-white font-bold py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          Entrar ou Cadastrar
        </button>
      </div>
    );
  }

  // Usuário logado: exibe a tela de pagamento
  return (
    <CashbackPaymentScreen
      user={user}
      merchantId={merchantId}
      storeId={merchantId} // Usando merchantId como storeId conforme requisito
      onBack={onBack}
      onComplete={onComplete}
    />
  );
};
