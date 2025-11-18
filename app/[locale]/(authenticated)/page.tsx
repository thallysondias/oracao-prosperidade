'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { Header } from '@/components/home/Header';
import { PrayersSlider } from '@/components/home/PrayersSlider';
import { DailyPrayerCard } from '@/components/home/DailyPrayerCard';
import { RelatedScripturesSection } from '@/components/home/RelatedScripturesSection';
import { Challenge21Days } from '@/components/home/Challenge21Days';
import { PrayerRequest } from '@/components/home/PrayerRequest';
import { LightRays } from '@/components/ui/light-rays';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { products } from '@/lib/products/oraciones';
import { getTodayVerse } from '@/lib/versiculos_traduzidos';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const locale = useLocale() as 'pt' | 'en' | 'es';
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<'today' | 'prayer-request' | 'challenge-21'>('today');

  // Get today's verse
  const todayVerse = useMemo(() => getTodayVerse(), []);

  // Convert products to the component format based on locale
  const formattedProducts = useMemo(() => {
    return products.map((product, index) => ({
      id: parseInt(product.id.split('_')[1]),
      title: locale === 'pt' ? product.titlePt : locale === 'en' ? product.titleEn : product.titleEs,
      description: locale === 'pt' ? product.descriptionPt : locale === 'en' ? product.descriptionEn : product.descriptionEs,
      image: product.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
      isLocked: product.isLocked,
      daysCount: index + 1,
      duration: `${product.durationMinutes} minutos`,
      tags: locale === 'pt' ? product.tagsPt : locale === 'en' ? product.tagsEn : product.tagsEs,
    }));
  }, [locale]);

  const handleShareWhatsApp = () => {
    const verseText = 'Alegrem-se sempre no Senhor. Direi novamente: Alegrem-se!';
    const verseReference = 'Filipenses 4:4';
    const message = `"${verseText}"\n\n${verseReference}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const handleSupportClick = () => {
    window.open('https://wa.me/553196609318', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black overflow-x-hidden">
      <div className='relative z-50 max-w-5xl mx-auto px-2'>
        {/* Header com tabs */}
        <Header
          userName={user?.name || user?.email || 'Usuário'}
          notificationCount={1}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content baseado na aba ativa */}
        <Tabs value={activeTab}>
          <TabsContent value="today" className="space-y-6 pb-12">
            {/* Prayers Slider */}
            <PrayersSlider />

            {/* Daily Prayer Card */}
            <DailyPrayerCard
              verseText={todayVerse.traducao.pt}
              verseReference={todayVerse.referencia}
              verseId={todayVerse.id}
              authorName="Cultive uma rotina de reflexão"
              authorImage="https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275"
              backgroundImage="/prayer/oracione.jpeg"
              duration="2-5 minutos"
            />

            {/* Related Scriptures Section */}
            <RelatedScripturesSection
              products={formattedProducts}
              onProductClick={(productId) => {
                console.log(`Product clicked: ${productId}`);
              }}
            />
          </TabsContent>

          <TabsContent value="prayer-request">
            <PrayerRequest />
          </TabsContent>

          <TabsContent value="challenge-21">
            <Challenge21Days />
          </TabsContent>
        </Tabs>

        <div className="px-4 pb-12">
          <div className="rounded-2xl border bg-card/80 p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{t('profileSupport')}</p>
              <p className="text-2xl font-semibold">{t('profileTab')}</p>
            </div>
            <Button
              onClick={handleSupportClick}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              {t('profileSupportCTA')}
            </Button>
            <p className="text-xs text-muted-foreground">{t('profileSupportHint')}</p>
            <div className="rounded-lg border border-dashed bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              {t('profileSupportInfo')}
            </div>
          </div>
        </div>

      </div>
      
      <LightRays color='rgba(255, 215, 0, 0.1)' />
    </div>
  );
}
