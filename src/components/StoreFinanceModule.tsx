
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  User, 
  FileText, 
  Landmark, 
  Receipt, 
  Lock,
  Download,
  AlertCircle,
  Copy
} from 'lucide-react';

interface StoreFinanceModuleProps {
  onBack: () => void;
}

const INVOICES = [
  { id: 'INV-001', date: '05/11/2023', description: 'Plano Mensal - ADS Local', amount: 57.00, status: 'paid' },
  { id: 'INV-002', date: '05/10/2023', description: 'Plano Mensal - ADS Local', amount: 57.00, status: 'paid' },
  { id: 'INV-003', date: '15/09/2023', description: 'Impulsionamento Extra', amount: 25.00, status: 'paid' },
];

export const StoreFinanceModule: React.FC<StoreFinanceModuleProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string | null>('fiscal');

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const renderStatus = (status: string) => {
    return status === 'paid' 
      ? <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-md">Pago</span>
      : <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md">Pendente</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-12">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Minha Conta</h1>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Security Badge */}
        <div className="flex items-center gap-2 justify-center bg-green-50 dark:bg-green-900/10 p-2 rounded-lg mb-2">
            <Lock className="w-3 h-3 text-green-600" />
            <span className="text-xs font-bold text-green-700 dark:text-green-400">Ambiente Seguro</span>
        </div>

        {/* --- RESPONSIBLE INFO --- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <button 
                onClick={() => toggleSection('responsible')}
                className="w-full flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50"
            >
                <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">Dados do Responsável</h3>
                </div>
                <div className={`transition-transform duration-200 ${activeSection === 'responsible' ? 'rotate-180' : ''}`}>
                    <ChevronLeft className="w-5 h-5 text-gray-400 -rotate-90" />
                </div>
            </button>
            
            {activeSection === 'responsible' && (
                <div className="p-5 pt-0 space-y-4 animate-in slide-in-from-top-2">
                    <div className="mt-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nome Completo</label>
                        <p className="font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Carlos Eduardo Silva</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">CPF</label>
                        <p className="font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">***.456.789-**</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">E-mail de Acesso</label>
                        <p className="font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">carlos@hamburgueriabrasa.com.br</p>
                    </div>
                    <button className="text-sm font-bold text-blue-600 hover:underline">Editar dados pessoais</button>
                </div>
            )}
        </section>

        {/* --- FISCAL DATA --- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <button 
                onClick={() => toggleSection('fiscal')}
                className="w-full flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50"
            >
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">Dados Fiscais</h3>
                </div>
                <div className={`transition-transform duration-200 ${activeSection === 'fiscal' ? 'rotate-180' : ''}`}>
                    <ChevronLeft className="w-5 h-5 text-gray-400 -rotate-90" />
                </div>
            </button>
            
            {activeSection === 'fiscal' && (
                <div className="p-5 pt-0 space-y-4 animate-in slide-in-from-top-2">
                    <div className="mt-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">Razão Social</label>
                        <p className="font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Brasa Foods Ltda</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">CNPJ</label>
                        <p className="font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">12.345.678/0001-99</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Insc. Estadual</label>
                            <p className="font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Isento</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Insc. Municipal</label>
                            <p className="font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">123456</p>
                        </div>
                    </div>
                </div>
            )}
        </section>

        {/* --- BANKING INFO --- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <button 
                onClick={() => toggleSection('bank')}
                className="w-full flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50"
            >
                <div className="flex items-center gap-3">
                    <Landmark className="w-5 h-5 text-purple-500" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">Dados de Recebimento</h3>
                </div>
                <div className={`transition-transform duration-200 ${activeSection === 'bank' ? 'rotate-180' : ''}`}>
                    <ChevronLeft className="w-5 h-5 text-gray-400 -rotate-90" />
                </div>
            </button>
            
            {activeSection === 'bank' && (
                <div className="p-5 pt-0 animate-in slide-in-from-top-2">
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30 mb-4 mt-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Chave Pix Cadastrada</span>
                            <button className="text-purple-500"><Copy className="w-4 h-4" /></button>
                        </div>
                        <p className="font-mono font-bold text-gray-800 dark:text-white">12.345.678/0001-99</p>
                        <p className="text-xs text-gray-500 mt-1">Tipo: CNPJ</p>
                    </div>
                    
                    <button className="w-full py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                        Alterar conta de recebimento
                    </button>
                </div>
            )}
        </section>

        {/* --- INVOICES --- */}
        <section>
            <div className="flex items-center gap-2 mb-4 px-1">
                <Receipt className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Histórico de Cobranças</h3>
            </div>

            <div className="space-y-3">
                {INVOICES.map((inv) => (
                    <div key={inv.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{inv.description}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{inv.date} • {inv.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-900 dark:text-white text-sm">R$ {inv.amount.toFixed(2).replace('.', ',')}</p>
                            <div className="flex items-center justify-end gap-2 mt-1">
                                {renderStatus(inv.status)}
                                <button className="text-gray-400 hover:text-blue-500">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
};
