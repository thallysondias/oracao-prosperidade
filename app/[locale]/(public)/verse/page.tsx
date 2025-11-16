import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';

interface VersePageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    ref?: string;
    text?: string;
    bg?: string;
  }>;
}

// Generate metadata for Open Graph and SEO
export async function generateMetadata({ searchParams, params }: VersePageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VersePage' });
  
  const verseReference = resolvedParams.ref || t('verseOfTheDay');
  const verseText = resolvedParams.text || t('unlockDescription');
  const backgroundImage =
    resolvedParams.bg ||
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';

  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://oracao.guiaceleste.com/'}/${locale}/verse`;

  return {
    title: `${verseReference} - ${t('verseOfTheDay')}`,
    description: verseText.substring(0, 160),
    keywords: ['versículo', 'bíblia', 'espiritualidade', 'oração'],
    openGraph: {
      title: verseReference,
      description: verseText,
      url: url,
      siteName: 'Oração e Prosperidade',
      images: [
        {
          url: backgroundImage,
          width: 1200,
          height: 800,
          alt: verseReference,
        },
      ],
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: verseReference,
      description: verseText,
      images: [backgroundImage],
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
    <div className="relative min-h-screen bg-white dark:bg-black flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            {t('verseOfTheDay')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{verseReference}</h1>
          <p className="text-lg md:text-xl font-serif italic leading-relaxed text-foreground">
            "{verseText}"
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-8 space-y-4">
          <Button
            asChild
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg rounded-full"
          >
            <a href="https://pay.hotmart.com/X102941563H?checkoutMode=10" target="_blank" rel="noopener noreferrer">
              {t('buyAllPrayers')}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            {t('unlockDescription')}
          </p>
        </div>
      </div>

      <LightRays color="rgba(255, 215, 0, 0.1)" />
    </div>
  );
}
