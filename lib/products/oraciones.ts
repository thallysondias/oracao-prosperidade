export interface Product {
  id: string;
  titlePt: string;
  titleEn: string;
  titleEs: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs: string;
  tagsPt: string[];
  tagsEn: string[];
  tagsEs: string[];
  durationMinutes: number;
  image?: string;
  youtubeUrl?: string;
  audioUrl?: string;
  isLocked: boolean;
}

export type ProductLocale = 'pt' | 'en' | 'es';

export function getLocalizedAudioUrl(
  audioUrl: string | undefined,
  locale: ProductLocale,
) {
  if (!audioUrl) {
    return undefined;
  }

  if (locale !== 'en') {
    return audioUrl;
  }

  return audioUrl.replace(/(\.[^.]+)$/i, '-en.mp3');
}

export function getProductAudioUrl(product: Product, locale: ProductLocale) {
  return getLocalizedAudioUrl(product.audioUrl, locale);
}

export const products: Product[] = [
  {
    id: "prayer_001",
    titlePt: "Oracao para serenidade interior",
    titleEn: "Prayer for inner calm",
    titleEs: "Oracion para la serenidad interior",
    descriptionPt: "Um momento de oracao e recolhimento para cultivar presenca, calma e equilibrio.",
    descriptionEn: "A prayer moment to cultivate presence, calm, and spiritual balance.",
    descriptionEs: "Un momento de oracion y recogimiento para cultivar presencia, calma y equilibrio.",
    tagsPt: ["Serenidade"],
    tagsEn: ["Calm"],
    tagsEs: ["Serenidad"],
    durationMinutes: 11,
    image: "/oracion/saude.jpg",
    audioUrl: "/oracion/ENFERMEDAD.mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=NQHLpSWVQT4",
    isLocked: false,
  },
  {
    id: "prayer_002",
    titlePt: "Oracao para paz e direcao",
    titleEn: "Prayer for peace and direction",
    titleEs: "Oracion para paz y direccion",
    descriptionPt: "Uma oracao para momentos de busca interior, confianca e discernimento.",
    descriptionEn: "A prayer for moments of inner seeking, trust, and discernment.",
    descriptionEs: "Una oracion para momentos de busqueda interior, confianza y discernimiento.",
    tagsPt: ["Paz", "Direcao"],
    tagsEn: ["Peace", "Direction"],
    tagsEs: ["Paz", "Direccion"],
    durationMinutes: 8,
    image: "/oracion/dinheiro.jpg",
    audioUrl: "/oracion/DINERO.mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=TE6zAdzAd2o",
    isLocked: false,
  },
  {
    id: "prayer_003",
    titlePt: "Oracao para a vida afetiva",
    titleEn: "Prayer for emotional life",
    titleEs: "Oracion para la vida afectiva",
    descriptionPt: "Uma oracao para refletir sobre vinculos, acolhimento e cuidado nas relacoes.",
    descriptionEn: "A prayer to reflect on bonds, kindness, and care in relationships.",
    descriptionEs: "Una oracion para reflexionar sobre vinculos, afecto y cuidado en las relaciones.",
    tagsPt: ["Afeto", "Relacoes"],
    tagsEn: ["Affection", "Relationships"],
    tagsEs: ["Afecto", "Relaciones"],
    durationMinutes: 3,
    image: "/oracion/relacionamento.jpg",
    audioUrl: "/oracion/AMOR.mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=o9KVk5wuBhM",
    isLocked: false,
  },
  {
    id: "prayer_004",
    titlePt: "Oracao para confianca espiritual",
    titleEn: "Prayer for spiritual confidence",
    titleEs: "Oracion para confianza espiritual",
    descriptionPt: "Uma oracao para quem busca recolhimento, fe e paz interior no dia a dia.",
    descriptionEn: "A prayer for those seeking reflection, faith, and inner peace in daily life.",
    descriptionEs: "Una oracion para quienes buscan recogimiento, fe y paz interior en el dia a dia.",
    tagsPt: ["Fe"],
    tagsEn: ["Faith"],
    tagsEs: ["Fe"],
    durationMinutes: 4,
    image: "/oracion/protecao.jpg",
    audioUrl: "/oracion/BRUJERIA.mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=lmHMMdeBtYY",
    isLocked: false,
  },
];
