import React, { lazy, Suspense, useState, useEffect } from "react";
import useHomeLogic from "../hooks/useHomeLogic";
import useTrending from "../hooks/useTrending";

const NowHappeningSection = lazy(() => import("./home/sections/NowHappeningSection"));
const IntentExploreSection = lazy(() => import("./home/sections/IntentExploreSection"));
const RankingWeekSection = lazy(() => import("./home/sections/RankingWeekSection"));
const LocalFeedSection = lazy(() => import("./home/sections/LocalFeedSection"));
const DailyMissionsSection = lazy(() => import("./home/sections/DailyMissionsSection"));
const HeaderPremium = lazy(() => import("./home/ui/HeaderPremium"));
const SearchBarPremium = lazy(() => import("./home/ui/SearchBarPremium"));
const StoriesLojistas = lazy(() => import("./home/stories/StoriesLojistas"));
const CategoriesPremium = lazy(() => import("./home/sections/CategoriesPremium"));
const AchadinhoCard = lazy(() => import("./home/cards/AchadinhoCard"));
const VerifiedStoreCard = lazy(() => import("./home/cards/VerifiedStoreCard"));
const LoadingSkeletonHome = lazy(() => import("./home/ui/LoadingSkeletonHome"));

export const HomeFeedUltra = () => {
  console.time("HomeFeedUltra Render");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.timeEnd("HomeFeedUltra Render");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const {
    timeOfDay,
    weather,
    cashbackActive,
    recommendations,
  } = useHomeLogic();

  const {
    trendingCategories,
    trendingStores,
    trendingSearches,
  } = useTrending();

  const intentTitle =
    timeOfDay === "morning"
      ? "Bom dia! O que você precisa agora?"
      : timeOfDay === "afternoon"
      ? "Boa tarde! Descubra algo novo"
      : "Boa noite! Que tal aproveitar a noite?";

  if (loading) {
    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <LoadingSkeletonHome />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="w-full flex flex-col gap-10 pb-40 pt-3 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

        <div className="flex flex-col gap-2 section-animate">
          <HeaderPremium timeOfDay={timeOfDay} />
          <SearchBarPremium timeOfDay={timeOfDay} />
          <StoriesLojistas />
        </div>

        {weather === "rainy" && (
          <div className="mx-5 mt-2 p-4 rounded-premium bg-blue-600 dark:bg-blue-900 text-white shadow-premium section-animate transition-colors">
            <p className="text-sm font-semibold text-white dark:text-gray-100">Dia chuvoso na Freguesia ☔</p>
            <p className="text-xs opacity-90 text-blue-50 dark:text-gray-300">
              Veja serviços com entrega rápida e lugares abertos agora.
            </p>
          </div>
        )}

        {/* Categorias principais */}
        <section className="section-animate">
          <CategoriesPremium />
        </section>

        {/* Acontecendo Agora na Freguesia */}
        <section id="now-happening" className="w-full section-animate">
          <NowHappeningSection />
        </section>

        {/* Explorar por Intenções */}
        <section id="intent-explore" className="w-full section-animate">
          <IntentExploreSection title={intentTitle} />
        </section>

        {/* Cashback (condicional) */}
        <section id="cashback-section" className="w-full px-5 mt-2 section-animate">
          {cashbackActive && (
            <div className="rounded-premium bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-600 dark:to-yellow-700 text-white p-4 shadow-premium">
              <p className="text-xs uppercase tracking-wide opacity-90 text-amber-50 dark:text-gray-200">Cashback disponível</p>
              <p className="text-base font-semibold mt-1 text-white dark:text-gray-100">
                Ganhe dinheiro de volta comprando na Freguesia
              </p>
              <p className="text-xs mt-1 opacity-90 text-amber-50 dark:text-gray-300">
                Veja lojas participantes e comece a acumular saldo Localizei.
              </p>
            </div>
          )}
        </section>

        {/* Achadinhos */}
        <section id="achadinhos" className="w-full px-5 mt-2 section-animate">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-3">Achadinhos da Freguesia</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {trendingStores?.map((store: any) => (
              <AchadinhoCard key={store.id} name={store.name} reason={store.reason} />
            ))}
          </div>
        </section>

        {/* Rankings da Semana */}
        <section id="ranking-week" className="w-full section-animate">
          <RankingWeekSection />
        </section>

        {/* Lojas Verificadas */}
        <section id="verified-stores" className="w-full px-5 mt-2 section-animate">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">Lojas verificadas</h2>
            <span className="text-xs text-primary-600 dark:text-primary-400 font-medium cursor-pointer hover:underline">ver todas</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {["Barbearia ZN", "Pet Club", "Dona Ana"].map((name, i) => (
              <VerifiedStoreCard key={i} name={name} />
            ))}
          </div>
        </section>

        {/* Recomendados para Você */}
        <section id="recommended" className="w-full px-5 mt-2 section-animate">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-3">Recomendado para você</h2>
          <div className="flex flex-col gap-2">
            {recommendations?.map((rec: any) => (
              <div
                key={rec.id}
                className="p-3 rounded-premium bg-white dark:bg-gray-800 shadow-light border border-gray-100 dark:border-gray-700 transition-colors"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{rec.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{rec.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsfeed Local */}
        <section id="local-feed" className="w-full section-animate">
          <LocalFeedSection />
        </section>

        {/* Missões Diárias */}
        <section id="daily-missions" className="w-full section-animate">
          <DailyMissionsSection />
        </section>

        {/* Patrocinador Master (placeholder) */}
        <section id="sponsor-master" className="w-full px-5 mt-2 section-animate">
          <div className="mt-2 rounded-premium bg-white dark:bg-gray-800 border border-dashed border-yellow-400 dark:border-yellow-600 p-4 flex items-center justify-between shadow-sm dark:shadow-none transition-colors">
            <div>
              <p className="text-xs uppercase tracking-wide text-yellow-500 dark:text-yellow-400 font-semibold">
                Patrocinador master
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Seu negócio aqui em destaque</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Espaço reservado para quem quer ser visto por todo o bairro.
              </p>
            </div>
            <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-500">Em breve</span>
          </div>
        </section>

        {/* Lojas & Serviços – placeholder para feed geral */}
        <section id="stores-services" className="w-full px-5 mt-2 pb-8 section-animate">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-3">Lojas e serviços</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Em breve, uma lista completa de estabelecimentos para você explorar.
          </p>
        </section>
      </div>
    </Suspense>
  );
};

export default React.memo(HomeFeedUltra);