'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Play, Pause, ChevronDown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

const getDayData = (day: number) => {
  const titles = [
    'Un comienzo con presencia',
    'Soltar el peso del dia',
    'Escuchar el cansancio interior',
    'Nombrar lo que siento',
    'Dar espacio a la verdad',
    'Reconocer lo que permanece',
    'Respirar con mas calma',
    'Abrirme a la reflexion',
    'Mirar mi historia con honestidad',
    'Dejar atras viejos impulsos',
    'Comprender mis necesidades',
    'Cuidar lo que llevo dentro',
    'Abrirme al discernimiento',
    'Salir de patrones repetidos',
    'Oracion por la fortaleza',
    'Oracion por la claridad',
    'Oracion por la calma interior',
    'Oracion por la renovacion del animo',
    'Oracion por la constancia',
    'Oracion por la convivencia',
    'Oracion final de gratitud',
  ];

  const texts = [
    `Hoy comienza este recorrido de 21 dias. Esta oracion te invita a empezar con calma, presencia y apertura interior.\n\nNo se trata de prometer resultados, sino de crear un ritmo de oracion y reflexion que pueda acompanarte paso a paso.\n\nRespira, haz una pausa y disponete a vivir este camino con sencillez.`,
    `El segundo dia propone reconocer el peso que traes contigo.\n\nPoner nombre a las preocupaciones ya es una forma de mirarlas con mas honestidad y menos ruido.\n\nDeja que esta oracion te acompane a soltar un poco de la tension del dia.`,
    `Hoy la invitacion es escuchar el cansancio que muchas veces pasa desapercibido.\n\nQuizas no necesitas responder a todo de inmediato, sino darte un momento para detenerte y respirar.\n\nQue esta oracion sea una pausa de cuidado interior.`,
    `En este cuarto dia, la propuesta es nombrar lo que sientes sin juzgarte.\n\nReconocer una emocion con honestidad puede abrir espacio para vivirla con mas serenidad.\n\nPermanece en esta oracion con humildad y paciencia.`,
    `A veces guardamos demasiado por dentro. Hoy puedes ofrecer ese espacio interior a la reflexion y a la escucha.\n\nNo hace falta forzar respuestas; basta con permanecer disponible.\n\nQue esta oracion te ayude a habitar tu verdad con calma.`,
    `El sexto dia invita a mirar lo que aun permanece en tu interior: deseos, preocupaciones, recuerdos y aprendizajes.\n\nTodo eso forma parte de tu historia y puede ser acogido con mas claridad.\n\nPermite que esta oracion te acompanhe en esa mirada.`,
    `Hoy el foco esta en la respiracion y en la calma.\n\nCuando el dia pesa, volver al silencio puede ayudar a recuperar equilibrio.\n\nQue esta oracion te ofrezca un momento de descanso interior.`,
    `Este dia propone abrirte a la reflexion con mas honestidad.\n\nNo para exigirte cambios inmediatos, sino para observar tu camino con mayor conciencia.\n\nDeja que la oracion te sostenga en ese proceso.`,
    `Mirar la propia historia con sinceridad requiere valor y mansedumbre.\n\nHoy puedes revisar tus decisiones, tus rutinas y tus prioridades con una mirada mas compasiva.\n\nQue esta oracion te ayude a hacerlo sin dureza.`,
    `En el decimo dia, la invitacion es dejar atras impulsos o habitos que ya no te hacen bien.\n\nA veces el cambio empieza con una pequena eleccion cotidiana.\n\nPermanece en esta oracion con apertura y paciencia.`,
    `Hoy puedes prestar atencion a lo que realmente necesitas.\n\nTal vez no sea una solucion inmediata, sino mas claridad para atravesar el presente.\n\nQue esta oracion te ayude a escuchar eso con serenidad.`,
    `Cuidar lo que llevas dentro tambien es una forma de fe.\n\nEn este dia, date permiso para hacer una pausa y atender tu mundo interior con respeto.\n\nQue la oracion te recuerde el valor de ese cuidado.`,
    `El dia trece invita al discernimiento.\n\nMirar con mas profundidad lo que vives puede ayudarte a elegir mejor tus proximos pasos.\n\nQue esta oracion te acompanhe con calma en esa busqueda.`,
    `Hoy es momento de reconocer patrones que se repiten y que quizas ya no quieres sostener.\n\nNombrarlos con claridad puede ser el inicio de un camino mas consciente.\n\nQue esta oracion fortalezca tu disposicion para seguir aprendiendo.`,
    `En este dia rezamos por fortaleza interior.\n\nNo una fuerza ruidosa, sino la constancia serena que permite seguir adelante.\n\nQue esta oracion te recuerde que tambien puedes avanzar de forma simple y fiel.`,
    `La claridad muchas veces nace del silencio y de la pausa.\n\nHoy la invitacion es escuchar con mas atencion lo que tu vida necesita en este momento.\n\nQue esta oracion te ayude a dar espacio a esa comprension.`,
    `Este dia esta dedicado a la calma interior.\n\nCuando la mente se acelera, la oracion puede convertirse en un ancla para volver al presente.\n\nRespira y deja que este contenido te acompanhe con suavidad.`,
    `La renovacion del animo puede comenzar en gestos pequenos: descansar mejor, hablar con mas bondad, volver a lo esencial.\n\nHoy la oracion te invita a valorar esos movimientos discretos.\n\nQue encuentres en ellos una fuente de aliento.`,
    `La constancia se construye dia a dia.\n\nEste recorrido no busca perfeccion, sino presencia y fidelidad en lo pequeno.\n\nQue esta oracion te anime a continuar con paciencia.`,
    `Hoy rezamos por la convivencia y por los vinculos cotidianos.\n\nQue puedas acercarte a los demas con mas escucha, respeto y disposicion al dialogo.\n\nQue esta oracion te inspire a cuidar mejor esas relaciones.`,
    `Llegamos al ultimo dia con gratitud.\n\nEste cierre no promete resultados; celebra el tiempo dedicado a la oracion, a la escucha y a la reflexion.\n\nQue lo vivido en este camino pueda acompanarte mas alla de este desafio.`,
  ];

  return {
    title: titles[day - 1] || 'Oracion del dia',
    text: texts[day - 1] || 'Texto de la oracion no disponible.',
    audioUrl: `/desafio/dia${day}.MP3`,
  };
};

