
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Gift, RefreshCw, ThumbsDown, X, Loader2 } from 'lucide-react';

// --- Component Props Interface ---
interface SpinWheelViewProps {
  userId: string | null;
  onWin: (reward: any) => void;
  onRequireLogin: () => void;
}

// --- Constants ---
const PRIZES = [
  { prize_key: 'reais_5', prize_label: 'R$5 de Volta', color: '#FFFFFF', textColor: '#E65100', description: 'Creditado na sua carteira Localizei Pay.' },
  { prize_key: 'cashback_5', prize_label: '5% Cashback', color: '#FF6501', textColor: '#FFFFFF', description: 'Válido na sua próxima compra em lojas parceiras.' },
  { prize_key: 'lose', prize_label: 'Não foi dessa vez', color: '#FFFFFF', textColor: '#E65100', description: 'Mais sorte amanhã!' },
  { prize_key: 'cashback_10', prize_label: '10% Cashback', color: '#FF6501', textColor: '#FFFFFF', description: 'Válido na sua próxima compra em lojas parceiras.' },
  { prize_key: 'spin_again', prize_label: 'Gire de Novo', color: '#FFFFFF', textColor: '#E65100', description: 'Boa sorte na próxima tentativa!' },
  { prize_key: 'reais_10', prize_label: 'Cupom R$10', color: '#FF6501', textColor: '#FFFFFF', description: 'Use em qualquer loja com Localizei Pay.' },
  { prize_key: 'gift_local', prize_label: 'Brinde Local', color: '#FFFFFF', textColor: '#E65100', description: 'Apresente o código em uma loja parceira para retirar.' },
  { prize_key: 'cashback_15', prize_label: '15% Cashback', color: '#FF6501', textColor: '#FFFFFF', description: 'Válido na sua próxima compra em lojas parceiras.' },
];

const SEGMENT_COUNT = PRIZES.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const SPIN_DURATION_MS = 5000;

const SPIN_SOUND_URL = 'https://assets.codepen.io/299692/spin.mp3';
const WIN_SOUND_URL = 'https://assets.codepen.io/299692/win.mp3';

type SpinStatus = 'loading' | 'ready' | 'spun_today' | 'no_user' | 'error';

