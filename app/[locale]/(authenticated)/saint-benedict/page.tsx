'use client';

import { useLocale, useTranslations } from 'next-intl';

import SanBenitoPrayer from '@/components/oracao/SanBenitoPrayer';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';
import { getLocalizedAudioUrl, type ProductLocale } from '@/lib/products/oraciones';

export default function SaintBenedictPage() {
  const locale = useLocale() as ProductLocale;
  const t = useTranslations('SaintBenedict');
  const disclaimer = useTranslations('AppDisclaimer');

  return (
    <AudioPrayerPage
      audioSrc={getLocalizedAudioUrl('/prayer/saobenedicto.mp3', locale)}
      imageAlt={t('title')}
      imageSrc="/products/saobenedito.jpeg"
      playingLabel={t('playingNow')}
      title={t('title')}
      disclaimer={disclaimer('spiritualContent')}
    >
      <SanBenitoPrayer />
    </AudioPrayerPage>
  );
}
