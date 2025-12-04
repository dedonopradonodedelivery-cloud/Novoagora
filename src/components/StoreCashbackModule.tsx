
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  QrCode, 
  Download, 
  Settings, 
  Save, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface StoreCashbackModuleProps {
  onBack: () => void;
}

// Mock Transactions
const TRANSACTIONS = [
  { id: 1, date: '12/11 - 14:30', client: 'Ana S.', purchase: 150.00, cashback: 7.50, status: 'confirmado' },
  { id: 2, date: '12/11 - 10:15', client: 'Carlos M.', purchase: 85.00, cashback: 4.25, status: 'pendente' },
  { id: 3, date: '11/11 - 18:45', client: 'Beatriz L.', purchase: 210.00, cashback: 10.50, status: 'confirmado' },
  { id: 4, date: '10/11 - 09:20', client: 'João P.', purchase: 45.00, cashback: 2.25, status: 'expirado' },
];

export const StoreCashbackModule: React.FC<StoreCashbackModuleProps> = ({ onBack }) => {
  const [isActive, setIsActive] = useState(true);
  const [percent, setPercent] = useState('5');
  const [maxValue, setMaxValue] = useState('50');
  const [validity, setValidity] = useState('30');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-20">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Cashback da sua loja</h1>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Status & QR Code Section */}
        <div className={`rounded-3xl p-6 transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-xl shadow-indigo-500/20' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>
            <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-lg">{isActive ? 'Cashback Ativado' : 'Cashback Desativado'}</span>
                <button 
                    onClick={() => setIsActive(!isActive)}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${isActive ? 'bg-white/30' : 'bg-gray-400'}`}
                >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
            </div>

            {isActive && (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-3 rounded-2xl shadow-lg mb-4">
                        <QrCode className="w-32 h-32 text-indigo-900" />
                    </div>
                    <p className="text-indigo-100 text-xs mb-4 text-center max-w-[200px]">
                        Este é o QR Code oficial da sua loja. Imprima e coloque no balcão.
                    </p>
                    <button className="bg-white text-indigo-700 font-bold text-sm py-3 px-6 rounded-xl shadow-sm hover:bg-indigo-50 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Baixar QR Code em PDF
                    </button>
                </div>
            )}
        </div>

        {/* Configuration Rules */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                <Settings className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-lg">Regras do Programa</h3>
            </div>

            <div className="grid grid-cols-1 gap-5 mb-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Porcentagem Padrão (%)</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            value={percent}
                            onChange={(e) => setPercent(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-indigo-500/50" 
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Valor Máx (R$)</label>
                        <input 
                            type="number" 
                            value={maxValue}
                            onChange={(e) => setMaxValue(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-indigo-500/50" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Validade (Dias)</label>
                        <input 
                            type="number" 
                            value={validity}
                            onChange={(e) => setValidity(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-indigo-500/50" 
                        />
                    </div>
                </div>
            </div>

            {/* Advanced Options Toggle */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-600 dark:text-gray-300"
                >
                    <span>Regras avançadas por categoria</span>
                    {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {showAdvanced && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                        <p className="text-xs text-gray-500">Funcionalidade disponível no plano PRO.</p>
                        <button className="mt-2 text-indigo-600 font-bold text-xs">Saiba mais</button>
                    </div>
                )}
            </div>

            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                {isSaving ? 'Salvando...' : 'Salvar Regras'}
                {!isSaving && <Save className="w-4 h-4" />}
            </button>
        </section>

        {/* Results & Reports */}
        <section>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 px-1">Resultados</h3>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm col-span-2">
                    <div className="flex items-center gap-2 mb-2 text-green-600">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wide">Vendas Influenciadas</span>
                    </div>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">R$ 12.450,00</p>
                    <p className="text-xs text-gray-400 mt-1">+15% em relação ao mês anterior</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-orange-500">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">Cashback Dado</span>
                    </div>
                    <p className="text-lg font-black text-gray-900 dark:text-white">R$ 622,50</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-blue-500">
                        <Users className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">Clientes</span>
                    </div>
                    <p className="text-lg font-black text-gray-900 dark:text-white">114</p>
                </div>
            </div>

            {/* Simple Bar Chart Visualization */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
                <div className="flex justify-between items-end mb-4">
                    <h4 className="font-bold text-sm text-gray-700 dark:text-gray-200">Cashback por dia (7 dias)</h4>
                </div>
                <div className="flex items-end justify-between h-32 gap-2">
                    {[30, 45, 25, 60, 80, 50, 90].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group">
                            <div 
                                className="w-full bg-indigo-100 dark:bg-indigo-900/30 rounded-t-md relative overflow-hidden transition-all duration-500 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800"
                                style={{ height: `${h}%` }}
                            >
                                <div className="absolute bottom-0 left-0 right-0 top-0 bg-indigo-500 opacity-80 rounded-t-md"></div>
                            </div>
                            <span className="text-[9px] text-gray-400 font-bold">{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][i]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transactions Table */}
            <div>
                <h4 className="font-bold text-sm text-gray-700 dark:text-gray-200 mb-3 px-1">Últimas Transações</h4>
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
                    {TRANSACTIONS.map((t, i) => (
                        <div key={t.id} className={`p-4 flex items-center justify-between ${i !== TRANSACTIONS.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                            <div>
                                <p className="font-bold text-sm text-gray-900 dark:text-white">{t.client}</p>
                                <p className="text-xs text-gray-400">{t.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm text-gray-900 dark:text-white">R$ {t.purchase.toFixed(2)}</p>
                                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                                    <span className="text-[10px] font-bold text-orange-500">+ R$ {t.cashback.toFixed(2)}</span>
                                    {t.status === 'confirmado' && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
                                    {t.status === 'pendente' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>}
                                    {t.status === 'expirado' && <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>}
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="w-full py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Ver histórico completo
                    </button>
                </div>
            </div>

        </section>

      </div>
    </div>
  );
};
