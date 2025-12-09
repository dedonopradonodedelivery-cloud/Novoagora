import React from 'react';
import { ChevronLeft, Zap, Wrench, Hammer, PaintRoller, User, Car, Droplet, Key, Truck, Shield, Smartphone, Laptop, Wifi, Dog, Scissors, Sparkles, Briefcase, Scale, Calculator, PenTool, Truck as TruckIcon, Flower, Search } from 'lucide-react';

interface SubcategoriesViewProps {
  macroId: string;
  macroName: string;
  onBack: () => void;
  onSelectSubcategory: (subName: string) => void;
}

// Static Data for Subcategories
const SUBCATEGORIES_DATA: Record<string, { name: string; icon: React.ElementType }[]> = {
  'emergency': [
    { name: 'Chaveiro 24h', icon: Key },
    { name: 'Desentupidora', icon: Droplet },
    { name: 'Guincho', icon: Truck },
    { name: 'Eletricista 24h', icon: Zap },
    { name: 'Bombeiro Hidráulico', icon: Wrench },
    { name: 'Vidraceiro Urgente', icon: Shield },
  ],
  'home': [
    { name: 'Eletricista', icon: Zap },
    { name: 'Encanador', icon: Droplet },
    { name: 'Pedreiro', icon: Hammer },
    { name: 'Pintor', icon: PaintRoller },
    { name: 'Marido de Aluguel', icon: User },
    { name: 'Ar Condicionado', icon: Wrench },
    { name: 'Marceneiro', icon: Hammer },
    { name: 'Serralheiro', icon: Key },
  ],
  'auto': [
    { name: 'Mecânico', icon: Wrench },
    { name: 'Funilaria e Pintura', icon: PaintRoller },
    { name: 'Auto Elétrica', icon: Zap },
    { name: 'Guincho', icon: Truck },
    { name: 'Borracharia', icon: Car },
    { name: 'Estética Automotiva', icon: Sparkles },
    { name: 'Insulfilm', icon: Shield },
  ],
  'tech': [
    { name: 'Conserto de Celular', icon: Smartphone },
    { name: 'Informática', icon: Laptop },
    { name: 'Internet e Redes', icon: Wifi },
    { name: 'Câmeras de Segurança', icon: Shield },
    { name: 'Impressoras', icon: Wrench },
  ],
  'pet': [
    { name: 'Banho e Tosa', icon: Scissors },
    { name: 'Veterinário', icon: Dog },
    { name: 'Passeador (Dog Walker)', icon: User },
    { name: 'Adestramento', icon: Sparkles },
    { name: 'Hotelzinho', icon: Dog },
  ],
  'clean': [
    { name: 'Diarista', icon: Sparkles },
    { name: 'Limpeza de Estofados', icon: User },
    { name: 'Dedetização', icon: Shield },
    { name: 'Limpeza Pós-obra', icon: Hammer },
    { name: 'Lavanderia', icon: Droplet },
  ],
  'pro': [
    { name: 'Advogado', icon: Scale },
    { name: 'Contador', icon: Calculator },
    { name: 'Designer Gráfico', icon: PenTool },
    { name: 'Consultor', icon: Briefcase },
    { name: 'Tradutor', icon: PenTool },
  ],
  'other': [
    { name: 'Fretes e Mudanças', icon: TruckIcon },
    { name: 'Jardinagem', icon: Flower },
    { name: 'Costureira', icon: Scissors },
    { name: 'Sapateiro', icon: Hammer },
    { name: 'Outros', icon: Search },
  ],
};

export const SubcategoriesView: React.FC<SubcategoriesViewProps> = ({ macroId, macroName, onBack, onSelectSubcategory }) => {
  const items = SUBCATEGORIES_DATA[macroId] || SUBCATEGORIES_DATA['other'];

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
              {macroName}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Escolha o tipo de serviço que você precisa
            </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {items.map((sub, idx) => {
            const Icon = sub.icon;
            return (
              <button 
                key={idx}
                onClick={() => onSelectSubcategory(sub.name)}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all active:scale-[0.98] min-h-[120px] group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-primary-500 group-hover:bg-primary-50 dark:group-hover:bg-gray-600 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200 text-sm text-center leading-tight">
                  {sub.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};