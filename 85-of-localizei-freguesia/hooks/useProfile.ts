
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface SaveProfileData {
  firebase_uid: string;
  email: string | null;
  nome: string;
  telefone: string;
  avatar_url: string | null;
  role: 'cliente' | 'lojista';
}

export const useProfile = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProfile = async (data: SaveProfileData) => {
    setIsSaving(true);
    setError(null);

    try {
      // Upsert: Updates if exists, inserts if new
      const { error: dbError } = await supabase
        .from('profiles')
        .upsert(
          {
            firebase_uid: data.firebase_uid,
            email: data.email,
            nome: data.nome,
            telefone: data.telefone,
            avatar_url: data.avatar_url,
            role: data.role,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'firebase_uid' }
        );

      if (dbError) throw dbError;

      return true;
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError('Erro ao salvar perfil. Tente novamente.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return { saveProfile, isSaving, error };
};
