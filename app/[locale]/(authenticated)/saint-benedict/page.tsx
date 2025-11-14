'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Play, Pause, Volume2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function SaintBenedictPage() {
  const router = useRouter();
  const t = useTranslations('SaintBenedict');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(600); // 10 minutes in seconds
  const [played, setPlayed] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const image = '/products/saobenedito.jpeg';
  const audioUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Placeholder

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    if (videoRef.current) {
      videoRef.current.currentTime = newPlayed * duration;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setPlayed(videoRef.current.currentTime / duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Player Section */}
      <div className="bg-black text-white py-6">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="text-white hover:text-gray-300 transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-white text-sm font-medium">{t('playingNow')}</span>
            <div className="w-6" />
          </div>

          {/* Album Art */}
          <div className="mb-8">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={t('title')}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Song Info */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{t('title')}</h1>
                <p className="text-gray-300 text-sm">{t('description')}</p>
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

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{formatTime(played * duration)}</span>
              <input
                type="range"
                min="0"
                max="0.999999"
                step="any"
                value={played}
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer accent-yellow-500"
              />
              <span className="text-xs text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
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

          {/* Volume Control */}
          <div className="flex items-center justify-center gap-3">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="1"
              className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer accent-yellow-500"
            />
          </div>

          {/* Hidden video element */}
          <video
            ref={videoRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      </div>

      {/* Prayer Text Section */}
      <div className="bg-gray-50 dark:bg-slate-900 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{t('prayerText')}</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {t('fullText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
