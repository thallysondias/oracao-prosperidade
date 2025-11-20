'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface DailyPrayerCardProps {
  verseText: string;
  verseReference: string;
  verseId: number;
  authorName: string;
  authorImage: string;
  backgroundImage: string;
  duration?: string;
  onShareWhatsApp?: () => void;
}

export function DailyPrayerCard({
  verseText,
  verseReference,
  verseId,
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

  const handleSharePrayer = () => {
    const verseUrl = `${window.location.origin}/es/verse/${verseId}`;
    const message = `✨ Versículo do Dia ✨\n\n${verseReference}\n\n"${verseText}"\n\n${verseUrl}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="px-4 space-y-4">
      {/* Verse Card with Background */}
      <div
        className="relative rounded-2xl overflow-hidden min-h-50 flex flex-col justify-between p-6 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(233, 200, 42, 0.85) 0%, rgba(233, 155, 42, 0.85) 100%), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-90">{t('verseOfTheDay')}</p>
          <h2 className="text-2xl font-bold tr">{verseReference}</h2>
        </div>

        <p className="text-lg font-serif italic leading-tight">{verseText}</p>

        {/* Bottom Actions with Send Prayer Button */}
        <div className="flex items-center justify-between mt-4">
          {/* Send Prayer Button */}
          <Button
            onClick={handleSharePrayer}
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-orange-600"
            size="sm"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {t('sendPrayer')}
          </Button>

          <div className="text-right">
            <p className="text-xs opacity-75">{fakeCount}</p>
            <p className="text-xs opacity-75">{t('views')}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
