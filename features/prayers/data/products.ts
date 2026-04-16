import type { Product, ProductLocale } from '@/features/prayers/types';

const localizedAudioSuffixByLocale: Partial<Record<ProductLocale, string>> = {
  en: 'en',
  fr: 'fr',
};

export function getLocalizedAudioUrl(
  audioUrl: string | undefined,
  locale: ProductLocale,
) {
  if (!audioUrl) {
    return undefined;
  }

  const suffix = localizedAudioSuffixByLocale[locale];

  if (!suffix) {
    return audioUrl;
  }

  return audioUrl.replace(/(\.[^.]+)$/i, `-${suffix}$1`);
}

export function getProductAudioUrl(product: Product, locale: ProductLocale) {
  return getLocalizedAudioUrl(product.audioUrl, locale);
}

export const products: Product[] = [
  {
    id: 'prayer_001',
    titlePt: 'Oracao para serenidade interior',
    titleEn: 'Prayer for inner calm',
    titleEs: 'Oracion para la serenidad interior',
    titleFr: 'Priere pour la serenite interieure',
    descriptionPt:
      'Um momento de oracao e recolhimento para cultivar presenca, calma e equilibrio.',
    descriptionEn:
      'A prayer moment to cultivate presence, calm, and spiritual balance.',
    descriptionEs:
      'Un momento de oracion y recogimiento para cultivar presencia, calma y equilibrio.',
    descriptionFr:
      'Un moment de priere et de recueillement pour cultiver presence, calme et equilibre.',
    tagsPt: ['Serenidade'],
    tagsEn: ['Calm'],
    tagsEs: ['Serenidad'],
    tagsFr: ['Serenite'],
    durationMinutes: 11,
    image: '/oracion/saude.jpg',
    audioUrl: '/oracion/ENFERMEDAD.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=NQHLpSWVQT4',
    isLocked: false,
  },
  {
    id: 'prayer_002',
    titlePt: 'Oracao para paz e direcao',
    titleEn: 'Prayer for peace and direction',
    titleEs: 'Oracion para paz y direccion',
    titleFr: 'Priere pour la paix et la direction',
    descriptionPt:
      'Uma oracao para momentos de busca interior, confianca e discernimento.',
    descriptionEn:
      'A prayer for moments of inner seeking, trust, and discernment.',
    descriptionEs:
      'Una oracion para momentos de busqueda interior, confianza y discernimiento.',
    descriptionFr:
      'Une priere pour des moments de recherche interieure, de confiance et de discernement.',
    tagsPt: ['Paz', 'Direcao'],
    tagsEn: ['Peace', 'Direction'],
    tagsEs: ['Paz', 'Direccion'],
    tagsFr: ['Paix', 'Direction'],
    durationMinutes: 8,
    image: '/oracion/dinheiro.jpg',
    audioUrl: '/oracion/DINERO.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=TE6zAdzAd2o',
    isLocked: false,
  },
  {
    id: 'prayer_003',
    titlePt: 'Oracao para a vida afetiva',
    titleEn: 'Prayer for emotional life',
    titleEs: 'Oracion para la vida afectiva',
    titleFr: 'Priere pour la vie affective',
    descriptionPt:
      'Uma oracao para refletir sobre vinculos, acolhimento e cuidado nas relacoes.',
    descriptionEn:
      'A prayer to reflect on bonds, kindness, and care in relationships.',
    descriptionEs:
      'Una oracion para reflexionar sobre vinculos, afecto y cuidado en las relaciones.',
    descriptionFr:
      'Une priere pour reflechir aux liens, a la bienveillance et au soin dans les relations.',
    tagsPt: ['Afeto', 'Relacoes'],
    tagsEn: ['Affection', 'Relationships'],
    tagsEs: ['Afecto', 'Relaciones'],
    tagsFr: ['Affection', 'Relations'],
    durationMinutes: 3,
    image: '/oracion/relacionamento.jpg',
    audioUrl: '/oracion/AMOR.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=o9KVk5wuBhM',
    isLocked: false,
  },
  {
    id: 'prayer_004',
    titlePt: 'Oracao para confianca espiritual',
    titleEn: 'Prayer for spiritual confidence',
    titleEs: 'Oracion para confianza espiritual',
    titleFr: 'Priere pour la confiance spirituelle',
    descriptionPt:
      'Uma oracao para quem busca recolhimento, fe e paz interior no dia a dia.',
    descriptionEn:
      'A prayer for those seeking reflection, faith, and inner peace in daily life.',
    descriptionEs:
      'Una oracion para quienes buscan recogimiento, fe y paz interior en el dia a dia.',
    descriptionFr:
      'Une priere pour ceux qui recherchent recueillement, foi et paix interieure au quotidien.',
    tagsPt: ['Fe'],
    tagsEn: ['Faith'],
    tagsEs: ['Fe'],
    tagsFr: ['Foi'],
    durationMinutes: 4,
    image: '/oracion/protecao.jpg',
    audioUrl: '/oracion/BRUJERIA.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=lmHMMdeBtYY',
    isLocked: false,
  },
];
