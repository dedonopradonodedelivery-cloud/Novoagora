import React, { useState } from 'react';
import {
  ChevronLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Clock,
  Phone,
  Instagram,
  MessageSquare,
} from 'lucide-react';
import { Store } from '../types';

const storeMock = {
  business: {
    id: 1,
    name: 'Loja Exemplo',
    category: 'Geral',
    rating: 0,
    ratingCount: 0,
    description: 'Descrição indisponível.',
    logo: '/assets/default-logo.png',
    banners: [
      'https://placehold.co/800x600?text=Banner',
    ],
    social: {
      instagram: '',
      whatsapp: '',
    },
    contact: {
      phone: '(21) 99999-9999',
      address: 'Endereço não informado',
      hours: 'Consultar horário',
    },
    location: {
      lat: -22.936,
      lng: -43.355,
    },
  },
};

function mapStoreToBusiness(store?: Store | null) {
  if (!store) return storeMock.business;

  const s: any = store;

  return {
    ...storeMock.business,

    id: s.id ?? storeMock.business.id,
    name: s.nome ?? s.name ?? storeMock.business.name,
    category: s.categoria ?? s.category ?? storeMock.business.category,
    rating: s.rating ?? storeMock.business.rating,
    ratingCount: s.reviewsCount ?? s.total_reviews ?? s.ratingCount ?? storeMock.business.ratingCount,
    description: s.descricao ?? s.description ?? storeMock.business.description,

    logo: s.logoUrl ?? s.image ?? s.image_url ?? storeMock.business.logo,
    banners:
      s.banners && Array.isArray(s.banners) && s.banners.length > 0
        ? s.banners
        : s.image || s.image_url
        ? [s.image || s.image_url]
        : storeMock.business.banners,

    social: {
      instagram: s.instagram ?? storeMock.business.social.instagram,
      whatsapp: s.whatsapp ?? storeMock.business.social.whatsapp,
    },

    contact: {
      phone: s.telefone ?? s.phone ?? storeMock.business.contact.phone,
      address: s.endereco ?? s.address ?? storeMock.business.contact.address,
      hours: s.horario_funcionamento ?? s.hours ?? storeMock.business.contact.hours,
    },

    location: {
      lat: s.latitude ?? storeMock.business.location.lat,
      lng: s.longitude ?? storeMock.business.location.lng,
    },
  };
}

const HeaderButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/10 hover:bg-white transition-colors active:scale-95"
  >
    {children}
  </button>
);

