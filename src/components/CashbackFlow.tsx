import React, { useState } from 'react';
import { CashbackScanScreen } from './CashbackScanScreen';
import PayWithCashbackScreen from './PayWithCashbackScreen';
import PaymentResultScreen from './PaymentResultScreen';
import { Clock, Store } from 'lucide-react';

// Tipos para controle do fluxo
type FlowStep = "scan" | "pay" | "waiting" | "result";
type ResultStatus = "approved" | "rejected";

type CashbackFlowProps = {
  initialStoreName?: string;
  initialCashbackPercent?: number;
};

// Casting do componente PayWithCashbackScreen para aceitar props futuras sem erro de TS agora
const PayWithCashback = PayWithCashbackScreen as React.ComponentType<any>;

export default function CashbackFlow(props: CashbackFlowProps) {
  // Estados internos
  const [step, setStep] = useState<FlowStep>("scan");
  const [storeName, setStoreName] = useState<string>(props.initialStoreName ?? "Loja Parceira");
  const [cashbackPercent, setCashbackPercent] = useState<number>(props.initialCashbackPercent ?? 5);
  
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [cashbackUsed, setCashbackUsed] = useState<number>(0);
  const [resultStatus, setResultStatus] = useState<ResultStatus>("approved");

  // --- Handlers ---

  // Chamado quando o QR Scanner detecta um código válido
  const handleScanSuccess = (data: { merchantId: string; storeId: string }) => {
    console.log("QR Validado:", data);
    // TODO: Aqui buscaríamos os dados reais da loja (nome, % cashback) no backend usando storeId
    // Por enquanto, usamos os valores iniciais ou mocks
    setStep("pay");
  };

  // Chamado quando o usuário clica em "Confirmar Pagamento" na tela de formulário
  const handlePaymentSimulated = (args: { purchaseAmount: number; cashbackUsed: number }) => {
    setPurchaseAmount(args.purchaseAmount);
    setCashbackUsed(args.cashbackUsed);
    setStep("waiting");

    // Simulação de tempo de resposta do lojista/backend
    // TODO: Substituir por subscrição real ao status da transação no Supabase
    setTimeout(() => {
      setResultStatus("approved"); // ou "rejected" para testar erro
      setStep("result");
    }, 1500);
  };

  const handleResetFlow = () => {
    setPurchaseAmount(0);
    setCashbackUsed(0);
    setResultStatus("approved");
    setStep("scan");
  };

  // --- Renders ---

  // Wrapper para controlar o background: Dark no Scan, Light nos outros
  const isScanStep = step === "scan";

  return (
    <div className={`min-h-screen flex flex-col ${isScanStep ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col relative">
        
        {/* STEP 1: SCANNER */}
        {step === "scan" && (
          <div className="flex-1 flex flex-col">
            <CashbackScanScreen 
              onBack={() => console.log("Back clicked")} 
              onScanSuccess={handleScanSuccess} 
            />
            
            {/* Botão de DEV para pular leitura de QR */}
            <div className="flex justify-center pb-8">
              <button 
                onClick={() => handleScanSuccess({ merchantId: 'dev', storeId: 'dev' })}
                className="text-xs text-gray-500 underline opacity-60 hover:opacity-100 transition-opacity"
              >
                (DEV) Continuar para pagamento sem QR
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FORMULÁRIO DE PAGAMENTO */}
        {step === "pay" && (
          <PayWithCashback
            storeName={storeName}
            cashbackPercent={cashbackPercent}
            onPaymentSimulated={handlePaymentSimulated}
            onBack={() => setStep("scan")}
          />
        )}

        {/* STEP 3: AGUARDANDO LOJISTA (INTERMEDIÁRIO GLOBAL) */}
        {step === "waiting" && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-200 animate-ping opacity-75"></div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Aguardando Lojista</h2>
            <p className="text-gray-500 text-sm text-center max-w-xs mb-8">
              O lojista recebeu uma notificação e precisa autorizar a transação.
            </p>

            <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
                <Store className="w-5 h-5 text-gray-400" />
                <span className="font-bold text-gray-900">{storeName}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Valor da Compra</span>
                  <span className="font-medium text-gray-900">
                    {purchaseAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                
                {cashbackUsed > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-bold">
                    <span>Saldo Utilizado</span>
                    <span>- {cashbackUsed.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTADO FINAL */}
        {step === "result" && (
          <PaymentResultScreen 
            status={resultStatus}
            storeName={storeName}
            purchaseAmount={purchaseAmount}
            cashbackUsed={cashbackUsed}
            onBackToHome={handleResetFlow}
            onViewDetails={() => window.alert("Detalhes da transação (simulação)")}
          />
        )}

      </div>
    </div>
  );
}
