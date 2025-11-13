'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Lock, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id?: number;
  title: string;
  description: string;
  image: string;
  isLocked?: boolean;
  duration?: string;
  tags?: string[];
  onClick?: () => void;
}

export function ProductCard({
  id,
  title,
  description,
  image,
  isLocked = false,
  duration = '2-5 minutos',
  tags = [],
  onClick,
}: ProductCardProps) {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  const cardContent = (
    <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 p-4 group flex items-center gap-4 shadow-xl hover:shadow-md transition-shadow">
      {/* Left Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Title */}
        <h3 className="text-lg/5 font-bold text-foreground mb-8 max-w-[80%]">{title}</h3>

        {/* Duration */}
        {duration && (
          <div className="items-center gap-1 text-xs text-muted-foreground bg-gray-100 rounded-full px-3 py-1 inline-flex">
            <Play size={14} />
            <span className="font-bold">Ouvir Oração</span>
            <span>- {duration}</span>
          </div>
        )}
      </div>

      {/* Right Image */}
      <div className="relative w-24 h-24 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-2">
          <Lock className="h-8 w-8 text-white" />
          <p className="text-white font-medium text-xs text-center">{t('unlockNow')}</p>
        </div>
      )}
    </div>
  );

  // Locked items: no link
  if (isLocked || !id) {
    return cardContent;
  }

  // Unlocked items: wrapped in Link
  const href = `/${locale}/pray/${id}`;

  return (
    <Link href={href} onClick={onClick}>
      {cardContent}
    </Link>
  );
}
