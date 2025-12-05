import { useEffect, useState } from "react";

export const useHomeLogic = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'night'>('morning');
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'cloudy'>('sunny');
  const [cashbackActive, setCashbackActive] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('night');

    // MOCK clima
    const weatherMock: Array<'sunny' | 'rainy' | 'cloudy'> = ['sunny', 'rainy', 'cloudy'];
    setWeather(weatherMock[Math.floor(Math.random() * weatherMock.length)]);

    // MOCK cashback ativo
    setCashbackActive(Math.random() > 0.4);

    // Regras simuladas de recomendação
    if (hour < 12) {
      setRecommendations([
        { id: 1, name: "Padaria do Vale", reason: "Perfeito para seu café da manhã" },
        { id: 2, name: "Café da Praça", reason: "Aberto agora" }
      ]);
    } else if (hour < 18) {
      setRecommendations([
        { id: 3, name: "Restaurante Bom Sabor", reason: "Popular no almoço" },
        { id: 4, name: "Self Service Dona Ana", reason: "4.8 ⭐" }
      ]);
    } else {
      setRecommendations([
        { id: 5, name: "Burger Freguesia", reason: "O mais pedido da região" },
        { id: 6, name: "Pizza do Bairro", reason: "Entrega rápida" }
      ]);
    }
  }, []);

  return {
    timeOfDay,
    weather,
    cashbackActive,
    recommendations
  };
};

export default useHomeLogic;