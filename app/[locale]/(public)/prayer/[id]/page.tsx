import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';
import { products } from '@/lib/products/oraciones';
import { OPEN_GRAPH_IMAGE_PATH } from '@/shared/config/metadata';
import type { Locale } from '@/shared/config/locales';

interface PrayerPageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PrayerPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const prayerId = id as string;
  const prayer = products.find((p) => p.id === `prayer_${prayerId.padStart(3, '0')}`);

  if (!prayer) {
    return {
      title: locale === 'es' ? 'Oracion no encontrada' : locale === 'en' ? 'Prayer not found' : 'Oracao nao encontrada',
    };
  }

  const title = locale === 'es' ? prayer.titleEs : locale === 'en' ? prayer.titleEn : prayer.titlePt;
  const description =
    locale === 'es' ? prayer.descriptionEs : locale === 'en' ? prayer.descriptionEn : prayer.descriptionPt;
  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://calmia.club'}/${locale}/prayer/${prayerId}`;
  const keywords =
    locale === 'es'
      ? ['oracion', 'meditacion', 'espiritualidad', 'gratitud', title.toLowerCase()]
      : locale === 'en'
        ? ['prayer', 'meditation', 'spirituality', 'gratitude', title.toLowerCase()]
        : ['oracao', 'meditacao', 'espiritualidade', 'gratidao', title.toLowerCase()];

  return {
    title: `${title} - Calmia.club`,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Calmia.club',
      images: [OPEN_GRAPH_IMAGE_PATH],
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  };
}

export default async function PrayerPage({ params }: PrayerPageProps) {
  const { locale, id } = await params;
  const prayerId = id as string;
  const prayer = products.find((p) => p.id === `prayer_${prayerId.padStart(3, '0')}`);

  if (!prayer) {
    notFound();
  }

  const title = locale === 'es' ? prayer.titleEs : locale === 'en' ? prayer.titleEn : prayer.titlePt;
  const description =
    locale === 'es' ? prayer.descriptionEs : locale === 'en' ? prayer.descriptionEn : prayer.descriptionPt;
  const minutesLabel = locale === 'en' ? 'minutes' : locale === 'es' ? 'minutos' : 'minutos';
  const ctaLabel =
    locale === 'en' ? 'Receive prayers' : locale === 'es' ? 'Recibe oraciones' : 'Receba oracoes';
  const ctaHint =
    locale === 'en'
      ? 'Unlock exclusive prayers and guided reflections.'
      : locale === 'es'
        ? 'Desbloquea oraciones y reflexiones guiadas exclusivas.'
        : 'Desbloqueie oracoes e reflexoes guiadas exclusivas.';

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${prayer.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl space-y-8 px-6 py-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="flex justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{prayer.durationMinutes}</p>
            <p className="text-sm text-muted-foreground">{minutesLabel}</p>
          </div>
        </div>

        <div className="pt-8">
          <Button
            asChild
            className="rounded-full bg-teal-600 px-8 py-6 text-lg text-white hover:bg-teal-700"
          >
            <a href="https://hotmart.com" target="_blank" rel="noopener noreferrer">
              {ctaLabel}
            </a>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">{ctaHint}</p>
        </div>
      </div>

      <LightRays color="rgba(255, 215, 0, 0.1)" />
    </div>
  );
}
