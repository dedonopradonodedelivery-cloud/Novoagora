import { useEffect, useState } from "react";

export const useTrending = () => {
  const [trendingCategories, setTrendingCategories] = useState<string[]>([]);
  const [trendingStores, setTrendingStores] = useState<any[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);

  useEffect(() => {
    setTrendingCategories([
      "Hambúrguer",
      "Petshop",
      "Academias",
      "Cafeterias"
    ]);

    setTrendingStores([
      { id: 1, name: "Burger Freguesia", reason: "Mais pedidos hoje" },
      { id: 2, name: "Pet Club Freguesia", reason: "Muitos agendamentos" }
    ]);

    setTrendingSearches([
      "Massagem",
      "Pilates",
      "Corte masculino",
      "Sobrancelha"
    ]);
  }, []);

  return {
    trendingCategories,
    trendingStores,
    trendingSearches
  };
};

export default useTrending;