export default function ChallengeDayPage() {
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('Challenge21');
  const disclaimer = useTranslations('AppDisclaimer');
  const user = useAuthStore((state) => state.user);
  const purchases = user?.purchases;

  const day = parseInt(params.day as string);
  const dayData = getDayData(day);

  const challengePurchase = useMemo(() => {
    if (!purchases) return null;
    return purchases.find(
      (p) =>
        p.product_name === '21 Días de Oración y Milagros en Vivo' &&
        p.status === 'approved'
    );
  }, [purchases]);

  const dayUnlocked = useMemo(() => {
    if (!challengePurchase?.purchased_at) return false;

    const purchaseDate = new Date(challengePurchase.purchased_at);
    const today = new Date();
    const daysSincePurchase =
      Math.floor(
        (today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    return day <= daysSincePurchase;
  }, [challengePurchase, day]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!challengePurchase || !dayUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-full mb-4">
              <Lock className="h-10 w-10 text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {t('dayLocked', { day })}
            </h1>
            <p className="text-gray-400">
              {!challengePurchase ? t('needPurchase') : t('dayNotUnlocked')}
            </p>
          </div>
          <Button
            onClick={() => router.back()}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            {t('backToChallenge')}
          </Button>
        </div>
      </div>
    );
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    if (videoRef.current) {
      videoRef.current.currentTime = newPlayed * duration;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setPlayed(videoRef.current.currentTime / duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds: number): string => {
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
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black text-white border-b border-yellow-500/20">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="text-white hover:text-gray-300 transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-white text-sm font-medium">
              {t('dayPageTitle', { day })}
            </span>
            <div className="w-6" />
          </div>

          <div className="mb-8">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/cardeal/cardeal.png"
                alt={`Dia ${day}`}
                width={400}
                height={400}
                className="w-full h-full object-cover aspect-square object-top"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-yellow-500 text-sm font-medium mb-1">
                  {t('dayLabel', { day })}
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {dayData.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <video
          ref={videoRef}
          src={dayData.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      </div>

      <div>
        <div className="sticky top-0 z-50 bg-black border-b border-yellow-500/20 px-4 py-2">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handlePlayPause}
              className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-2 transition transform hover:scale-105 shrink-0"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-1" />
              )}
            </button>

            <div className="flex items-center justify-between gap-2 flex-1">
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatTime(played * duration)}
              </span>
              <input
                type="range"
                min="0"
                max="0.999999"
                step="any"
                value={played}
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer accent-yellow-500"
              />
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-8 bg-black">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-b from-yellow-500/5 to-transparent rounded-xl p-8">
            <div className="prose prose-invert prose-lg max-w-none">
              {dayData.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {day < 21 && (
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm mb-4">
                {t('continueJourney')}
              </p>
              <Button
                onClick={() => router.push(`/${locale}/challenge/${day + 1}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                {t('nextDay')}
              </Button>
            </div>
          )}

          {day === 21 && (
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-yellow-500/20 to-green-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                  {t('congratulations')}
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  {t('challengeComplete')}
                </p>
                <p className="text-gray-400 text-sm">{t('keepGoing')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pb-8">
          <p className="text-center text-xs text-gray-400 leading-relaxed">
            {disclaimer('spiritualContent')}
          </p>
          <p className="mt-3 text-center text-xs text-gray-500 leading-relaxed">
            {disclaimer('challengeExperience')}
          </p>
        </div>
      </div>
    </div>
  );
}
