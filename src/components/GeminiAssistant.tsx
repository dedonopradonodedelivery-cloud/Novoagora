import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { STORES } from '../constants';

// Initialize Gemini Client safely
const initializeGemini = () => {
  try {
    if (!process.env.API_KEY) {
      console.warn("API_KEY missing for Gemini.");
      return null;
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
    return null;
  }
};

const aiClient = initializeGemini();

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o assistente virtual do Localizei Freguesia. Posso te ajudar a encontrar lojas, explicar como funciona o cashback ou como anunciar sua empresa!' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);

    if (!aiClient) {
        setIsThinking(false);
        setMessages(prev => [...prev, { role: 'model', text: "Desculpe, a chave de API não está configurada neste ambiente de demonstração." }]);
        return;
    }

    try {
      // FIX: Refactored to use systemInstruction and a simplified prompt, following @google/genai guidelines.
      const systemInstruction = `Você é o assistente útil do app "Localizei Freguesia".
Responda de forma curta, amigável e com emojis. Tente convencer o usuário a visitar as lojas ou anunciar se for lojista.`;

      const promptContext = `
        DADOS DO APP:
        - É um super-app local para o bairro Freguesia.
        - Lojistas pagam barato (R$ 1,90/dia Local, R$ 3,90/dia Premium).
        - Usuários ganham Cashback.
        - Profissionais podem comprar leads por R$ 3,90.
        
        LOJAS DISPONÍVEIS (Exemplos):
        ${STORES.map(s => `- ${s.name} (${s.category}): ${s.description}. Rating: ${s.rating}.`).join('\n')}
      `;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${promptContext}\n\nUsuário disse: ${userMsg}`,
        config: {
          systemInstruction,
        },
      });

      const text = response.text || "Desculpe, não entendi.";
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Ops, tive um problema técnico. Tente novamente mais tarde." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? 'hidden' : 'flex'} fixed bottom-24 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 animate-bounce`}
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:bg-black/50 p-4 pb-24 sm:pb-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md h-[80vh] sm:h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-lg">Assistente Localizei</h3>
                  <p className="text-xs text-blue-100">IA Inteligente da Freguesia</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-sm rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Digitando...</span>
                    </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre lojas, serviços..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:placeholder-gray-500"
                />
                <button 
                  type="submit"
                  disabled={isThinking || !input.trim()}
                  className="bg-blue-600 text-white p-3 rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
