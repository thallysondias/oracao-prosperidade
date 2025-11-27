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
import { MessageCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const locale = useLocale() as 'pt' | 'en' | 'es';
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<'today' | 'prayer-request' | 'challenge-21'>('today');
  const [showSupportPopup, setShowSupportPopup] = useState(false);

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
    window.open('https://wa.me/5531973130289', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black overflow-x-hidden">
      <div className='relative z-10 max-w-5xl mx-auto px-2'>
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

        {/* Fixed WhatsApp Support Button */}
      <button
        onClick={() => setShowSupportPopup(!showSupportPopup)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      </div>

      
      {/* Support Popup */}
      {showSupportPopup && (
        <div className="fixed bottom-24 right-6 z-50 w-80">
          <Card className="p-4 shadow-xl bg-white border-2 border-green-500 gap-0 space-y-0">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">{t('profileSupport')}</h3>
              <button
                onClick={() => setShowSupportPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t('profileSupportInfo')}
            </p>
            <Button
              onClick={handleSupportClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              {t('profileSupportCTA')}
            </Button>
          </Card>
        </div>
      )}
      
    </div>
  );
}
