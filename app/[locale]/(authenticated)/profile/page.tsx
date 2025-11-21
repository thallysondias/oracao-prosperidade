'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';
import { locales } from '@/config';

export default function ProfilePage() {
  const t = useTranslations('HomePage');
  const locale = useLocale() as 'pt' | 'en' | 'es';
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const handleLanguageChange = (value: string) => {
    router.push(pathname, { locale: value as 'pt' | 'en' | 'es' });
  };

  const handleSupportClick = () => {
    window.open('https://wa.me/553196609318', '_blank');
  };

  const handleBackHome = () => {
    router.push(`/${locale}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-black">
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackHome}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('profileBack')}
          </Button>
        </div>

        <div className="mb-8 space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            {t('profileTab')}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{user?.name || t('profileName')}</h1>
          <p className="text-muted-foreground">{t('profileSubtitle')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('profileTab')}</CardTitle>
            <p className="text-sm text-muted-foreground">{t('profileSubtitle')}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user-name">{t('profileName')}</Label>
              <div
                id="user-name"
                className="rounded-lg border bg-muted/50 px-4 py-2 text-sm text-foreground"
              >
                {user?.name || t('profileEmpty')}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-email">{t('profileEmail')}</Label>
              <div
                id="user-email"
                className="rounded-lg border bg-muted/50 px-4 py-2 text-sm text-foreground"
              >
                {user?.email || t('profileEmpty')}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language-select">{t('profileLanguage')}</Label>
              <Select defaultValue={locale} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language-select">
                  <SelectValue placeholder={t('profileLanguagePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {locales.map((availableLocale) => (
                    <SelectItem key={availableLocale} value={availableLocale}>
                      {t(`languages.${availableLocale}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{t('profileLanguageHint')}</p>
            </div>

            <div className="space-y-2">
              <Label>{t('profileSupport')}</Label>
              <Button
                onClick={handleSupportClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                {t('profileSupportCTA')}
              </Button>
              <p className="text-xs text-muted-foreground">{t('profileSupportHint')}</p>
              <div className="rounded-lg border border-dashed bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                {t('profileSupportInfo')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <LightRays color="rgba(255, 215, 0, 0.1)" />
    </div>
  );
}
