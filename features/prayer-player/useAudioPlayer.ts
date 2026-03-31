'use client';

import { useRef, useState } from 'react';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(600);
  const [played, setPlayed] = useState(0);

  const handlePlayPause = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
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
