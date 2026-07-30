import {
  CHALLENGE_CHECKOUT_URL,
  CHALLENGE_PRODUCT_NAME,
  getChallengeDayReasons,
  getChallengeDayTitles,
} from '@/features/challenge/data';
import type { DayPrayer } from '@/features/challenge/types';
import type { UserPurchase } from '@/features/auth/types';
import type { ProductLocale } from '@/lib/products/oraciones';

const OPEN_CHALLENGE_PURCHASE: UserPurchase = {
  product_id: 'open-access',
  product_name: CHALLENGE_PRODUCT_NAME,
  transaction_id: 'open-access',
  status: 'approved',
};

export function findChallengePurchase(purchases?: UserPurchase[]) {
  return purchases?.find(
    (purchase) =>
      purchase.product_name === CHALLENGE_PRODUCT_NAME &&
      purchase.status === 'approved'
  ) ?? OPEN_CHALLENGE_PURCHASE;
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

  const today = new Date();
  const unlockedFromDate = purchaseDate ?? today;
  const timeDiff = today.getTime() - unlockedFromDate.getTime();
  const daysSincePurchase = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  return Array.from({ length: 21 }, (_, index) => {
    const dayNumber = index + 1;

    return {
      day: dayNumber,
      title: titles[index],
      reason: reasons[index],
      audioUrl: `/desafio/dia${dayNumber}.mp3`,
      isCompleted: dayNumber < daysSincePurchase,
      isLocked: false,
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
