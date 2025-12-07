<div className="flex items-center gap-1.5 flex-wrap">
  <h4 className="font-bold text-gray-800 dark:text-white text-sm leading-tight truncate max-w-[85%]">
    {store.name}
  </h4>

  {/* Selo Verificado (Blue Check) */}
  {store.verified && (
    <div title="Loja Verificada">
      <BadgeCheck className="w-4 h-4 text-[#1E5BFF]" />
    </div>
  )}

  {/* Cashback ativo */}
  {store.cashback && (
    <div className="w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center shrink-0" title="Cashback Ativo">
      <Coins className="w-2.5 h-2.5 text-[#FFD447] fill-[#FFD447]" strokeWidth={1} />
    </div>
  )}
</div>
