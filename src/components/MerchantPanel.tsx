
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  QrCode, 
  KeyRound, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  History, 
  RefreshCw,
  Copy,
  Wallet,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';

interface MerchantPanelProps {
  onBack: () => void;
}

type Screen = 'dashboard' | 'qr_gen' | 'pin_gen' | 'pending' | 'approved';

// --- MOCK DATA ---
const MOCK_PENDING = [
  { id: 1, client: 'Fernanda Souza', time: '14:32', amount: 150.00, cashback: 7.50 },
  { id: 2, client: 'Ricardo Alves', time: '14:45', amount: 45.90, cashback: 2.30 },
  { id: 3, client: 'Mariana Lima', time: '14:48', amount: 320.00, cashback: 16.00 },
];

const MOCK_APPROVED = [
  { id: 10, client: 'João Silva', time: '10:15', amount: 89.90, cashback: 4.50 },
  { id: 11, client: 'Beatriz Costa', time: '11:20', amount: 12.50, cashback: 0.62 },
  { id: 12, client: 'Carlos Pereira', time: '12:05', amount: 250.00, cashback: 12.50 },
  { id: 13, client: 'Ana Clara', time: '13:30', amount: 60.00, cashback: 3.00 },
];

export const MerchantPanel: React.FC<MerchantPanelProps> = ({ onBack }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  // --- SUB-COMPONENTS ---

  const Dashboard = () => (
    <div className="p-5 space-y-6 animate-in fade-in duration-300">
      
      {/* Daily Stats Card */}
      <div className="bg-gradient-to-br from-[#1E5BFF] to-[#1749CC] rounded-3xl p-6 text-white shadow-lg shadow-blue-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider">Cashback Hoje</p>
              <h2 className="text-3xl font-bold mt-1">R$ 45,90</h2>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-blue-50">
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">8 transações</span>
            <span>realizadas hoje</span>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setCurrentScreen('qr_gen')}
          className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all group"
        >
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
            <QrCode className="w-7 h-7 text-[#1E5BFF]" />
          </div>
          <span className="font-bold text-gray-800 dark:text-white text-sm">Gerar QR</span>
        </button>

        <button 
          onClick={() => setCurrentScreen('pin_gen')}
          className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all group"
        >
          <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors">
            <KeyRound className="w-7 h-7 text-purple-600" />
          </div>
          <span className="font-bold text-gray-800 dark:text-white text-sm">Gerar PIN</span>
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide ml-1">Gestão</h3>
        
        <button 
          onClick={() => setCurrentScreen('pending')}
          className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between shadow-sm active:bg-gray-50 dark:active:bg-gray-700"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center text-yellow-600">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900 dark:text-white text-sm">Transações Pendentes</p>
              <p className="text-xs text-gray-500">Aguardando aprovação</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            <ChevronLeft className="w-5 h-5 text-gray-300 rotate-180" />
          </div>
        </button>

        <button 
          onClick={() => setCurrentScreen('approved')}
          className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between shadow-sm active:bg-gray-50 dark:active:bg-gray-700"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600">
              <History className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900 dark:text-white text-sm">Histórico de Hoje</p>
              <p className="text-xs text-gray-500">Ver aprovados</p>
            </div>
          </div>
          <ChevronLeft className="w-5 h-5 text-gray-300 rotate-180" />
        </button>
      </div>
    </div>
  );

  const QRGenerator = () => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [sessionKey, setSessionKey] = useState(Date.now());

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setSessionKey(Date.now()); // Regenerate
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    // Construct URL Params Mock
    const qrData = `https://localizei.app/checkout?merchant_id=123&session_id=${sessionKey}&sig=xyz`;
    const qrImg = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}&color=1E5BFF`;

    return (
      <div className="flex flex-col items-center justify-center p-6 h-full text-center animate-in zoom-in-95 duration-300">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">QR Code de Compra</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-[250px]">
          Mostre este código para o cliente escanear e pagar com cashback.
        </p>

        <div className="relative p-4 bg-white rounded-3xl shadow-lg border border-gray-100 mb-8">
          <img src={qrImg} alt="QR Code Dinâmico" className="w-64 h-64 object-contain rounded-xl" />
          
          {/* Timer Overlay */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-mono font-bold shadow-lg flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-yellow-400" />
            {timeLeft}s
          </div>
        </div>

        <div className="w-full max-w-xs bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between text-xs text-blue-700 dark:text-blue-300 mb-2">
            <span>Tempo restante</span>
            <span className="font-bold">{Math.round((timeLeft / 60) * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1E5BFF] transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-blue-400 mt-2 text-center">O código atualiza automaticamente.</p>
        </div>
      </div>
    );
  };

  const PingGenerator = () => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [pin, setPin] = useState('482 910');

    const generateNewPin = () => {
      const newPin = Math.floor(100000 + Math.random() * 900000).toString();
      setPin(`${newPin.slice(0,3)} ${newPin.slice(3)}`);
      setTimeLeft(60);
    };

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            generateNewPin();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="flex flex-col items-center justify-center p-6 h-full text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-6 text-purple-600">
          <KeyRound className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">PIN Temporário</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-[250px]">
          Se o cliente não puder escanear, forneça este código.
        </p>

        <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl py-8 px-12 mb-8 relative">
          <span className="text-5xl font-black text-gray-900 dark:text-white tracking-widest font-mono">
            {pin}
          </span>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border border-purple-200 dark:border-purple-800">
            Válido por {timeLeft}s
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs text-left mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Loja</p>
            <p className="text-sm font-bold text-gray-800 dark:text-white truncate">Hamburgueria Brasa</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Cashback</p>
            <p className="text-sm font-bold text-green-600">5% Ativo</p>
          </div>
        </div>

        <button 
          onClick={generateNewPin}
          className="flex items-center gap-2 text-purple-600 font-bold text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-full transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Gerar novo PIN agora
        </button>
      </div>
    );
  };

  const PendingTransactions = () => (
    <div className="p-5 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Aguardando Aprovação</h2>
        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">
          {MOCK_PENDING.length}
        </span>
      </div>

      <div className="space-y-4">
        {MOCK_PENDING.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">{item.client}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" /> {item.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 dark:text-white">R$ {item.amount.toFixed(2).replace('.', ',')}</p>
                <p className="text-xs font-bold text-[#1E5BFF]">+ R$ {item.cashback.toFixed(2)} back</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
              <button className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors">
                <XCircle className="w-4 h-4" /> Recusar
              </button>
              <button className="flex-1 bg-[#1E5BFF] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                <CheckCircle2 className="w-4 h-4" /> Aprovar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ApprovedTransactions = () => {
    const totalDay = MOCK_APPROVED.reduce((acc, curr) => acc + curr.amount, 0);
    const totalCashback = MOCK_APPROVED.reduce((acc, curr) => acc + curr.cashback, 0);

    return (
      <div className="p-5 animate-in slide-in-from-right duration-300">
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-5 text-white mb-6 flex justify-between items-center shadow-lg">
          <div>
            <p className="text-gray-400 text-xs uppercase font-bold mb-1">Total Vendido Hoje</p>
            <h2 className="text-2xl font-bold">R$ {totalDay.toFixed(2).replace('.', ',')}</h2>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs uppercase font-bold mb-1">Cashback</p>
            <p className="text-xl font-bold text-[#1E5BFF]">R$ {totalCashback.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-1">Histórico do Dia</h3>

        <div className="space-y-3">
          {MOCK_APPROVED.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{item.client}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white text-sm">R$ {item.amount.toFixed(2).replace('.', ',')}</p>
                <p className="text-[10px] text-green-600 font-bold">Aprovado</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- HEADER RENDER ---
  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'dashboard': return 'Painel do Lojista';
      case 'qr_gen': return 'QR Code da Compra';
      case 'pin_gen': return 'PIN Temporário';
      case 'pending': return 'Aprovações';
      case 'approved': return 'Histórico do Dia';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-20">
      
      {/* Dynamic Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => currentScreen === 'dashboard' ? onBack() : setCurrentScreen('dashboard')} 
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
          <h1 className="font-bold text-lg text-gray-900 dark:text-white">{getHeaderTitle()}</h1>
        </div>
        {currentScreen === 'dashboard' && (
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-[#1E5BFF]">
            <Wallet className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Screen Content */}
      <div className="h-full">
        {currentScreen === 'dashboard' && <Dashboard />}
        {currentScreen === 'qr_gen' && <QRGenerator />}
        {currentScreen === 'pin_gen' && <PingGenerator />}
        {currentScreen === 'pending' && <PendingTransactions />}
        {currentScreen === 'approved' && <ApprovedTransactions />}
      </div>

    </div>
  );
};
