'use client';

import { useTranslations } from 'next-intl';
import { ProductCard } from './ProductCard';

interface RelatedScripturesProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  isLocked: boolean;
  daysCount?: number;
  duration?: string;
  tags?: string[];
}

interface RelatedScripturesSectionProps {
  products: RelatedScripturesProduct[];
  onProductClick?: (productId: number) => void;
}

export function RelatedScripturesSection({
  products,
  onProductClick,
}: RelatedScripturesSectionProps) {
  const t = useTranslations('HomePage');

  return (
    <div className="px-4 space-y-4">
      <h2 className="text-xl font-bold">{t('products')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            isLocked={product.isLocked}
            duration={product.duration}
            tags={product.tags}
            onClick={() => {
              onProductClick?.(product.id);
              console.log(`Clicked: ${product.title}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
