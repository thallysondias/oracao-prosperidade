import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';
import { getVerseById } from '@/lib/versiculos_traduzidos';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface VersePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for Open Graph and SEO
export async function generateMetadata({ params }: VersePageProps): Promise<Metadata> {
  const { id } = await params;
  const verseId = parseInt(id, 10);

  const verse = getVerseById(verseId);
  if (!verse) {
    return {
      title: 'Versículo não encontrado',
    };
  }

  const verseText = verse.traducao.pt;
  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://oracao-prosperidade.com'}/es/verse/${id}`;
  const backgroundImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';

  return {
    title: `${verse.referencia} - Versículo do Dia`,
    description: verseText.substring(0, 160),
    keywords: ['versículo', 'bíblia', 'espiritualidade', 'oração'],
    openGraph: {
      title: verse.referencia,
      description: verseText,
      url: url,
      siteName: 'Oração e Prosperidade',
      images: [
        {
          url: backgroundImage,
          width: 1200,
          height: 800,
          alt: verse.referencia,
        },
      ],
      type: 'website',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: verse.referencia,
      description: verseText,
      images: [backgroundImage],
    },
  };
}

export default async function VersePage({ params }: VersePageProps) {
  const { id } = await params;
  const verseId = parseInt(id, 10);
  const t = await getTranslations('Verse');

  const verse = getVerseById(verseId);
  if (!verse) {
    notFound();
  }

  const backgroundImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';

  return (
    <div className="relative min-h-screen bg-black dark:bg-black flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center space-y-6">
        {/* Title */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            {t('verseOfTheDay')}
          </p>
          <h1 className="text-xl md:text-2xl text-white/50 font-bold">{verse.referencia}</h1>
          <p className="text-base md:text-lg font-serif italic leading-relaxed text-white/80">
            "{verse.traducao.pt}"
          </p>
        </div>
        <hr className="border-yellow-500" />

        <h3 className='text-white/40'>{t('watchVideoAttention')}</h3>
        {/* Video Player */}
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          {/* <video
            width="100%"
            height="auto"
            controls
            autoPlay
            className="w-full bg-black aspect-squ"
          >
            <source src="/video/C4 .webm" type="video/webm" />
            Seu navegador não suporta o elemento de vídeo.
          </video> */}

          <iframe width="100%" height="100%" className='aspect-square' src="https://videomng.builderall.com/embed/Z3KIl67Kf5/?controls=1&allowpause=1&loop=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>

        {/* CTA Button */}
        <div className="pt-4 space-y-4">
          <Button
            asChild
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg rounded-lg"
          >
            <a href="https://pay.hotmart.com/X102941563H?checkoutMode=10?utm_source=aplicacao&utm_medium=recomendacao" target="_blank" rel="noopener noreferrer">
              {t('wantSecretPrayers')}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            {t('receiveNow')}
          </p>
        </div>
      </div>

      <LightRays color="rgba(255, 215, 0, 0.1)" />
    </div>
  );
}
