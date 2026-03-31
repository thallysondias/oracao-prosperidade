import Image from 'next/image';
import { CheckCircle2, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TestimonialsSlider } from '@/features/challenge/components/TestimonialsSlider';
import { CHALLENGE_HERO_IMAGE } from '@/features/challenge/data';
import { getChallengeCheckoutUrl } from '@/features/challenge/helpers';

interface ChallengeLockedViewProps {
  userEmail?: string;
  spiritualDisclaimer: string;
  experienceDisclaimer: string;
}

export function ChallengeLockedView({
  userEmail,
  spiritualDisclaimer,
  experienceDisclaimer,
}: ChallengeLockedViewProps) {
  const t = useTranslations('Challenge21');

  return (
    <div className="mx-auto p-4">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl">
        <div className="relative h-96">
          <Image
            src={CHALLENGE_HERO_IMAGE}
            alt="Cardeal Giovanni Battista Re"
            fill
            sizes="100vw"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-bold drop-shadow-2xl leading-tight">
              {t('ctaTitle')}
            </h1>
            <p className="text-lg text-gray-200 drop-shadow-lg">
              {t('ctaSubtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8 px-4">
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('ctaHeading')}
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            {t('ctaParagraph1')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            {t('ctaParagraph2')}
          </p>

          <p className="text-lg font-semibold text-yellow-700">
            {t('ctaParagraph3')}
          </p>
        </div>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            {t('ctaBenefitsTitle')}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{t('ctaBenefit1')}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{t('ctaBenefit2')}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{t('ctaBenefit3')}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{t('ctaBenefit4')}</span>
            </li>
          </ul>
        </Card>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            {t('testimonialsTitle')}
          </h3>
          <p className="text-gray-600 text-center mb-6">
            {t('testimonialsSubtitle')}
          </p>

          <TestimonialsSlider />
        </div>

        <div className="text-center space-y-4 py-6">
          <p className="text-base text-gray-600 italic">
            {t('ctaTestimonial')}
          </p>
        </div>

        <div className="space-y-4">
          <a
            href={getChallengeCheckoutUrl(userEmail)}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
              <ShoppingCart className="h-6 w-6" />
              {t('ctaButton')}
            </Button>
          </a>
        </div>

        <div className="space-y-3 pb-2">
          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            {spiritualDisclaimer}
          </p>
          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            {experienceDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
