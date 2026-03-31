import type { Product, ProductLocale } from '@/features/prayers/types';

export function getLocalizedProductText(product: Product, locale: ProductLocale) {
  switch (locale) {
    case 'pt':
      return {
        title: product.titlePt,
        description: product.descriptionPt,
      };
    case 'es':
      return {
        title: product.titleEs,
        description: product.descriptionEs,
      };
    case 'en':
      return {
        title: product.titleEn,
        description: product.descriptionEn,
      };
    default:
      return {
        title: product.titlePt,
        description: product.descriptionPt,
      };
  }
}
