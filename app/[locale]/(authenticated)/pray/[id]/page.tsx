'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { products } from '@/lib/products/oraciones';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Play, Pause, Volume2, Heart } from 'lucide-react';

// Declaração do tipo para o YouTube Player API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function PrayerPlayPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('PrayerPlayer');
  const prayerId = params.id as string;
  const normalizedId = `prayer_${prayerId.padStart(3, '0')}`;

  const prayer = products.find((p) => p.id === normalizedId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);

  // Extrair o ID do vídeo do YouTube da URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = prayer?.youtubeUrl ? getYouTubeVideoId(prayer.youtubeUrl) : null;

  // Carregar a API do YouTube
  useEffect(() => {
    if (!videoId) return;

    // Carregar o script da API do YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Callback quando a API estiver pronta
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            setIsPlayerReady(true);
            setDuration(event.target.getDuration());
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Atualizar progresso
  useEffect(() => {
    if (!player || !isPlaying) return;

    const interval = setInterval(() => {
      if (player.getCurrentTime && player.getDuration) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        setPlayed(currentTime / duration);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player, isPlaying]);

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

  // Obter título e descrição baseado no locale
  const getLocalizedText = () => {
    switch (locale) {
      case 'pt':
        return { title: prayer.titlePt, description: prayer.descriptionPt };
      case 'es':
        return { title: prayer.titleEs, description: prayer.descriptionEs };
      case 'en':
        return { title: prayer.titleEn, description: prayer.descriptionEn };
      default:
        return { title: prayer.titlePt, description: prayer.descriptionPt };
    }
  };

  const { title, description } = getLocalizedText();

  const handlePlayPause = () => {
    if (!player || !isPlayerReady) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player || !isPlayerReady) return;

    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    player.seekTo(newPlayed * duration, true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player || !isPlayerReady) return;

    const volume = parseFloat(e.target.value) * 100;
    player.setVolume(volume);
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
      {/* Hidden YouTube Player */}
      <div id="youtube-player" style={{ display: 'none' }}></div>

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
          <span className="text-white text-sm font-medium">{t('nowPlaying')}</span>
          <div className="w-6" />
        </div>

        {/* Album Art */}
        <div className="mb-8">
          <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
            <img
              src={prayer.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Song Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              <p className="text-gray-300 text-sm">{description}</p>
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
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer accent-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}
