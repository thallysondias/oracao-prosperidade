"use client";

import { useMemo } from "react";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { useAuthStore } from "@/store/authStore";
import { ChallengeLockedView } from "@/features/challenge/components/ChallengeLockedView";
import { ChallengeUnlockedView } from "@/features/challenge/components/ChallengeUnlockedView";
import {
  findChallengePurchase,
  generateChallengeDays,
  getChallengePurchaseDate,
  getCurrentChallengeDay,
} from "@/features/challenge/helpers";

export function Challenge21Days() {
  const disclaimer = useTranslations("AppDisclaimer");
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const locale = useLocale();

  const challengePurchase = useMemo(
    () => findChallengePurchase(user?.purchases),
    [user?.purchases]
  );

  const purchaseDate = useMemo(
    () => getChallengePurchaseDate(user?.purchases),
    [user?.purchases]
  );

  const hasPurchased = !!challengePurchase;
  const days = useMemo(() => generateChallengeDays(locale as "pt" | "en" | "es", purchaseDate), [locale, purchaseDate]);
  const currentChallengeDay = useMemo(
    () => getCurrentChallengeDay(days),
    [days]
  );

  const handleDayClick = (day: number, isLocked: boolean) => {
    if (!isLocked) {
      router.push(`/${locale}/challenge/${day}`);
    }
  };

  if (!hasPurchased) {
    return (
      <ChallengeLockedView
        userEmail={user?.email}
        spiritualDisclaimer={disclaimer("spiritualContent")}
        experienceDisclaimer={disclaimer("challengeExperience")}
      />
    );
  }

  return (
    <ChallengeUnlockedView
      days={days}
      spiritualDisclaimer={disclaimer("spiritualContent")}
      experienceDisclaimer={disclaimer("challengeExperience")}
      onOpenDay={handleDayClick}
      onOpenCurrentDay={() => router.push(`/${locale}/challenge/${currentChallengeDay}`)}
    />
  );
}
