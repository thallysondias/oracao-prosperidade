import React from 'react';

import { useLocale } from 'next-intl';

import { PrayerContentView } from '@/features/prayer-content/components/PrayerContentView';
import { padrePioPrayerContent } from '@/features/prayer-content/content/padre-pio';
import { defaultLocale, type Locale } from '@/shared/config/locales';

export const PadrePio: React.FC = () => {
  const locale = (useLocale() as Locale) || defaultLocale;
  const content = padrePioPrayerContent[locale] ?? padrePioPrayerContent.en!;

  return <PrayerContentView content={content} />;
};

export default PadrePio;
