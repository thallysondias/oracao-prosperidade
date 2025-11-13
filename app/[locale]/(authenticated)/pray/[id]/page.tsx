'use client';

import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/lib/products/oraciones';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Play, Pause, Volume2, Heart } from 'lucide-react';

export default function PrayerPlayPage() {
  const params = useParams();
  const router = useRouter();
  const prayerId = params.id as string;
  const normalizedId = `prayer_${prayerId.padStart(3, '0')}`;

  const prayer = products.find((p) => p.id === normalizedId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!prayer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Oração não encontrada</h1>
          <Button onClick={() => router.back()} className="mt-4">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

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
      videoRef.current.currentTime = newPlayed * videoRef.current.duration;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setPlayed(videoRef.current.currentTime / videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = ('0' + date.getUTCSeconds()).slice(-2);
    if (hh) {
      return `${hh}:${('0' + mm).slice(-2)}:${ss}`;
    }
    return `${mm}:${ss}`;
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
      {/* Hidden Video Player */}
      <video
        ref={videoRef}
        src={prayer.youtubeUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />

      {/* Player Card - Spotify Style */}
      <div className="w-full max-w-md mx-auto px-4">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="text-white hover:text-gray-300 transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="text-white text-sm font-medium">Tocando agora</span>
          <div className="w-6" />
        </div>

        {/* Album Art */}
        <div className="mb-8">
          <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
            <img
              src={prayer.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'}
              alt={prayer.titlePt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Song Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{prayer.titlePt}</h1>
              <p className="text-gray-300 text-sm">{prayer.descriptionPt}</p>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="ml-4 text-white hover:text-green-500 transition"
            >
              <Heart
                className={`h-6 w-6 ${isFavorite ? 'fill-current text-green-500' : ''}`}
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
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer accent-green-500"
            />
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={handlePlayPause}
            className="bg-green-500 hover:bg-green-600 text-black rounded-full p-4 transition transform hover:scale-105"
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
            className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer accent-green-500"
          />
        </div>
      </div>
    </div>
  );
}
