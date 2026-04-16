import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';
import { getVerseById } from '@/lib/versiculos_traduzidos';
import { OPEN_GRAPH_IMAGE_PATH } from '@/shared/config/metadata';
import type { Locale } from '@/shared/config/locales';

interface VersePageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

export async function generateMetadata({ params }: VersePageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const verseId = parseInt(id, 10);
  const verse = getVerseById(verseId);

  if (!verse) {
    return {
      title: 'Verse not found',
    };
  }

  const verseText = verse.traducao[locale] || verse.traducao.en;
  const pageTitle =
    locale === 'pt'
      ? 'Versiculo do Dia'
      : locale === 'es'
        ? 'Versiculo del dia'
        : locale === 'fr'
          ? 'Verset du jour'
          : 'Verse of the Day';
  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://calmia.club'}/${locale}/verse/${id}`;
  return {
    title: `${verse.referencia} - ${pageTitle}`,
    description: verseText.substring(0, 160),
    keywords: ['verse', 'bible', 'spirituality', 'prayer'],
    openGraph: {
      title: verse.referencia,
      description: verseText,
      url,
      siteName: 'Calmia.club',
      images: [OPEN_GRAPH_IMAGE_PATH],
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : locale === 'es' ? 'es_ES' : locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: verse.referencia,
      description: verseText,
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  };
}

export default async function VersePage({ params }: VersePageProps) {
  const { id, locale } = await params;
  const verseId = parseInt(id, 10);
  const t = await getTranslations({ locale, namespace: 'Verse' });
  const verse = getVerseById(verseId);

  if (!verse) {
    notFound();
  }

  const verseText = verse.traducao[locale] || verse.traducao.en;

  const backgroundImage =
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black dark:bg-black">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl space-y-6 px-6 py-12 text-center">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {t('verseOfTheDay')}
          </p>
          <h1 className="text-xl font-bold text-white/50 md:text-2xl">{verse.referencia}</h1>
          <p className="text-base font-serif italic leading-relaxed text-white/80 md:text-lg">
            &ldquo;{verseText}&rdquo;
          </p>
        </div>

        <hr className="border-yellow-500" />

        <h3 className="text-white/40">{t('watchVideoAttention')}</h3>

        <div className="w-full overflow-hidden rounded-lg shadow-lg">
          <iframe
            width="100%"
            height="100%"
            className="aspect-square"
            src="https://videomng.builderall.com/embed/Z3KIl67Kf5/?controls=1&allowpause=1&loop=1"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        <div className="space-y-4 pt-4">
          <Button
            asChild
            className="w-full rounded-lg bg-yellow-500 px-8 py-4 text-lg font-bold text-black hover:bg-yellow-600"
          >
            <a
              href="https://pay.hotmart.com/X102941563H?checkoutMode=10?utm_source=aplicacao&utm_medium=recomendacao"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('wantSecretPrayers')}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">{t('receiveNow')}</p>
        </div>
      </div>

      <LightRays color="rgba(255, 215, 0, 0.1)" />
    </div>
  );
}
