
import React from 'react';
import { ChevronLeft, HelpCircle, ArrowDownLeft, ArrowUpRight, Coins, Clock, AlertCircle } from 'lucide-react';
// FIX: Import Transaction type from types.ts instead of constants.ts
import { TRANSACTIONS } from '../constants';
import { LocalUserWallet, LocalTransaction, Transaction } from '../types';

interface CashbackViewProps {
  onBack: () => void;
}

export const CashbackView: React.FC<CashbackViewProps> = ({ onBack }) => {
  const [showHelp, setShowHelp] = React.useState(false);
  const [totalBalance, setTotalBalance] = React.useState(0);

  // Initial Mock State: Assuming 0 balance for most users as per prompt requirement
  // "Inicialmente R$ 0,00"
  
  React.useEffect(() => {
    // Logic to fetch real balance would go here.
    // For now, we respect the prompt "mesmo que ainda não tenha saldo"
    const walletString = localStorage.getItem('LocalUserWallet');
    const localWallet: LocalUserWallet = walletString ? JSON.parse(walletString) : { balance: 0, transactions: [] };
    setTotalBalance(localWallet.balance);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-5 py-4 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display">Painel de Cashback</h2>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      <div className="p-5">
        
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-yellow-500">
                    <Coins className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Saldo de Cashback</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-sm opacity-70">R$</span>
                    <span className="text-4xl font-bold font-display">{totalBalance.toFixed(2).replace('.', ',')}</span>
                </div>
                <p className="text-xs text-gray-400">
                    Disponível para uso em parceiros.
                </p>
            </div>
        </div>

        {/* Section: Como Funciona */}
        <div className="mb-8">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-3">Como funciona?</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-5">
                
                {/* Passo 1 */}
                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Compre nas lojas parceiras da Freguesia.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">Escolha uma loja que participa do Cashback Localizei.</p>
                    </div>
                </div>

                {/* Passo 2 */}
                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Avise que você participa do cashback Localizei.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">No momento do pagamento, informe ao vendedor que quer pontuar no aplicativo.</p>
                    </div>
                </div>

                {/* Passo 3 */}
                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Escaneie o QR Code do lojista com o seu celular.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">Abra o app Localizei, leia o QR Code da loja e informe o valor da sua compra.</p>
                    </div>
                </div>

                {/* Passo 4 */}
                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Receba na hora 5% de cashback.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">Uma parte do valor da sua compra volta imediatamente para a sua carteira digital.</p>
                    </div>
                </div>

                {/* Passo 5 */}
                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">5</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Use seu saldo nas próximas compras.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">Com dinheiro na carteira, você pode usar o cashback como desconto em novas compras nas lojas participantes.</p>
                    </div>
                </div>

            </div>
        </div>

        {/* Section: Em breve (Early Stage Notice) */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 mb-8 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
                <h4 className="font-bold text-blue-700 dark:text-blue-300 text-sm mb-1">Novidade chegando!</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                    Estamos finalizando os detalhes para você ganhar dinheiro de volta nas suas compras na Freguesia. Em breve, esta funcionalidade estará liberada em centenas de lojas.
                </p>
            </div>
        </div>

        {/* Section: Histórico de Ganhos (Empty Placeholder) */}
        <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-3">Histórico de ganhos</h3>
            <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed">
                <Clock className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">Nenhum ganho recente</p>
            </div>
        </div>

      </div>
    </div>
  );
};
