import React, { useState } from 'react';
import {
  Gift,
  RefreshCw,
  History,
  Volume2,
  VolumeX,
  Lock,
} from 'lucide-react';

export interface Prize {
  prize_key: string;
  prize_label: string;
  description: string;
}

interface SpinWheelViewProps {
  userId: string | null;
  onWin: (reward: Prize) => void;
  onRequireLogin: () => void;
  onViewHistory: () => void;
}

const PRIZES: Prize[] = [
  {
    prize_key: 'cashback_5',
    prize_label: '5% Cashback',
    description: '5% de cashback na próxima compra em parceiros.',
  },
  {
    prize_key: 'cashback_10',
    prize_label: '10% Cashback',
    description: '10% de cashback acumulado na carteira Localizei.',
  },
  {
    prize_key: 'spin_again',
    prize_label: 'Gire de novo',
    description: 'Você ganhou uma nova chance de girar.',
  },
  {
    prize_key: 'no_prize',
    prize_label: 'Não foi dessa vez',
    description: 'Sem prêmio, mas você pode tentar novamente mais tarde.',
  },
];

type SpinState = 'idle' | 'spinning' | 'result';

export const SpinWheelView: React.FC<SpinWheelViewProps> = ({
  userId,
  onWin,
  onRequireLogin,
  onViewHistory,
}) => {
  const [spinState, setSpinState] = useState<SpinState>('idle');
  const [currentPrize, setCurrentPrize] = useState<Prize | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleSpin = () => {
    if (!userId) {
      onRequireLogin();
      return;
    }

    if (spinState === 'spinning') return;

    setSpinState('spinning');

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PRIZES.length);
      const prize = PRIZES[randomIndex];
      setCurrentPrize(prize);
      setSpinState('result');

      if (prize.prize_key !== 'no_prize') {
        onWin(prize);
      }
    }, 1800);
  };

  const disabledReason =
    !userId && spinState !== 'spinning'
      ? 'Entre ou finalize seu cadastro para girar a roleta.'
      : null;

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-4 border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/60 font-medium">
            Roleta de Benefícios
          </p>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" />
            Localizei Spin
          </h2>
          <p className="text-[11px] text-white/60 mt-1">
            Gire e descubra seu prêmio exclusivo da Freguesia.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onViewHistory}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium hover:bg-white/10 transition"
          >
            <History className="w-3 h-3" />
            Histórico
          </button>

          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 w-8 h-8 text-white/70 hover:bg-white/10 transition"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Wheel + info */}
      <div className="flex gap-4 items-center">
        {/* Wheel visual */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,#f97316,transparent_40%),radial-gradient(circle_at_70%_80%,#1d4ed8,transparent_45%),radial-gradient(circle_at_10%_90%,#22c55e,transparent_45%)] opacity-80" />
          <div className="relative w-32 h-32 rounded-full bg-slate-900/80 border border-white/20 flex flex-col items-center justify-center text-center px-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/60 mb-1">
              Seu prêmio
            </p>
            <p className="text-sm font-semibold leading-tight">
              {currentPrize
                ? currentPrize.prize_label
                : spinState === 'spinning'
                ? 'Girando...'
                : 'Toque em girar'}
            </p>
          </div>
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40">
            <div className="w-2 h-2 bg-slate-950 rounded-full" />
          </div>
        </div>

        {/* Prize list + button */}
        <div className="flex-1 space-y-3 text-[12px]">
          <p className="text-white/80 leading-snug">
            Alguns prêmios possíveis:
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {PRIZES.map((prize) => (
              <div
                key={prize.prize_key}
                className="flex flex-col gap-0.5 rounded-xl bg-white/5 px-2.5 py-2 border border-white/5"
              >
                <span className="font-medium leading-tight">
                  {prize.prize_label}
                </span>
                <span className="text-[10px] text-white/60 leading-tight">
                  {prize.description}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={handleSpin}
              disabled={spinState === 'spinning'}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 text-slate-950 text-[13px] font-semibold py-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-500/40"
            >
              {spinState === 'spinning' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Girando...
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  Girar agora
                </>
              )}
            </button>

            {disabledReason && (
              <p className="text-[10px] text-amber-200/90 leading-snug flex items-center gap-1">
                <Lock className="w-3 h-3" />
                {disabledReason}
              </p>
            )}

            {currentPrize && (
              <div className="mt-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
                <p className="text-[11px] font-semibold mb-0.5">
                  Resultado do seu giro
                </p>
                <p className="text-[12px]">
                  {currentPrize.prize_key === 'no_prize'
                    ? 'Não foi dessa vez, mas continue participando!'
                    : `Você ganhou: ${currentPrize.prize_label}.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheelView;
