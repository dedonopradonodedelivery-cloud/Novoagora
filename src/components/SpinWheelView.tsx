
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Gift, RefreshCw, ThumbsDown, X, Loader2, History, Wallet, Volume2, VolumeX, Lock, ArrowRight, PartyPopper, CheckCircle } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

// --- Tipos e Constantes ---
interface SpinWheelViewProps {
  userId: string | null;
  userRole: 'cliente' | 'lojista' | null;
  onWin: (reward: any) => void;
  onRequireLogin: () => void;
  onViewHistory: () => void;
}

interface Prize {
  prize_key: string;
  line1: string;
  line2: string;
  prize_label: string; // Full label for DB/history
  prize_type: 'cashback' | 'cupom' | 'nao_foi_dessa_vez' | 'gire_de_novo';
  prize_value?: number;
  status: 'creditado' | 'pendente' | 'nao_aplicavel';
  color: string;
  textColor: string;
  description: string;
}

const PRIZES: Prize[] = [
  { prize_key: 'reais_5', line1: 'R$ 5', line2: 'de Volta', prize_label: 'R$ 5,00 de Volta', prize_type: 'cashback', prize_value: 5, status: 'creditado', color: '#FFFFFF', textColor: '#1E5BFF', description: 'O valor foi creditado na sua carteira digital.' },
  { prize_key: 'cashback_5', line1: '5%', line2: 'Cashback', prize_label: '5% Cashback', prize_type: 'cashback', prize_value: 5, status: 'creditado', color: '#1E5BFF', textColor: '#FFFFFF', description: '5% de cashback garantido na próxima compra.' },
  { prize_key: 'lose', line1: 'Não foi', line2: 'dessa vez', prize_label: 'Não foi dessa vez', prize_type: 'nao_foi_dessa_vez', status: 'nao_aplicavel', color: '#FFFFFF', textColor: '#6B7280', description: 'Tente novamente amanhã para ganhar prêmios.' },
  { prize_key: 'cashback_10', line1: '10%', line2: 'Cashback', prize_label: '10% Cashback', prize_type: 'cashback', prize_value: 10, status: 'creditado', color: '#1E5BFF', textColor: '#FFFFFF', description: '10% de cashback acumulado na sua carteira.' },
  { prize_key: 'spin_again', line1: 'Gire', line2: 'de Novo', prize_label: 'Gire de Novo', prize_type: 'gire_de_novo', status: 'nao_aplicavel', color: '#FFFFFF', textColor: '#1E5BFF', description: 'Você ganhou uma nova chance! Gire agora.' },
  { prize_key: 'reais_10', line1: 'Cupom', line2: 'R$ 10', prize_label: 'Cupom R$ 10,00', prize_type: 'cupom', prize_value: 10, status: 'pendente', color: '#1E5BFF', textColor: '#FFFFFF', description: 'Cupom de R$ 10 para usar em parceiros locais.' },
  { prize_key: 'gift_local', line1: 'Brinde', line2: 'Local', prize_label: 'Brinde Surpresa', prize_type: 'cupom', status: 'pendente', color: '#FFFFFF', textColor: '#1E5BFF', description: 'Você ganhou um brinde exclusivo em lojas participantes.' },
  { prize_key: 'cashback_15', line1: '15%', line2: 'Cashback', prize_label: '15% Cashback', prize_type: 'cashback', prize_value: 15, status: 'creditado', color: '#1E5BFF', textColor: '#FFFFFF', description: 'Incríveis 15% de volta na sua próxima compra!' },
];

const SEGMENT_COUNT = PRIZES.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const SPIN_DURATION_MS = 5000;

// Use remote URLs for sounds to work in all environments
const SOUND_URLS = {
  spin: "https://assets.mixkit.co/sfx/preview/mixkit-game-wheel-spinning-2012.mp3",
  win: "https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3",
  lose: "https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.mp3",
};

