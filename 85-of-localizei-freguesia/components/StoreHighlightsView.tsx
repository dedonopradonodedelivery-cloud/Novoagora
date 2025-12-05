
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShoppingCart, X } from 'lucide-react';
import { Store } from '../types';

// --- MOCK DATA PROVIDED BY USER - SINGLE SOURCE OF TRUTH ---
const storeHighlightsMock = {
  storeName: "Pizza Place Freguesia",
  videos: [
    {
      id: 'v1',
      thumbnailUrl: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=360&h=640",
      src: "https://videos.pexels.com/video-files/4701549/4701549-sd_540_960_25fps.mp4",
      title: "Pizza Margherita no forno a lenha"
    },
    {
      id: 'v2',
      thumbnailUrl: "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=360&h=640",
      src: "https://videos.pexels.com/video-files/852395/852395-sd_540_960_30fps.mp4",
      title: "Combo Família para 4 pessoas"
    },
    {
      id: 'v3',
      thumbnailUrl: "",
      src: "https://videos.pexels.com/video-files/4434246/4434246-sd_540_960_25fps.mp4",
      title: "Nossa cozinha por dentro"
    },
  ],
  products: [
    {
      id: 1,
      name: 'Hambúrguer Clássico da Casa com Queijo',
      price_original: '32.50',
      price_current: '28.50',
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format=fit-crop',
      cashback_percent: 5
    },
    {
      id: 2,
      name: 'Batata Frita Especial com Alecrim e Páprica',
      price_original: '15.00',
      price_current: '15.00',
      imageUrl: 'https://images.unsplash.com/photo-1606756790138-aa6f1afa76f4?q=80&w=400&auto=format=fit-crop',
      cashback_percent: 3
    },
    {
      id: 3,
      name: 'Pizza Marguerita Grande (8 Fatias)',
      price_original: '55.00',
      price_current: '49.90',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format=fit-crop',
      cashback_percent: 10
    },
    {
      id: 4,
      name: 'Coca-Cola Lata 350ml',
      price_original: '6.00',
      price_current: '6.00',
      imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32a6444?q=80&w=400&auto=format=fit-crop',
      cashback_percent: 0
    },
    {
      id: 5,
      name: 'Milkshake de Chocolate Belga com Pedaços',
      price_original: '22.00',
      price_current: '22.00',
      imageUrl: 'https://images.unsplash.com/photo-1627998691138-c3f15c1b523e?q=80&w=400&auto=format=fit-crop',
      cashback_percent: 3
    },
    {
      id: 6,
      name: 'Sundae de Caramelo com Castanhas',
      price_original: '20.00',
      price_current: '18.00',
      imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c934d?q=80&w=400&auto=format=fit-crop',
      cashback_percent: 0
    },
    {
      id: 7,
      name: 'Frango Frito Crocante (Balde)',
      price_original: '39.90',
      price_current: '39.90',
      imageUrl: '',
      cashback_percent: 8
    }, // testa placeholder com URL vazia
    {
      id: 8,
      name: 'Suco Natural de Laranja 500ml',
      price_original: '9.00',
      price_current: '9.00',
      imageUrl: 'https://broken.url/image.jpg',
      cashback_percent: 4
    }, // testa placeholder com URL quebrada
  ]
};

// ---------- SUBCOMPONENTES ----------

const VideoPlayerModal: React.FC<{
  video: { src: string; title: string };
  onClose: () => void;
}> = ({ video, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={video.src}
          controls
          playsInline
          className="max-h-full w-full object-contain"
        />
      </div>
      <button
        className="absolute top-4 right-4 text-white"
        onClick={onClose}
        aria-label="Fechar vídeo"
      >
        <X className="w-7 h-7" />
      </button>
    </div>
  );
};

