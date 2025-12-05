import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ChevronRight, Store as StoreIcon, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Store, AdType } from '../types';

interface SearchStoresProps {
  onStoreClick: (store: Store) => void;
}

export const SearchStores: React.FC<SearchStoresProps> = ({ onStoreClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce logic to prevent too many DB calls
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    searchTimeoutRef.current = setTimeout(() => {
      fetchResults(query);
    }, 400); // 400ms delay

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query]);

  const fetchResults = async (searchTerm: string) => {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      setLoading(false);
      return;
    }

    try {
      // Querying the 'businesses' table as requested
      // Using ilike for case-insensitive partial matching
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,subCategory.ilike.%${searchTerm}%,tags.ilike.%${searchTerm}%`)
        .limit(20);

      if (error) throw error;

      // Mapping database results to the App's Store interface
      const mappedResults: Store[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        subcategory: item.subCategory,
        image: item.imageUrl || 'https://via.placeholder.com/100', // Fallback image
        
        // Default values for required fields not in search result
        rating: item.rating || 0,
        description: item.description || '',
        distance: 'Localizado', // Placeholder
        adType: AdType.ORGANIC, 
        reviewsCount: 0,
      }));

      setResults(mappedResults);
      setHasSearched(true);
    } catch (err) {
      console.error('Error searching stores:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-sans animate-in fade-in duration-300">
      
      {/* Search Input */}
      <div className="relative group mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar lojas, serviços ou categorias..."
          className="block w-full pl-11 pr-4 py-4 border-none rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm font-medium"
        />
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {query.trim() && !loading && results.length === 0 && hasSearched && (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
             <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                <AlertCircle className="w-6 h-6 text-gray-400" />
             </div>
             <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">Nenhuma loja encontrada.</p>
             <p className="text-gray-400 text-xs mt-1">Tente buscar por outro termo.</p>
          </div>
        )}

        {results.map((store) => (
          <div
            key={store.id}
            onClick={() => onStoreClick(store)}
            className="group flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-primary-200 dark:hover:border-primary-900 transition-all duration-300 active:scale-[0.99]"
          >
            {/* Logo/Image */}
            <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden relative border border-gray-50 dark:border-gray-600">
              {store.image ? (
                <img 
                  src={store.image} 
                  alt={store.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <StoreIcon className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight truncate group-hover:text-primary-500 transition-colors">
                {store.name}
              </h3>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-md truncate">
                  {store.category}
                </span>
                {store.subcategory && (
                  <>
                    <span className="text-gray-300 text-[10px]">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {store.subcategory}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Action Icon */}
            <div className="pr-2">
              <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};