import { resolveAudioSourceCandidates } from '@/features/prayer-player/utils';
import type { ProductLocale } from '@/features/prayers/types';

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
  void locale;
  return resolveAudioSourceCandidates(`/archangels/${slug}/vibration.mp3`);
}
