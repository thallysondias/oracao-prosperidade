'use client';

import Link from 'next/link';
import { User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type HomeTabs = 'today' | 'guia-devocional' | 'challenge-21' | 'prayer-request';

interface HeaderProps {
  userName: string;
  activeTab: HomeTabs;
  onTabChange: (tab: HomeTabs) => void;
}

export function Header({
  userName,
  activeTab,
  onTabChange,
}: HeaderProps) {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const profileHref = `/${locale}/profile`;

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{userName}</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            prefetch
            href={profileHref}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center transition hover:bg-muted/80"
            aria-label={t('profileTab')}
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="px-4">
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as HomeTabs)}>
          <div className="overflow-x-auto scrollbar-hide">
            <TabsList className="flex min-w-max gap-2">
              <TabsTrigger value="today">{t('prayers')}</TabsTrigger>
              <TabsTrigger value="guia-devocional">{t('devotionalGuideTab')}</TabsTrigger>
              <TabsTrigger value="challenge-21">{t('challenge21Days')}</TabsTrigger>
              <TabsTrigger value="prayer-request">{t('prayerRequest')}</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
