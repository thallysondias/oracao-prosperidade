'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Play, Pause, ChevronDown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getChallengeAudioSources } from '@/features/challenge/audio';
import { CHALLENGE_HERO_IMAGE, getChallengeDayContent } from '@/features/challenge/data';
import { findChallengePurchase } from '@/features/challenge/helpers';
import { useAuthStore } from '@/store/authStore';
import type { ProductLocale } from '@/lib/products/oraciones';

const getDayData = (day: number, locale: ProductLocale) => {
  const content = getChallengeDayContent(locale, day);

  return {
    title: content.title,
    text: content.text,
    audioSources: getChallengeAudioSources(day, locale),
  };
};

export default function ChallengeDayPage() {
  const router = useRouter();
  const params = useParams();
  const locale = useLocale() as ProductLocale;
  const t = useTranslations('Challenge21');
  const disclaimer = useTranslations('AppDisclaimer');
  const user = useAuthStore((state) => state.user);
  const purchases = user?.purchases;

  const day = parseInt(params.day as string);
  const dayData = getDayData(day, locale);

  const challengePurchase = useMemo(() => {
    return findChallengePurchase(purchases);
  }, [purchases]);

  const dayUnlocked = useMemo(() => {
    void challengePurchase;
    void day;

    return true;
  }, [challengePurchase, day]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSourceIndex, setAudioSourceIndex] = useState(0);

  const currentAudioSrc = dayData.audioSources[audioSourceIndex];

  if (!challengePurchase || !dayUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-full mb-4">
              <Lock className="h-10 w-10 text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {t('dayLocked', { day })}
            </h1>
            <p className="text-gray-400">
              {!challengePurchase ? t('needPurchase') : t('dayNotUnlocked')}
            </p>
          </div>
          <Button
            onClick={() => router.back()}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            {t('backToChallenge')}
          </Button>
        </div>
      </div>
    );
  }

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (audio && currentAudioSrc) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        if (audio.getAttribute('src') !== currentAudioSrc) {
          audio.src = currentAudioSrc;
          audio.load();
        }

        const playPromise = audio.play();
        setIsPlaying(true);

        if (playPromise) {
          playPromise.catch(() => {
            setIsPlaying(false);
          });
        }
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentAudioSrc) return;

    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    if (audioRef.current) {
      audioRef.current.currentTime = newPlayed * duration;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPlayed(audioRef.current.currentTime / duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioError = () => {
    if (audioSourceIndex < dayData.audioSources.length - 1) {
      setAudioSourceIndex((currentIndex) => currentIndex + 1);
      return;
    }

    setIsPlaying(false);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

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
            <span className="text-white text-sm font-medium">
              {t('dayPageTitle', { day })}
            </span>
            <div className="w-6" />
          </div>

          <div className="mb-8">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={CHALLENGE_HERO_IMAGE}
                alt={`Dia ${day}`}
                width={400}
                height={400}
                className="w-full h-full object-cover aspect-square object-top"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-yellow-500 text-sm font-medium mb-1">
                  {t('dayLabel', { day })}
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {dayData.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {currentAudioSrc && (
          <audio
            ref={audioRef}
            key={currentAudioSrc}
            preload="none"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleAudioEnded}
            onError={handleAudioError}
            className="hidden"
          />
        )}
      </div>

      <div>
        {currentAudioSrc && (
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
                  {formatTime(played * duration)}
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
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center py-8 bg-black">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-b from-yellow-500/5 to-transparent rounded-xl p-8">
            <div className="prose prose-invert prose-lg max-w-none">
              {dayData.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {day < 21 && (
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm mb-4">
                {t('continueJourney')}
              </p>
              <Button
                onClick={() => router.push(`/${locale}/challenge/${day + 1}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                {t('nextDay')}
              </Button>
            </div>
          )}

          {day === 21 && (
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-yellow-500/20 to-green-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                  {t('congratulations')}
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  {t('challengeComplete')}
                </p>
                <p className="text-gray-400 text-sm">{t('keepGoing')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pb-8">
          <p className="text-center text-xs text-gray-400 leading-relaxed">
            {disclaimer('spiritualContent')}
          </p>
          <p className="mt-3 text-center text-xs text-gray-500 leading-relaxed">
            {disclaimer('challengeExperience')}
          </p>
        </div>
      </div>
    </div>
  );
}
