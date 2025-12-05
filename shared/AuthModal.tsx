import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Eye, EyeOff, LogOut, User as UserIcon } from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
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
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-gray-50 dark:bg-gray-900 w-full max-w-md h-auto min-h-[600px] rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl relative flex flex-col overflow-hidden">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 flex flex-col items-center flex-1 overflow-y-auto no-scrollbar">
          
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 dark:shadow-none flex-shrink-0">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display text-center">
            {mode === 'register' ? 'Crie sua conta' : 'Acesse sua conta'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8 max-w-[260px] leading-relaxed">
            {mode === 'register' 
              ? 'Comece a usar nosso app preenchendo seus dados' 
              : 'Entre com seu e-mail e senha para continuar'}
          </p>

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

          <div className="w-full">
             <button 
               type="button"
               onClick={handleGoogleLogin}
               disabled={isLoading}
               className="w-full flex items-center justify-center gap-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 font-medium text-sm shadow-sm disabled:opacity-50"
             >
               Google
             </button>
          </div>

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