import { resolveAudioSourceCandidates } from '@/features/prayer-player/utils';
import type { ProductLocale } from '@/features/prayers/types';

const archangelAudioSuffixByLocale: Partial<Record<ProductLocale, string>> = {
  en: 'en',
  fr: 'fr',
};

export const archangels = [
  {
    slug: 'gabriel',
    imageSrc: '/archangels/gabriel/avatar.png',
    letterSrc: '/archangels/gabriel/letter.png',
  },
  {
    slug: 'michael',
    imageSrc: '/archangels/michael/avatar.png',
    letterSrc: '/archangels/michael/letter.png',
  },
  {
    slug: 'raphael',
    imageSrc: '/archangels/raphael/avatar.png',
    letterSrc: '/archangels/raphael/letter.png',
  },
  {
    slug: 'uriel',
    imageSrc: '/archangels/uriel/avatar.png',
    letterSrc: '/archangels/uriel/letter.png',
  },
] as const;

export type ArchangelSlug = (typeof archangels)[number]['slug'];

export function getArchangelBySlug(slug: string) {
  return archangels.find((archangel) => archangel.slug === slug);
}

export function getArchangelAudioSources(
  slug: ArchangelSlug,
  locale: ProductLocale
) {
  const basePath = `/archangels/${slug}/audio.mp3`;
  const legacyPath = `/archangels/${slug}/vibration.mp3`;
  const suffix = archangelAudioSuffixByLocale[locale];

  if (suffix) {
    return resolveAudioSourceCandidates([
      `/archangels/${slug}/audio-${suffix}.mp3`,
      basePath,
      legacyPath,
    ]);
  }

  return resolveAudioSourceCandidates([basePath, legacyPath]);
}
