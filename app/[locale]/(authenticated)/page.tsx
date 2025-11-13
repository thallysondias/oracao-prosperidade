'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/home/Header';
import { DailyPrayerCard } from '@/components/home/DailyPrayerCard';
import { ProductCard } from '@/components/home/ProductCard';
import { LightRays } from '@/components/ui/light-rays';
import { Tabs, TabsContent } from '@/components/ui/tabs';

// Mock data - você pode substituir isso com dados de uma API
const mockProducts = [
  {
    id: 1,
    title: 'Amor',
    description: 'Cultivar amor genuíno e compaixão',
    image: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
    isLocked: false,
  },
  {
    id: 2,
    title: 'Ansiedade',
    description: 'Vitória sobre ansiedade - Charles F. Stanley',
    image: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
    isLocked: false,
  },
  {
    id: 3,
    title: 'Raiva',
    description: 'Para vencer a Raiva',
    image: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
    isLocked: false,
  },
  {
    id: 4,
    title: 'Esperança',
    description: 'Promessas para uma vida diária - Joyce Meyer',
    image: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
    isLocked: false,
  },
  {
    id: 5,
    title: 'Depressão',
    description: 'Depressão - Como lidar e superar',
    image: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
    isLocked: true,
  },
  {
    id: 6,
    title: 'Paz',
    description: 'Encontrando paz interior',
    image: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
    isLocked: true,
  },
  {
    id: 7,
    title: 'Medo',
    description: 'Lugar para respirar - Saúde Mental',
    image: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
    isLocked: true,
  },
  {
    id: 8,
    title: 'Estresse',
    description: 'Espaço para respirar - 7 dias',
    image: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
    isLocked: true,
  },
];

export default function HomePage() {
  const t = useTranslations('HomePage');
  const [activeTab, setActiveTab] = useState<'today' | 'prayer-request' | 'challenge-21'>('today');

  const handleShareWhatsApp = () => {
    const verseText = 'Alegrem-se sempre no Senhor. Direi novamente: Alegrem-se!';
    const verseReference = 'Filipenses 4:4';
    const message = `"${verseText}"\n\n${verseReference}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className='relative z-50'>
      {/* Header com tabs */}
      <Header
        userName="Thallyson"
        notificationCount={1}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content baseado na aba ativa */}
      <Tabs value={activeTab}>
        <TabsContent value="today" className="space-y-6 pb-12">
          {/* Daily Prayer Card */}
          <DailyPrayerCard
            verseText="Alegrem-se sempre no Senhor. Direi novamente: Alegrem-se!"
            verseReference="Filipenses 4:4"
            authorName="Cultive uma rotina de reflexão"
            authorImage="https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275"
            backgroundImage="/prayer/oracione.jpeg"
            duration="2-5 minutos"
            onShareWhatsApp={handleShareWhatsApp}
          />

          {/* Products Grid */}
          <div className="px-4 space-y-4">
            <h2 className="text-xl font-bold">{t('products')}</h2>
            <div className="grid grid-cols-2 gap-4">
              {mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  isLocked={product.isLocked}
                  onClick={() => console.log(`Clicked: ${product.title}`)}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prayer-request" className="px-4 py-8 text-center text-muted-foreground">
          <p>{t('prayerRequest')} - Em breve</p>
        </TabsContent>

        <TabsContent value="challenge-21" className="px-4 py-8 text-center text-muted-foreground">
          <p>{t('challenge21Days')} - Em breve</p>
        </TabsContent>
      </Tabs>

</div>
      <LightRays color='rgba(255, 215, 0, 0.1)' />
    </div>
  );
}
