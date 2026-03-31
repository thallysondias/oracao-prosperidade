'use client';

import { useLocale, useTranslations } from 'next-intl';

import SanBenitoPrayer from '@/components/oracao/SanBenitoPrayer';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';
import { getLocalizedAudioUrl, type ProductLocale } from '@/lib/products/oraciones';

export default function SanBenitoPage() {
  const locale = useLocale() as ProductLocale;
  const t = useTranslations('SaintBenedict');

  return (
    <AudioPrayerPage
      audioSrc={getLocalizedAudioUrl('/prayer/saobenedicto.mp3', locale)}
      imageAlt="San Benito"
      imageSrc="/prayer/saobenedito.jpeg"
      playingLabel={t('playingNow')}
      title="Oración a San Benito"
      subtitle="Santo de la Prosperidad"
    >
      <SanBenitoPrayer />
    </AudioPrayerPage>
  );
}
