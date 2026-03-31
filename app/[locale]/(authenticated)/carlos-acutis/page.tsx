'use client';

import { useLocale, useTranslations } from 'next-intl';

import CarlosAcuti from '@/components/oracao/CarlosAcuti';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';
import { getLocalizedAudioUrl, type ProductLocale } from '@/lib/products/oraciones';

export default function CarlosAcutisPage() {
  const locale = useLocale() as ProductLocale;
  const t = useTranslations('SaintBenedict');
  const disclaimer = useTranslations('AppDisclaimer');

  return (
    <AudioPrayerPage
      audioSrc={getLocalizedAudioUrl('/prayer/oracaocarlos.mp3', locale)}
      imageAlt="Carlos Acutis"
      imageSrc="/prayer/carlosacuri.jpeg"
      playingLabel={t('playingNow')}
      title="Oración al Ángel de mi Guarda"
      disclaimer={disclaimer('spiritualContent')}
    >
      <CarlosAcuti />
    </AudioPrayerPage>
  );
}
