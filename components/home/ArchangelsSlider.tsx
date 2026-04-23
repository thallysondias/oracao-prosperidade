'use client';

import { useCallback, useEffect, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { archangels } from '@/features/archangels/data';
import type { Locale } from '@/shared/config/locales';

export function ArchangelsSlider() {
  const t = useTranslations('ArchangelsSlider');
  const locale = useLocale() as Locale;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
  });

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
    <section className="px-4 space-y-4 mt-8">
      {/* <div className="text-left mb-4">
        <h2 className="text-xl font-bold dark:text-white">
          {t('title')}
        </h2>
      </div> */}

      <div className="overflow-visible" ref={emblaRef}>
        <div className="flex gap-4">
          {archangels.map((archangel) => (
            <div
              key={archangel.slug}
              className="flex-[0_0_90%] min-w-0 md:flex-[0_0_48%]"
            >
              <div className="relative pt-16 h-full">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Link
                    href={`/${locale}/archangels/${archangel.slug}`}
                    aria-label={t(`items.${archangel.slug}.name`)}
                  >
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white dark:ring-slate-900 transition-transform hover:scale-[1.02]">
                      <Image
                        src={archangel.imageSrc}
                        alt={t(`items.${archangel.slug}.name`)}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  </Link>
                </div>

                <div className="rounded-3xl overflow-hidden bg-linear-to-br from-amber-100 via-yellow-50 to-white dark:from-stone-900 dark:via-stone-950 dark:to-black shadow-lg p-6 pt-8 h-full flex flex-col border border-amber-200/70 dark:border-yellow-500/10">
                  <div className="text-center mt-8 mb-4">
                    <div className="">
                      <span className="inline-flex items-center rounded-full bg-white  px-3 py-1 text-xs  uppercase tracking-tight text-amber-800 dark:text-yellow-400">
                        {t(`items.${archangel.slug}.theme`)}
                      </span>
                    </div>

                    <h3 className="text-xl text-amber-700 dark:text-yellow-500 font-bold mb-2 flex items-center justify-center">
                      {t(`items.${archangel.slug}.name`)}
                    </h3>
                    <div className="h-0.5 w-12 bg-amber-400 rounded-full mx-auto" />
                  </div>

                  <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed text-center mb-4 flex-1 min-h-[72px]">
                    {t(`items.${archangel.slug}.description`)}
                  </p>

                  <Link
                    href={`/${locale}/archangels/${archangel.slug}`}
                    className="mt-auto"
                  >
                    <Button
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg flex items-center justify-center gap-2"
                      size="sm"
                    >
                      <Play className="h-4 w-4" />
                      {t('listen')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 py-4">
        {archangels.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? 'bg-amber-500 w-6'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
