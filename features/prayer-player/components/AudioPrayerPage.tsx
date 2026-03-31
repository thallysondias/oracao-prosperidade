'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronLeft, Heart, Pause, Play } from 'lucide-react';

import { useAudioPlayer } from '@/features/prayer-player/useAudioPlayer';
import { formatAudioTime } from '@/features/prayer-player/utils';

interface AudioPrayerPageProps {
  audioSrc?: string;
  children: React.ReactNode;
  disclaimer?: string;
  imageAlt: string;
  imageSrc: string;
  playingLabel: string;
  subtitle?: string;
  title: string;
}

export function AudioPrayerPage({
  audioSrc,
  children,
  disclaimer,
  imageAlt,
  imageSrc,
  playingLabel,
  subtitle,
  title,
}: AudioPrayerPageProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
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

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black text-white border-b border-yellow-500/20">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="text-white hover:text-gray-300 transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-white text-sm font-medium">{playingLabel}</span>
            <div className="w-6" />
          </div>

          <div className="mb-8">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={400}
                height={400}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                {subtitle && <p className="text-gray-300 text-sm">{subtitle}</p>}
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
        </div>

        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          className="hidden"
        />
      </div>

      <div>
        <div className="sticky top-0 z-50 bg-black border-b border-yellow-500/20 px-4 py-2">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handlePlayPause}
              className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-2 transition transform hover:scale-105 shrink-0"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-1" />
              )}
            </button>

            <div className="flex items-center justify-between gap-2 flex-1">
              <span className="text-xs text-gray-400 whitespace-nowrap">
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
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatAudioTime(duration)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-8 bg-black">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        {children}

        {disclaimer && (
          <div className="max-w-2xl mx-auto px-4 pb-10">
            <p className="text-center text-xs text-gray-400 leading-relaxed">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
