'use client';

import { useLocale, useTranslations } from 'next-intl';

import PadrePio from '@/components/oracao/PadrePio';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';
import { getLocalizedAudioUrl, type ProductLocale } from '@/lib/products/oraciones';

export default function PadrePioPage() {
  const locale = useLocale() as ProductLocale;
  const slider = useTranslations('PrayersSlider');
  const common = useTranslations('SaintBenedict');
  const disclaimer = useTranslations('AppDisclaimer');

  return (
    <AudioPrayerPage
      audioSrc={getLocalizedAudioUrl('/prayer/padrepio.mp3', locale)}
      imageAlt={slider('padrePioTitle')}
      imageSrc="/products/padre-pio.jpeg"
      playingLabel={common('playingNow')}
      title={slider('padrePioTitle')}
      disclaimer={disclaimer('spiritualContent')}
    >
      <PadrePio />
    </AudioPrayerPage>
  );
}
