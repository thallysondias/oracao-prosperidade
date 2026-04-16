'use client';

import { useLocale, useTranslations } from 'next-intl';

import Prosperity2026Prayer from '@/components/oracao/Prosperity2026Prayer';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';

export default function Prosperity2026Page() {
  const locale = useLocale();
  const t = useTranslations('Prosperity2026');

  const audioUrl =
    locale === 'es'
      ? '/oracion/prosperidade_2026_es.mp3'
      : locale === 'fr'
        ? '/oracion/prosperidade_2026_fr.mp3'
        : '/oracion/prosperidade_2026_en.mp3';

  return (
    <AudioPrayerPage
      audioSrc={audioUrl}
      imageAlt={t('imageAlt')}
      imageSrc="/prayer/arcanjo2026.png"
      playingLabel={t('playingNow')}
      title={t('title')}
      subtitle={t('subtitle')}
    >
      <Prosperity2026Prayer />
    </AudioPrayerPage>
  );
}
