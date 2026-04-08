'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Heart, Pause, Play, Volume2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useAudioPlayer } from '@/features/prayer-player/useAudioPlayer';
import { formatAudioTime } from '@/features/prayer-player/utils';
import { getLocalizedProductText } from '@/features/prayers/helpers';
import { getProductAudioUrl, products } from '@/lib/products/oraciones';

export default function PrayerPlayPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale() as 'pt' | 'en' | 'es';
  const t = useTranslations('PrayerPlayer');
  const disclaimer = useTranslations('AppDisclaimer');
  const prayerId = params.id as string;
  const normalizedId = `prayer_${prayerId.padStart(3, '0')}`;
  const [isFavorite, setIsFavorite] = useState(false);

  const prayer = products.find((product) => product.id === normalizedId);
  const {
    audioRef,
    duration,
    handleEnded,
    handleLoadedMetadata,
    handlePlayPause,
    handleProgressChange,
    handleTimeUpdate,
    isPlaying,
    played,
  } = useAudioPlayer();

  if (!prayer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">{t('notFound')}</h1>
          <Button onClick={() => router.back()} className="mt-4">
            {t('back')}
          </Button>
        </div>
      </div>
    );
  }

  const { title } = getLocalizedProductText(prayer, locale);
  const audioSrc = getProductAudioUrl(prayer, locale) || prayer.audioUrl || '';

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.volume = parseFloat(event.target.value);
  };

  return (
    <div
      className="relative min-h-screen bg-black flex items-end justify-center pb-8"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%), url(${prayer.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        style={{ display: 'none' }}
      />

      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="text-white hover:text-gray-300 transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="text-white text-sm font-medium">{t('nowPlaying')}</span>
          <div className="w-6" />
        </div>

        <div className="mb-8">
          <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={prayer.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'}
              alt={title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="ml-4 text-white hover:text-yellow-500 transition"
            >
              <Heart
                className={`h-6 w-6 ${isFavorite ? 'fill-current text-yellow-500' : ''}`}
              />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {formatAudioTime(played * duration)}
            </span>
            <input
              type="range"
              min="0"
              max="0.999999"
              step="any"
              value={played}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer accent-yellow-500"
            />
            <span className="text-xs text-gray-400">{formatAudioTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={handlePlayPause}
            className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-4 transition transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Volume2 className="h-4 w-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="1"
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer accent-yellow-500"
          />
        </div>

        <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed">
          {disclaimer('spiritualContent')}
        </p>
      </div>
    </div>
  );
}
