import React from 'react';

import { useLocale } from 'next-intl';

import { PrayerContentView } from '@/features/prayer-content/components/PrayerContentView';
import { carloAcutisPrayerContent } from '@/features/prayer-content/content/carlo-acutis';
import { defaultLocale } from '@/shared/config/locales';

export const CarlosAcuti: React.FC = () => {
  const locale = (useLocale() as 'pt' | 'es' | 'en') || defaultLocale;

  return <PrayerContentView content={carloAcutisPrayerContent[locale]} />;
};

export default CarlosAcuti;
