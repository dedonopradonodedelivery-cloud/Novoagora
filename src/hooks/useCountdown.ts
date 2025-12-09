import { useState, useEffect } from 'react';

/**
 * Hook customizado para criar um contador regressivo até a meia-noite do dia seguinte
 * a partir de uma data alvo.
 * @param targetDate A data do último giro.
 * @returns Uma string formatada "HH:MM:SS" com o tempo restante.
 */
export function useCountdown(targetDate: Date | string | null) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Se não há data alvo, não há o que contar.
    if (!targetDate) {
      setTimeLeft('');
      return;
    }

    const interval = setInterval(() => {
      const lastSpin = new Date(targetDate);
      
      // Define a data alvo como a meia-noite do dia seguinte ao último giro.
      const tomorrow = new Date(lastSpin);
      tomorrow.setDate(lastSpin.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const now = new Date();
      const difference = tomorrow.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)));
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        // Formata a string de saída com preenchimento de zeros.
        setTimeLeft(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      } else {
        // Se o tempo acabou, zera o contador e limpa o intervalo.
        setTimeLeft('00:00:00');
        clearInterval(interval);
      }
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado ou a data alvo muda.
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
