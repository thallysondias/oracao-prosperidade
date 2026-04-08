import {
  CHALLENGE_CHECKOUT_URL,
  CHALLENGE_PRODUCT_NAME,
  getChallengeDayReasons,
  getChallengeDayTitles,
} from '@/features/challenge/data';
import type { DayPrayer } from '@/features/challenge/types';
import type { UserPurchase } from '@/features/auth/types';
import type { ProductLocale } from '@/lib/products/oraciones';

export function findChallengePurchase(purchases?: UserPurchase[]) {
  return purchases?.find(
    (purchase) =>
      purchase.product_name === CHALLENGE_PRODUCT_NAME &&
      purchase.status === 'approved'
  );
}

export function getChallengePurchaseDate(purchases?: UserPurchase[]) {
  const purchase = findChallengePurchase(purchases);

  if (!purchase?.purchased_at) {
    return undefined;
  }

  return new Date(purchase.purchased_at);
}

export function generateChallengeDays(locale: ProductLocale, purchaseDate?: Date): DayPrayer[] {
  const titles = getChallengeDayTitles(locale);
  const reasons = getChallengeDayReasons(locale);

  if (!purchaseDate) {
    return Array.from({ length: 21 }, (_, index) => ({
      day: index + 1,
      title: titles[index],
      reason: reasons[index],
      audioUrl: `/desafio/dia${index + 1}.mp3`,
      isCompleted: false,
      isLocked: true,
    }));
  }

  const today = new Date();
  const timeDiff = today.getTime() - purchaseDate.getTime();
  const daysSincePurchase = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  return Array.from({ length: 21 }, (_, index) => {
    const dayNumber = index + 1;

    return {
      day: dayNumber,
      title: titles[index],
      reason: reasons[index],
      audioUrl: `/desafio/dia${dayNumber}.mp3`,
      isCompleted: dayNumber < daysSincePurchase,
      isLocked: dayNumber > daysSincePurchase,
    };
  });
}

export function getCurrentChallengeDay(days: DayPrayer[]) {
  return days.find((day) => !day.isCompleted && !day.isLocked)?.day || 1;
}

export function getChallengeCheckoutUrl(email?: string) {
  if (!email) {
    return CHALLENGE_CHECKOUT_URL;
  }

  const url = new URL(CHALLENGE_CHECKOUT_URL);
  url.searchParams.set('prefilled_email', email);
  return url.toString();
}
