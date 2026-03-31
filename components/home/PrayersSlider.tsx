'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import { Heart, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { getFeaturedPrayerCards } from '@/features/prayers/data/featured-prayers';
import type { ProductLocale } from '@/features/prayers/types';
import { useAuthStore } from '@/store/authStore';

export function PrayersSlider() {
  const t = useTranslations('PrayersSlider');
  const locale = useLocale() as ProductLocale;
  const hasPurchase = useAuthStore((state) => state.hasPurchase);
  const user = useAuthStore((state) => state.user);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
  });

  const prayerCards = useMemo(
    () => getFeaturedPrayerCards(user?.email),
    [user?.email]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="px-4 space-y-4 mt-8">
      <div className="overflow-visible" ref={emblaRef}>
        <div className="flex gap-4">
          {prayerCards.map((card) => (
            <div
              key={card.id}
              className="flex-[0_0_90%] min-w-0 md:flex-[0_0_48%]"
            >
              <div className="relative pt-16 h-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white dark:ring-slate-900">
                    <Image
                      src={card.image}
                      alt={t(card.titleKey)}
                      fill
                      sizes="128px"
                      className="object-cover aspect-square object-top"
                    />
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden bg-linear-to-br from-green-950 to-[#16231A] dark:bg-slate-900 shadow-lg shadow-pulse p-6 pt-8 h-full flex flex-col">
                  <div className="text-center mt-8 mb-4">
                    <h2 className="text-xl text-yellow-600 font-bold mb-2 min-h-[56px] flex items-center justify-center">
                      {t(card.titleKey)}
                    </h2>
                    <div className="h-0.5 w-12 bg-yellow-500 rounded-full mx-auto" />
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed text-center mb-4 flex-1 min-h-[96px]">
                    {card.descriptions?.[locale] || t(card.descriptionKey || '')}
                  </p>

                  <div className="flex gap-3 mt-auto">
                    {card.productName === null || hasPurchase(card.productName) ? (
                      <Link href={`/${locale}${card.route}`} className="flex-1">
                        <Button
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg flex items-center justify-center gap-2"
                          size="sm"
                        >
                          <Play className="h-4 w-4" />
                          {t('listenPrayer')}
                        </Button>
                      </Link>
                    ) : (
                      <a
                        href={card.purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                          size="sm"
                        >
                          <Heart className="h-4 w-4" />
                          {t('buyPrayer')}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 py-4">
        {prayerCards.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? 'bg-yellow-500 w-6'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
