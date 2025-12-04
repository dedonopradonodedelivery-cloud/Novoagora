
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { useProfile } from '../hooks/useProfile';
import { User as UserIcon, Smartphone, ChevronRight, CheckCircle2 } from 'lucide-react';

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
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-8 h-2 rounded-full" style={{ backgroundColor: BRAND_BLUE }}></div>
      </div>

      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Quase lá!</h1>
          <p className="text-gray-500 text-sm">
            Para finalizar, precisamos saber como te chamar e seu contato para o cashback.
          </p>
        </div>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gray-100 p-1 shadow-lg shadow-blue-100 border-2 border-white">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
                  <UserIcon className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1.5 rounded-full border-4 border-white">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Input */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
              Nome Completo
            </label>
            <div className="relative flex items-center">
              <UserIcon className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-[#2D6DF6] transition-colors" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João da Silva"
                className="w-full bg-gray-50 text-gray-800 text-lg py-4 pl-12 pr-4 rounded-2xl border border-gray-100 focus:bg-white focus:border-[#2D6DF6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-300 font-medium"
                required
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
              WhatsApp / Celular
            </label>
            <div className="relative flex items-center">
              <Smartphone className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-[#2D6DF6] transition-colors" />
              <input 
                type="tel" 
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(21) 99999-9999"
                maxLength={15}
                className="w-full bg-gray-50 text-gray-800 text-lg py-4 pl-12 pr-4 rounded-2xl border border-gray-100 focus:bg-white focus:border-[#2D6DF6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-300 font-medium"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-500 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Action Button */}
          <button 
            type="submit"
            disabled={isSaving}
            style={{ backgroundColor: BRAND_BLUE }}
            className="w-full text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="animate-pulse">Salvando...</span>
            ) : (
              <>
                Continuar
                <ChevronRight className="w-5 h-5 stroke-[3]" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
                Seus dados estão protegidos.
            </p>
        </div>
      </div>
    </div>
  );
};