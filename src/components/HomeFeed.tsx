import React from "react";
import { Header } from "./Header";
import { HeartPulse, Scissors, Dog, Dumbbell, Utensils, BriefcaseMedical, Car, Home, Wrench } from "lucide-react";

interface HomeFeedProps {
  onOpenCashback: () => void;
}

const categories = [
  { id: 1, label: "Saúde", icon: HeartPulse },
  { id: 2, label: "Beleza", icon: Scissors },
  { id: 3, label: "Pets", icon: Dog },
  { id: 4, label: "Esportes", icon: Dumbbell },
  { id: 5, label: "Alimentação", icon: Utensils },
  { id: 6, label: "Profissionais", icon: BriefcaseMedical },
  { id: 7, label: "Autos", icon: Car },
  { id: 8, label: "Casa", icon: Home },
  { id: 9, label: "Assistências", icon: Wrench },
];

const achadinhos = [
  {
    id: 1,
    title: "Burger Freguesia",
    desc: "Hambúrguer artesanal com cashback exclusivo.",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Studio de Beleza Viva",
    desc: "Cabelo, make e cuidados com 8% de volta.",
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Clínica Pet Freguesia",
    desc: "Vacinas, consultas e banho & tosa com cashback.",
    img: "https://images.unsplash.com/photo-1518887414810-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  },
];

export const HomeFeed: React.FC<HomeFeedProps> = ({ onOpenCashback }) => {
  return (
    <div className="max-w-md mx-auto">
      <Header />
      <main className="px-4 pb-6 pt-4 space-y-6">
        {/* Roleta Localizei */}
        <section className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-3xl p-4 text-white flex items-center justify-between shadow-md">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide">Roleta Localizei</p>
            <p className="text-sm mt-1">Ganhe prêmios todos os dias</p>
          </div>
          <button className="bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-2xl shadow-sm">
            Gire agora
          </button>
        </section>

        {/* Categorias */}
        <section>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className="flex flex-col items-center gap-2 text-xs text-gray-600"
                >
                  <div className="w-14 h-14 rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-700">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Cashback Local */}
        <section>
          <h2 className="text-base font-semibold mb-3">
            O que você vai encontrar na Localizei
          </h2>
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-4 text-white flex items-center justify-between shadow-md">
            <div>
              <p className="text-sm font-semibold">Cashback Local</p>
              <p className="text-xs text-blue-100 mt-1">Dinheiro de volta.</p>
            </div>
            <button
              onClick={onOpenCashback}
              className="bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-2xl shadow-sm"
            >
              Ver Agora →
            </button>
          </div>
        </section>

        {/* Achadinhos */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold">Achadinhos da Freguesia</h2>
            <button className="text-xs text-blue-600 font-medium">Ver mais</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {achadinhos.map((item) => (
              <div
                key={item.id}
                className="min-w-[180px] bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                <div className="h-28 bg-gray-200">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold mb-1">{item.title}</p>
                  <p className="text-[11px] text-gray-500 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
