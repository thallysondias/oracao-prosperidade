import React from 'react';

import { useLocale } from 'next-intl';

import { PrayerContentView } from '@/features/prayer-content/components/PrayerContentView';
import { carloAcutisPrayerContent } from '@/features/prayer-content/content/carlo-acutis';
import { defaultLocale, type Locale } from '@/shared/config/locales';

export const CarlosAcuti: React.FC = () => {
  const locale = (useLocale() as Locale) || defaultLocale;
  const content = carloAcutisPrayerContent[locale] ?? carloAcutisPrayerContent.en!;

  return <PrayerContentView content={content} />;
};

export default CarlosAcuti;
