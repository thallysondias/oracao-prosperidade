import React from 'react';

import { useLocale } from 'next-intl';

import { PrayerContentView } from '@/features/prayer-content/components/PrayerContentView';
import { sanBenitoPrayerContent } from '@/features/prayer-content/content/san-benito';
import { defaultLocale } from '@/shared/config/locales';

export const SanBenitoPrayer: React.FC = () => {
  const locale = (useLocale() as 'pt' | 'es' | 'en') || defaultLocale;

  return <PrayerContentView content={sanBenitoPrayerContent[locale]} />;
};

export default SanBenitoPrayer;
