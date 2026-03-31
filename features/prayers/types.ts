import type { Locale } from '@/shared/config/locales';

export interface Product {
  id: string;
  titlePt: string;
  titleEn: string;
  titleEs: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs: string;
  tagsPt: string[];
  tagsEn: string[];
  tagsEs: string[];
  durationMinutes: number;
  image?: string;
  youtubeUrl?: string;
  audioUrl?: string;
  isLocked: boolean;
}

export type ProductLocale = Locale;

export interface FeaturedPrayerCard {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  descriptions?: Record<ProductLocale, string>;
  image: string;
  route: string;
  productName: string | null;
  purchaseUrl: string;
}
