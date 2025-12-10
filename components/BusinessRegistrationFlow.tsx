
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Search, Building2, Smartphone, Mail, CheckCircle2, AlertTriangle, Upload, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

interface BusinessRegistrationFlowProps {
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'search' | 'found' | 'not_found' | 'select_method' | 'otp' | 'success' | 'manual_verify';

// Mock Data for "Existing Store" simulation
const EXISTING_STORE_MOCK = {
  cnpj: '12345678000199', // Trigger for existing store flow
  name: 'Padaria Estrela da Freguesia',
  address: 'Estrada dos Três Rios, 1200 - Freguesia',
  category: 'Alimentação'
};

export const BusinessRegistrationFlow: React.FC<BusinessRegistrationFlowProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState<Step>('search');
  const [formData, setFormData] = useState({
    cnpj: '',
    name: '',
    phone: '',
    email: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'whatsapp' | 'sms' | 'email' | null>(null);

  // --- Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API Check
    setTimeout(() => {
      setIsLoading(false);
      const cleanCNPJ = formData.cnpj.replace(/\D/g, '');
      
      // If CNPJ matches mock, go to "Found/Claim" flow
      if (cleanCNPJ === EXISTING_STORE_MOCK.cnpj) {
        setStep('found');
      } else {
        setStep('not_found');
      }
    }, 1500);
  };

  const sendVerificationCode = (method: 'whatsapp' | 'sms' | 'email') => {
    setVerificationMethod(method);
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multi-char paste for simplicity
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        // Simulate success for "123456", fail for anything else to show manual flow
        if (otp.join('') === '123456') {
            setStep('success');
        } else {
            alert("Código incorreto (use 123456 para testar). Se falhar novamente, iremos para verificação manual.");
            // In a real app, track attempts. Here we redirect to manual for demo if user wants
        }
    }, 1500);
  };

  // --- Render Steps ---

  const renderSearch = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display">Cadastrar meu negócio</h2>
      <p className="text-gray-500 text-sm mb-8">Preencha os dados abaixo para localizarmos sua empresa.</p>

      <form onSubmit={handleSearchSubmit} className="space-y-5">
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CNPJ</label>
            <input 
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder="00.000.000/0001-00"
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 outline-none focus:border-[#1E5BFF] transition-colors"
                required
            />
            <p className="text-[10px] text-gray-400 mt-1">Digite 12345678000199 para simular loja existente.</p>
        </div>
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome da Loja</label>
            <input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Padaria do Bairro"
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 outline-none focus:border-[#1E5BFF] transition-colors"
                required
            />
        </div>
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone (WhatsApp)</label>
            <input 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(21) 99999-9999"
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 outline-none focus:border-[#1E5BFF] transition-colors"
                required
            />
        </div>
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail Comercial</label>
            <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="contato@loja.com.br"
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 outline-none focus:border-[#1E5BFF] transition-colors"
                required
            />
        </div>

        <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
        >
            {isLoading ? 'Buscando...' : 'Continuar cadastro'}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );

  const renderNotFound = () => (
    <div className="animate-in slide-in-from-right duration-300 flex flex-col items-center text-center pt-8">
        <div className="w-20 h-20 bg-[#EAF0FF] dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 text-[#1E5BFF]">
            <Building2 className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Não encontramos sua loja</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-xs">
            O CNPJ informado não consta na nossa base. Vamos criar um novo cadastro do zero para você.
        </p>
        <button 
            onClick={() => onComplete()} // For demo purposes, just finish
            className="w-full bg-[#1E5BFF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20"
        >
            Criar novo cadastro
        </button>
        <button onClick={() => setStep('search')} className="mt-4 text-sm text-gray-500 font-bold">
            Voltar e corrigir dados
        </button>
    </div>
  );

  const renderFound = () => (
    <div className="animate-in slide-in-from-right duration-300 pt-4">
        <div className="bg-[#EAF0FF] dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex gap-3 items-start mb-6">
            <AlertTriangle className="w-6 h-6 text-[#1E5BFF] shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                Esta loja já está cadastrada no Localizei Freguesia. Para administrar o perfil, você precisa reivindicar a propriedade.
            </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-4 mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-gray-400" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{EXISTING_STORE_MOCK.name}</h3>
                    <p className="text-xs text-gray-500">{EXISTING_STORE_MOCK.category}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p>Perfil Ativo</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">{EXISTING_STORE_MOCK.address}</p>
        </div>

        <button 
            onClick={() => setStep('select_method')}
            className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
        >
            Reivindicar esta loja
        </button>
    </div>
  );

  const renderSelectMethod = () => (
    <div className="animate-in slide-in-from-right duration-300 pt-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirmação de Identidade</h2>
        <p className="text-gray-500 text-sm mb-6">
            Precisamos garantir que você é o proprietário. Escolha como deseja receber o código de verificação:
        </p>

        <div className="space-y-3">
            <button onClick={() => sendVerificationCode('whatsapp')} className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:border-green-500 transition-colors shadow-sm group">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">WhatsApp</p>
                    <p className="text-xs text-gray-500">Enviar código para (21) *****-9999</p>
                </div>
            </button>

            <button onClick={() => sendVerificationCode('sms')} className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:border-[#1E5BFF] transition-colors shadow-sm group">
                <div className="w-10 h-10 bg-[#EAF0FF] dark:bg-blue-900/20 text-[#1E5BFF] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-left">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">SMS</p>
                    <p className="text-xs text-gray-500">Enviar código para (21) *****-9999</p>
                </div>
            </button>

            <button onClick={() => sendVerificationCode('email')} className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:border-[#1E5BFF] transition-colors shadow-sm group">
                <div className="w-10 h-10 bg-[#EAF0FF] dark:bg-blue-900/20 text-[#1E5BFF] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">E-mail Comercial</p>
                    <p className="text-xs text-gray-500">Enviar para con***@loja.com.br</p>
                </div>
            </button>
        </div>
    </div>
  );

  const renderOtp = () => (
    <div className="animate-in slide-in-from-right duration-300 pt-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-[#1E5BFF]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Digite o código</h2>
        <p className="text-gray-500 text-sm mb-8 text-center max-w-[260px]">
            Enviamos um código de 6 dígitos para o seu {verificationMethod === 'whatsapp' ? 'WhatsApp' : verificationMethod === 'sms' ? 'celular via SMS' : 'e-mail'}.
        </p>

        <div className="flex gap-2 mb-8">
            {otp.map((digit, idx) => (
                <input
                    key={idx}
                    ref={(el) => {
                        otpRefs.current[idx] = el;
                    }}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-14 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-center text-xl font-bold focus:border-[#1E5BFF] focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                />
            ))}
        </div>

        <button 
            onClick={verifyOtp}
            disabled={otp.some(d => !d) || isLoading}
            className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
            {isLoading ? 'Verificando...' : 'Confirmar Código'}
        </button>

        <div className="mt-6 flex flex-col gap-3 items-center">
            <button className="text-xs font-bold text-[#1E5BFF]">Reenviar código</button>
            <button onClick={() => setStep('manual_verify')} className="text-xs text-gray-400 underline">
                Não recebi o código
            </button>
        </div>
    </div>
  );

  const renderManualVerify = () => (
    <div className="animate-in slide-in-from-right duration-300 pt-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Verificação Manual</h2>
        <p className="text-gray-500 text-sm mb-6">
            Não conseguimos verificar automaticamente. Por favor, envie um documento que comprove a propriedade da loja (Ex: Contrato Social, Cartão CNPJ ou Conta de Luz).
        </p>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center mb-6 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Toque para enviar documento</p>
            <p className="text-xs text-gray-400 mt-1">PDF ou Imagem (max 5MB)</p>
        </div>

        <button 
            onClick={() => {
                setIsLoading(true);
                setTimeout(() => { setIsLoading(false); setStep('success'); }, 1500);
            }}
            className="w-full bg-gray-900 dark:bg-gray-700 text-white font-bold py-4 rounded-2xl shadow-sm active:scale-[0.98] transition-all"
        >
            Enviar para análise
        </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="animate-in zoom-in duration-500 flex flex-col items-center text-center pt-10 h-full justify-center pb-20">
        <div className="w-24 h-24 bg-[#EAF0FF] dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-200 dark:shadow-none">
            <CheckCircle2 className="w-12 h-12 text-[#1E5BFF]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Parabéns!</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-8 max-w-xs leading-relaxed">
            Você agora é o administrador oficial desta loja no Localizei Freguesia.
        </p>

        <button 
            onClick={onComplete}
            className="w-full bg-[#1E5BFF] text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
            Ir para o painel do lojista
            <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
            <div className="flex-1">
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-[#1E5BFF] transition-all duration-500"
                        style={{ width: 
                            step === 'search' ? '10%' : 
                            step === 'found' ? '30%' : 
                            step === 'not_found' ? '30%' :
                            step === 'select_method' ? '50%' :
                            step === 'otp' ? '70%' :
                            step === 'manual_verify' ? '80%' :
                            '100%' 
                        }}
                    ></div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 pb-24 max-w-md mx-auto">
            {step === 'search' && renderSearch()}
            {step === 'found' && renderFound()}
            {step === 'not_found' && renderNotFound()}
            {step === 'select_method' && renderSelectMethod()}
            {step === 'otp' && renderOtp()}
            {step === 'manual_verify' && renderManualVerify()}
            {step === 'success' && renderSuccess()}
        </div>
    </div>
  );
};
