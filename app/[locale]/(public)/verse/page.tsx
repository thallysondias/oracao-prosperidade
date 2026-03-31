import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';
import { OPEN_GRAPH_IMAGE_PATH } from '@/shared/config/metadata';
import type { Locale } from '@/shared/config/locales';

interface VersePageProps {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<{
    ref?: string;
    text?: string;
    bg?: string;
  }>;
}

export async function generateMetadata({ searchParams, params }: VersePageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VersePage' });
  const verseReference = resolvedParams.ref || t('verseOfTheDay');
  const verseText = resolvedParams.text || t('unlockDescription');
  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://calmia.club'}/${locale}/verse`;
  const keywords =
    locale === 'pt'
      ? ['versiculo', 'biblia', 'espiritualidade', 'oracao', 'gratidao']
      : locale === 'es'
        ? ['versiculo', 'biblia', 'espiritualidad', 'oracion', 'gratitud']
        : ['verse', 'bible', 'spirituality', 'prayer', 'gratitude'];

  return {
    title: `${verseReference} - ${t('verseOfTheDay')}`,
    description: verseText.substring(0, 160),
    keywords,
    openGraph: {
      title: verseReference,
      description: verseText,
      url,
      siteName: 'Calmia.club',
      images: [OPEN_GRAPH_IMAGE_PATH],
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: verseReference,
      description: verseText,
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  };
}

export default async function VersePage({ searchParams, params }: VersePageProps) {
  const resolvedParams = await searchParams;
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VersePage' });
  const verseReference = resolvedParams.ref || t('verseOfTheDay');
  const verseText = resolvedParams.text || t('unlockDescription');
  const backgroundImage =
    resolvedParams.bg ||
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl space-y-8 px-6 py-12 text-center">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {t('verseOfTheDay')}
          </p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{verseReference}</h1>
          <p className="text-lg font-serif italic leading-relaxed text-foreground md:text-xl">
            &ldquo;{verseText}&rdquo;
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <Button
            asChild
            className="rounded-full bg-teal-600 px-8 py-6 text-lg text-white hover:bg-teal-700"
          >
            <a href="https://pay.hotmart.com/X102941563H?checkoutMode=10" target="_blank" rel="noopener noreferrer">
              {t('buyAllPrayers')}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">{t('unlockDescription')}</p>
        </div>
      </div>

      <LightRays color="rgba(255, 215, 0, 0.1)" />
    </div>
  );
}