// --- Main Component ---
export const SpinWheelView: React.FC<SpinWheelViewProps> = ({ userId, onWin, onRequireLogin }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinStatus, setSpinStatus] = useState<SpinStatus>('loading');
  const [spinResult, setSpinResult] = useState<(typeof PRIZES)[0] | null>(null);
  const [showSpunTodayModal, setShowSpunTodayModal] = useState(false);

  // --- Audio Refs ---
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- Initialize component and check user spin status ---
  useEffect(() => {
    spinAudioRef.current = new Audio(SPIN_SOUND_URL);
    winAudioRef.current = new Audio(WIN_SOUND_URL);
    spinAudioRef.current.loop = true;
    
    [spinAudioRef, winAudioRef].forEach(ref => {
        if (ref.current) ref.current.preload = 'auto';
    });
    
    const checkSpinAbility = async () => {
      if (!userId) {
        setSpinStatus('no_user');
        return;
      }
      if (!supabase) { 
        setSpinStatus('ready');
        return;
      }

      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const { error, count } = await supabase
          .from('spin_wheel_plays')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .gte('created_at', today.toISOString())
          .lt('created_at', tomorrow.toISOString());
        
        if (error) throw error;
        setSpinStatus(count && count > 0 ? 'spun_today' : 'ready');
      } catch (error) {
        console.error("Error checking spin status:", error);
        setSpinStatus('error');
      }
    };

    checkSpinAbility();

    return () => {
      spinAudioRef.current?.pause();
    }
  }, [userId]);

  // --- Supabase Interaction ---
  const saveSpinResult = async (result: typeof PRIZES[0]) => {
    if (!userId || !supabase) return false;
    try {
      const { error } = await supabase.from('spin_wheel_plays').insert({
        user_id: userId,
        prize_key: result.prize_key,
        prize_label: result.prize_label,
      });
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Failed to save spin result:", error);
      return false;
    }
  };

  // --- Main Spin Logic ---
  const handleSpin = () => {
    if (isSpinning) return;

    if (spinStatus === 'no_user') {
        onRequireLogin();
        return;
    }
    if (spinStatus === 'spun_today') {
        setShowSpunTodayModal(true);
        return;
    }
    if (spinStatus !== 'ready') return;

    setIsSpinning(true);
    setSpinResult(null);
    spinAudioRef.current?.play().catch(console.error);
    
    const winningSegmentIndex = Math.floor(Math.random() * SEGMENT_COUNT);
    const randomOffset = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.8);
    const baseRotation = 360 * 8; 
    const finalAngle = 360 - (winningSegmentIndex * SEGMENT_ANGLE + randomOffset);
    
    setRotation(rotation + baseRotation + finalAngle);

    setTimeout(async () => {
      spinAudioRef.current?.pause();
      winAudioRef.current?.play().catch(console.error);

      const result = PRIZES[winningSegmentIndex];
      setSpinResult(result);
      
      const saved = await saveSpinResult(result);
      if (saved) {
          setSpinStatus('spun_today');
      }

      if (result.prize_key === 'spin_again') {
        setTimeout(() => { 
            setIsSpinning(false); 
            setSpinResult(null); 
        }, 2000);
        return;
      }

      // Automatically handle win/lose after showing result
      setTimeout(() => {
        if (result.prize_key !== 'lose') {
          onWin({ ...result, value: result.prize_key, label: result.prize_label, code: `LF-${Date.now().toString().slice(-6)}` });
        } else {
            // Reset for next day if they lose
            setIsSpinning(false);
            setSpinResult(null);
        }
      }, 1500);

    }, SPIN_DURATION_MS);
  };
  
  const getButtonState = () => {
    const disabled = isSpinning || spinStatus === 'loading' || spinStatus === 'error' || spinStatus === 'spun_today';
    let text: React.ReactNode = 'Girar Agora!';
    if (isSpinning) text = 'Girando...';
    else if (spinStatus === 'loading') text = <Loader2 className="w-5 h-5 animate-spin" />;
    else if (spinStatus === 'no_user') text = 'Faça Login para Girar';
    else if (spinStatus === 'spun_today') text = 'Você já girou hoje';
    else if (spinStatus === 'error') text = 'Erro ao verificar';
    
    return { disabled, text };
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl p-6 w-full max-w-md mx-auto relative overflow-hidden font-sans">
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-display">Roleta da Freguesia</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Gire uma vez por dia e concorra a prêmios!</p>
      </div>
      
      <div className="relative w-full max-w-[300px] mx-auto aspect-square flex items-center justify-center mb-6">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20" style={{ filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.25))' }}>
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-[#D32F2F]"></div>
        </div>
        <div className="absolute w-16 h-16 bg-white dark:bg-gray-800 rounded-full border-4 border-[#D32F2F] shadow-inner z-10"></div>
        
        <div 
          className="relative w-full h-full rounded-full transition-transform ease-[cubic-bezier(0.25,1,0.5,1)] border-8 border-white dark:border-gray-800 shadow-xl"
          style={{ transform: `rotate(${rotation}deg)`, transitionDuration: `${SPIN_DURATION_MS}ms` }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full rounded-full overflow-hidden">
            {PRIZES.map((prize, i) => {
              const startAngle = i * SEGMENT_ANGLE;
              const endAngle = startAngle + SEGMENT_ANGLE;
              const startX = 100 + 100 * Math.cos(startAngle * Math.PI / 180);
              const startY = 100 + 100 * Math.sin(startAngle * Math.PI / 180);
              const endX = 100 + 100 * Math.cos(endAngle * Math.PI / 180);
              const endY = 100 + 100 * Math.sin(endAngle * Math.PI / 180);
              
              const pathData = `M100,100 L${startX},${startY} A100,100 0 0 1 ${endX},${endY} Z`;

              return (
                <g key={i} transform={`rotate(${startAngle + SEGMENT_ANGLE/2}, 100, 100)`}>
                  <path d={pathData} fill={prize.color} stroke="#E0E0E0" strokeWidth="0.5" transform={`rotate(${-startAngle - SEGMENT_ANGLE/2}, 100, 100)`}/>
                  <text fill={prize.textColor} fontSize="10px" fontWeight="bold" x="145" y="103" textAnchor="middle">
                    {prize.prize_label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <button onClick={handleSpin} disabled={getButtonState().disabled} className="w-full h-16 bg-gradient-to-r from-[#FF6501] to-[#FF7A00] text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/30 active:scale-95 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center">
        {getButtonState().text}
      </button>

      {spinResult && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-30 flex items-center justify-center rounded-3xl animate-in fade-in duration-300">
           <div className="text-center p-4 flex flex-col items-center">
               <div className="inline-block p-4 bg-white dark:bg-gray-700 rounded-full shadow-lg mb-4 animate-jelly">
                    {spinResult.prize_key === 'lose' && <ThumbsDown size={40} className="text-gray-500" />}
                    {spinResult.prize_key === 'spin_again' && <RefreshCw size={40} className="text-blue-500"/>}
                    {spinResult.prize_key !== 'lose' && spinResult.prize_key !== 'spin_again' && <Gift size={40} className="text-orange-500" />}
               </div>
               <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                   {spinResult.prize_key === 'lose' ? 'Que pena!' : (spinResult.prize_key === 'spin_again' ? 'Mais uma chance!' : 'Você ganhou!')}
               </h3>
               <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 mt-1">{spinResult.prize_label}</p>
           </div>
        </div>
      )}

      {showSpunTodayModal && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-30 flex items-center justify-center rounded-3xl animate-in fade-in duration-300" onClick={() => setShowSpunTodayModal(false)}>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Já girou hoje!</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Volte amanhã para tentar a sorte novamente.</p>
                  <button onClick={() => setShowSpunTodayModal(false)} className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold">OK</button>
              </div>
          </div>
      )}
    </div>
  );
};
