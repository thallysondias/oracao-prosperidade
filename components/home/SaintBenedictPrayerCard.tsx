'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Share2, Clock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function SaintBenedictPrayerCard() {
  const t = useTranslations('SaintBenedict');
  const locale = useLocale();
  const [isFavorited, setIsFavorited] = useState(false);

  const image = '/products/saobenedito.jpeg';


  return (
    <div className="px-4 space-y-4 mt-8">
      {/* Main Card Container with absolute positioned avatar */}
      <div className="relative pt-16">
        {/* Avatar positioned absolute above */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white dark:ring-slate-900">
            <img
              src={image}
              alt={t('title')}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="rounded-3xl overflow-hidden bg-linear-to-br from-green-950 to-[#16231A] dark:bg-slate-900 shadow-lg shadow-pulse p-6 pt-8">
          {/* Title with underline */}
          <div className="text-center mt-8 mb-4">
            <h2 className="text-xl text-yellow-600 font-bold mb-2">
              {t('title')}
            </h2>
            <div className="h-0.5 w-12 bg-yellow-500 rounded-full mx-auto" />
          </div>

          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed text-center mb-4">
            {t('cardDescription')}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link href={`/${locale}/saint-benedict`} className="flex-1">
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg flex items-center justify-center gap-2"
                size="sm"
              >
                <Play className="h-4 w-4" />
                {t('listenPrayer')}
              </Button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}
