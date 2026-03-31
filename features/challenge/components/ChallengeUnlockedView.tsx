import Image from 'next/image';
import { CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { CHALLENGE_DAY_CARD_IMAGE, CHALLENGE_HERO_IMAGE } from '@/features/challenge/data';
import type { DayPrayer } from '@/features/challenge/types';

interface ChallengeUnlockedViewProps {
  days: DayPrayer[];
  spiritualDisclaimer: string;
  experienceDisclaimer: string;
  onOpenDay: (day: number, isLocked: boolean) => void;
  onOpenCurrentDay: () => void;
}

export function ChallengeUnlockedView({
  days,
  spiritualDisclaimer,
  experienceDisclaimer,
  onOpenDay,
  onOpenCurrentDay,
}: ChallengeUnlockedViewProps) {
  const t = useTranslations('Challenge21');

  return (
    <div className="mx-auto p-4">
      <div className="relative overflow-hidden -mb-2 rounded-t-3xl ">
        <div className="relative h-80">
          <Image
            src={CHALLENGE_HERO_IMAGE}
            alt="Cardeal Giovanni Battista Re"
            fill
            sizes="100vw"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="space-y-3">
            <h1 className="text-3xl font-serif font-bold drop-shadow-2xl">
              {t('headerTitle')}
            </h1>

            <p className="text-sm text-gray-200 drop-shadow-md">
              {t('headerQuote')}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 bg-black border border-t border-white/30 rounded-b-3xl shadow-xl ">
        <h3 className="text-lg font-semibold text-white">
          {t('challengeTitle')}
        </h3>

        <div className="space-y-3">
          <p className="text-sm text-white/60 leading-relaxed">
            {t('challengeText1')}
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            <span className="font-bold text-yellow-500">{t('challengeCommitmentLabel')}</span>{' '}
            {t('challengeCommitmentText')}
          </p>
          <div className="pt-6 border-t border-amber-200/50">
            <Button
              onClick={onOpenCurrentDay}
              className="bg-yellow-500 w-full hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {t('listenPrayer')}
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="mb-8 text-center mt-8">
          <p className="text-sm text-yellow-700 italic text-center font-medium">
            {t('challengeQuote')}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-linear-to-b from-green-600/40 via-green-500/20 to-transparent" />

        <div className="space-y-6">
          {days.map((prayer) => (
            <div
              key={prayer.day}
              id={`day-${prayer.day}`}
              className="relative flex gap-4"
            >
              <div className="relative z-10 shrink-0">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-bold text-sm transition-all border-2
                    ${prayer.isCompleted
                      ? 'bg-green-700 text-white border-green-600 ring-4 ring-green-600/20'
                      : prayer.isLocked
                        ? 'bg-gray-300 text-gray-500 border-gray-400'
                        : 'bg-green-600 text-white border-green-500 ring-4 ring-green-500/20'}
                  `}
                >
                  {prayer.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : prayer.isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    prayer.day
                  )}
                </div>
              </div>

              <button
                onClick={() => onOpenDay(prayer.day, prayer.isLocked)}
                disabled={prayer.isLocked}
                className={`
                  flex-1 rounded-lg overflow-hidden transition-all relative text-left w-full
                  ${prayer.isLocked
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:scale-[1.02] cursor-pointer'}
                `}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${CHALLENGE_DAY_CARD_IMAGE}')`,
                  }}
                />

                <div
                  className={`
                    absolute inset-0 bg-linear-to-br
                    ${prayer.isLocked
                      ? 'from-gray-400/90 to-gray-500/90'
                      : 'from-green-950/90 to-[#16231A]/90'}
                  `}
                />

                <div className="relative z-10 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-green-400">
                          {t('day')} {prayer.day}
                        </span>
                        {prayer.isCompleted && (
                          <span className="text-xs bg-green-800/60 text-green-300 px-2 py-0.5 rounded-full border border-green-600/30">
                            {t('completed')}
                          </span>
                        )}
                        {!prayer.isLocked && !prayer.isCompleted && (
                          <span className="text-xs bg-yellow-800/60 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-600/30">
                            {t('available')}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-white text-sm drop-shadow-lg">
                        {prayer.title}
                      </h3>
                    </div>

                    <div
                      className={`
                        shrink-0 h-9 w-9 rounded-full p-0 border flex items-center justify-center
                        ${prayer.isLocked
                          ? 'bg-gray-400 border-gray-500'
                          : 'bg-yellow-500/90 border-yellow-400/50'}
                      `}
                    >
                      {prayer.isLocked ? (
                        <Lock className="w-4 h-4 text-gray-700" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-black" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-300/90 leading-relaxed">
                    {prayer.reason}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-700 font-medium">
          {t('motivationalFooter')}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {days.filter((day) => day.isCompleted).length} {t('progressText')}
        </p>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          {spiritualDisclaimer}
        </p>
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          {experienceDisclaimer}
        </p>
      </div>
    </div>
  );
}
