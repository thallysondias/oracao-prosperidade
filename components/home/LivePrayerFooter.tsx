'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Radio, Clock } from 'lucide-react';

export const LivePrayerFooter = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('LivePrayer');
  const [isLive, setIsLive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const checkLiveStatus = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      
      // Live is open from :30 to :59 of each hour
      const isCurrentlyLive = minutes <= 30;
      setIsLive(isCurrentlyLive);

      if (isCurrentlyLive) {
        // Calculate time until next hour
        const secondsUntilNextHour = (60 - minutes - 1) * 60 + (60 - now.getSeconds());
        const minutesLeft = Math.floor(secondsUntilNextHour / 60);
        const secondsLeft = secondsUntilNextHour % 60;
        setTimeRemaining(`${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`);
      } else {
        // Calculate time until :30 of current hour
        const secondsUntil30 = (30 - minutes - 1) * 60 + (60 - now.getSeconds());
        const minutesLeft = Math.floor(secondsUntil30 / 60);
        const secondsLeft = secondsUntil30 % 60;
        setTimeRemaining(`${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`);
      }
    };

    // Check immediately
    checkLiveStatus();

    // Update every second
    const interval = setInterval(checkLiveStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (isLive) {
      router.push(`/${locale}/live-prayer`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-yellow-500/20 transition-all ${
        isLive 
          ? 'bg-linear-to-r from-green-900/95 to-green-800/95 cursor-pointer hover:from-green-900 hover:to-green-800' 
          : 'bg-black/95'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Status */}
          <div className="flex items-center gap-3">
            {isLive ? (
              <>
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm uppercase tracking-wide">
                    {t('live')}
                  </span>
                  <span className="text-green-300 text-xs">
                    {t('clickToJoin')}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Clock className="h-5 w-5 text-yellow-500" />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">
                    {t('nextLive')}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {t('comingSoon')}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Right side - Timer/Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`font-mono text-2xl font-bold ${
                isLive ? 'text-white' : 'text-yellow-500'
              }`}>
                {timeRemaining}
              </div>
              <div className="text-xs text-gray-400">
                {isLive ? t('timeRemaining') : t('startsIn')}
              </div>
            </div>
            
            <div className={`p-2 rounded-full ${
              isLive ? 'bg-green-500/20' : 'bg-yellow-500/20'
            }`}>
              <Radio className={`h-5 w-5 ${
                isLive ? 'text-green-400' : 'text-yellow-500'
              }`} />
            </div>
          </div>
        </div>

        {/* Progress bar when live */}
        {isLive && (
          <div className="mt-2 w-full bg-green-950/50 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-1000 ease-linear"
              style={{ 
                width: `${((30 - parseInt(timeRemaining.split(':')[0])) / 30) * 100}%` 
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePrayerFooter;
