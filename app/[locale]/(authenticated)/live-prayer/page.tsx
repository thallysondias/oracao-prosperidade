'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Radio, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prayerRequests from '@/lib/prayer-requests.json';

interface PrayerRequest {
  id: number;
  name: string;
  avatar: string;
  request: string;
}

interface ChatMessage extends PrayerRequest {
  timestamp: Date;
}

export default function LivePrayerPage() {
  const router = useRouter();
  const t = useTranslations('LivePrayerPage');
  const [viewerCount, setViewerCount] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const usedRequestsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Simulate viewer count
    const randomViewers = Math.floor(Math.random() * 500) + 100;
    setViewerCount(randomViewers);

    // Check if live is active
    const checkLiveStatus = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const isCurrentlyLive = minutes <= 30;
      setIsLive(isCurrentlyLive);

      if (isCurrentlyLive) {
        const secondsUntilNextHour = (60 - minutes - 1) * 60 + (60 - now.getSeconds());
        const minutesLeft = Math.floor(secondsUntilNextHour / 60);
        const secondsLeft = secondsUntilNextHour % 60;
        setTimeRemaining(`${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 1000);

    // Simulate viewer count changes
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 4);
    }, 5000);

    // Add random prayer requests to chat
    const addRandomMessage = () => {
      // Reset used requests if all have been used
      if (usedRequestsRef.current.size >= prayerRequests.length) {
        usedRequestsRef.current.clear();
      }

      // Get available requests
      const availableRequests = prayerRequests.filter(
        req => !usedRequestsRef.current.has(req.id)
      );

      if (availableRequests.length > 0) {
        const randomRequest = availableRequests[
          Math.floor(Math.random() * availableRequests.length)
        ];

        usedRequestsRef.current.add(randomRequest.id);

        setChatMessages(prev => [
          ...prev,
          { ...randomRequest, timestamp: new Date() }
        ]);
      }
    };

    // Add initial messages
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addRandomMessage(), i * 1000);
    }

    // Add new message every 3-8 seconds
    const chatInterval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * 5000) + 3000;
      setTimeout(addRandomMessage, randomDelay);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(viewerInterval);
      clearInterval(chatInterval);
    };
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  if (isLive) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center px-4">
          <Radio className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('notLiveYet')}</h1>
          <p className="text-gray-400 mb-6">{t('waitForNextLive')}</p>
          <Button onClick={() => router.back()} variant="outline">
            {t('goBack')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-yellow-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="text-white hover:text-gray-300 transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              </div>
              <span className="text-sm font-bold uppercase tracking-wide text-red-500">
                {t('live')}
              </span>
              <span className="text-gray-400 text-sm">•</span>
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">{viewerCount.toLocaleString()}</span>
            </div>

            <div className="w-6" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Video/Stream Container */}
        <div className="relative aspect-video bg-gradient-to-br from-yellow-900/20 to-black rounded-lg overflow-hidden mb-6 border border-yellow-500/20">
          {/* Placeholder for video stream */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Radio className="h-16 w-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">{t('prayerInProgress')}</h2>
              <p className="text-gray-400">{t('connectingToStream')}</p>
            </div>
          </div>

          {/* Live badge */}
          <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase">{t('live')}</span>
          </div>

          {/* Timer */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded-full">
            <span className="text-sm font-mono">{timeRemaining}</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-400">{t('description')}</p>
        </div>

        {/* Chat de Pedidos de Oração */}
        <div className="bg-white/5 rounded-lg border border-yellow-500/20 overflow-hidden">
          <div className="bg-yellow-900/20 px-4 py-3 border-b border-yellow-500/20">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Radio className="h-5 w-5 text-yellow-500" />
              {t('prayerRequests')}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{t('prayerRequestsSubtitle')}</p>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="h-96 overflow-y-auto p-4 space-y-4 bg-black/20"
          >
            {chatMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>{t('waitingForRequests')}</p>
              </div>
            ) : (
              chatMessages.map((message, index) => (
                <div 
                  key={`${message.id}-${index}`}
                  className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  {/* Avatar */}
                  <img 
                    src={message.avatar} 
                    alt={message.name}
                    className="w-10 h-10 rounded-full shrink-0 border-2 border-yellow-500/30"
                  />
                  
                  {/* Message */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-yellow-500 text-sm">
                        {message.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed break-words">
                      {message.request}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Footer */}
          <div className="bg-yellow-900/20 px-4 py-3 border-t border-yellow-500/20">
            <p className="text-xs text-gray-400 text-center">
              {t('chatInfo')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
