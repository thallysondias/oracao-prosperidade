'use client';

import { useTranslations } from 'next-intl';
import { Lock, Play } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  isLocked?: boolean;
  duration?: string;
  tags?: string[];
  onClick?: () => void;
}

export function ProductCard({
  title,
  description,
  image,
  isLocked = false,
  duration = '2-5 minutos',
  tags = [],
  onClick,
}: ProductCardProps) {
  const t = useTranslations('HomePage');

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 p-4 cursor-pointer group flex items-center gap-4 shadow-xl hover:shadow-md transition-shadow "
      onClick={onClick}
    >
      {/* Left Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Tags Pills */}
       {/*  <div className="flex items-center gap-2 mb-3 flex-wrap">
          {tags.length > 0 && tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div> */}

        {/* Title */}
        <h3 className="text-lg/5 font-bold text-foreground  mb-8 max-w-[80%]">{title}</h3>

        {/* Duration */}
        {duration && (
          <div className="items-center gap-1 text-xs text-muted-foreground bg-gray-100 rounded-full px-3 py-1 inline-flex">
            <Play size={14} />
            <span className='font-bold'>Ouvir Oração</span>
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
}
