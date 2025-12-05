import React from 'react';
import { Utensils, Briefcase, PartyPopper, Shirt, Coffee, Home, Dog, Armchair, Scissors, Heart, GraduationCap, Settings, Dumbbell, CarFront, Wrench, Sun, ShoppingCart, Croissant, Leaf, Beef, Fish, Bike, Beer, Sandwich, ShoppingBag, Sparkles, MapPin, Hand, Feather, Eye, Stethoscope, Smile, Brain, Activity, Apple, FlaskConical, HelpingHand, School, Languages, BookOpen, Baby, Target, Zap, Droplet, BrickWall, PaintRoller, Hammer, Wind, Key, Plug, Scale, Calculator, Ruler, Megaphone, Camera, Printer, Bone, Footprints, Flame, Swords, Trophy, Waves, Music, UserCheck, Tv, Smartphone, Laptop, Cpu, Snowflake, FileText, CircleDashed, Lock, Wallet, Gem, Watch, Moon, ShieldCheck, Package, Building2, Pill, Lightbulb, Palette } from 'lucide-react';
import { AdType, Category, Store, Story, ServiceLead, Channel, Transaction } from '../types';

export const CATEGORIES: Category[] = [
  // Top 8 Categories ordered as requested
  { id: 'new-2', name: 'Saúde', slug: 'health', icon: React.createElement(Heart, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: '2', name: 'Profissionais', slug: 'pros', icon: React.createElement(Briefcase, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: 'new-1', name: 'Beleza', slug: 'beauty', icon: React.createElement(Scissors, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: 'new-6', name: 'Autos', slug: 'autos', icon: React.createElement(CarFront, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: '7', name: 'Pets', slug: 'pets', icon: React.createElement(Dog, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: '8', name: 'Casa', slug: 'home-decor', icon: React.createElement(Armchair, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: 'new-5', name: 'Esportes', slug: 'sports', icon: React.createElement(Dumbbell, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: 'new-7', name: 'Assistências', slug: 'assistance', icon: React.createElement(Wrench, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  
  // Remaining categories
  { id: '1', name: 'Alimentação', slug: 'food', icon: React.createElement(Utensils, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: 'new-3', name: 'Educação', slug: 'education', icon: React.createElement(GraduationCap, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: 'new-4', name: 'Serviços', slug: 'services', icon: React.createElement(Settings, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: 'new-8', name: 'Bem-estar', slug: 'wellness', icon: React.createElement(Sun, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: '3', name: 'Festas', slug: 'party', icon: React.createElement(PartyPopper, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: '4', name: 'Moda', slug: 'fashion', icon: React.createElement(Shirt, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: '5', name: 'Mercados', slug: 'grocery', icon: React.createElement(Coffee, { className: "w-6 h-6 text-[#2D6DF6]" }) },
  { id: '6', name: 'Condomínios', slug: 'condos', icon: React.createElement(Building2, { className: "w-6 h-6 text-[#2D6DF6]" }) },
];

// Subcategories Map for the Detail View
export const SUBCATEGORIES: Record<string, { name: string; icon: React.ReactNode }[]> = {
  'Alimentação': [
    { name: 'Restaurantes', icon: React.createElement(Utensils, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Mercado', icon: React.createElement(ShoppingCart, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Padaria', icon: React.createElement(Croissant, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Hortifruti', icon: React.createElement(Leaf, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Cafés', icon: React.createElement(Coffee, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Açougue', icon: React.createElement(Beef, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Peixaria', icon: React.createElement(Fish, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Delivery', icon: React.createElement(Bike, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Depósito de Bebidas', icon: React.createElement(Beer, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Lanchonetes', icon: React.createElement(Sandwich, { className: "w-8 h-8 text-[#1B54D9]" }) },
  ],
  // ... other categories (truncated for brevity but structure maintained) ...
  'default': [
    { name: 'Geral', icon: React.createElement(Briefcase, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Ofertas', icon: React.createElement(ShoppingBag, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Novidades', icon: React.createElement(Sparkles, { className: "w-8 h-8 text-[#1B54D9]" }) },
    { name: 'Próximos', icon: React.createElement(MapPin, { className: "w-8 h-8 text-[#1B54D9]" }) },
  ]
};

export const STORIES: Story[] = [
  { id: '1', name: 'Mercado ...', image: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'Empório d...', image: 'https://picsum.photos/100/100?random=2', isLive: true },
  { id: '3', name: 'Padaria P...', image: 'https://picsum.photos/100/100?random=3' },
];

export const CHANNELS: Channel[] = [
  { id: '1', name: 'ME COZINHA...', image: 'https://picsum.photos/100/100?random=10', followers: '14 mil', verified: false },
  { id: '2', name: 'PENTEADOS 🇧🇷', image: 'https://picsum.photos/100/100?random=11', followers: '134 mil', verified: false },
];

export const STORES: Store[] = [
  {
    id: 'premium-1',
    name: 'Casas Pedro',
    category: 'Alimentação',
    subcategory: 'Mercado',
    image: 'https://picsum.photos/400/250?random=10',
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
  },
  // ... other stores
];

export const LEADS: ServiceLead[] = [
  { id: '1', title: 'Instalação de Ar Condicionado', category: 'Climatização', urgency: 'Alta', priceToUnlock: 3.90, maskedName: 'Carlos M.', district: 'Freguesia' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', storeName: 'Casas Pedro', date: '20 Out 2023', amount: 150.00, cashbackAmount: 7.50, status: 'completed' },
];