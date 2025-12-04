
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Gift, RefreshCw, ThumbsDown, X, Loader2, History, Wallet, Ticket, Meh, Volume2, VolumeX } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

// --- Tipos e Constantes ---
interface SpinWheelViewProps {
  userId: string | null;
  onWin: (reward: any) => void;
  onRequireLogin: () => void;
  onViewHistory: () => void;
}

interface Prize {
  prize_key: string;
  prize_label: string;
  prize_type: 'cashback' | 'cupom' | 'nao_foi_dessa_vez' | 'gire_de_novo';
  prize_value?: number;
  status: 'creditado' | 'pendente' | 'nao_aplicavel';
  color: string;
  textColor: string;
  description: string;
}

const PRIZES: Prize[] = [
  { prize_key: 'reais_5', prize_label: 'R$5 de Volta', prize_type: 'cashback', prize_value: 5, status: 'creditado', color: '#FFFFFF', textColor: '#1749CC', description: 'Creditado na sua carteira Cashback Local.' },
  { prize_key: 'cashback_5', prize_label: '5% Cashback', prize_type: 'cashback', prize_value: 5, status: 'creditado', color: '#1E5BFF', textColor: '#FFFFFF', description: 'Válido na próxima compra em parceiros.' },
  { prize_key: 'lose', prize_label: 'Não foi dessa vez', prize_type: 'nao_foi_dessa_vez', status: 'nao_aplicavel', color: '#FFFFFF', textColor: '#1749CC', description: 'Mais sorte amanhã!' },
  { prize_key: 'cashback_10', prize_label: '10% Cashback', prize_type: 'cashback', prize_value: 10, status: 'creditado', color: '#1E5BFF', textColor: '#FFFFFF', description: 'Válido na próxima compra em parceiros.' },
  { prize_key: 'spin_again', prize_label: 'Gire de Novo', prize_type: 'gire_de_novo', status: 'nao_aplicavel', color: '#FFFFFF', textColor: '#1749CC', description: 'Boa sorte na próxima tentativa!' },
  { prize_key: 'reais_10', prize_label: 'Cupom R$10', prize_type: 'cupom', prize_value: 10, status: 'pendente', color: '#1E5BFF', textColor: '#FFFFFF', description: 'Use em qualquer loja parceira.' },
  { prize_key: 'gift_local', prize_label: 'Brinde Local', prize_type: 'cupom', status: 'pendente', color: '#FFFFFF', textColor: '#1749CC', description: 'Apresente o código para retirar.' },
  { prize_key: 'cashback_15', prize_label: '15% Cashback', prize_type: 'cashback', prize_value: 15, status: 'creditado', color: '#1E5BFF', textColor: '#FFFFFF', description: 'Válido na próxima compra em parceiros.' },
];

const SEGMENT_COUNT = PRIZES.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const SPIN_DURATION_MS = 5000;

const SOUND_URLS = {
  spin: "/sounds/spin.mp3",
  win: "/sounds/win.mp3",
  lose: "/sounds/lose.mp3",
};

type SpinStatus = 'loading' | 'ready' | 'cooldown' | 'no_user' | 'error';

