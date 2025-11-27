'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Play, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useAuthStore } from '@/store/authStore';

interface PrayerCard {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  route: string;
  productName: string | null; // null = sempre livre
  purchaseUrl?: string;
}



export function PrayersSlider() {
  const t = useTranslations('PrayersSlider');
  const locale = useLocale();
  const hasPurchase = useAuthStore((state) => state.hasPurchase);
  const user = useAuthStore((state) => state.user);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'center',
    skipSnaps: false,
  });


  const prayerCards: PrayerCard[] = [
  {
    id: 'saint-benedict',
    titleKey: 'saintBenedictTitle',
    descriptionKey: 'saintBenedictDescription',
    image: '/prayer/saobenedito.jpeg',
    route: '/saint-benedict',
    productName: null, // Sempre livre (ou pode usar "San Benito Player" se quiser verificar também)
  },
    {
    id: 'carlos-acutis',
    titleKey: 'carlosAcutisTitle',
    descriptionKey: 'carlosAcutisDescription',
    image: '/prayer/carlosacuri.jpeg',
    route: '/carlos-acutis',
/* productName: 'Oração do Carlo Acutis', */
     productName: null, 
    purchaseUrl: `https://buy.stripe.com/6oUbJ0eFtfJV5VMgR66kg03?prefilled_email=${user?.email || ''}`,
  },
  {
    id: 'padre-pio',
    titleKey: 'padrePioTitle',
    descriptionKey: 'padrePioDescription',
    image: '/prayer/padrepio.png',
    route: '/padre-pio',
    productName: 'Oração Padre Pio',
    purchaseUrl: `https://buy.stripe.com/14A6oGcxl9lxckadEU6kg02?prefilled_email=${user?.email || ''}`,
  }

];

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
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="px-4 space-y-4 mt-8">
      {/* Carousel Container */}
      <div className="overflow-visible" ref={emblaRef}>
        <div className="flex gap-4">
          {prayerCards.map((card) => (
            <div
              key={card.id}
              className="flex-[0_0_90%] min-w-0 md:flex-[0_0_48%]"
            >
              {/* Main Card Container with absolute positioned avatar */}
              <div className="relative pt-16 h-full">
                {/* Avatar positioned absolute above */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white dark:ring-slate-900">
                    <img
                      src={card.image}
                      alt={t(card.titleKey)}
                      className="object-cover aspect-square object-top"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="rounded-3xl overflow-hidden bg-linear-to-br from-green-950 to-[#16231A] dark:bg-slate-900 shadow-lg shadow-pulse p-6 pt-8 h-full flex flex-col">
                  {/* Title with underline */}
                  <div className="text-center mt-8 mb-4">
                    <h2 className="text-xl text-yellow-600 font-bold mb-2 min-h-[56px] flex items-center justify-center">
                      {t(card.titleKey)}
                    </h2>
                    <div className="h-0.5 w-12 bg-yellow-500 rounded-full mx-auto" />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/80 leading-relaxed text-center mb-4 flex-1 min-h-[96px]">
                    {t(card.descriptionKey)}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {card.productName === null || hasPurchase(card.productName) ? (
                      // Tem acesso - mostrar botão de ouvir
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
                      // Não tem acesso - mostrar botão de comprar
                      <a href={card.purchaseUrl ? `${card.purchaseUrl.replace('${user?.email || \'\'}', user?.email || '')}` : '#'} target="_blank" rel="noopener noreferrer" className="flex-1">
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

      {/* Dots Navigation */}
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
