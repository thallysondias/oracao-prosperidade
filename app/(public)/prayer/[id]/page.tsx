import { Metadata } from 'next';
import { products } from '@/lib/products/oraciones';
import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';
import { notFound } from 'next/navigation';

interface PrayerPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for Open Graph and SEO
export async function generateMetadata({ params }: PrayerPageProps): Promise<Metadata> {
  const { id } = await params;
  const prayerId = id as string;

  // Find the prayer by ID
  const prayer = products.find((p) => p.id === `prayer_${prayerId.padStart(3, '0')}`);

  if (!prayer) {
    return {
      title: 'Oração não encontrada',
    };
  }

  const title = prayer.titlePt;
  const description = prayer.descriptionPt;
  const image = prayer.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';
  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://oracao-prosperidade.com'}/prayer/${prayerId}`;

  return {
    title: `${title} - Oração e Prosperidade`,
    description: description,
    keywords: ['oração', 'meditação', 'espiritualidade', 'prosperidade', title.toLowerCase()],
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'Oração e Prosperidade',
      images: [
        {
          url: image,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
  };
}

export default async function PrayerPage({ params }: PrayerPageProps) {
  const { id } = await params;
  const prayerId = id as string;

  // Find the prayer by ID
  const prayer = products.find((p) => p.id === `prayer_${prayerId.padStart(3, '0')}`);

  if (!prayer) {
    notFound();
  }

  const title = prayer.titlePt;
  const description = prayer.descriptionPt;

  return (
    <div className="relative min-h-screen bg-white dark:bg-black flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${prayer.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{prayer.durationMinutes}</p>
            <p className="text-sm text-muted-foreground">minutos</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button
            asChild
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg rounded-full"
          >
            <a href="https://hotmart.com" target="_blank" rel="noopener noreferrer">
              Receba Orações
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Desbloqueie todas as orações e meditações exclusivas
          </p>
        </div>
      </div>

      <LightRays color="rgba(255, 215, 0, 0.1)" />
    </div>
  );
}