const InfoCard: React.FC<{
  icon: React.ElementType;
  title: string;
  value: string;
}> = ({ icon: Icon, title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl flex items-center gap-4 shadow-lg shadow-black/5 border border-gray-100 dark:border-gray-700/50">
    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-[#1E5BFF] flex-shrink-0">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs font-semibold text-[#6C6C6C] dark:text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <p className="font-semibold text-[#141414] dark:text-gray-200 mt-0.5">
        {value}
      </p>
    </div>
  </div>
);

const Tabs: React.FC<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}> = ({ activeTab, setActiveTab, tabs }) => {
  const activeIndex = tabs.indexOf(activeTab);
  return (
    <div className="relative flex bg-[#F3F3F3] dark:bg-gray-800 p-1.5 rounded-full">
      <div
        className="absolute top-1.5 bottom-1.5 w-1/2 bg-white dark:bg-gray-700 rounded-full shadow-lg shadow-black/10 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative z-10 w-1/2 py-3 text-sm font-bold text-center transition-colors"
        >
          <span
            className={
              activeTab === tab
                ? 'text-[#141414] dark:text-white'
                : 'text-[#6C6C6C] dark:text-gray-400'
            }
          >
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
};

interface StoreDetailViewProps {
  store?: Store | null;
  onBack: () => void;
  onOpenCashback?: () => void;
}

export const StoreDetailView: React.FC<StoreDetailViewProps> = ({
  store,
  onBack,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'Sobre' | 'Avaliações'>(
    'Sobre',
  );
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const business = mapStoreToBusiness(store);
  const photoGallery = business.banners || [];

  const hasSocials = business.social.instagram || business.social.whatsapp;

  React.useEffect(() => {
    if (photoGallery.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % photoGallery.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [photoGallery.length]);

  const handleSubmitReview = () => {
    if (!reviewText.trim()) return;

    setIsSubmittingReview(true);

    setTimeout(() => {
      setIsSubmittingReview(false);
      setReviewText('');
      setReviewSuccess(true);

      setTimeout(() => {
        setReviewSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-950 font-sans relative">
      <main className="overflow-y-auto pb-8">
        <section className="relative w-full h-[260px] bg-gray-200 dark:bg-gray-800">
          {photoGallery.length > 0 && (
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-[24px] shadow-lg shadow-black/10">
              {photoGallery.map((img: string, index: number) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${business.name} - Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              ))}
            </div>
          )}

          <div className="absolute top-0 left-0 right-0 p-4 pt-6 flex justify-between items-center bg-gradient-to-b from-black/30 to-transparent z-10">
            <HeaderButton onClick={onBack}>
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </HeaderButton>
            <div className="flex gap-3">
              <HeaderButton>
                <Share2 className="w-5 h-5 text-gray-800" />
              </HeaderButton>
              <HeaderButton onClick={() => setIsFavorite(!isFavorite)}>
                <Heart
                  className={`w-5 h-5 text-gray-800 transition-all ${
                    isFavorite
                      ? 'fill-[#1E5BFF] text-[#1E5BFF]'
                      : 'fill-transparent'
                  }`}
                />
              </HeaderButton>
            </div>
          </div>

          {photoGallery.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {photoGallery.map((_: string, idx: number) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    idx === currentSlide ? 'w-5 bg-white' : 'w-2 bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </section>

        <div className="relative px-5">
          <div className="relative pt-7">
            {business.logo && (
              <div className="absolute right-0 -top-12 w-20 h-20 rounded-xl bg-gray-50 dark:bg-gray-800 border-4 border-white dark:border-[#F5F5F5] shadow-xl flex-shrink-0 z-20 overflow-hidden">
                <img
                  src={business.logo || "/assets/default-logo.png"}
                  alt={`${business.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <div className="space-y-8">
              <section className="flex justify-between items-start gap-4">
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#6C6C6C] dark:text-gray-400 mb-2">
                    {business.category && <span>{business.category}</span>}
                    {business.rating !== undefined && (
                      <>
                        <span className="text-gray-300">•</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>
                          {business.rating} ({business.ratingCount ?? 0})
                        </span>
                      </>
                    )}
                  </div>
                  <h1 className="text-3xl font-[800] text-[#141414] dark:text-white font-sans tracking-tighter leading-tight">
                    {business.name}
                  </h1>
                </div>
              </section>

              <section className="pt-2">
                <Tabs
                  activeTab={activeTab}
                  setActiveTab={(tab) =>
                    setActiveTab(tab as 'Sobre' | 'Avaliações')
                  }
                  tabs={['Sobre', 'Avaliações']}
                />
              </section>

              {activeTab === 'Sobre' ? (
                <section className="animate-in fade-in duration-500 space-y-8">
                  {business.description && (
                    <div>
                      <h3 className="text-lg font-bold text-[#141414] dark:text-white mb-3">
                        Sobre a Loja
                      </h3>
                      <p className="text-sm text-[#6C6C6C] dark:text-gray-300 leading-relaxed space-y-3">
                        {business.description}
                      </p>
                    </div>
                  )}

                  {hasSocials && (
                    <div className="flex gap-4">
                      {business.social.instagram && (
                        <a
                          href={business.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-br from-pink-500 to-red-500 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-pink-500/20"
                        >
                          <Instagram className="w-5 h-5" /> Instagram
                        </a>
                      )}
                      {business.social.whatsapp && (
                        <a
                          href={business.social.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-br from-green-500 to-emerald-500 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-green-500/20"
                        >
                          <MessageSquare className="w-5 h-5" /> WhatsApp
                        </a>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    {business.contact.address && (
                      <InfoCard
                        icon={MapPin}
                        title="Endereço"
                        value={business.contact.address}
                      />
                    )}
                    {business.contact.hours && (
                      <InfoCard
                        icon={Clock}
                        title="Horário"
                        value={business.contact.hours}
                      />
                    )}
                    {business.contact.phone && (
                      <InfoCard
                        icon={Phone}
                        title="Telefone"
                        value={business.contact.phone}
                      />
                    )}
                  </div>

                  {business.contact.address && (
                    <div className="space-y-4">
                      <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-lg shadow-black/5 border border-gray-100 dark:border-gray-700/50">
                        <img
                          src="https://storage.googleapis.com/gweb-cloudblog-publish/images/Maps-API-usage-Android.max-1100x1100.png"
                          alt="Map"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="w-full bg-white dark:bg-gray-800 text-[#1E5BFF] font-bold py-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                        Como Chegar
                      </button>
                    </div>
                  )}

                  <div className="pt-4">
                    <button className="w-full bg-gradient-to-r from-[#1E5BFF] to-[#3A73FF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform text-base">
                      Informar erro neste local
                    </button>
                  </div>
                </section>
              ) : (
                <section className="animate-in fade-in duration-500 space-y-6">
                  {(business.rating !== undefined) && (
                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg shadow-black/5">
                      <span className="text-5xl font-extrabold text-[#141414] dark:text-white">
                        {business.rating}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.round(business.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#6C6C6C] dark:text-gray-400 mt-1">
                          Baseado em {business.ratingCount} avaliações
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-[#141414] dark:text-white mb-3">
                      Deixe sua avaliação
                    </h3>
                    <div className="flex flex-col gap-3">
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Escreva sua avaliação aqui..."
                        className="w-full h-28 p-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-[#1E5BFF] rounded-xl focus:ring-2 focus:ring-blue-500/10 outline-none transition-all dark:text-white text-sm shadow-sm resize-none"
                      />
                      <div className="flex justify-between items-center">
                        {reviewSuccess ? (
                          <span className="text-green-600 dark:text-green-400 text-sm font-bold animate-in fade-in slide-in-from-left-2 flex items-center gap-1">
                            Avaliação enviada!
                          </span>
                        ) : (
                          <span />
                        )}

                        <button
                          onClick={handleSubmitReview}
                          disabled={!reviewText.trim() || isSubmittingReview}
                          className="bg-[#1E5BFF] text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed hover:bg-[#164ACC]"
                        >
                          {isSubmittingReview ? 'Enviando...' : 'Enviar avaliação'}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};