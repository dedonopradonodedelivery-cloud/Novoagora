
import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Eye, EyeOff, LogOut, User as UserIcon } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  User
} from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

type AuthMode = 'register' | 'login';
type ProfileType = 'user' | 'store';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, user }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [profileType, setProfileType] = useState<ProfileType>('user');
  const [showPassword, setShowPassword] = useState(false);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessMsg('');
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleModeSwitch = () => {
    setMode(mode === 'register' ? 'login' : 'register');
    setProfileType('user');
    setShowPassword(false);
    setError('');
    setSuccessMsg('');
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccessMsg('Login com Google realizado com sucesso!');
      setTimeout(onClose, 1500);
    } catch (err: any) {
      setError(`Erro Google: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMsg('Login realizado com sucesso!');
        setTimeout(onClose, 1000);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMsg('Conta criada com sucesso!');
        setTimeout(onClose, 1000);
      }
    } catch (err: any) {
      // Simplify firebase error codes for demo
      if (err.code === 'auth/invalid-api-key') {
          setError('Configuração ausente: API Key inválida no firebase.ts');
      } else if (err.code === 'auth/email-already-in-use') {
          setError('Este e-mail já está cadastrado.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          setError('E-mail ou senha incorretos.');
      } else if (err.code === 'auth/weak-password') {
          setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
          setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
        await signOut(auth);
        setSuccessMsg('Você saiu da conta.');
        setTimeout(onClose, 1000);
    } catch (err: any) {
        setError(err.message);
    }
  }

  // --- View: Logged In User Profile ---
  if (user) {
      return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-8 flex flex-col items-center relative">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <X className="w-6 h-6" />
                </button>

                <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-primary-500">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600">
                            <UserIcon className="w-10 h-10" />
                        </div>
                    )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{user.displayName || 'Usuário Localizei'}</h2>
                <p className="text-sm text-gray-500 mb-6">{user.email}</p>

                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 p-4 rounded-xl font-bold transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sair (Logout)
                </button>
            </div>
        </div>
      )
  }

  // --- View: Login / Register ---
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-gray-50 dark:bg-gray-900 w-full max-w-md h-auto min-h-[600px] rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 flex flex-col items-center flex-1 overflow-y-auto no-scrollbar">
          
          {/* Header Icon */}
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 dark:shadow-none flex-shrink-0">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display text-center">
            {mode === 'register' ? 'Crie sua conta' : 'Acesse sua conta'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8 max-w-[260px] leading-relaxed">
            {mode === 'register' 
              ? 'Comece a usar nosso app preenchendo seus dados' 
              : 'Entre com seu e-mail e senha para continuar'}
          </p>

          {/* Status Messages */}
          {error && (
            <div className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-xl mb-4 text-center font-medium border border-red-100 dark:border-red-800">
                {error}
            </div>
          )}
          {successMsg && (
            <div className="w-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs p-3 rounded-xl mb-4 text-center font-bold border border-green-100 dark:border-green-800">
                {successMsg}
            </div>
          )}

          {/* Profile Type Selector (Only for Register) */}
          {mode === 'register' && (
            <div className="w-full mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                Selecione seu tipo de perfil
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setProfileType('user')}
                  className={`relative p-4 rounded-xl border-2 flex items-center gap-3 transition-all h-[72px] ${
                    profileType === 'user' 
                      ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-md ring-1 ring-primary-500/20' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    profileType === 'user' ? 'border-primary-500' : 'border-gray-300'
                  }`}>
                    {profileType === 'user' && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={`text-sm font-bold leading-tight ${profileType === 'user' ? 'text-gray-900 dark:text-white' : 'text-gray-600'}`}>
                      Usuário
                    </span>
                    <span className={`text-xs ${profileType === 'user' ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500'}`}>
                      (cliente)
                    </span>
                  </div>
                </button>

                <button 
                  type="button"
                  onClick={() => setProfileType('store')}
                  className={`relative p-4 rounded-xl border-2 flex items-center gap-3 transition-all h-[72px] ${
                    profileType === 'store' 
                      ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-md ring-1 ring-primary-500/20' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
                  }`}
                >
                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    profileType === 'store' ? 'border-primary-500' : 'border-gray-300'
                  }`}>
                    {profileType === 'store' && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />}
                  </div>
                  <span className={`text-sm font-medium ${profileType === 'store' ? 'text-gray-900 dark:text-white' : 'text-gray-600'}`}>
                    Lojista
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1">E-mail ou Usuário</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Senha</label>
                {mode === 'login' && (
                    <button type="button" className="text-xs font-bold text-primary-500 hover:text-primary-600">
                        Esqueceu a senha?
                    </button>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={mode === 'register' ? "Crie uma senha forte" : "Digite sua senha"}
                  className="w-full pl-4 pr-12 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transform active:scale-[0.98] transition-all mt-6 text-base flex items-center justify-center"
            >
              {isLoading ? 'Processando...' : (mode === 'register' ? 'Criar conta' : 'Entrar')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative w-full my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">
                {mode === 'register' ? 'Ou continue com' : 'Ou entre com'}
              </span>
            </div>
          </div>

          {/* Social Login (Google Only) */}
          <div className="w-full">
             <button 
               type="button"
               onClick={handleGoogleLogin}
               disabled={isLoading}
               className="w-full flex items-center justify-center gap-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 font-medium text-sm shadow-sm disabled:opacity-50"
             >
               <div className="w-5 h-5">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                 </svg>
               </div>
               Google
             </button>
          </div>

          {/* Toggle Mode Footer */}
          <div className="mt-auto pt-8 flex items-center gap-1 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {mode === 'register' ? 'Já tem uma conta?' : 'Não tem uma conta?'}
            </span>
            <button 
              onClick={handleModeSwitch}
              className="font-bold text-primary-500 hover:text-primary-600"
            >
              {mode === 'register' ? 'Faça login' : 'Crie uma agora'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};