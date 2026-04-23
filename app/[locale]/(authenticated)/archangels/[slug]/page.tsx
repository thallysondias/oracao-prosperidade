'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import {
  getArchangelAudioSources,
  getArchangelBySlug,
  type ArchangelSlug,
} from '@/features/archangels/data';
import { AudioPrayerPage } from '@/features/prayer-player/components/AudioPrayerPage';
import type { ProductLocale } from '@/features/prayers/types';

export default function ArchangelPage() {
  const params = useParams<{ slug: string }>();
  const locale = useLocale() as ProductLocale;
  const t = useTranslations('ArchangelPage');
  const archangel = getArchangelBySlug(params.slug);

  if (!archangel) {
    notFound();
  }

  const slug = archangel.slug as ArchangelSlug;

  return (
    <AudioPrayerPage
      audioSrc={getArchangelAudioSources(slug, locale)}
      imageAlt={t(`items.${slug}.avatarAlt`)}
      imageSrc={archangel.imageSrc}
      playingLabel={t('playingNow')}
      subtitle={t(`items.${slug}.theme`)}
      title={t(`items.${slug}.name`)}
      disclaimer={t('disclaimer')}
    >
      <section className="max-w-2xl mx-auto px-4 pb-10">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-white">{t('letterTitle')}</h2>
        </div>

        <div className="rounded-3xl overflow-hidden border border-yellow-500/20 shadow-2xl bg-white/5">
          <Image
            src={archangel.letterSrc}
            alt={t(`items.${slug}.letterAlt`)}
            width={1200}
            height={1600}
            className="w-full h-auto"
          />
        </div>
      </section>
    </AudioPrayerPage>
  );
}
