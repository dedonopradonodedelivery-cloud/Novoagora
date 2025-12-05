
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Coins, Clock, AlertCircle, TrendingUp, CheckCircle2, ShoppingBag } from 'lucide-react';
import { LocalUserWallet } from '../types';

interface CashbackViewProps {
  onBack: () => void;
  newTransaction?: any;
}

export const CashbackView: React.FC<CashbackViewProps> = ({ onBack, newTransaction }) => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Basic initial state
    let currentBalance = 0;
    
    // In a real app, you would fetch this from Supabase
    // Simulating History based on "newTransaction" for immediate feedback
    const baseTransactions = [
        { id: 't1', store: 'Padaria Imperial', date: '20/10/2023', amount: 4.50, type: 'earn' },
        { id: 't2', store: 'PetShop Amigo', date: '15/10/2023', amount: 12.00, type: 'earn' },
        { id: 't3', store: 'Farmácia Central', date: '10/10/2023', amount: -5.00, type: 'spend' }
    ];

    if (newTransaction) {
        // Add new transaction to top of list
        const newTx = {
            id: `new-${Date.now()}`,
            store: newTransaction.store || 'Loja Parceira',
            date: 'Agora',
            amount: newTransaction.earned,
            type: 'earn'
        };
        setTransactions([newTx, ...baseTransactions]);
        currentBalance = 15.50 + newTransaction.earned; // Base + New
    } else {
        setTransactions(baseTransactions);
        currentBalance = 15.50; // Mock base balance
    }

    setTotalBalance(currentBalance);
  }, [newTransaction]);

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
        <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display">Minha Carteira</h2>
        <div className="w-10"></div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* SUCCESS BANNER (Shown if navigated from payment) */}
        {newTransaction && (
            <div className="bg-green-500 rounded-2xl p-5 text-white shadow-lg shadow-green-500/30 flex flex-col items-center text-center animate-in zoom-in duration-500 mb-2">
                <div className="bg-white/20 p-2 rounded-full mb-3">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-1">Pagamento Confirmado!</h3>
                <p className="text-green-100 text-sm mb-4">
                    Você acabou de ganhar cashback nesta compra.
                </p>
                <div className="bg-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-white" />
                    <span className="font-bold text-lg">+ R$ {newTransaction.earned.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
        )}

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-yellow-500">
                    <Coins className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Saldo Disponível</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-sm opacity-70">R$</span>
                    <span className="text-4xl font-bold font-display">{totalBalance.toFixed(2).replace('.', ',')}</span>
                </div>
                <p className="text-xs text-gray-400">
                    Use para pagar em qualquer loja parceira.
                </p>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Lojas</span>
            </button>
            <button className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Ajuda</span>
            </button>
        </div>

        {/* Transactions History */}
        <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 px-1">Histórico</h3>
            
            <div className="space-y-3">
                {transactions.length > 0 ? (
                    transactions.map((tx) => (
                        <div key={tx.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'earn' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {tx.type === 'earn' ? <TrendingUp className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{tx.store}</p>
                                    <p className="text-xs text-gray-500">{tx.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold text-sm ${tx.type === 'earn' ? 'text-green-600' : 'text-gray-900 dark:text-gray-300'}`}>
                                {tx.type === 'earn' ? '+' : '-'} R$ {Math.abs(tx.amount).toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed">
                        <Clock className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">Nenhuma movimentação</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};
