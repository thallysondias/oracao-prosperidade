'use client';

import { useParams } from 'next/navigation';
import { products } from '@/lib/products/oraciones';
import { Button } from '@/components/ui/button';
import { LightRays } from '@/components/ui/light-rays';

export default function PrayerPublicPage() {
  const params = useParams();
  const prayerId = params.id as string;
  const normalizedId = `prayer_${prayerId.padStart(3, '0')}`;

  const prayer = products.find((p) => p.id === normalizedId);

  if (!prayer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Oração não encontrada</h1>
          <p className="text-muted-foreground">A oração que você procura não existe.</p>
        </div>
      </div>
    );
  }

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
            {prayer.titlePt}
          </h1>
          <p className="text-lg text-muted-foreground">
            {prayer.descriptionPt}
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
