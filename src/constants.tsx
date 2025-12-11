
import React from 'react';
import { Utensils, Briefcase, PartyPopper, Shirt, Coffee, Home, Dog, Armchair, Scissors, Heart, GraduationCap, Settings, Dumbbell, CarFront, Wrench, Sun, ShoppingCart, Croissant, Leaf, Beef, Fish, Bike, Beer, Sandwich, ShoppingBag, Sparkles, MapPin, Hand, Feather, Eye, Stethoscope, Smile, Brain, Activity, Apple, FlaskConical, HelpingHand, School, Languages, BookOpen, Baby, Target, Zap, Droplet, BrickWall, PaintRoller, Hammer, Wind, Key, Plug, Scale, Calculator, Ruler, Megaphone, Camera, Printer, Bone, Footprints, Flame, Swords, Trophy, Waves, Music, UserCheck, Tv, Smartphone, Laptop, Cpu, Snowflake, FileText, CircleDashed, Lock, Wallet, Gem, Watch, Moon, ShieldCheck, Package, Building2, Pill, Lightbulb, Palette } from 'lucide-react';
import { AdType, Category, Store, Story, ServiceLead, Channel, Transaction } from './types';
import { getStoreLogo } from './utils/mockLogos';

export const CATEGORIES: Category[] = [
  // Top 8 Categories ordered as requested
  { id: 'new-2', name: 'Saúde', slug: 'health', icon: <Heart className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: '2', name: 'Profissionais', slug: 'pros', icon: <Briefcase className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: 'new-1', name: 'Beleza', slug: 'beauty', icon: <Scissors className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: 'new-6', name: 'Autos', slug: 'autos', icon: <CarFront className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: '7', name: 'Pets', slug: 'pets', icon: <Dog className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: '8', name: 'Casa', slug: 'home-decor', icon: <Armchair className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: 'new-5', name: 'Esportes', slug: 'sports', icon: <Dumbbell className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: 'new-7', name: 'Assistências', slug: 'assistance', icon: <Wrench className="w-6 h-6 text-[#2D6DF6]" /> },
  
  // Remaining categories
  { id: '1', name: 'Alimentação', slug: 'food', icon: <Utensils className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: 'new-3', name: 'Educação', slug: 'education', icon: <GraduationCap className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: 'new-4', name: 'Serviços', slug: 'services', icon: <Settings className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: 'new-8', name: 'Bem-estar', slug: 'wellness', icon: <Sun className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: '3', name: 'Festas', slug: 'party', icon: <PartyPopper className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: '4', name: 'Moda', slug: 'fashion', icon: <Shirt className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: '5', name: 'Mercados', slug: 'grocery', icon: <Coffee className="w-6 h-6 text-[#2D6DF6]" /> },
  { id: '6', name: 'Condomínios', slug: 'condos', icon: <Building2 className="w-6 h-6 text-[#2D6DF6]" /> },
];

