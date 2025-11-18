'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Bell, User } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type HomeTabs = 'today' | 'prayer-request' | 'challenge-21';

interface HeaderProps {
  userName: string;
  notificationCount?: number;
  activeTab: HomeTabs;
  onTabChange: (tab: HomeTabs) => void;
}

export function Header({
  userName,
  notificationCount = 1,
  activeTab,
  onTabChange,
}: HeaderProps) {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const profileHref = `/${locale}/profile`;

  return (
    <div className="space-y-6 pb-6">
      {/* Top bar with greeting and icons */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex-1">
        {/*   <p className="text-sm text-muted-foreground">{t('greeting')}</p> */}
                  <p className="text-sm text-muted-foreground">Hola</p>
          <h1 className="text-2xl font-bold">{userName}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
       {/*    <div className="relative">
            <Bell className="h-6 w-6 text-foreground" />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div> */}

          {/* Profile */}
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

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as HomeTabs)}>
          <div className="overflow-x-auto scrollbar-hide">
            <TabsList className="flex min-w-max gap-2">
              <TabsTrigger value="today">{t('prayers')}</TabsTrigger>
              <TabsTrigger value="prayer-request">{t('prayerRequest')}</TabsTrigger>
              <TabsTrigger value="challenge-21">{t('challenge21Days')}</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
