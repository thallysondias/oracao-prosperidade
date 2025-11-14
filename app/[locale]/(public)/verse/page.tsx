import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';

interface VersePageProps {
  searchParams: Promise<{
    ref?: string;
    text?: string;
    bg?: string;
  }>;
}

// Generate metadata for Open Graph and SEO
export async function generateMetadata({ searchParams }: VersePageProps): Promise<Metadata> {
  const params = await searchParams;
  const verseReference = params.ref || 'Versículo do Dia';
  const verseText = params.text || 'Compartilhe a palavra de Deus';
  const backgroundImage =
    params.bg ||
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';

  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://oracao-prosperidade.com'}/verse`;

  return {
    title: `${verseReference} - Versículo do Dia`,
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
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: verseReference,
      description: verseText,
      images: [backgroundImage],
    },
  };
}

export default async function VersePage({ searchParams }: VersePageProps) {
  const params = await searchParams;
  const verseReference = params.ref || 'Versículo do Dia';
  const verseText = params.text || 'Compartilhe a palavra de Deus';
  const backgroundImage =
    params.bg ||
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
            Versículo do Dia
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
            <a href="https://hotmart.com" target="_blank" rel="noopener noreferrer">
              Compre Todas as Orações
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Desbloqueie todas as orações e meditações exclusivas
          </p>
        </div>
      </div>

      <LightRays color="rgba(255, 215, 0, 0.1)" />
    </div>
  );
}
