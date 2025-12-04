
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Camera, 
  Save,
  MessageSquare,
  Star,
  Plus,
  Trash2
} from 'lucide-react';

interface StoreProfileEditProps {
  onBack: () => void;
}

export const StoreProfileEdit: React.FC<StoreProfileEditProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'hours' | 'reviews'>('info');
  
  // Mock Data State
  const [formData, setFormData] = useState({
    name: 'Hamburgueria Brasa',
    category: 'Alimentação',
    subcategory: 'Hamburgueria',
    address: 'Rua Araguaia, 450 - Freguesia',
    phone: '(21) 99999-8888',
    instagram: '@hamburgueriabrasa',
    site: 'www.brasa.com.br',
    description: 'O melhor burger artesanal do bairro. Ingredientes selecionados e ambiente familiar.',
  });

  const [hours, setHours] = useState([
    { day: 'Segunda', open: false, start: '00:00', end: '00:00' },
    { day: 'Terça', open: true, start: '18:00', end: '23:00' },
    { day: 'Quarta', open: true, start: '18:00', end: '23:00' },
    { day: 'Quinta', open: true, start: '18:00', end: '23:00' },
    { day: 'Sexta', open: true, start: '18:00', end: '00:00' },
    { day: 'Sábado', open: true, start: '18:00', end: '00:00' },
    { day: 'Domingo', open: true, start: '18:00', end: '23:00' },
  ]);

  const [reviews] = useState([
    { id: 1, user: 'Maria S.', rating: 5, text: 'Melhor lanche da vida!', reply: '' },
    { id: 2, user: 'João P.', rating: 4, text: 'Muito bom, mas demorou um pouco.', reply: 'Obrigado João! Estamos ajustando nossa cozinha.' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleDay = (index: number) => {
    const newHours = [...hours];
    newHours[index].open = !newHours[index].open;
    setHours(newHours);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 pb-24">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-5 h-16 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
            <h1 className="font-bold text-lg text-gray-900 dark:text-white">Editar Perfil</h1>
        </div>
        <button className="text-[#1E5BFF] font-bold text-sm">Salvar</button>
      </div>

      {/* Tabs */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
            {['info', 'hours', 'reviews'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                        activeTab === tab 
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                    }`}
                >
                    {tab === 'info' ? 'Dados' : tab === 'hours' ? 'Horários' : 'Avaliações'}
                </button>
            ))}
        </div>
      </div>

      <div className="p-5">
        
        {/* --- INFO TAB --- */}
        {activeTab === 'info' && (
            <div className="space-y-6 animate-in fade-in duration-300">
                {/* Images */}
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-gray-500">Logo</span>
                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center relative cursor-pointer group overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <span className="text-xs font-bold text-gray-500">Capa</span>
                        <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center relative cursor-pointer group overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Nome Fantasia</label>
                        <input 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#1E5BFF]/50 text-sm font-medium dark:text-white"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Categoria</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-none outline-none text-sm font-medium dark:text-white"
                            >
                                <option>Alimentação</option>
                                <option>Serviços</option>
                                <option>Varejo</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Subcategoria</label>
                            <input 
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#1E5BFF]/50 text-sm font-medium dark:text-white"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Descrição</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#1E5BFF]/50 text-sm font-medium dark:text-white resize-none"
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#1E5BFF]" /> Localização e Contato
                    </h3>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Endereço Completo</label>
                        <div className="relative">
                            <input 
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-3 pl-10 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#1E5BFF]/50 text-sm font-medium dark:text-white"
                            />
                            <MapPin className="absolute left-3 top-1/2 translate-y-[-30%] w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">WhatsApp / Telefone</label>
                        <div className="relative">
                            <input 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-3 pl-10 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#1E5BFF]/50 text-sm font-medium dark:text-white"
                            />
                            <Phone className="absolute left-3 top-1/2 translate-y-[-30%] w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Instagram</label>
                            <input 
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-none outline-none text-sm font-medium dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Site</label>
                            <input 
                                name="site"
                                value={formData.site}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-none outline-none text-sm font-medium dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- HOURS TAB --- */}
        {activeTab === 'hours' && (
            <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-[#1E5BFF]" /> Horário de Funcionamento
                    </h3>
                    <div className="space-y-4">
                        {hours.map((schedule, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 w-28">
                                    <button 
                                        onClick={() => toggleDay(idx)}
                                        className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${schedule.open ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${schedule.open ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                    </button>
                                    <span className={`text-sm font-medium ${schedule.open ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                                        {schedule.day.slice(0, 3)}
                                    </span>
                                </div>
                                {schedule.open ? (
                                    <div className="flex items-center gap-2 flex-1">
                                        <input 
                                            type="time" 
                                            defaultValue={schedule.start}
                                            className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-lg text-sm border border-gray-200 dark:border-gray-600 outline-none w-full text-center dark:text-white"
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input 
                                            type="time" 
                                            defaultValue={schedule.end}
                                            className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-lg text-sm border border-gray-200 dark:border-gray-600 outline-none w-full text-center dark:text-white"
                                        />
                                    </div>
                                ) : (
                                    <span className="flex-1 text-center text-xs text-gray-400 font-medium bg-gray-50 dark:bg-gray-700/50 py-1.5 rounded-lg">Fechado</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Plus className="w-4 h-4" />
                    Adicionar horário especial (Feriados)
                </button>
            </div>
        )}

        {/* --- REVIEWS TAB --- */}
        {activeTab === 'reviews' && (
            <div className="space-y-4 animate-in fade-in duration-300">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                    {review.user.charAt(0)}
                                </div>
                                <span className="font-bold text-sm text-gray-900 dark:text-white">{review.user}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{review.text}</p>
                        
                        {review.reply ? (
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl border-l-4 border-[#1E5BFF]">
                                <p className="text-xs font-bold text-[#1E5BFF] mb-1">Sua resposta:</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{review.reply}</p>
                            </div>
                        ) : (
                            <div className="relative">
                                <textarea 
                                    placeholder="Escreva uma resposta pública..."
                                    rows={2}
                                    className="w-full p-3 pr-10 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-sm border border-gray-200 dark:border-gray-600 outline-none focus:border-[#1E5BFF] dark:text-white"
                                />
                                <button className="absolute right-2 bottom-2 p-1.5 bg-[#1E5BFF] rounded-lg text-white hover:bg-[#1749CC]">
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}

      </div>

      {/* Floating Save Button (Visible only on Scroll or Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-20">
        <button className="w-full bg-[#1E5BFF] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            Salvar Alterações
        </button>
      </div>

    </div>
  );
};
