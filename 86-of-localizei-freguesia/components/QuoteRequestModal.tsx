
import React, { useState } from 'react';
import { X, Send, Clock, MapPin, AlertCircle, CheckCircle2, Camera } from 'lucide-react';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  onSuccess?: () => void;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({ isOpen, onClose, categoryName, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [images, setImages] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      if (images.length + files.length > 3) {
        alert("Você pode adicionar no máximo 3 fotos.");
        return;
      }

      // Create object URLs for preview
      const newImages = files.map(file => URL.createObjectURL(file as Blob));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Close after success message
      setTimeout(() => {
        setIsSent(false);
        setDescription('');
        setImages([]);
        onClose();
        if (onSuccess) onSuccess();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isSent ? (
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pedido Enviado!</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Sua solicitação foi enviada para os profissionais de <strong>{categoryName}</strong>. Em breve você receberá orçamentos no seu WhatsApp.
            </p>
          </div>
        ) : (
          <div className="p-6 pb-8">
            {/* Handle Bar */}
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[#1E5BFF] font-bold text-xs uppercase tracking-wider">Solicitar Orçamento</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{categoryName}</h2>
              </div>
              <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">O que você precisa?</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o serviço com detalhes (ex: Preciso trocar a fiação do chuveiro e instalar 2 tomadas...)"
                  className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#1E5BFF] outline-none resize-none text-sm dark:text-white"
                  required
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fotos (Opcional)</label>
                    <span className="text-xs text-gray-400">{images.length}/3</span>
                </div>
                
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {/* Upload Button */}
                    {images.length < 3 && (
                        <label className="flex-shrink-0 w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageUpload}
                            />
                            <Camera className="w-6 h-6 text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-400">Adicionar</span>
                        </label>
                    )}

                    {/* Image Previews */}
                    {images.map((img, idx) => (
                        <div key={idx} className="relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 group">
                            <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
              </div>

              {/* Urgency Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Qual a urgência?</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button" 
                    onClick={() => setUrgency('low')}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${urgency === 'low' ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}
                  >
                    Pode esperar
                  </button>
                  <button
                    type="button" 
                    onClick={() => setUrgency('normal')}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${urgency === 'normal' ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}
                  >
                    Para essa semana
                  </button>
                  <button
                    type="button" 
                    onClick={() => setUrgency('high')}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${urgency === 'high' ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}
                  >
                    <AlertCircle className="w-3 h-3" />
                    Urgente
                  </button>
                </div>
              </div>

              {/* Info Note */}
              <div className="bg-[#EAF0FF] dark:bg-blue-900/10 p-3 rounded-xl flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#1E5BFF] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Seu pedido será enviado para profissionais verificados da <strong>Freguesia</strong>.
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSending || !description.trim()}
                className="w-full py-4 bg-[#1E5BFF] hover:bg-[#1749CC] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {isSending ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  <>
                    Solicitar Orçamento
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
