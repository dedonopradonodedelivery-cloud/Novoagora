import React from 'react';

export enum AdType {
  ORGANIC = 'ORGANIC',
  LOCAL = 'LOCAL',   // R$ 1.90/dia
  PREMIUM = 'PREMIUM' // R$ 3.90/dia - Top of list
}

export interface StoreReview {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  
  // Imagem principal agora é logoUrl
  logoUrl?: string; 
  image?: string; // Mantido apenas para compatibilidade legada se necessário, mas a UI priorizará logoUrl

  rating: number;
  distance: string; // Legacy distance string
  adType: AdType;
  description: string;
  cashback?: number; // Percentage
  isMarketplace?: boolean; // Determines if it appears in "Achadinhos"
  price_original?: number;
  price_current?: number;
  
  // Detailed fields
  address?: string;
  phone?: string;
  hours?: string;
  gallery?: string[];
  reviews?: StoreReview[];
  verified?: boolean;
  
  // New fields for detailed store list
  reviewsCount?: number;
  distanceKm?: number;
  isOpenNow?: boolean;
  closingTime?: string;
  isSponsored?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  slug: string;
}

export interface Story {
  id: string;
  name: string;
  image: string;
  isLive?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  image: string;
  followers: string;
  verified: boolean;
}

export interface ServiceLead {
  id: string;
  title: string; // e.g., "Pintura de Apartamento"
  category: string;
  urgency: 'Baixa' | 'Média' | 'Alta';
  priceToUnlock: number; // Fixed at R$ 3.90 for V1.0
  maskedName: string; // "João S."
  district: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export interface Transaction {
  id: string;
  storeName: string;
  date: string;
  amount: number;
  cashbackAmount: number;
  status: 'completed' | 'pending';
}

export interface LocalTransaction {
  id: string;
  type: 'bonus' | 'purchase';
  value: number;
  source: string; // 'spinwheel' or store name
  date: string; // ISO string
}

export interface LocalUserWallet {
  balance: number;
  transactions: LocalTransaction[];
}

export interface CashbackTransaction {
  id?: string;
  merchant_id: string;
  store_id: string;
  customer_id: string;
  total_amount_cents: number;
  cashback_used_cents: number;
  cashback_to_earn_cents: number; 
  amount_to_pay_now_cents: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  approved_at?: string;
}