export interface DayPrayer {
  day: number;
  title: string;
  reason: string;
  audioUrl: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
}
