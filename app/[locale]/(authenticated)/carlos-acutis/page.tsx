'use client';

import { useLocale, useTranslations } from 'next-intl';

import CarlosAcuti from '@/components/oracao/CarlosAcuti';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';
import { getLocalizedAudioUrl, type ProductLocale } from '@/lib/products/oraciones';

export default function CarlosAcutisPage() {
  const locale = useLocale() as ProductLocale;
  const slider = useTranslations('PrayersSlider');
  const common = useTranslations('SaintBenedict');
  const disclaimer = useTranslations('AppDisclaimer');

  return (
    <AudioPrayerPage
      audioSrc={getLocalizedAudioUrl('/prayer/oracaocarlos.mp3', locale)}
      imageAlt={slider('carlosAcutisTitle')}
      imageSrc="/products/carlo-acutis.jpeg"
      playingLabel={common('playingNow')}
      title={slider('carlosAcutisTitle')}
      disclaimer={disclaimer('spiritualContent')}
    >
      <CarlosAcuti />
    </AudioPrayerPage>
  );
}
