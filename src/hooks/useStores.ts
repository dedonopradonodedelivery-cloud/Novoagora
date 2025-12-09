import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Store, AdType } from '../types';

interface UseStoresResult {
  stores: Store[];
  loading: boolean;
  error: string | null;
}

export function useStores(): UseStoresResult {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStores() {
      // Safety check if supabase client didn't initialize
      if (!supabase) {
        console.warn('Supabase client is null. Check environment variables.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('estabelecimentos')
          .select('*');

        if (error) {
          console.error('Erro ao buscar estabelecimentos:', error);
          setError(error.message);
          setStores([]);
          setLoading(false);
          return;
        }

        const mapped: Store[] = (data ?? []).map((row: any) => ({
          id: row.id,
          name: row.nome,
          category: row.categoria ?? 'Outros',
          description: row.descricao ?? row.endereco ?? '',
          image:
            row.image_url ??
            'https://via.placeholder.com/300x300?text=Localizei',
          rating: row.rating ?? 0,
          reviewsCount: row.total_reviews ?? 0,

          // Campos que o app já usa mas ainda não vêm do banco:
          distance: 'Freguesia • RJ',
          cashback: row.cashback ?? null,
          adType: (row.ad_type as AdType) ?? AdType.ORGANIC,
          subcategory: row.subcategoria ?? '',
          
          // Mapping fields for Detail View
          address: row.endereco,
          phone: row.telefone,
          hours: row.horario_funcionamento,
        }));

        setStores(mapped);
      } catch (e: any) {
        console.error('Erro inesperado ao carregar lojas:', e);
        setError(e?.message ?? 'Erro desconhecido');
        setStores([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  return { stores, loading, error };
}
