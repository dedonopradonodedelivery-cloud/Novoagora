
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { User } from 'firebase/auth';

export const useFavorites = (user: User | null) => {
  const [favoritesIds, setFavoritesIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar IDs dos favoritos iniciais do usuário
  useEffect(() => {
    if (!user || !supabase) {
      setFavoritesIds([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('business_id')
          .eq('user_id', user.uid);

        if (error) throw error;

        if (data) {
          setFavoritesIds(data.map((item: any) => item.business_id));
        }
      } catch (err) {
        console.error('Erro ao buscar favoritos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Função de Toggle (Adicionar/Remover)
  const toggleFavorite = useCallback(async (storeId: string) => {
    if (!user || !supabase) return false;

    // Atualização otimista da UI
    const isCurrentlyFavorite = favoritesIds.includes(storeId);
    
    setFavoritesIds(prev => 
      isCurrentlyFavorite 
        ? prev.filter(id => id !== storeId) 
        : [...prev, storeId]
    );

    try {
      if (isCurrentlyFavorite) {
        // Remover
        const { error } = await supabase
          .from('favorites')
          .delete()
          .match({ user_id: user.uid, business_id: storeId });
        
        if (error) throw error;
      } else {
        // Adicionar
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.uid, business_id: storeId });
        
        if (error) throw error;
      }
      return true;
    } catch (err) {
      console.error('Erro ao atualizar favorito:', err);
      // Reverter em caso de erro
      setFavoritesIds(prev => 
        isCurrentlyFavorite 
          ? [...prev, storeId] 
          : prev.filter(id => id !== storeId)
      );
      return false;
    }
  }, [user, favoritesIds]);

  const isFavorite = (storeId: string) => favoritesIds.includes(storeId);

  return { favoritesIds, toggleFavorite, isFavorite, loading };
};
