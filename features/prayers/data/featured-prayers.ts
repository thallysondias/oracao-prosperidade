import type { FeaturedPrayerCard } from '@/features/prayers/types';

const STRIPE_LINKS = {
  padrePio: 'https://donate.stripe.com/9B6cN41SH9lx3NEbwM6kg08',
  carlosAcutis: 'https://donate.stripe.com/6oUbJ0eFtfJV5VMgR66kg03',
  saintBenedict: 'https://donate.stripe.com/6oUcN48h50P16ZQgR66kg07',
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
        pt: 'Uma oração inspirada na devoção ao Padre Pio para quem busca fé, consolo e fortalecimento espiritual.',
        es: 'Una oración inspirada en la devoción al Padre Pío para quienes buscan fe, consuelo y fortalecimiento espiritual.',
        en: 'A prayer inspired by devotion to Padre Pio for those seeking faith, comfort, and spiritual strengthening.',
      },
      image: '/prayer/padrepio.png',
      route: '/padre-pio',
      productName: null,
      purchaseUrl: withPrefilledEmail(STRIPE_LINKS.padrePio, userEmail),
    },
    {
      id: 'carlos-acutis',
      titleKey: 'carlosAcutisTitle',
      descriptionKey: 'carlosAcutisDescription',
      descriptions: {
        pt: 'Uma oração inspirada em Carlo Acutis para momentos de fé, reflexão e inspiração na vida diária.',
        es: 'Una oración inspirada en Carlos Acutis para momentos de fe, reflexión e inspiración en la vida diaria.',
        en: 'A prayer inspired by Carlo Acutis for moments of faith, reflection, and inspiration in daily life.',
      },
      image: '/prayer/carlosacuri.jpeg',
      route: '/carlos-acutis',
      productName: null,
      purchaseUrl: withPrefilledEmail(STRIPE_LINKS.carlosAcutis, userEmail),
    },
    {
      id: 'saint-benedict',
      titleKey: 'saintBenedictTitle',
      descriptionKey: 'saintBenedictDescription',
      descriptions: {
        pt: 'Uma oração inspirada em São Bento para momentos de fé, reflexão e paz interior.',
        es: 'Una oración inspirada en San Benito para momentos de fe, reflexión y paz interior.',
        en: 'A prayer inspired by Saint Benedict for moments of faith, reflection, and inner peace.',
      },
      image: '/prayer/saobenedito.jpeg',
      route: '/saint-benedict',
      productName: 'San Benito Player',
      purchaseUrl: withPrefilledEmail(STRIPE_LINKS.saintBenedict, userEmail),
    },
  ];
}
