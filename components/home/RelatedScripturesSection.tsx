'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ProductCard } from './ProductCard';
import { getLocalizedAudioUrl, products as prayerProducts, type ProductLocale } from '@/lib/products/oraciones';

interface RelatedScripturesProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  isLocked: boolean;
  daysCount?: number;
  duration?: string;
  tags?: string[];
  audioUrl?: string;
}

interface RelatedScripturesSectionProps {
  products: RelatedScripturesProduct[];
  onProductClick?: (productId: number, audioUrl?: string) => void;
}

export function RelatedScripturesSection({
  products,
  onProductClick,
}: RelatedScripturesSectionProps) {
  const t = useTranslations('HomePage');
  const locale = useLocale() as ProductLocale;

  return (
    <div className="px-4 space-y-4">
      <h2 className="text-xl font-bold">{t('products')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {products.map((product) => {
          const sourceProduct = prayerProducts.find(
            (prayerProduct) => Number(prayerProduct.id.split('_')[1]) === product.id,
          );
          const localizedAudioUrl = getLocalizedAudioUrl(
            product.audioUrl ?? sourceProduct?.audioUrl,
            locale,
          );

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              isLocked={product.isLocked}
              duration={product.duration}
              tags={product.tags}
              onClick={() => {
                onProductClick?.(product.id, localizedAudioUrl);
                console.log(`Clicked: ${product.title}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
