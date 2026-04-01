export function formatAudioTime(seconds: number): string {
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
}

export function resolveAudioSourceCandidates(
  audioSrc?: string | string[]
): string[] {
  const sources = Array.isArray(audioSrc) ? audioSrc : audioSrc ? [audioSrc] : [];
  const candidates: string[] = [];

  for (const source of sources) {
    if (!source) {
      continue;
    }

    candidates.push(source);

    if (source.endsWith('.mp3')) {
      candidates.push(source.replace(/\.mp3$/, '.MP3'));
    }

    if (source.endsWith('.MP3')) {
      candidates.push(source.replace(/\.MP3$/, '.mp3'));
    }
  }

  return [...new Set(candidates)];
}