// --- Componente ---
export const SpinWheelView: React.FC<SpinWheelViewProps> = ({ userId, onWin, onRequireLogin, onViewHistory }) => {
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
    audioRefs.current.spin!.loop = true;
  }, []);
  
  const playSound = (key: 'spin' | 'win' | 'lose') => {
    if (isMuted) return;
    const audio = audioRefs.current[key];
    if (audio) {
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

        if (error && error.code !== 'PGRST116') throw error; // Ignore "not found" error

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
    if (isSpinning || spinStatus !== 'ready') {
      if (spinStatus === 'no_user') onRequireLogin();
      return;
    }

    setIsSpinning(true);
    setSpinResult(null);
    playSound('spin');

    const winningSegmentIndex = Math.floor(Math.random() * SEGMENT_COUNT);
    const randomOffset = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.8);
    const baseRotation = 360 * 8;
    const finalAngle = 360 - (winningSegmentIndex * SEGMENT_ANGLE + randomOffset);

    setRotation(rotation + baseRotation + finalAngle);

    setTimeout(async () => {
      stopSound('spin');
      const result = PRIZES[winningSegmentIndex];
      playSound(result.prize_type === 'nao_foi_dessa_vez' ? 'lose' : 'win');
      setSpinResult(result);

      const saved = await saveSpinResult(result);
      if (saved) {
        setLastSpinDate(new Date());
        setSpinStatus('cooldown');
      }

      if (result.prize_type === 'gire_de_novo') {
        setTimeout(() => {
          setIsSpinning(false);
          setSpinResult(null);
          setSpinStatus('ready'); // Permite girar de novo
        }, 2000);
        return;
      }
      
      setTimeout(() => {
        if (result.prize_type !== 'nao_foi_dessa_vez') {
          onWin({ ...result, code: `LF-${Date.now().toString().slice(-6)}` });
        } else {
          setIsSpinning(false);
          setSpinResult(null);
        }
      }, 1500);

    }, SPIN_DURATION_MS);
  };

  const renderSpinButton = () => {
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

    if (isSpinning) text = 'Girando...';
    else if (spinStatus === 'loading') text = <Loader2 className="w-5 h-5 animate-spin" />;
    else if (spinStatus === 'no_user') text = 'Faça Login para Girar';
    else if (spinStatus === 'error') text = 'Erro de Conexão';

    return (
      <button onClick={handleSpin} disabled={disabled} className="w-full h-14 bg-gradient-to-r from-[#1E5BFF] to-[#4D7CFF] text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center">
        {text}
      </button>
    );
  };
  
  const getPath = (index: number) => {
    const angle = SEGMENT_ANGLE;
    const startAngle = index * angle;
    const endAngle = startAngle + angle;
    const start = {
        x: 100 + 100 * Math.cos(startAngle * Math.PI / 180),
        y: 100 + 100 * Math.sin(startAngle * Math.PI / 180)
    };
    const end = {
        x: 100 + 100 * Math.cos(endAngle * Math.PI / 180),
        y: 100 + 100 * Math.sin(endAngle * Math.PI / 180)
    };
    return `M100,100 L${start.x},${start.y} A100,100 0 0,1 ${end.x},${end.y} Z`;
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-gray-900 rounded-t-3xl shadow-2xl p-5 pt-4 w-full max-w-md mx-auto relative overflow-hidden font-sans">
      <div className="w-10 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-3"></div>
      
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-gray-400 hover:text-gray-600">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white font-display">Roleta da Freguesia</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Gire uma vez por dia e ganhe prêmios!</p>
        </div>
        <button onClick={onViewHistory} className="p-2 text-gray-400 hover:text-gray-600">
            <History size={18} />
        </button>
      </div>
      
      <div className="relative w-full max-w-[300px] mx-auto aspect-square flex items-center justify-center mb-5">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20" style={{ filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.25))' }}>
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-[#1E5BFF]"></div>
        </div>
        <div className="absolute w-14 h-14 bg-white dark:bg-gray-800 rounded-full border-4 border-[#1E5BFF] shadow-inner z-10"></div>
        
        <div 
          className="relative w-full h-full rounded-full transition-transform ease-[cubic-bezier(0.25,1,0.5,1)] border-8 border-white dark:border-gray-800 shadow-xl"
          style={{ transform: `rotate(${rotation}deg)`, transitionDuration: `${SPIN_DURATION_MS}ms` }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full rounded-full overflow-hidden">
            {PRIZES.map((prize, i) => (
              <g key={i}>
                <path d={getPath(i)} fill={prize.color} stroke="#E0E0E0" strokeWidth="0.5" />
                <path id={`textPath-${i}`} d={`M100,100 L${100 + 95 * Math.cos((i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2) * Math.PI / 180)},${100 + 95 * Math.sin((i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2) * Math.PI / 180)}`} fill="none" />
                <text dy="-4" className="font-display" style={{ fontSize: '10px', fill: prize.textColor, fontWeight: 600, textAnchor: 'end' }}>
                  <textPath href={`#textPath-${i}`} startOffset="95%">{prize.prize_label}</textPath>
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {renderSpinButton()}

      {spinResult && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-30 flex items-center justify-center rounded-3xl animate-in fade-in duration-300">
           <div className="text-center p-4 flex flex-col items-center">
               <div className="inline-block p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg mb-3 animate-jelly">
                    {spinResult.prize_type === 'nao_foi_dessa_vez' && <ThumbsDown size={32} className="text-gray-500" />}
                    {spinResult.prize_type === 'gire_de_novo' && <RefreshCw size={32} className="text-blue-500"/>}
                    {spinResult.prize_type !== 'nao_foi_dessa_vez' && spinResult.prize_type !== 'gire_de_novo' && <Gift size={32} className="text-[#1E5BFF]" />}
               </div>
               <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {spinResult.prize_type === 'nao_foi_dessa_vez'
    ? 'Que pena!'
    : spinResult.prize_type === 'gire_de_novo'
    ? 'Gire de novo!'
    : 'Parabéns!'}