// VÍDEOS 9:16, SEM OVERLAY/TEXTO
const VideoCarousel: React.FC<{
  videos: { id: string; src: string; thumbnailUrl: string; title: string }[];
}> = ({ videos }) => {
  const [playingVideo, setPlayingVideo] =
    useState<{ src: string; title: string } | null>(null);

  const videoPlaceholderUrl = "https://placehold.co/360x640?text=V%C3%ADdeo";

  const videoList =
    videos && videos.length > 0
      ? videos.map(v => ({
          ...v,
          thumbnailUrl: v.thumbnailUrl || videoPlaceholderUrl
        }))
      : [];

  const displayList =
    videoList.length > 0
      ? videoList
      : Array(3)
          .fill(0)
          .map((_, i) => ({
            id: `placeholder-${i}`,
            src: '',
            title: '',
            thumbnailUrl: videoPlaceholderUrl
          }));

  return (
    <>
      <div
        className="flex overflow-x-auto no-scrollbar py-2"
        style={{ paddingLeft: 16, paddingRight: 16, gap: 12 }}
      >
        {displayList.map(video => (
          <div
            key={video.id}
            onClick={() => video.src && setPlayingVideo(video)}
            style={{
              width: 140,
              borderRadius: 6,
              overflow: 'hidden',
              backgroundColor: '#e5e5e5',
              flexShrink: 0,
              cursor: video.src ? 'pointer' : 'default'
            }}
          >
            {/* Caixa com proporção 9:16 via padding-bottom */}
            <div
              style={{
                width: '100%',
                paddingBottom: '177.78%', // 16/9 * 100
                position: 'relative'
              }}
            >
              <img
                src={video.thumbnailUrl}
                alt=""
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 6,
                  display: 'block'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {playingVideo && (
        <VideoPlayerModal video={playingVideo} onClose={() => setPlayingVideo(null)} />
      )}
    </>
  );
};

const ImageWithFallback: React.FC<{ src?: string; className?: string }> = ({
  src,
  className,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const fallbackImage =
    'https://placehold.co/600x400?text=Foto+Indispon%C3%ADvel';

  useEffect(() => {
    if (src && src.trim() !== '') {
      setCurrentSrc(src);
    } else {
      setCurrentSrc(fallbackImage);
    }
  }, [src]);

  const handleError = () => {
    if (currentSrc !== fallbackImage) {
      setCurrentSrc(fallbackImage);
    }
  };

  return (
    <img
      src={currentSrc}
      alt="" // nunca mostra alt text na tela
      className={className}
      onError={handleError}
    />
  );
};

const ProductCard: React.FC<{ product: (typeof storeHighlightsMock.products)[0] }> = ({
  product,
}) => {
  const priceOriginal = parseFloat(product.price_original);
  const priceCurrent = parseFloat(product.price_current);
  const hasDiscount = priceOriginal > priceCurrent;
  const discountPercent = hasDiscount
    ? Math.floor(((priceOriginal - priceCurrent) / priceOriginal) * 100)
    : 0;
  const hasCashback = product.cashback_percent && product.cashback_percent > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <ImageWithFallback
          src={product.imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
        />
        <button
          className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform duration-200 border border-gray-100"
          aria-label="Adicionar ao carrinho"
        >
          <ShoppingCart className="w-4 h-4 text-[#1E5BFF]" />
        </button>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-bold text-sm text-[#0B0B0B] dark:text-white line-clamp-2 h-10 leading-tight mb-2">
          {product.name}
        </h3>

        <div className="mt-auto space-y-2">
          <div>
            {hasDiscount && (
              <p className="text-xs text-[#9E9E9E] line-through">
                R$ {priceOriginal.toFixed(2).replace('.', ',')}
              </p>
            )}
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="font-bold text-lg text-[#0B0B0B] dark:text-gray-100">
                R$ {priceCurrent.toFixed(2).replace('.', ',')}
              </p>
              {hasDiscount && discountPercent > 0 && (
                <p className="font-bold text-sm text-[#15803D]">
                  • {discountPercent}% OFF
                </p>
              )}
            </div>
          </div>

          {hasCashback && (
            <div className="w-fit flex items-center gap-2 bg-[#EAFBE7] text-[#0E8A3A] px-2 py-1.5 rounded-lg text-xs font-bold">
              <span>🪙 {product.cashback_percent}% Cashback</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- MAIN VIEW ----------

interface StoreHighlightsViewProps {
  store?: Store | null;
  onBack: () => void;
}

export const StoreHighlightsView: React.FC<StoreHighlightsViewProps> = ({
  store,
  onBack,
}) => {
  const { videos, products } = storeHighlightsMock;

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-950 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full max-w-md mx-auto h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm z-20 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          Destaques da Loja
        </h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ShoppingCart className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
      </header>

      {/* Conteúdo */}
      <main className="pt-16 overflow-y-auto">
        <div className="pb-12">
          {/* VÍDEOS */}
          <section className="bg-[#F7F7F7] dark:bg-gray-900 py-4 mb-4">
            <div className="px-6 mb-3">
              <h2 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                VÍDEOS DA LOJA
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Assista e conheça melhor.
              </p>
            </div>
            <VideoCarousel videos={videos} />
          </section>

          {/* PRODUTOS */}
          <section className="px-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Destaques da Loja
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
