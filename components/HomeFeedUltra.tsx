import React from "react";

type HighlightBanner = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
};

type QuickAction = {
  id: string;
  label: string;
  description: string;
};

type CashbackSpotlight = {
  id: string;
  name: string;
  category: string;
  cashback: number;
  distance: string;
};

const highlightBanners: HighlightBanner[] = [
  {
    id: "1",
    title: "Cashback em toda a Freguesia",
    subtitle: "Ative seu Localizei Pay e ganhe parte do dinheiro de volta em cada compra.",
    ctaLabel: "Ver lojas com cashback",
  },
  {
    id: "2",
    title: "Freguesia Connect",
    subtitle: "Rede exclusiva para empreendedores locais crescerem juntos.",
    ctaLabel: "Conhecer os planos",
  },
];

const quickActions: QuickAction[] = [
  {
    id: "1",
    label: "Explorar categorias",
    description: "Encontre restaurantes, serviços, saúde, beleza e muito mais.",
  },
  {
    id: "2",
    label: "Ver ofertas de hoje",
    description: "Promoções com cashback extra em parceiros selecionados.",
  },
  {
    id: "3",
    label: "Sou lojista",
    description: "Cadastre seu negócio, ative o cashback e apareça para quem está perto.",
  },
];

const cashbackSpotlights: CashbackSpotlight[] = [
  {
    id: "1",
    name: "Burger da Freguesia",
    category: "Hamburgueria",
    cashback: 8,
    distance: "350 m",
  },
  {
    id: "2",
    name: "Studio Fit 21",
    category: "Academia e Funcional",
    cashback: 6,
    distance: "600 m",
  },
  {
    id: "3",
    name: "Pet & Love",
    category: "Petshop e Banho & Tosa",
    cashback: 5,
    distance: "900 m",
  },
];

const HomeFeedUltra: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 backdrop-blur-md bg-neutral-950/80 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
            LF
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/50">
              Você está em
            </span>
            <button className="flex items-center gap-1 text-xs font-medium text-white">
              Freguesia, Jacarepaguá
              <span className="text-[10px]">▾</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-2xl border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80 hover:bg-white/5 transition">
            Sou lojista
          </button>
          <button className="h-8 w-8 rounded-2xl bg-white/5 flex items-center justify-center text-xs hover:bg-white/10 transition">
            🔔
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pb-6 pt-3 space-y-6">
        {/* Saudações + Saldo */}
        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <p className="text-xs text-white/60">Boa tarde, Rafael 👋</p>
              <h1 className="text-lg font-semibold tracking-tight">
                Bora girar a economia da Freguesia?
              </h1>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                Saldo Localizei Pay
              </p>
              <p className="text-sm font-semibold text-emerald-400">R$ 32,80</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-3 text-left text-xs shadow-lg shadow-orange-500/40">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                Cashback ativo
              </p>
              <p className="mt-0.5 text-[13px] font-semibold">
                Ganhe até 10% de volta nas compras em parceiros Localizei.
              </p>
            </button>
            <button className="w-10 rounded-2xl bg-white/5 flex items-center justify-center text-lg hover:bg-white/10 transition">
              ➕
            </button>
          </div>
        </section>

        {/* Banners em destaque */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">
              Destaques da semana
            </h2>
            <button className="text-[11px] text-white/50 hover:text-white/80 transition">
              Ver todos
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {highlightBanners.map((banner) => (
              <article
                key={banner.id}
                className="min-w-[260px] max-w-[260px] rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 p-[1px] shadow-lg shadow-orange-500/40"
              >
                <div className="h-full w-full rounded-[1rem] bg-neutral-950/95 p-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-[13px] font-semibold leading-snug">
                      {banner.title}
                    </h3>
                    <p className="text-[11px] text-white/70 leading-snug">
                      {banner.subtitle}
                    </p>
                  </div>
                  <button className="mt-3 inline-flex items-center gap-1 rounded-2xl bg-white text-[11px] font-medium text-neutral-950 px-3 py-1.5 self-start hover:bg-neutral-100 transition">
                    {banner.ctaLabel}
                    <span className="text-[10px]">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ações rápidas */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-tight">
            O que você quer fazer agora?
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.06] transition"
              >
                <div className="text-left">
                  <p className="text-xs font-medium">{action.label}</p>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    {action.description}
                  </p>
                </div>
                <span className="text-[13px]">›</span>
              </button>
            ))}
          </div>
        </section>

        {/* Lojas com cashback em destaque */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">
              Lojas com cashback perto de você
            </h2>
            <button className="text-[11px] text-white/50 hover:text-white/80 transition">
              Ver mapa
            </button>
          </div>

          <div className="space-y-2">
            {cashbackSpotlights.map((store) => (
              <article
                key={store.id}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.06] transition"
              >
                <div className="flex flex-col">
                  <h3 className="text-xs font-medium leading-snug">
                    {store.name}
                  </h3>
                  <p className="text-[11px] text-white/60">
                    {store.category} · {store.distance}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-400/80">
                    Cashback
                  </p>
                  <p className="text-xs font-semibold text-emerald-400">
                    {store.cashback}% de volta
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Rodapé / Aviso */}
        <section className="mt-3 rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
          <p className="text-[10px] text-white/50 leading-relaxed">
            Comprando pelos parceiros do Localizei Freguesia você ajuda a{" "}
            <span className="text-white/80 font-medium">
              fortalecer o comércio local
            </span>{" "}
            e ainda ganha{" "}
            <span className="text-emerald-400 font-medium">
              cashback em cada compra
            </span>
            . Bora fazer a Freguesia girar.
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomeFeedUltra;
