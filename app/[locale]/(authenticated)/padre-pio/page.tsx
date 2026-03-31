'use client';

import { useLocale, useTranslations } from 'next-intl';

import PadrePio from '@/components/oracao/PadrePio';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';
import { getLocalizedAudioUrl, type ProductLocale } from '@/lib/products/oraciones';

export default function PadrePioPage() {
  const locale = useLocale() as ProductLocale;
  const t = useTranslations('SaintBenedict');
  const disclaimer = useTranslations('AppDisclaimer');

  return (
    <AudioPrayerPage
      audioSrc={getLocalizedAudioUrl('/prayer/padrepio.mp3', locale)}
      imageAlt={t('title')}
      imageSrc="/prayer/padrepio.png"
      playingLabel={t('playingNow')}
      title="Oración al Padre Pio"
      disclaimer={disclaimer('spiritualContent')}
    >
      <PadrePio />
    </AudioPrayerPage>
  );
}
