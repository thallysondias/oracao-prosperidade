import type { UserPurchase } from '@/features/auth/types';

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

export const DEVOTIONAL_GUIDE_DOWNLOAD_URL = '/guia-devocional/ebook.pdf';

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
