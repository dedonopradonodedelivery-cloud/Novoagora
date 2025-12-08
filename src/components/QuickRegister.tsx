import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { useProfile } from '../hooks/useProfile';
import { User as UserIcon, Smartphone, ChevronRight } from 'lucide-react';

interface QuickRegisterProps {
  user: User;
  onComplete: () => void;
}

export const QuickRegister: React.FC<QuickRegisterProps> = ({ user, onComplete }) => {
  const { saveProfile, isSaving, error } = useProfile();
  
  const [name, setName] = useState(user.displayName || '');
  const [phone, setPhone] = useState('');
  
  // Custom Blue color matching the brand
  const BRAND_BLUE = '#2D6DF6';

  // Apply phone mask (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 11) value = value.slice(0, 11);

    // Mask logic
    if (value.length > 10) {
      value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,5}).*/, '($1) $2');
    } else {
      value = value.replace(/^(\d*)/, '($1');
    }
    
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const rawPhone = phone.replace(/\D/g, '');
    if (rawPhone.length < 10) {
      alert("Por favor, digite um telefone válido.");
      return;
    }
    if (name.trim().length < 2) {
      alert("Por favor, digite seu nome completo.");
      return;
    }

    const success = await saveProfile({
      firebase_uid: user.uid,
      email: user.email,
      avatar_url: user.photoURL,
      nome: name,
      telefone: phone,
      role: 'cliente'
    });

    if (success) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 font-sans">
      
      {/* Progress / Step Indicator */}
      <div className="w-full max-w-sm flex items-center justify-center gap-2 mb-10 opacity-50">
        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Finalize seu cadastro</h1>
          <p className="text-gray-500 mb-8">Precisamos apenas de alguns detalhes para personalizar sua experiência.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Input */}
              <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Nome completo</label>
                  <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <UserIcon className="w-5 h-5" />
                      </div>
                      <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="Digite seu nome"
                      />
                  </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Telefone (WhatsApp)</label>
                  <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <Smartphone className="w-5 h-5" />
                      </div>
                      <input 
                          type="tel" 
                          value={phone}
                          onChange={handlePhoneChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="(21) 99999-9999"
                      />
                  </div>
              </div>

              {error && (
                  <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>
              )}

              <button 
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-[#2D6DF6] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
              >
                  {isSaving ? 'Salvando...' : 'Concluir cadastro'}
                  {!isSaving && <ChevronRight className="w-5 h-5" />}
              </button>
          </form>
      </div>
    </div>
  );
};