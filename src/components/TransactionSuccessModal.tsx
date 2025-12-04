import React from "react";
import { CheckCircle2, TrendingUp, Home as HomeIcon } from "lucide-react";

interface TransactionSuccessModalProps {
  isOpen: boolean;
  amountPaid: number;
  cashbackEarned: number;
  onClose: () => void;
}

export const TransactionSuccessModal: React.FC<TransactionSuccessModalProps> = ({
  isOpen,
  amountPaid,
  cashbackEarned,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
        {/* Icon */}
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200 dark:shadow-none">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pagamento confirmado!
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          Sua transação foi processada com sucesso.
        </p>

        {/* Details Card */}
        <div className="w-full bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-5 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 dark:border-gray-600 border-dashed">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Valor pago
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              R$ {amountPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                Cashback gerado
              </span>
            </div>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              + R$ {cashbackEarned.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <HomeIcon className="w-5 h-5" />
          Voltar para o início
        </button>
      </div>
    </div>
  );
};
