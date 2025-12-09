
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  QrCode, 
  KeyRound, 
  Wallet, 
  ArrowRight, 
  Camera, 
  X, 
  Store, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  History, 
  Coins 
} from 'lucide-react';

type ScreenState = 'home' | 'scan' | 'pin' | 'checkout' | 'waiting' | 'result' | 'statement';

interface TransactionContext {
  merchantName: string;
  cashbackPercent: number;
  totalAmount: number;
  balanceUsed: number;
  amountToPay: number;
  cashbackEarned: number;
  date: string;
}

interface UserCashbackFlowProps {
  onBack: () => void;
}

// --- MOCK DATA ---
const INITIAL_BALANCE = 50.00;
const MOCK_MERCHANT = { name: "Hamburgueria Brasa", percent: 8 };
const MOCK_HISTORY = [
  { id: 1, store: 'Padaria Estrela', date: '10/11 - 09:30', value: 25.00, cashback: 1.25, usedBalance: 0 },
  { id: 2, store: 'PetShop Amigo', date: '08/11 - 15:20', value: 120.00, cashback: 6.00, usedBalance: 15.00 },
  { id: 3, store: 'Farmácia Central', date: '05/11 - 18:45', value: 45.90, cashback: 2.30, usedBalance: 0 },
];

export const UserCashbackFlow: React.FC<UserCashbackFlowProps> = ({ onBack }) => {
  const [screen, setScreen] = useState<ScreenState>('home');
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [txData, setTxData] = useState<TransactionContext>({
    merchantName: '',
    cashbackPercent: 0,
    totalAmount: 0,
    balanceUsed: 0,
    amountToPay: 0,
    cashbackEarned: 0,
    date: ''
  });

  // --- ACTIONS ---

  const startCheckout = (merchantName: string, percent: number) => {
    setTxData(prev => ({ ...prev, merchantName, cashbackPercent: percent }));
    setScreen('checkout');
  };

  const submitPayment = (total: number, used: number, pay: number, earned: number) => {
    setTxData(prev => ({
      ...prev,
      totalAmount: total,
      balanceUsed: used,
      amountToPay: pay,
      cashbackEarned: earned,
      date: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    }));
    setScreen('waiting');
  };

  const finishTransaction = () => {
    // Update local balance mock
    const newBalance = balance - txData.balanceUsed + txData.cashbackEarned;
    setBalance(newBalance);
    setScreen('result');
  };

  // --- SUB-COMPONENTS ---

  const UserHome = () => (
    <div className="p-5 space-y-6 animate-in fade-in duration-300">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#1E5BFF] to-[#1749CC] rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-2 flex items-center gap-2">
            <Wallet className="w-4 h-4" /> Meu Saldo
          </p>
          <h1 className="text-4xl font-extrabold mb-1">R$ {balance.toFixed(2).replace('.', ',')}</h1>
          <p className="text-sm text-blue-200 opacity-80">Disponível para uso imediato</p>
        </div>
      </div>

      {/* Main Actions */}
      <div className="space-y-4">
        <button 
          onClick={() => setScreen('scan')}
          className="w-full bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 group active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-[#1E5BFF]">
            <QrCode className="w-7 h-7" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Escanear QR Code</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ler código no caixa</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-full text-gray-400 group-hover:text-[#1E5BFF] transition-colors">
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>

        <button 
          onClick={() => setScreen('pin')}
          className="w-full bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 group active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600">
            <KeyRound className="w-7 h-7" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Digitar PIN</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Usar código numérico</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-full text-gray-400 group-hover:text-purple-600 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Footer Link */}
      <div className="text-center pt-4">
        <button 
          onClick={() => setScreen('statement')}
          className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-[#1E5BFF] flex items-center justify-center gap-2 transition-colors"
        >
          <History className="w-4 h-4" />
          Ver extrato completo
        </button>
      </div>
    </div>
  );

  const ScanQrScreen = () => (
    <div className="flex flex-col h-full bg-black relative animate-in fade-in duration-300">
      {/* Overlay UI */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center">
        <button onClick={() => setScreen('home')} className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white">
          <X className="w-6 h-6" />
        </button>
        <span className="text-white font-bold bg-black/40 backdrop-blur-md px-4 py-1 rounded-full text-sm">Escanear</span>
        <div className="w-10"></div>
      </div>

      {/* Simulated Camera */}
      <div className="flex-1 relative flex flex-col items-center justify-center bg-gray-900">
        <div className="w-72 h-72 border-2 border-[#1E5BFF] rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1E5BFF]/10 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1E5BFF] shadow-[0_0_20px_rgba(30,91,255,0.8)] animate-[scan_2.5s_infinite_linear]"></div>
        </div>
        <p className="text-white/80 mt-8 text-sm font-medium text-center px-8">
          Aponte a câmera para o QR Code do lojista para iniciar o pagamento.
        </p>
      </div>

      {/* Simulation Trigger */}
      <div className="absolute bottom-10 left-0 right-0 px-6 z-30">
        <button 
          onClick={() => startCheckout(MOCK_MERCHANT.name, MOCK_MERCHANT.percent)}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Camera className="w-5 h-5" />
          Simular Leitura de QR
        </button>
      </div>
    </div>
  );

  const EnterPinScreen = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleNumClick = (num: string) => {
      if (pin.length < 6) setPin(prev => prev + num);
      setError('');
    };

    const handleDelete = () => setPin(prev => prev.slice(0, -1));

    const handleSubmit = () => {
      if (pin.length !== 6) {
        setError('O PIN deve ter 6 dígitos.');
        return;
      }
      // Mock validation
      startCheckout(MOCK_MERCHANT.name, MOCK_MERCHANT.percent);
    };

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-in slide-in-from-right duration-300">
        <div className="p-6">
          <button onClick={() => setScreen('home')} className="mb-6">
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Digite o PIN</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Peça o código de 6 dígitos ao lojista.</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start pt-8">
          {/* PIN Display */}
          <div className="flex gap-3 mb-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-10 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                pin[i] 
                  ? 'border-[#1E5BFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-white' 
                  : 'border-gray-200 dark:border-gray-700 bg-transparent text-transparent'
              }`}>
                {pin[i]}
              </div>
            ))}
          </div>
          
          {error && <p className="text-red-500 text-sm font-bold mb-4 animate-bounce">{error}</p>}

          {/* Keypad */}
          <div className="w-full max-w-sm px-6 grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button 
                key={num} 
                onClick={() => handleNumClick(num.toString())}
                className="h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-2xl font-bold text-gray-800 dark:text-white active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
              >
                {num}
              </button>
            ))}
            <div className="h-16"></div>
            <button 
              onClick={() => handleNumClick('0')}
              className="h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-2xl font-bold text-gray-800 dark:text-white active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
            >
              0
            </button>
            <button 
              onClick={handleDelete}
              className="h-16 rounded-2xl flex items-center justify-center text-gray-500 active:text-red-500 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </div>

          <div className="w-full px-6 mt-8">
            <button 
              onClick={handleSubmit}
              disabled={pin.length !== 6}
              className="w-full bg-[#1E5BFF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none active:scale-[0.98] transition-all"
            >
              Confirmar PIN
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CheckoutScreen = () => {
    const [amountStr, setAmountStr] = useState('');
    const [useBalanceStr, setUseBalanceStr] = useState('');

    const amount = parseFloat(amountStr.replace(',', '.') || '0');
    const useBalance = parseFloat(useBalanceStr.replace(',', '.') || '0');

    const maxUse = Math.min(balance, amount);
    const toPay = Math.max(0, amount - useBalance);
    const cashback = toPay * (txData.cashbackPercent / 100);

    const handleConfirm = () => {
      if (amount <= 0) return;
      submitPayment(amount, useBalance, toPay, cashback);
    };

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-5 shadow-sm border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('home')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{txData.merchantName}</h2>
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md w-fit mt-1">
                <TrendingUp className="w-3 h-3" />
                Ganhe {txData.cashbackPercent}% de volta
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto pb-32">
          
          {/* Purchase Amount */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Valor da Compra</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
              <input 
                type="number"
                value={amountStr}
                onChange={(e) => {
                    const val = e.target.value;
                    setAmountStr(val);
                    // Reset balance use if it exceeds new amount
                    if (parseFloat(val) < useBalance) setUseBalanceStr(val);
                }}
                placeholder="0,00"
                className="w-full bg-white dark:bg-gray-800 p-4 pl-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-2xl font-bold text-gray-900 dark:text-white focus:border-[#1E5BFF] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Balance Usage */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2 px-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Usar Saldo</label>
              <span className="text-xs text-[#1E5BFF] font-bold">Disponível: R$ {balance.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 font-bold">R$</span>
              <input 
                type="number"
                value={useBalanceStr}
                onChange={(e) => {
                    const val = parseFloat(e.target.value || '0');
                    if (val <= maxUse) setUseBalanceStr(e.target.value);
                }}
                placeholder="0,00"
                className="w-full bg-green-50 dark:bg-green-900/10 p-4 pl-12 rounded-2xl border-2 border-green-200 dark:border-green-800 text-xl font-bold text-green-700 dark:text-green-400 focus:border-green-500 outline-none transition-all"
              />
              <button 
                onClick={() => setUseBalanceStr(maxUse.toString())}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-green-700 bg-white/80 px-2 py-1 rounded border border-green-200 shadow-sm"
              >
                USAR MÁX
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>R$ {amount.toFixed(2)}</span>
            </div>
            {useBalance > 0 && (
              <div className="flex justify-between text-sm text-green-600 font-bold">
                <span>Desconto (Saldo)</span>
                <span>- R$ {useBalance.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-gray-900 dark:text-white">A pagar na loja</span>
              <span className="text-3xl font-black text-[#1E5BFF]">R$ {toPay.toFixed(2)}</span>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300 text-sm font-bold">
              <Coins className="w-4 h-4" />
              Você vai ganhar R$ {cashback.toFixed(2)}
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 max-w-md mx-auto">
          <button 
            onClick={handleConfirm}
            disabled={amount <= 0}
            className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none"
          >
            Confirmar Pagamento
          </button>
        </div>
      </div>
    );
  };

  const WaitingScreen = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        finishTransaction();
      }, 3500); // 3.5s simulation
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900 items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-32 h-32 mb-8 relative">
          <div className="absolute inset-0 border-4 border-gray-100 dark:border-gray-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#1E5BFF] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Store className="w-10 h-10 text-gray-300 dark:text-gray-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Aguardando Lojista</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[260px] leading-relaxed mb-8">
          Solicitação enviada para <strong>{txData.merchantName}</strong>. Aguarde a confirmação no caixa.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 w-full max-w-xs border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Valor</span>
            <span className="font-bold dark:text-white">R$ {txData.amountToPay.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Cashback</span>
            <span className="font-bold text-green-500">+ R$ {txData.cashbackEarned.toFixed(2)}</span>
          </div>
        </div>

        <button onClick={() => setScreen('home')} className="mt-12 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">
          Cancelar operação
        </button>
      </div>
    );
  };

  const ResultScreen = () => (
    <div className="flex flex-col h-full bg-green-500 items-center justify-center p-6 text-center animate-in zoom-in duration-300 text-white relative overflow-hidden">
      
      {/* Confetti / Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-white rounded-full"></div>
      </div>

      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce-short">
        <CheckCircle2 className="w-12 h-12 text-white" />
      </div>

      <h2 className="text-3xl font-black mb-2">Pagamento Aprovado!</h2>
      <p className="text-green-100 text-sm mb-10">Transação realizada com sucesso.</p>

      <div className="bg-white text-gray-900 rounded-3xl p-6 w-full max-w-xs shadow-2xl mb-8">
        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-4">Resumo</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Você pagou</span>
          <span className="text-xl font-bold">R$ {txData.amountToPay.toFixed(2)}</span>
        </div>
        
        <div className="bg-green-50 rounded-xl p-3 flex items-center justify-between border border-green-100">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 p-1.5 rounded-full text-white">
              <TrendingUp className="w-3 h-3" />
            </div>
            <span className="text-sm font-bold text-green-700">Ganhou</span>
          </div>
          <span className="text-lg font-black text-green-700">+ R$ {txData.cashbackEarned.toFixed(2)}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 mb-1">Novo Saldo</p>
          <p className="text-2xl font-black text-[#1E5BFF]">R$ {balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <button 
          onClick={() => setScreen('statement')}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-bold py-4 rounded-2xl transition-all"
        >
          Ver Extrato
        </button>
        <button 
          onClick={() => setScreen('home')}
          className="w-full py-2 text-sm font-bold text-green-100 hover:text-white"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );

  const StatementScreen = () => {
    // Merge mock history with new transaction if exists
    const list = [...MOCK_HISTORY];
    if (txData.date) {
        list.unshift({
            id: 999,
            store: txData.merchantName,
            date: 'Agora',
            value: txData.totalAmount,
            cashback: txData.cashbackEarned,
            usedBalance: txData.balanceUsed
        });
    }

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-in slide-in-from-right duration-300">
        <div className="bg-white dark:bg-gray-800 p-5 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 flex items-center gap-4">
          <button onClick={() => setScreen('home')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Extrato</h2>
        </div>

        <div className="p-5 overflow-y-auto pb-24">
          <div className="bg-[#1E5BFF] rounded-2xl p-5 text-white shadow-lg mb-6">
            <p className="text-xs font-bold text-blue-200 uppercase mb-1">Saldo Atual</p>
            <h2 className="text-3xl font-black">R$ {balance.toFixed(2).replace('.', ',')}</h2>
          </div>

          <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-1">Últimas Movimentações</h3>

          <div className="space-y-3">
            {list.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.store}</h4>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 bg-green-50 dark:bg-green-900/10 p-2 rounded-lg border border-green-100 dark:border-green-800/30">
                    <p className="text-[10px] text-green-600 font-bold uppercase">Cashback</p>
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">+ R$ {item.cashback.toFixed(2)}</p>
                  </div>
                  {item.usedBalance > 0 && (
                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/30 p-2 rounded-lg border border-gray-100 dark:border-gray-600/30">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Usado</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">- R$ {item.usedBalance.toFixed(2)}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center text-xs text-gray-400">
                    <span>Compra Total</span>
                    <span>R$ {item.value.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- RENDER SWITCH ---

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans max-w-md mx-auto relative overflow-hidden">
      {/* Dynamic Header for some screens */}
      {['home', 'scan', 'pin'].includes(screen) && (
        <div className="absolute top-0 left-0 right-0 p-5 pt-6 z-10 flex justify-between items-center pointer-events-none">
           <button 
             onClick={onBack} 
             className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto hover:bg-white/30 transition-colors"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           {screen !== 'home' && <div className="w-10"></div>}
        </div>
      )}

      {/* Render Active Screen */}
      <div className="h-full">
        {screen === 'home' && <UserHome />}
        {screen === 'scan' && <ScanQrScreen />}
        {screen === 'pin' && <EnterPinScreen />}
        {screen === 'checkout' && <CheckoutScreen />}
        {screen === 'waiting' && <WaitingScreen />}
        {screen === 'result' && <ResultScreen />}
        {screen === 'statement' && <StatementScreen />}
      </div>
    </div>
  );
};