// Subcategories Map for the Detail View
export const SUBCATEGORIES: Record<string, { name: string; icon: React.ReactNode }[]> = {
  'Alimentação': [
    { name: 'Restaurantes', icon: <Utensils className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Mercado', icon: <ShoppingCart className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Padaria', icon: <Croissant className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Hortifruti', icon: <Leaf className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Cafés', icon: <Coffee className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Açougue', icon: <Beef className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Peixaria', icon: <Fish className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Delivery', icon: <Bike className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Depósito de Bebidas', icon: <Beer className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Lanchonetes', icon: <Sandwich className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Beleza': [
    { name: 'Salões', icon: <Scissors className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Barbearias', icon: <Scissors className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Manicure', icon: <Hand className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Depilação', icon: <Feather className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Estética', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Massoterapeuta', icon: <Heart className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Sobrancelha', icon: <Eye className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Bronzeamento', icon: <Sun className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Saúde': [
    { name: 'Clínicas médicas', icon: <Stethoscope className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Dentistas', icon: <Smile className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Psicólogos', icon: <Brain className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Fisioterapeutas', icon: <Activity className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Nutricionistas', icon: <Apple className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Pilates', icon: <Activity className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Laboratório', icon: <FlaskConical className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Quiropraxia', icon: <HelpingHand className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Educação': [
    { name: 'Escolas', icon: <School className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Idiomas', icon: <Languages className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Reforço escolar', icon: <BookOpen className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Creches', icon: <Baby className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Curso profissionalizantes', icon: <Briefcase className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Preparatórios', icon: <Target className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Serviços': [
    { name: 'Eletricistas', icon: <Zap className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Encanadores', icon: <Droplet className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Pedreiros', icon: <BrickWall className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Pintores', icon: <PaintRoller className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Marceneiro', icon: <Hammer className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Serralheiros', icon: <Key className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Diaristas', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Eletro domestico', icon: <Plug className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Esportes': [
    { name: 'Academias', icon: <Dumbbell className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Crossfit', icon: <Flame className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Funcional', icon: <Activity className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Artes marciais', icon: <Swords className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Quadras', icon: <Trophy className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Natação', icon: <Waves className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Dança', icon: <Music className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Personal', icon: <UserCheck className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Autos': [
    { name: 'Oficina Mecânica & Autoelétrica', icon: <Wrench className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Funilaria & Pintura', icon: <PaintRoller className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Lava-Jato & Estética Automotiva', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Pneus', icon: <CircleDashed className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Alinhamento & Suspensão', icon: <Activity className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Autopeças & Acessórios', icon: <Settings className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Vidro, Películas & Insulfilm', icon: <Sun className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Chaveiro automotivo', icon: <Key className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Documentão & Despachantes', icon: <FileText className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Profissionais': [
    { name: 'Advogados', icon: <Scale className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Contadores', icon: <Calculator className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Corretores', icon: <Key className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Consultores', icon: <Briefcase className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Arquitetos', icon: <Ruler className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Marketing', icon: <Megaphone className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Fotógrafo', icon: <Camera className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Gráfica', icon: <Printer className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Pets': [
    { name: 'Pet Shop & Acessórios', icon: <ShoppingBag className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Banho & Tosa', icon: <Scissors className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Veterinários & Clínicas', icon: <Stethoscope className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Hospedagem & Daycare', icon: <Home className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Adestramento', icon: <GraduationCap className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Farmácia Pet & Suplementos', icon: <Pill className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Alimentação Pet', icon: <Bone className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Serviços Especias', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Assistências': [
    { name: 'TVs', icon: <Tv className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Celulares', icon: <Smartphone className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Informática', icon: <Laptop className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Eletrônicos', icon: <Cpu className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Ar-condicionado', icon: <Wind className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Geladeira', icon: <Snowflake className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Micro-ondas', icon: <Zap className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Máquina de lavar', icon: <Waves className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Bem-estar': [
    { name: 'Massoterapia & Relaxamento', icon: <Heart className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Fisioterapia & Reabilitação', icon: <Activity className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Estúdios de Pilates', icon: <Activity className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Clinicas de Estéticas', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Psicologia & Terapia', icon: <Brain className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Nutrição & Vida Saudável', icon: <Apple className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Yoga & meditação', icon: <Sun className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Spa, Day Spa & Terapia', icon: <Droplet className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Festas': [
    { name: 'Decoração & Ambientação', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Buffet & Gastronomia', icon: <Utensils className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Salões & Espaços', icon: <Home className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Dj, Músicas & entretenimento', icon: <Music className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Aluguel de Equipamentos', icon: <Tv className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Fotografia & Filmagem', icon: <Camera className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Bolos, Doces & Personalizados', icon: <Croissant className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Personagens & animação', icon: <Smile className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Moda': [
    { name: 'Moda Feminina', icon: <ShoppingBag className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Moda Masculina', icon: <Shirt className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Moda Infantil & Bebê', icon: <Baby className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Moda Praia & fitness', icon: <Sun className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Calçados', icon: <Footprints className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Acessórios & Bijuterias', icon: <Gem className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Joias & Relógios', icon: <Watch className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Moda Íntima & Sleepwear', icon: <Moon className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Condomínios': [
    { name: 'Segurança Patrimonial', icon: <ShieldCheck className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Limpeza & conservação', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Manutenção Predial', icon: <Hammer className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Piscina & Guardião', icon: <Waves className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Jardinagem & Paisagismo', icon: <Leaf className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Fornecedores & Suprimentos', icon: <Package className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Administração de Condomínios', icon: <Building2 className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Portaria & controle de Acesso', icon: <UserCheck className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  'Casa': [
    { name: 'Decoração & Design de Interiores', icon: <Palette className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Móveis & Planejados', icon: <Armchair className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Iluminação & elétrica', icon: <Lightbulb className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Hidráulica & Encanamento', icon: <Droplet className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Reforma & Construção', icon: <BrickWall className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Pintura & Acabamentos', icon: <PaintRoller className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Chaveiro Residencial', icon: <Key className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Limpeza Residencial & Diaristas', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
  ],
  // Fallback for others (generic)
  'default': [
    { name: 'Geral', icon: <Briefcase className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Ofertas', icon: <ShoppingBag className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Novidades', icon: <Sparkles className="w-8 h-8 text-[#1B54D9]" /> },
    { name: 'Próximos', icon: <MapPin className="w-8 h-8 text-[#1B54D9]" /> },
  ]
};

export const STORIES: Story[] = [
  { id: '1', name: 'Mercado ...', image: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'Empório d...', image: 'https://picsum.photos/100/100?random=2', isLive: true },
  { id: '3', name: 'Padaria P...', image: 'https://picsum.photos/100/100?random=3' },
  { id: '4', name: 'Açougue ...', image: 'https://picsum.photos/100/100?random=4' },
  { id: '5', name: 'Hortifru...', image: 'https://picsum.photos/100/100?random=5' },
  { id: '6', name: 'Farmácia...', image: 'https://picsum.photos/100/100?random=6' },
];

export const CHANNELS: Channel[] = [
  { id: '1', name: 'ME COZINHA...', image: 'https://picsum.photos/100/100?random=10', followers: '14 mil', verified: false },
  { id: '2', name: 'PENTEADOS 🇧🇷', image: 'https://picsum.photos/100/100?random=11', followers: '134 mil', verified: false },
  { id: '3', name: 'SOBREMESAS 🍰', image: 'https://picsum.photos/100/100?random=12', followers: '35 mil', verified: false },
  { id: '4', name: 'LATAM Airlines Ofert...', image: 'https://picsum.photos/100/100?random=13', followers: '47 mil', verified: true },
];

// Contains a mix of Premium (Top), Local, and Organic stores
export const STORES: Store[] = [
  {
    id: 'premium-1',
    name: 'Casas Pedro',
    category: 'Alimentação',
    subcategory: 'Mercado',
    logoUrl: getStoreLogo(0),
    rating: 4.9,
    distance: '0.5km',
    adType: AdType.PREMIUM,
    description: 'A maior variedade de grãos e especiarias da Freguesia.',
    cashback: 5,
    isMarketplace: true,
    price_original: 55.00,
    price_current: 49.90,
    verified: true,
    address: "Estrada dos Três Rios, 1200 - Freguesia",
    phone: "(21) 2444-5555",
    hours: "Seg à Sáb: 08h às 20h",
    gallery: [
      'https://picsum.photos/600/400?random=100',
      'https://picsum.photos/600/400?random=101',
      'https://picsum.photos/600/400?random=102',
    ],
    reviews: [
      { id: 'r1', user: 'Maria S.', rating: 5, text: 'Melhor loja de produtos naturais!', date: 'Há 2 dias' },
      { id: 'r2', user: 'João P.', rating: 4, text: 'Ótimo atendimento.', date: 'Há 1 semana' },
    ]
  },
  {
    id: 'premium-2',
    name: 'Hamburgueria Brasa',
    category: 'Alimentação',
    subcategory: 'Lanchonetes',
    logoUrl: getStoreLogo(1),
    rating: 4.8,
    distance: '1.2km',
    adType: AdType.PREMIUM,
    description: 'O melhor burger artesanal do bairro.',
    cashback: 3,
    isMarketplace: true,
    price_original: 32.50,
    price_current: 32.50,
    verified: true,
    address: "Rua Araguaia, 450",
    phone: "(21) 99999-8888",
    hours: "Ter à Dom: 18h às 23h"
  },
  {
    id: 'local-1',
    name: 'Ótica Visão',
    category: 'Moda',
    subcategory: 'Acessórios & Bijuterias',
    logoUrl: getStoreLogo(2),
    rating: 4.5,
    distance: '0.3km',
    adType: AdType.LOCAL,
    description: 'Óculos de sol e grau com preço justo.',
    cashback: 2,
    isMarketplace: true,
    price_original: 220.00,
    price_current: 199.00,
    address: "Estrada de Jacarepaguá, 7600"
  },
  {
    id: 'organic-1',
    name: 'PetShop Amigo Fiel',
    category: 'Pets',
    subcategory: 'Banho & Tosa',
    logoUrl: getStoreLogo(3),
    rating: 4.2,
    distance: '2.0km',
    adType: AdType.ORGANIC,
    description: 'Banho e tosa com carinho.',
    isMarketplace: false
  },
  {
    id: 'organic-2',
    name: 'Padaria Estrela',
    category: 'Alimentação',
    subcategory: 'Padaria',
    logoUrl: getStoreLogo(4),
    rating: 4.6,
    distance: '0.8km',
    adType: AdType.ORGANIC,
    description: 'Pão quente toda hora.',
    isMarketplace: true,
    price_original: 12.00,
    price_current: 12.00
  }
];

export const LEADS: ServiceLead[] = [
  { id: '1', title: 'Instalação de Ar Condicionado', category: 'Climatização', urgency: 'Alta', priceToUnlock: 3.90, maskedName: 'Carlos M.', district: 'Freguesia' },
  { id: '2', title: 'Bolo de Aniversário (3kg)', category: 'Festas', urgency: 'Média', priceToUnlock: 3.90, maskedName: 'Ana P.', district: 'Pechincha' },
  { id: '3', title: 'Troca de Fiação Elétrica', category: 'Eletricista', urgency: 'Alta', priceToUnlock: 3.90, maskedName: 'Roberto S.', district: 'Freguesia' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', storeName: 'Casas Pedro', date: '20 Out 2023', amount: 150.00, cashbackAmount: 7.50, status: 'completed' },
  { id: 't2', storeName: 'Hamburgueria Brasa', date: '18 Out 2023', amount: 85.00, cashbackAmount: 2.55, status: 'completed' },
  { id: 't3', storeName: 'Ótica Visão', date: '10 Out 2023', amount: 400.00, cashbackAmount: 8.00, status: 'pending' },
  { id: 't4', storeName: 'Padaria Estrela', date: '05 Out 2023', amount: 25.00, cashbackAmount: 0.00, status: 'completed' }, // No cashback example
];

export const quickFilters = [
  { id: 'nearby', label: 'Perto de mim', icon: 'zap' },
  { id: 'top_rated', label: 'Bem avaliados', icon: 'star' },
  { id: 'open_now', label: 'Aberto agora', icon: 'clock' },
  { id: 'cashback', label: 'Cashback', icon: 'percent' },
];
