import React from 'react';

import { useLocale } from 'next-intl';

import { PrayerContentView } from '@/features/prayer-content/components/PrayerContentView';
import { padrePioPrayerContent } from '@/features/prayer-content/content/padre-pio';
import { defaultLocale } from '@/shared/config/locales';

export const PadrePio: React.FC = () => {
  const locale = (useLocale() as 'pt' | 'es' | 'en') || defaultLocale;

  return <PrayerContentView content={padrePioPrayerContent[locale]} />;
};

export default PadrePio;