type SpinStatus = 'loading' | 'ready' | 'cooldown' | 'no_user' | 'error';

// --- Componente ---
export const SpinWheelView: React.FC<SpinWheelViewProps> = ({ userId, userRole, onWin, onRequireLogin, onViewHistory }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinStatus, setSpinStatus] = useState<SpinStatus>('loading');
  const [spinResult, setSpinResult] = useState<Prize | null>(null);
  const [lastSpinDate, setLastSpinDate] = useState<Date | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({
    spin: null, win: null, lose: null,
  });

  const timeUntilNextSpin = useCountdown(lastSpinDate);

  // --- Efeitos ---
  useEffect(() => {
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audioRefs.current[key] = audio;
    });
    // Ensure spin sound loops properly
    if (audioRefs.current.spin) {
        audioRefs.current.spin.loop = true;
        audioRefs.current.spin.volume = 0.4;
    }
  }, []);
  
  const playSound = (key: 'spin' | 'win' | 'lose') => {
    if (isMuted) return;
    const audio = audioRefs.current[key];
    if (audio) {
      if (key === 'spin') audio.volume = 0.4;
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const stopSound = (key: 'spin' | 'win' | 'lose') => {
    const audio = audioRefs.current[key];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    const checkSpinAbility = async () => {
      if (!userId) { setSpinStatus('no_user'); return; }
      if (!supabase) { setSpinStatus('ready'); return; }

      try {
        const { data, error } = await supabase
          .from('roulette_spins')
          .select('spin_date')
          .eq('user_id', userId)
          .order('spin_date', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          const lastDate = new Date(data.spin_date);
          const today = new Date();
          const isSameDay = lastDate.getFullYear() === today.getFullYear() &&
                            lastDate.getMonth() === today.getMonth() &&
                            lastDate.getDate() === today.getDate();

          if (isSameDay) {
            setLastSpinDate(lastDate);
            setSpinStatus('cooldown');
          } else {
            setSpinStatus('ready');
          }
        } else {
          setSpinStatus('ready');
        }
      } catch (error) {
        console.error("Error checking spin status:", error);
        setSpinStatus('error');
      }
    };

    checkSpinAbility();
  }, [userId]);

  // --- Funções ---
  const saveSpinResult = async (result: Prize) => {
    if (!userId || !supabase) return false;
    try {
      const { error } = await supabase.from('roulette_spins').insert({
        user_id: userId,
        prize_type: result.prize_type,
        prize_label: result.prize_label,
        prize_value: result.prize_value,
        status: result.status,
        spin_date: new Date().toISOString(),
      });
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Failed to save spin result:", error);
      return false;
    }
  };

  const handleSpin = () => {
    if (userRole === 'lojista') return;

    if (isSpinning || spinStatus !== 'ready') {
      if (spinStatus === 'no_user') onRequireLogin();
      return;
    }

    setIsSpinning(true);
    setSpinResult(null);
    playSound('spin');

    const winningSegmentIndex = Math.floor(Math.random() * SEGMENT_COUNT);
    // Add extra rotations to ensure good spin effect
    const baseRotation = 360 * 5; 
    // Calculate angle to land on the chosen segment at the top (270deg in SVG or -90)
    // Current SVG starts at 0 (3 o'clock). 
    // To land segment i at top, we need to rotate so that the segment aligns with -90deg.
    const randomOffset = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.5); // Add some randomness within segment
    const segmentCenter = winningSegmentIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const finalAngle = 270 - segmentCenter + randomOffset; 
    
    // Ensure positive rotation
    const targetRotation = rotation + baseRotation + (360 - (rotation % 360)) + finalAngle;

    setRotation(targetRotation);

    setTimeout(async () => {
      stopSound('spin');
      
      const result = PRIZES[winningSegmentIndex];
      playSound(result.prize_type === 'nao_foi_dessa_vez' ? 'lose' : 'win');
      setSpinResult(result);

      if (result.prize_type === 'gire_de_novo') {
        // Don't save "Spin Again" to DB as a used turn, just reset state
        setTimeout(() => {
          setIsSpinning(false);
          setSpinResult(null);
          // Keep status 'ready'
        }, 2000);
      } else {
        // Save result and set cooldown
        const saved = await saveSpinResult(result);
        if (saved) {
          setLastSpinDate(new Date());
          setSpinStatus('cooldown');
        }
        setIsSpinning(false);
      }

    }, SPIN_DURATION_MS);
  };

  const handleCloseResult = () => {
    // Navigate to extract/wallet
    onViewHistory();
    // Reset internal state
    setSpinResult(null);
  };

  const renderSpinButton = () => {
    if (userRole === 'lojista') {
      return (
        <div className="w-full flex flex-col gap-3">
          <button disabled className="w-full h-14 bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 font-bold text-base rounded-2xl cursor-not-allowed flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 opacity-70">
            <Lock className="w-4 h-4" />
            Acesso Restrito
          </button>
          <p className="text-xs text-center text-red-500 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/10 p-2 rounded-lg border border-red-100 dark:border-red-900/30">
            A Roleta da Freguesia é exclusiva para usuários. Acesse com sua conta de cliente para participar.
          </p>
        </div>
      );
    }

    if (spinStatus === 'cooldown') {
      return (
        <div className="w-full text-center bg-gray-100 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Você já girou hoje. Volte amanhã!</p>
          <p className="text-base font-bold text-primary-500 mt-1">
            Próximo giro em: {timeUntilNextSpin}
          </p>
        </div>
      );
    }
    
    let text: React.ReactNode = 'Girar Agora!';
    let disabled = isSpinning || spinStatus === 'loading' || spinStatus === 'error';

    if (isSpinning) {
      text = (
        <>
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Girando...
        </>
      );
    } else if (spinStatus === 'loading') {
      text = <Loader2 className="w-5 h-5 animate-spin" />;
    } else if (spinStatus === 'no_user') {
      text = 'Faça Login para Girar';
    } else if (spinStatus === 'error') {
      text = 'Erro de Conexão';
    }

    return (
      <button 
        onClick={handleSpin} 
        disabled={disabled} 
        className="w-full h-14 bg-gradient-to-r from-[#1E5BFF] to-[#4D7CFF] text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center"
      >
        {text}
      </button>
    );
  };
  
  const getPath = (index: number) => {
    const angle = SEGMENT_ANGLE;
    const startAngle = index * angle;
    const endAngle = startAngle + angle;
    
    // Convert degrees to radians
    const startRad = (Math.PI / 180) * startAngle;
    const endRad = (Math.PI / 180) * endAngle;

    const start = {
        x: 100 + 100 * Math.cos(startRad),
        y: 100 + 100 * Math.sin(startRad)
    };
    const end = {
        x: 100 + 100 * Math.cos(endRad),
        y: 100 + 100 * Math.sin(endRad)
    };
    
    return `M100,100 L${start.x},${start.y} A100,100 0 0,1 ${end.x},${end.y} Z`;
  };

  const getTextPosition = (index: number) => {
    const midAngle = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const rad = midAngle * (Math.PI / 180);
    const radius = 70; // Text distance from center
    const x = 100 + radius * Math.cos(rad);
    const y = 100 + radius * Math.sin(rad);
    
    // Rotate text to point outwards from center
    // SVG rotation is clockwise. 
    return { x, y, rotation: midAngle }; 
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-gray-900 rounded-t-3xl shadow-2xl p-5 pt-4 w-full max-w-md mx-auto relative overflow-hidden font-sans">
      <div className="w-10 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-3"></div>
      
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white font-display">Roleta da Freguesia</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Gire uma vez por dia e ganhe!</p>
        </div>
        <button onClick={onViewHistory} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <History size={18} />
        </button>
      </div>
      
      <div className="relative w-full max-w-[300px] mx-auto aspect-square flex items-center justify-center mb-5">
        {/* Pointer (North) */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20" style={{ filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.25))' }}>
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-[#1E5BFF]"></div>
        </div>
        <div className="absolute w-14 h-14 bg-white dark:bg-gray-800 rounded-full border-4 border-[#1E5BFF] shadow-inner z-10 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#1E5BFF] rounded-full"></div>
        </div>
        
        <div 
          className="relative w-full h-full rounded-full transition-transform ease-[cubic-bezier(0.25,1,0.5,1)] border-8 border-white dark:border-gray-800 shadow-xl"
          style={{ transform: `rotate(${rotation}deg)`, transitionDuration: `${isSpinning ? SPIN_DURATION_MS : 0}ms` }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full rounded-full overflow-hidden">
            {PRIZES.map((prize, i) => {
              const { x, y, rotation } = getTextPosition(i);
              return (
                <g key={i}>
                  <path d={getPath(i)} fill={prize.color} stroke="#E0E0E0" strokeWidth="0.5" />
                  
                  {/* Text Label */}
                  <text 
                    x={x} 
                    y={y} 
                    fill={prize.textColor} 
                    fontSize="7.5" 
                    fontWeight="800" 
                    fontFamily="sans-serif"
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    transform={`rotate(${rotation + 90}, ${x}, ${y})`} // +90 to make text perpendicular to radius (tangential) or simple rotation
                  >
                    <tspan x={x} dy="-3">{prize.line1}</tspan>
                    <tspan x={x} dy="8">{prize.line2}</tspan>
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {renderSpinButton()}

      {/* RESULT MODAL */}
      {spinResult && spinResult.prize_type !== 'gire_de_novo' && (
        <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-30 flex items-center justify-center rounded-t-3xl animate-in fade-in duration-300">
           <div className="text-center p-6 flex flex-col items-center max-w-xs w-full">
               
               {/* Icon */}
               <div className={`mb-6 p-6 rounded-full shadow-lg animate-bounce-short ${
                   spinResult.prize_type === 'nao_foi_dessa_vez' 
                   ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' 
                   : 'bg-gradient-to-br from-[#1E5BFF] to-[#4D7CFF] text-white'
               }`}>
                    {spinResult.prize_type === 'nao_foi_dessa_vez' ? (
                        <ThumbsDown size={48} strokeWidth={1.5} />
                    ) : spinResult.prize_type === 'cashback' ? (
                        <Wallet size={48} strokeWidth={1.5} />
                    ) : (
                        <Gift size={48} strokeWidth={1.5} />
                    )}
               </div>

               {/* Title */}
               <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                   {spinResult.prize_type === 'nao_foi_dessa_vez' ? 'Poxa, não foi dessa vez!' : 'Você ganhou!'}
               </h3>

               {/* Prize Name */}
               {spinResult.prize_type !== 'nao_foi_dessa_vez' && (
                   <p className="text-xl font-bold text-[#1E5BFF] mb-2">{spinResult.prize_label}</p>
               )}

               {/* Description */}
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                   {spinResult.description}
               </p>
               
               {/* Action Button */}
               <button 
                 onClick={handleCloseResult}
                 className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
               >
                 {spinResult.prize_type === 'nao_foi_dessa_vez' ? 'Tentar amanhã' : 'Ver na Carteira'}
                 <ArrowRight className="w-5 h-5" />
               </button>

           </div>
        </div>
      )}
      
      {/* Spin Again Overlay */}
      {spinResult && spinResult.prize_type === 'gire_de_novo' && (
        <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center rounded-t-3xl">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl flex flex-col items-center animate-in zoom-in duration-300">
                <RefreshCw className="w-12 h-12 text-[#1E5BFF] mb-3 animate-spin" />
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Gire de Novo!</h3>
                <p className="text-xs text-gray-500">Preparando nova rodada...</p>
            </div>
        </div>
      )}

    </div>
  );
};
