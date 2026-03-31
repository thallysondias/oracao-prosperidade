'use client';

import { useLocale, useTranslations } from 'next-intl';

import PadrePio from '@/components/oracao/PadrePio';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';
import { getLocalizedAudioUrl, type ProductLocale } from '@/lib/products/oraciones';

export default function PadrePioPage() {
  const locale = useLocale() as ProductLocale;
  const t = useTranslations('SaintBenedict');

  return (
    <AudioPrayerPage
      audioSrc={getLocalizedAudioUrl('/prayer/padrepio.mp3', locale)}
      imageAlt="Padre Pío"
      imageSrc="/prayer/padrepio.png"
      playingLabel={t('playingNow')}
      title="Oración al Padre Pío"
      subtitle="Santo de los Estigmas"
    >
      <PadrePio />
    </AudioPrayerPage>
  );
}
