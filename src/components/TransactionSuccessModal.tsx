import React from "react";
import { CheckCircle2, Home } from "lucide-react";

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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          Pagamento confirmado!
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Sua transação foi processada com sucesso.
        </p>
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-2 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Valor pago</span>
            <span className="font-semibold text-slate-900">
              R$ {amountPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-emerald-600 font-medium">
              Cashback gerado
            </span>
            <span className="font-semibold text-emerald-600">
              + R$ {cashbackEarned.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-2xl shadow-md active:scale-[0.98] transition"
        >
          <Home className="w-5 h-5" />
          Voltar para o início
        </button>
      </div>
    </div>
  );
};