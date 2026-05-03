'use client';

import { useRef, useState } from 'react';

import { resolveAudioAssetUrl } from '@/features/prayer-player/utils';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(600);
  const [played, setPlayed] = useState(0);

  const handlePlayPause = (audioSrc?: string) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const resolvedAudioSrc = audioSrc ? resolveAudioAssetUrl(audioSrc) : undefined;

      if (resolvedAudioSrc && audio.getAttribute('src') !== resolvedAudioSrc) {
        audio.src = resolvedAudioSrc;
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
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayed = parseFloat(event.target.value);
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

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return {
    audioRef,
    isPlaying,
    duration,
    played,
    handleEnded,
    handleLoadedMetadata,
    handlePlayPause,
    handleProgressChange,
    handleTimeUpdate,
  };
}
