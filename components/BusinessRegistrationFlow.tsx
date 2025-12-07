import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  Building2,
  Smartphone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

interface BusinessRegistrationFlowProps {
  onBack: () => void;
  onComplete: () => void;
}

type Step =
  | 'search'
  | 'found'
  | 'not_found'
  | 'select_method'
  | 'otp'
  | 'success'
  | 'manual_verify';

// Mock Data for "Existing Store" simulation
const EXISTING_STORE_MOCK = {
  cnpj: '12345678000199', // Trigger for existing store flow
  name: 'Padaria Estrela da Freguesia',
  address: 'Estrada dos Três Rios, 1200 - Freguesia',
  category: 'Alimentação',
};

export const BusinessRegistrationFlow: React.FC<BusinessRegistrationFlowProps> = ({
  onBack,
  onComplete,
}) => {
  const [step, setStep] = useState<Step>('search');
  const [formData, setFormData] = useState({
    cnpj: '',
    name: '',
    phone: '',
    email: '',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<
    'whatsapp' | 'sms' | 'email' | null
  >(null);

  // --- Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        alert(
          'Código incorreto (use 123456 para testar). Se falhar novamente, iremos para verificação manual.'
        );
        // Em produção você contaria tentativas e poderia mandar para manual
      }
    }, 1500);
  };

  // --- Render Steps ---

  const renderSearch = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display">
        Cadastrar meu negócio
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Preencha os dados abaixo para localizarmos sua empresa.
      </p>

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
          <p className="text-[10px] text-gray-400 mt-1">
            Digite 12345678000199 para simular loja existente.
          </p>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Nome da Loja
          </label>
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
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Telefone (WhatsApp)
          </label>
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
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            E-mail Comercial
          </label>
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
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Não encontramos sua loja
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-xs">
        O CNPJ informado não consta na nossa base. Vamos criar um novo cadastro do zero para você.
      </p>
      <button
        onClick={() => onComplete()} // For demo purposes, just finish
        className="w-full bg-[#1E5BFF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20"
      >
        Criar novo cadastro
      </button>
      <button
        onClick={() => setStep('search')}
        className="mt-4 text-sm text-gray-500 font-bold"
      >
        Voltar e corrigir dados
      </button>
    </div>
  );

  const renderFound = () => (
    <div className="animate-in slide-in-from-right duration-300 pt-4">
      <div className="bg-[#EAF0FF] dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex gap-3 items-start mb-6">
        <AlertTriangle className="w-6 h-6 text-[#1E5BFF] shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
          Esta loja já está cadastrada no Localizei Freguesia. Para administrar o perfil, você
          precisa reivindicar a propriedade.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
        <div className="flex items-center gap-4 mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
            <Building2 className="w-7 h-7 text-gray-400" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {EXISTING_STORE_MOCK.name}
            </h3>
            <p className="text-xs text-gray-500">{EXISTING_STORE_MOCK.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="w-2 h-2 rounded-full bg-green-500" />
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
    <di
