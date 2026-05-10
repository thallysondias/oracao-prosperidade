import type { FeaturedPrayerCard } from '@/features/prayers/types';

const STRIPE_LINKS = {
  padrePio: 'https://donate.stripe.com/9B6cN41SH9lx3NEbwM6kg08',
  carlosAcutis: 'https://donate.stripe.com/6oUbJ0eFtfJV5VMgR66kg03',
  saintBenedict: 'https://donate.stripe.com/6oUcN48h50P16ZQgR66kg07',
} as const;

export const FEATURED_PRAYER_PRODUCT_NAMES = {
  padrePio: 'Padre Pio',
  carlosAcutis: 'Oración de Carlos Acutis',
  saintBenedict: 'Oración de San Benito',
} as const;

function withPrefilledEmail(baseUrl: string, email?: string) {
  if (!email) {
    return baseUrl;
  }

  const url = new URL(baseUrl);
  url.searchParams.set('prefilled_email', email);
  return url.toString();
}

export function getFeaturedPrayerCards(userEmail?: string): FeaturedPrayerCard[] {
  return [
    {
      id: 'padre-pio',
      titleKey: 'padrePioTitle',
      descriptionKey: 'padrePioDescription',
      descriptions: {
        pt: 'Um guia de fe e reflexao inspirado em Padre Pio para quem busca serenidade, consolo e fortalecimento espiritual.',
        es: 'Una guia de fe y reflexion inspirada en Padre Pio para quienes buscan serenidad, consuelo y fortalecimiento espiritual.',
        en: 'A faith and reflection guide inspired by Padre Pio for those seeking serenity, comfort, and spiritual strengthening.',
        fr: 'Un guide de foi et de reflexion inspire par Padre Pio pour ceux qui recherchent serenite, reconfort et renforcement spirituel.',
      },
      image: '/products/padre-pio.jpeg',
      route: '/padre-pio',
      productName: FEATURED_PRAYER_PRODUCT_NAMES.padrePio,
      purchaseUrl: withPrefilledEmail(STRIPE_LINKS.padrePio, userEmail),
    },
    {
      id: 'carlos-acutis',
      titleKey: 'carlosAcutisTitle',
      descriptionKey: 'carlosAcutisDescription',
      descriptions: {
        pt: 'Um guia de fe e reflexao inspirado em Carlo Acutis para momentos de fe, reflexao e inspiracao na vida diaria.',
        es: 'Una guia de fe y reflexion inspirada en Carlo Acutis para momentos de fe, reflexion e inspiracion en la vida diaria.',
        en: 'A faith and reflection guide inspired by Carlo Acutis for moments of faith, reflection, and inspiration in daily life.',
        fr: 'Un guide de foi et de reflexion inspire par Carlo Acutis pour des moments de foi, de reflexion et d inspiration dans la vie quotidienne.',
      },
      image: '/products/carlo-acutis.jpeg',
      route: '/carlos-acutis',
      productName: FEATURED_PRAYER_PRODUCT_NAMES.carlosAcutis,
      purchaseUrl: withPrefilledEmail(STRIPE_LINKS.carlosAcutis, userEmail),
    },
    {
      id: 'saint-benedict',
      titleKey: 'saintBenedictTitle',
      descriptionKey: 'saintBenedictDescription',
      descriptions: {
        pt: 'Um guia de fe e reflexao inspirado em Sao Benedito para momentos de recolhimento, presenca e paz interior.',
        es: 'Una guia de fe y reflexion inspirada en San Benito para momentos de recogimiento, presencia y paz interior.',
        en: 'A faith and reflection guide inspired by Saint Benedict for moments of recollection, presence, and inner peace.',
        fr: 'Un guide de foi et de reflexion inspire par Saint Benoit pour des moments de recueillement, de presence et de paix interieure.',
      },
      image: '/products/san-benedito.jpeg',
      route: '/saint-benedict',
      productName: FEATURED_PRAYER_PRODUCT_NAMES.saintBenedict,
      purchaseUrl: withPrefilledEmail(STRIPE_LINKS.saintBenedict, userEmail),
    },
  ];
}
