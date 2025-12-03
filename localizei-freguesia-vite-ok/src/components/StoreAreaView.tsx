
import React from 'react';
import { ChevronLeft, Store, Phone, MapPin, Clock, Edit, FileText, MessageSquare } from 'lucide-react';

interface StoreAreaViewProps {
  onBack: () => void;
}

export const StoreAreaView: React.FC<StoreAreaViewProps> = ({ onBack }) => {
  // Mock data for the logged-in shopkeeper
  const myStore = {
    name: "Minha Loja Exemplo",
    logo: "https://picsum.photos/200/200?random=50",
    category: "Alimentação",
    phone: "(21) 99999-8888",
    address: "Rua Tirol, 123 - Freguesia",
    description: "O melhor atendimento e produtos da região. Venha conferir nossas ofertas!",
    hours: "Seg à Sex: 09h às 19h"
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-display leading-tight">
            Área do Lojista
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Gerencie seu negócio</p>
        </div>
      </div>

      <div className="p-5">
        
        {/* Store Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border-4 border-white dark:border-gray-600 shadow-md mb-4">
                    <img src={myStore.logo} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{myStore.name}</h2>
                <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full mt-2">
                    {myStore.category}
                </span>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">Telefone</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{myStore.phone}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">Endereço</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{myStore.address}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Store className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">Descrição</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{myStore.description}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">Funcionamento</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{myStore.hours}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4">
            <button className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        <Edit className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-gray-800 dark:text-white">Editar meus dados</h3>
                        <p className="text-xs text-gray-500">Atualizar informações da loja</p>
                    </div>
                </div>
            </button>

            <button className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-gray-800 dark:text-white">Meus orçamentos</h3>
                        <p className="text-xs text-gray-500">Ver pedidos recebidos</p>
                    </div>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    2 novos
                </div>
            </button>
        </div>

      </div>
    </div>
  );
};
