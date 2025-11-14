'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Play, Pause, Volume2, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SanBenitoPrayer from '@/components/oracao/SanBenitoPrayer';

export default function SaintBenedictPage() {
  const router = useRouter();
  const t = useTranslations('SaintBenedict');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(600); // 10 minutes in seconds
  const [played, setPlayed] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const image = '/products/saobenedito.jpeg';
  const audioUrl = '/prayer/saobenedicto.mp3'; // Placeholder

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
      {/* Player Section with Sticky Header */}
      <div className=" bg-black text-white border-b border-yellow-500/20">
        <div className="max-w-2xl mx-auto px-4 pt-6">
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


      {/* Prayer Text Section */}
      <div>
        {/* Sticky Controls + Progress Bar */}
        <div className='sticky top-0 z-50 bg-black border-b border-yellow-500/20 px-4 py-2'>
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            {/* Play Button */}
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

            {/* Progress Bar */}
            <div className="flex items-center justify-between gap-2 flex-1">
              <span className="text-xs text-gray-400 whitespace-nowrap">{formatTime(played * duration)}</span>
              <input
                type="range"
                min="0"
                max="0.999999"
                step="any"
                value={played}
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer accent-yellow-500"
              />
              <span className="text-xs text-gray-400 whitespace-nowrap">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Animated Down Arrow */}
        <div className="flex justify-center py-8 bg-black">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-yellow-500" />
          </div>
        </div>


        <SanBenitoPrayer />
      </div>

    </div>
  );
}
