'use client';

import Image from 'next/image';
import { Download, Lock, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DEVOTIONAL_GUIDE_DOWNLOAD_URL } from '@/features/devotional-guide/constants';

interface DevotionalGuideTabProps {
  hasAccess: boolean;
}

export function DevotionalGuideTab({ hasAccess }: DevotionalGuideTabProps) {
  const t = useTranslations('HomePage');

  return (
    <div className="space-y-6 pb-12">
      <div className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5">
        <div className="relative aspect-16/10 w-full">
          <Image
            src="/guia-devocional/ebook-cover.jpeg"
            alt={t('devotionalGuideImageAlt')}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <Card className="overflow-hidden border-0 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-white shadow-xl">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-2 text-amber-300">
            {hasAccess ? <Sparkles className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            <span className="text-xs font-semibold uppercase tracking-[0.24em]">
              {hasAccess ? t('devotionalGuideUnlockedBadge') : t('devotionalGuideLockedBadge')}
            </span>
          </div>
          <CardTitle className="text-2xl leading-tight sm:text-3xl">
            {t('devotionalGuideTitle')}
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm text-stone-200 sm:text-base">
            {hasAccess
              ? t('devotionalGuideUnlockedDescription')
              : t('devotionalGuideLockedDescription')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-amber-200">
                {t('devotionalGuideBenefitTitle1')}
              </p>
              <p className="mt-2 text-sm text-stone-200">
                {t('devotionalGuideBenefitText1')}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-amber-200">
                {t('devotionalGuideBenefitTitle2')}
              </p>
              <p className="mt-2 text-sm text-stone-200">
                {t('devotionalGuideBenefitText2')}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-amber-200">
                {t('devotionalGuideBenefitTitle3')}
              </p>
              <p className="mt-2 text-sm text-stone-200">
                {t('devotionalGuideBenefitText3')}
              </p>
            </div>
          </div>

          {hasAccess ? (
            <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
              <p className="text-sm leading-6 text-stone-100">
                {t('devotionalGuideUnlockedBody')}
              </p>
              <Button asChild size="lg" className="mt-5 bg-amber-500 text-stone-950 hover:bg-amber-400">
                <a href={DEVOTIONAL_GUIDE_DOWNLOAD_URL} download>
                  <Download className="h-4 w-4" />
                  {t('devotionalGuideDownloadButton')}
                </a>
              </Button>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
              <p className="text-sm leading-6 text-stone-100">
                {t('devotionalGuideLockedBody1')}
              </p>
              <p className="mt-4 text-sm leading-6 text-stone-100">
                {t('devotionalGuideLockedBody2')}
              </p>
              <p className="mt-4 text-sm leading-6 text-stone-100">
                {t('devotionalGuideLockedBody3')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
