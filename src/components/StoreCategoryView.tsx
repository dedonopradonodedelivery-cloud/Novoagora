
import React from 'react';
import { ChevronLeft, ShoppingCart, Plus, Coins } from 'lucide-react';

// --- Mock Data for Layout ---
const mockProducts = [
  { id: 1, name: 'Hambúrguer Clássico da Casa com Queijo', price_original: '32.50', price_current: '28.50', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format=fit-crop', cashback_percent: 5 },
  { id: 2, name: 'Batata Frita Especial com Alecrim e Páprica', price_original: '15.00', price_current: '15.00', image: 'https://images.unsplash.com/photo-1606756790138-aa6f1afa76f4?q=80&w=400&auto=format=fit-crop', cashback_percent: 0 },
  { id: 3, name: 'Pizza Marguerita Grande (8 Fatias)', price_original: '55.00', price_current: '49.90', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format=fit-crop', cashback_percent: 10 },
  { id: 4, name: 'Coca-Cola Lata 350ml', price_original: '6.00', price_current: '6.00', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32a6444?q=80&w=400&auto=format=fit-crop', cashback_percent: 0 },
  { id: 5, name: 'Milkshake de Chocolate Belga com Pedaços', price_original: '22.00', price_current: '22.00', image: 'https://images.unsplash.com/photo-1627998691138-c3f15c1b523e?q=80&w=400&auto=format=fit-crop', cashback_percent: 3 },
  { id: 6, name: 'Sundae de Caramelo com Castanhas', price_original: '20.00', price_current: '18.00', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c934d?q=80&w=400&auto=format=fit-crop', cashback_percent: 0 },
  { id: 7, name: 'Frango Frito Crocante (Balde)', price_original: '39.90', price_current: '39.90', image: 'https://images.unsplash.com/photo-1569058242253-92a9c5552db3?q=80&w=400&auto=format=fit-crop', cashback_percent: 0 },
  { id: 8, name: 'Suco Natural de Laranja 500ml', price_original: '9.00', price_current: '9.00', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=400&auto=format=fit-crop', cashback_percent: 0 },
];

// --- Sub-components for better organization ---

const ProductCard: React.FC<{ product: typeof mockProducts[0] }> = ({ product }) => {
    const priceOriginal = parseFloat(product.price_original.replace(',', '.'));
    const priceCurrent = parseFloat(product.price_current.replace(',', '.'));
    const hasDiscount = priceOriginal > priceCurrent;
    const discountPercent = hasDiscount ? Math.floor(((priceOriginal - priceCurrent) / priceOriginal) * 100) : 0;
    const hasCashback = product.cashback_percent && product.cashback_percent > 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 flex flex-col gap-3 group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="aspect-square rounded-lg overflow-hidden relative">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                 {hasDiscount && (
                    <div className="absolute top-2 left-2 bg-[#1E5BFF] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
                        {discountPercent}% OFF
                    </div>
                )}
                <button className="absolute bottom-2 right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform duration-200">
                    <ShoppingCart className="w-4 h-4 text-[#1E5BFF]" />
                </button>
            </div>
            <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-sm text-[#000] dark:text-white line-clamp-2 h-10 leading-tight">
                    {product.name}
                </h3>
                <div className="flex flex-col mt-auto pt-2">
                    <div>
                        {hasDiscount && (
                            <p className="text-sm text-[#9CA3AF] line-through">
                                R$ {product.price_original}
                            </p>
                        )}
                        <div className="flex items-center gap-1.5">
                            <p className="font-bold text-base text-[#000] dark:text-gray-100">
                                R$ {product.price_current}
                            </p>
                             {hasDiscount && (
                                <p className="text-sm font-bold text-[#0E8A3A]">
                                    · {discountPercent}% OFF
                                </p>
                            )}
                        </div>
                    </div>
                     {hasCashback && (
                        <div className="mt-1.5 flex items-center gap-1.5 bg-[#E6F8EA] text-[#0E8A3A] w-fit px-2 py-1 rounded-lg">
                            <Coins className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">{product.cashback_percent}% Cashback</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

interface StoreCategoryViewProps {
  categoryName: string;
  onBack: () => void;
}

export const StoreCategoryView: React.FC<StoreCategoryViewProps> = ({ categoryName, onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8F6F6] dark:bg-gray-950 font-sans">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full max-w-md mx-auto h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-20 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          {categoryName}
        </h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ShoppingCart className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
      </header>

      {/* Scrollable Content */}
      <main className="pt-16 overflow-y-auto">
        <div className="p-4 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
