'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface DailyPrayerCardProps {
  verseText: string;
  verseReference: string;
  authorName: string;
  authorImage: string;
  backgroundImage: string;
  duration?: string;
  onShareWhatsApp?: () => void;
}

export function DailyPrayerCard({
  verseText,
  verseReference,
  authorName,
  authorImage,
  backgroundImage,
  duration = '2-5 minutos',
  onShareWhatsApp,
}: DailyPrayerCardProps) {
  const t = useTranslations('HomePage');
  const [fakeCount, setFakeCount] = useState<string>('');

  useEffect(() => {
    // Generate random number between 15,000 and 32,000
    const randomNumber = Math.floor(Math.random() * (32000 - 15000 + 1)) + 15000;
    setFakeCount((randomNumber / 1000).toFixed(1) + 'k');
  }, []);

  return (
    <div className="px-4 space-y-4">
      {/* Verse Card with Background */}
      <div
        className="relative rounded-2xl overflow-hidden h-64 flex flex-col justify-between p-6 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(233, 212, 42, 0.85) 0%, rgba(233, 155, 42, 0.85) 100%), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-90">{t('verseOfTheDay')}</p>
          <h2 className="text-2xl font-bold">{verseReference}</h2>
        </div>

        <p className="text-lg font-serif italic leading-relaxed">{verseText}</p>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-6 text-xl">
            <button className="hover:scale-110 transition-transform">
              <Heart className="h-6 w-6" />
            </button>
            <button className="hover:scale-110 transition-transform">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button
              onClick={onShareWhatsApp}
              className="hover:scale-110 transition-transform"
            >
              <Share2 className="h-6 w-6" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-xs opacity-75">{fakeCount}</p>
            <p className="text-xs opacity-75">Visualizações</p>
          </div>
        </div>
      </div>

      {/* Author Info and Related Scriptures */}
      <div className="space-y-4">
        
        {/* Share WhatsApp Button */}
        <Button
          onClick={onShareWhatsApp}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          {t('shareWhatsApp')}
        </Button>
      </div>
    </div>
  );
}
