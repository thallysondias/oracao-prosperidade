import type { UserPurchase } from '@/features/auth/types';
import type { Locale } from '@/shared/config/locales';

export const DEVOTIONAL_GUIDE_PRODUCT_NAMES = [
  'Guia Devocional',
  'Guia devocional',
  'Devotional Guide',
  'Guía Devocional',
] as const;

export const DEVOTIONAL_GUIDE_PRODUCT_IDS = [
  'prod_guia_devocional',
  'guia-devocional',
] as const;

const DEVOTIONAL_GUIDE_ASSETS = {
  default: {
    coverImageUrl: '/guia-devocional/ebook-cover.jpeg',
    downloadUrl: '/ebook/ebook.pdf',
  },
  en: {
    coverImageUrl: '/guia-devocional/ebook-cover-en.jpeg',
    downloadUrl: '/ebook/ebook-en.pdf',
  },
} as const;

export function getDevotionalGuideAssets(locale: Locale) {
  if (locale === 'en') {
    return DEVOTIONAL_GUIDE_ASSETS.en;
  }

  return DEVOTIONAL_GUIDE_ASSETS.default;
}

export function hasDevotionalGuideAccess(purchases?: UserPurchase[]) {
  if (!purchases?.length) {
    return false;
  }

  return purchases.some((purchase) => {
    if (purchase.status !== 'approved') {
      return false;
    }

    const normalizedProductName = purchase.product_name?.toLowerCase() ?? '';
    const normalizedProductId = purchase.product_id?.toLowerCase() ?? '';

    return (
      DEVOTIONAL_GUIDE_PRODUCT_NAMES.some((name) =>
        normalizedProductName.includes(name.toLowerCase())
      ) ||
      DEVOTIONAL_GUIDE_PRODUCT_IDS.some((id) =>
        normalizedProductId.includes(id.toLowerCase())
      )
    );
  });
}
