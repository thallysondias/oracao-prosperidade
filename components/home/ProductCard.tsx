'use client';

import { useTranslations } from 'next-intl';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  isLocked?: boolean;
  onClick?: () => void;
}

export function ProductCard({
  title,
  description,
  image,
  isLocked = false,
  onClick,
}: ProductCardProps) {
  const t = useTranslations('HomePage');

  return (
    <div
      className="relative rounded-xl overflow-hidden h-40 cursor-pointer group"
      onClick={onClick}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <h3 className="text-white font-bold text-xl">{title}</h3>
        <p className="text-white/80 text-sm line-clamp-1">{description}</p>
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
          <Lock className="h-12 w-12 text-white" />
          <p className="text-white font-medium text-center">{t('unlockNow')}</p>
        </div>
      )}
    </div>
  );
}
