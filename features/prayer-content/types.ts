import type { Locale } from '@/shared/config/locales';

export interface PrayerContentSection {
  title: string;
  paragraphs: string[];
}

export interface PrayerContentCopy {
  title: string;
  subtitle: string;
  tags: string[];
  sections: PrayerContentSection[];
  closing?: string;
  amen: string;
}

export type LocalizedPrayerContent = Partial<Record<Locale, PrayerContentCopy>>;
