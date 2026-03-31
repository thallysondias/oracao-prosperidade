export interface CreatePrayerRequestInput {
  profileId?: string | null;
  email: string;
  name: string;
  goal?: string;
  prayerText: string;
}
