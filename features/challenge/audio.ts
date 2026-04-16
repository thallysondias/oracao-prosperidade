import type { ProductLocale } from '@/features/prayers/types';
import { resolveAudioSourceCandidates } from '@/features/prayer-player/utils';

const AVAILABLE_CHALLENGE_AUDIO_DAYS = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15,
]);

const challengeAudioSuffixByLocale: Partial<Record<ProductLocale, string>> = {
  en: 'en',
  fr: 'fr',
};

export function getChallengeAudioSources(day: number, locale: ProductLocale) {
  if (!AVAILABLE_CHALLENGE_AUDIO_DAYS.has(day)) {
    return [];
  }

  const basePath = `/desafio/dia${day}.mp3`;
  const suffix = challengeAudioSuffixByLocale[locale];

  if (suffix) {
    return resolveAudioSourceCandidates([
      `/desafio/dia${day}-${suffix}.mp3`,
      basePath,
    ]);
  }

  return resolveAudioSourceCandidates(basePath);
}
