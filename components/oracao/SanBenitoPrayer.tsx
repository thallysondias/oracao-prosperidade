import React from 'react';

import { useLocale } from 'next-intl';

import { PrayerContentView } from '@/features/prayer-content/components/PrayerContentView';
import { sanBenitoPrayerContent } from '@/features/prayer-content/content/san-benito';
import { defaultLocale, type Locale } from '@/shared/config/locales';

export const SanBenitoPrayer: React.FC = () => {
  const locale = (useLocale() as Locale) || defaultLocale;
  const content = sanBenitoPrayerContent[locale] ?? sanBenitoPrayerContent.en!;

  return <PrayerContentView content={content} />;
};

export default SanBenitoPrayer;
