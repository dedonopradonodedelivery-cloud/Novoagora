import React from "react";

const HomeFeedUltra: React.FC = () => {
  return (
    <div className="w-full bg-black text-white">
      {/* Bloco preto principal (fica logo abaixo do header azul global) */}
      <section className="px-4 pt-4 pb-6 rounded-t-3xl bg-[#050505]">
        {/* Linha: VOCÊ ESTÁ EM / Sou lojista / Sino */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF6501] flex items-center justify-center text-sm font-semibold shadow-[0_0_18px_rgba(255,122,0,0.65)]">
              LF
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] tracking-[0.18em] uppercase text-white/60">
                Você está em
              </span>
              <button className="flex items-center gap-1 text-xs font-medium text-white">
                Freguesia, Jacarepaguá
                <span className="text-[10px]">▾</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-white/5 transition">
              Sou lojista
            </button>
            <button className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-xs hover:bg-white/10 transition">
              🔔
            </button>
          </div>
        </div>

        {/* Saudação + saldo */}
        <div className="flex items-end justify-between mb-4">
          <div className="space-y-1">
            <p className="text-xs text-white/70">Boa tarde, Rafael 👋</p>
            <h1 className="text-[20px] font-semibold leading-snug">
              Bora girar a economia da
              <br />
              Freguesia?
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
              Saldo Localizei Pay
            </p>
            <p className="text-sm font-bold text-emerald-400">R$ 32,80</p>
          </div>
        </div>

        {/* Card laranja: Cashback ativo */}
        <div className="flex items-stretch gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_50%_120%,rgba(255,165,0,0.55),transparent_60%)] pointer-events-none" />
            <div className="relative rounded-[28px] bg-gradient-to-r from-[#FF7A00] to-[#FF6501] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
              <p className="text-[10px] tracking-[0.24em] uppercase text-white/70 mb-1">
                Cashback ativo
              </p>
              <p className="text-[13px] leading-snug font-semibold">
                Ganhe até 10% de volta nas compras em parceiros Localizei.
              </p>
            </div>
          </div>
          <button className="w-11 rounded-[20px] bg-white/6 flex items-center justify-center text-xl text-white/80 border border-white/10 hover:bg-white/10 transition">
            +
          </button>
        </div>

        {/* Destaques da semana */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">Destaques da semana</h2>
            <button className="text-[11px] text-white/60 hover:text-white/85 transition">
              Ver todos
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Card 1 */}
            <article className="min-w-[240px] max-w-[240px] rounded-[24px] border border-[#FF7A00] bg-gradient-to-b from-[#141414] to-[#050505] px-4 py-3 flex flex-col justify-between shadow-[0_0_18px_rgba(255,122,0,0.35)]">
              <div className="mb-3">
                <h3 className="text-[13px] font-semibold mb-1">
                  Cashback em toda a Freguesia
                </h3>
                <p className="text-[11px] text-white/70 leading-snug">
                  Ative seu Localizei Pay e ganhe parte do dinheiro de volta em
                  cada compra.
                </p>
              </div>
              <button className="self-start rounded-full bg-white text-[11px] font-medium text-black px-3 py-1.5 flex items-center gap-1 hover:bg-neutral-100 transition">
                Ver lojas com cashback
                <span className="text-[10px]">↗</span>
              </button>
            </article>

            {/* Card 2 */}
            <article className="min-w-[240px] max-w-[240px] rounded-[24px] border border-[#FF7A00] bg-gradient-to-b from-[#141414] to-[#050505] px-4 py-3 flex flex-col justify-between">
              <div className="mb-3">
                <h3 className="text-[13px] font-semibold mb-1">
                  Freguesia Connect
                </h3>
                <p className="text-[11px] text-white/70 leading-snug">
                  Rede exclusiva para empreendedores locais crescerem juntos.
                </p>
              </div>
              <button className="self-start rounded-full bg-white text-[11px] font-medium text-black px-3 py-1.5 flex items-center gap-1 hover:bg-neutral-100 transition">
                Conhecer os planos
                <span className="text-[10px]">›</span>
              </button>
            </article>
          </div>

          {/* Barra de progresso fake, como no print */}
          <div className="mt-1 h-1 w-full rounded-full bg-white/10">
            <div className="h-1 w-1/3 rounded-full bg-white/70" />
          </div>
        </div>

        {/* O que você quer fazer agora? */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold mb-1">
            O que você quer fazer agora?
          </h2>

          {/* Botão 1 */}
          <button className="w-full flex items-center justify-between rounded-[999px] border border-white/18 px-4 py-3 bg-transparent hover:bg-white/[0.06] transition">
            <div className="text-left">
              <p className="text-xs font-medium">Explorar categorias</p>
              <p className="text-[11px] text-white/70">
                Encontre restaurantes, serviços, saúde, beleza e muito mais.
              </p>
            </div>
            <span className="text-sm text-white/70">›</span>
          </button>

          {/* Botão 2 */}
          <button className="w-full flex items-center justify-between rounded-[999px] border border-white/18 px-4 py-3 bg-transparent hover:bg-white/[0.06] transition">
            <div className="text-left">
              <p className="text-xs font-medium">Ver ofertas de hoje</p>
              <p className="text-[11px] text-white/70">
                Promoções com cashback extra em parceiros selecionados.
              </p>
            </div>
            <span className="text-sm text-white/70">›</span>
          </button>

          {/* Botão 3 */}
          <button className="w-full flex items-center justify-between rounded-[999px] border border-white/18 px-4 py-3 bg-transparent hover:bg-white/[0.06] transition">
            <div className="text-left">
              <p className="text-xs font-medium">Sou lojista</p>
              <p className="text-[11px] text-white/70">
                Cadastre seu negócio, ative o cashback e apareça para quem está
                perto.
              </p>
            </div>
            <span className="text-sm text-white/70">›</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeFeedUltra;
