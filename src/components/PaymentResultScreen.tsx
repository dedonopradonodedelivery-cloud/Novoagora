import React from 'react';
import { Check, X, Store, ArrowLeft, ArrowRight } from 'lucide-react';

type PaymentStatus = "approved" | "rejected";

type PaymentResultScreenProps = {
  status: PaymentStatus;
  storeName: string;
  purchaseAmount: number;
  cashbackUsed: number;
  onBackToHome?: () => void;
  onViewDetails?: () => void;
};

export default function PaymentResultScreen({
  status,
  storeName,
  purchaseAmount,
  cashbackUsed,
  onBackToHome,
  onViewDetails,
}: PaymentResultScreenProps) {
  const toPay = Math.max(purchaseAmount - cashbackUsed, 0);

  const formatCurrencyBr = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handlePrimaryAction = () => {
    if (onViewDetails) {
      onViewDetails();
    } else if (status === "rejected" && onBackToHome) {
      onBackToHome();
    } else {
      window.alert("Ação não configurada (simulação)");
    }
  };

  const handleSecondaryAction = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.alert("Voltar ao início (simulação)");
    }
  };

  const isApproved = status === "approved";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1 px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          )}
        </div>

        {/* Conteúdo Principal */}
        <div className="flex flex-col items-center text-center flex-1 justify-center">
          {/* Ícone de Status */}
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              isApproved
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isApproved ? (
              <Check className="w-12 h-12" strokeWidth={3} />
            ) : (
              <X className="w-12 h-12" strokeWidth={3} />
            )}
          </div>

          {/* Títulos */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isApproved ? "Pagamento aprovado!" : "Pagamento não concluído"}
          </h1>
          <p className="text-sm text-gray-500 max-w-[280px] leading-relaxed">
            {isApproved
              ? "Seu cashback foi utilizado com sucesso e o lojista confirmou a transação."
              : "A transação não foi autorizada pelo lojista ou ocorreu um erro. Nenhum valor foi cobrado."}
          </p>

          {/* Card de Resumo */}
          <div className="w-full bg-white rounded-xl shadow-sm p-5 mt-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <div className="p-1.5 bg-gray-50 rounded-lg">
                <Store className="w-4 h-4 text-gray-600" />
              </div>
              <span className="font-semibold text-gray-800 text-sm">
                {storeName}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Valor da Compra</span>
                <span className="font-medium text-gray-900">
                  {formatCurrencyBr(purchaseAmount)}
                </span>
              </div>

              {cashbackUsed > 0 && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span className="font-medium">Saldo Utilizado (Cashback)</span>
                  <span className="font-bold">
                    - {formatCurrencyBr(cashbackUsed)}
                  </span>
                </div>
              )}

              <div className="pt-3 mt-1 border-t border-gray-50 flex justify-between items-end">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                  {isApproved
                    ? "Você pagou ao lojista"
                    : "Você pagaria ao lojista"}
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {formatCurrencyBr(toPay)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-auto pt-8 flex flex-col gap-3">
          <button
            onClick={handlePrimaryAction}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-full shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isApproved
              ? "Ver detalhes da transação"
              : "Tentar novamente"}
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </button>

          <button
            onClick={handleSecondaryAction}
            className="text-sm text-gray-500 hover:text-gray-700 underline font-medium py-2 transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}