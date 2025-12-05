
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  ChevronLeft, 
  Camera, 
  User as UserIcon, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Loader2,
  Save
} from 'lucide-react';

interface EditProfileViewProps {
  user: User;
  onBack: () => void;
}

export const EditProfileView: React.FC<EditProfileViewProps> = ({ user, onBack }) => {
  const [name, setName] = useState(user.displayName || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user.email || '');
  const [birthDate, setBirthDate] = useState('');
  const [neighborhood, setNeighborhood] = useState('Freguesia');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock initial data load (simulate fetching from DB)
  useEffect(() => {
    // In a real app, you would fetch the extended profile data from Supabase here
    setPhone('(21) 99999-8888');
    setBirthDate('15/05/1990');
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    
    if (value.length > 4) {
      value = value.replace(/^(\d\d)(\d\d)(\d{0,4}).*/, '$1/$2/$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,2}).*/, '$1/$2');
    }
    setBirthDate(value);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-20">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-5 h-16 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Meu Perfil</h1>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="p-6">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <UserIcon className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full shadow-md border-2 border-white dark:border-gray-900 group-hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 font-medium">Toque para alterar a foto</p>
        </div>

        {/* Intro Text */}
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/30">
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed text-center">
            Esses dados ajudam a personalizar a sua experiência no Localizei Freguesia e facilitam seu contato com lojistas.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide ml-1">Nome Completo</label>
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium"
                placeholder="Seu nome"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide ml-1">Telefone / WhatsApp</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="tel" 
                value={phone}
                onChange={handlePhoneChange}
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium"
                placeholder="(21) 99999-9999"
                maxLength={15}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide ml-1">E-mail</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide ml-1">Nascimento</label>
                <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    value={birthDate}
                    onChange={handleDateChange}
                    className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium"
                    placeholder="DD/MM/AAAA"
                    maxLength={10}
                />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide ml-1">Bairro</label>
                <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium"
                    placeholder="Bairro"
                />
                </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#1E5BFF] to-[#4D7CFF] text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Salvando...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        Salvar Alterações
                    </>
                )}
            </button>
          </div>

        </form>
      </div>

      {/* Success Toast */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-500 z-50 ${
            showSuccess ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <CheckCircle2 className="w-5 h-5 text-green-400 dark:text-green-600" />
        <span className="font-bold text-sm">Perfil atualizado com sucesso!</span>
      </div>

    </div>
  );
};
