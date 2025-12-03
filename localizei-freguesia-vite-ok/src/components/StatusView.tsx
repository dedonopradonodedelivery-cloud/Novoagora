import React, { useState, useEffect } from 'react';
import { STORIES, CHANNELS } from '../constants';
import { Plus, X, CircleDashed, ChevronLeft, ChevronRight, Camera, Image as ImageIcon, Video, Type, PenTool, BadgeCheck, LayoutGrid } from 'lucide-react';

export const StatusView: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isCreationMenuOpen, setIsCreationMenuOpen] = useState(false);
  const [followedChannels, setFollowedChannels] = useState<string[]>([]);

  const activeStory = activeStoryIndex !== null ? STORIES[activeStoryIndex] : null;

  // Timer Logic for 15 seconds
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeStory) {
      setProgress(0);
      const duration = 15000; // 15 seconds
      const step = 50; // Update every 50ms for smoothness
      
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (step / duration) * 100;
        });
      }, step);
    }
    return () => clearInterval(interval);
  }, [activeStoryIndex]);

  const handleNext = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex < STORIES.length - 1) {
        setActiveStoryIndex(activeStoryIndex + 1);
      } else {
        setActiveStoryIndex(null); // Close if last
      }
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(activeStoryIndex - 1);
      } else {
        setActiveStoryIndex(null);
      }
    }
  };

  const toggleFollow = (id: string) => {
    setFollowedChannels(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-full bg-white dark:bg-gray-900 animate-in fade-in duration-500">
      {/* Main List View */}
      <div className="p-5 pb-24">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-display mb-6">Status</h2>

        {/* My Status Row - Click triggers creation menu */}
        <div 
            onClick={() => setIsCreationMenuOpen(true)}
            className="flex items-center gap-4 mb-8 cursor-pointer active:opacity-70 transition-opacity"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-transparent">
              <img src="https://ui-avatars.com/api/?name=Eu&background=random" alt="Meu Status" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-1.5 border-2 border-white dark:border-gray-900">
              <Plus className="w-3 h-3 text-white stroke-[3]" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Meu Status</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toque para atualizar</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Atualizações recentes</h3>
        </div>

        {/* Horizontal Scroll for Shopkeepers (Fileira de bolinhas) */}
        <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar border-b border-gray-100 dark:border-gray-800">
            {STORIES.map((story, index) => (
                <div 
                    key={story.id} 
                    className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group" 
                    onClick={() => setActiveStoryIndex(index)}
                >
                    {/* Status Ring */}
                    <div className={`p-[3px] rounded-full ${story.isLive ? 'bg-gradient-to-tr from-primary-500 via-orange-400 to-purple-600' : 'bg-primary-500'}`}>
                        <div className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden p-0.5 bg-white dark:bg-gray-800 transition-transform duration-300 group-hover:scale-105">
                            <img src={story.image} alt={story.name} className="w-full h-full object-cover rounded-full" />
                        </div>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center line-clamp-1 w-full max-w-[80px]">
                        {story.name}
                    </span>
                </div>
            ))}
        </div>

        {/* CHANNELS SECTION */}
        <div className="mt-8">
          <div className="flex justify-between items-end mb-4">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">Canais</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Receba atualizações sobre os assuntos do seu interesse. Encontre canais para seguir.
          </p>

          <div className="flex justify-between items-center mb-4">
             <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Encontrar canais para seguir</span>
             <button className="text-gray-400 hover:text-gray-600">
               <ChevronRight className="w-4 h-4 rotate-90" />
             </button>
          </div>

          {/* Channel List */}
          <div className="flex flex-col gap-6">
             {CHANNELS.map(channel => (
               <div key={channel.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 flex-shrink-0">
                     <img src={channel.image} alt={channel.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-1">
                        <h4 className="font-bold text-gray-900 dark:text-white truncate text-base">{channel.name}</h4>
                        {channel.verified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50 dark:fill-blue-900" />}
                     </div>
                     <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Seguidores: {channel.followers}</p>
                  </div>
                  <button 
                    onClick={() => toggleFollow(channel.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                      followedChannels.includes(channel.id) 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400' 
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'
                    }`}
                  >
                    {followedChannels.includes(channel.id) ? 'Seguindo' : 'Seguir'}
                  </button>
               </div>
             ))}
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col gap-3">
             <button className="w-full py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <LayoutGrid className="w-4 h-4" />
                Mais
             </button>
             <button className="w-full py-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Criar canal
             </button>
          </div>
        </div>
        
      </div>

      {/* Full Screen Player Overlay */}
      {activeStory && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col animate-in zoom-in-95 duration-200">
          
          {/* Top Progress Bars */}
          <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2 pt-3">
             {STORIES.map((s, i) => (
                 <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-white transition-all duration-100 ease-linear"
                        style={{ 
                            width: i === activeStoryIndex ? `${progress}%` : i < activeStoryIndex ? '100%' : '0%' 
                        }}
                     />
                 </div>
             ))}
          </div>

          {/* Header Info */}
          <div className="absolute top-6 left-0 right-0 z-20 px-4 py-2 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/50">
                      <img src={activeStory.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-white drop-shadow-md">
                      <p className="font-bold text-sm leading-tight">{activeStory.name}</p>
                      <p className="text-[10px] opacity-80">Há 2 horas</p>
                  </div>
              </div>
              <button 
                onClick={() => setActiveStoryIndex(null)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                  <X className="w-6 h-6 text-white drop-shadow-md" />
              </button>
          </div>

          {/* Story Content (Simulating full screen video/image) */}
          <div className="flex-1 relative flex items-center justify-center bg-gray-900">
              {/* Using high-res placeholder for story content */}
              <img 
                src={`https://picsum.photos/600/1000?random=${activeStory.id}`} 
                alt="Story Content" 
                className="w-full h-full object-cover opacity-90" 
              />
              
              {/* Gradient Overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

              {/* Tap Zones for Navigation */}
              <div className="absolute inset-y-0 left-0 w-1/3 z-10" onClick={handlePrev}></div>
              <div className="absolute inset-y-0 right-0 w-1/3 z-10" onClick={handleNext}></div>
          </div>
          
          {/* Reply / Interaction Area */}
          <div className="absolute bottom-4 left-0 right-0 px-4 z-20 flex items-center gap-4">
              <div className="flex-1 h-12 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center px-4 text-white/70 text-sm">
                  Responder...
              </div>
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform">
                ❤️
              </button>
          </div>
        </div>
      )}

      {/* Creation Menu (Bottom Sheet) */}
      {isCreationMenuOpen && (
        <div 
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300"
            onClick={() => setIsCreationMenuOpen(false)}
        >
            <div 
                className="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-[2.5rem] p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-8"></div>
                
                <h3 className="text-center font-bold text-gray-800 dark:text-white text-xl mb-8">Criar novo status</h3>

                <div className="grid grid-cols-3 gap-6 mb-8">
                    {/* Text Option */}
                    <button className="flex flex-col items-center gap-3 group">
                        <div className="w-16 h-16 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                            <Type className="w-7 h-7 text-gray-600 dark:text-gray-300" />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Texto</span>
                    </button>

                    {/* Photo Option */}
                    <button className="flex flex-col items-center gap-3 group">
                        <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                            <Camera className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Foto</span>
                    </button>

                    {/* Video Option */}
                    <button className="flex flex-col items-center gap-3 group">
                        <div className="w-16 h-16 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center border border-red-100 dark:border-red-800 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                            <Video className="w-7 h-7 text-red-600 dark:text-red-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Vídeo</span>
                    </button>
                </div>

                <button 
                    onClick={() => setIsCreationMenuOpen(false)}
                    className="w-full py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </div>
      )}
    </div>
  );
};