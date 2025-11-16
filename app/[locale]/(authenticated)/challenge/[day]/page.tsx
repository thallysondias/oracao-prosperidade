'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Play, Pause, ChevronDown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';

// Dados dos dias
const getDayData = (day: number) => {
  const titles = [
    "Cuando el alma decide comenzar",
    "El peso que empieza a soltarse",
    "El cansancio que mi alma no dijo",
    "La emoción que regresó para ser sanada",
    "La emoción que intenta salir",
    "Lo que aún vive dentro de mí",
    "Lo que pesa en el pecho",
    "La grieta que por fin se abrió",
    "La verdad que siempre evité",
    "Lo que empieza a romperse por dentro",
    "La razón detrás de mi dolor",
    "La herida que ya no puede ocultarse",
    "Lo que Dios quiere mostrarme",
    "El ciclo que debo romper",
    "Oração pela Força",
    "Oração pela Clareza",
    "Oração pela Libertação",
    "Oração pela Renovação",
    "Oração pela Perseverança",
    "Oração pela União",
    "Oração de Agradecimento Final",
  ];

  const texts = [
    `Hoy es el primer día de tu transformación espiritual. Esta oración marca el momento en que tu alma toma la decisión consciente de cambiar, de abrirse a la prosperidad divina y de comenzar un viaje de 21 días que revolucionará tu vida.\n\nCuando cierras los ojos y escuchas estas palabras sagradas, algo profundo sucede en tu alma. Los bloqueos invisibles comienzan a deshacerse, las cadenas espirituales comienzan a romperse, y una nueva energía comienza a fluir en tu vida.\n\nEsta no es solo una oración. Es un compromiso contigo mismo, con Dios, y con el futuro próspero que se está construyendo desde este momento.`,
    
    `En el segundo día, comienzas a sentir el peso que has cargado solo. ¿Cuántas preocupaciones financieras? ¿Cuántas noches sin dormir pensando en cuentas? ¿Cuánto estrés acumulado?\n\nEsta oración fue creada especialmente para que liberes ese peso. Para que entiendas que no necesitas cargar todo solo. Que existe una fuerza mayor, una providencia divina, lista para sostenerte a ti y a tu familia.\n\nPermítete sentir alivio. Permítete entregar tus preocupaciones a Dios.`,
    
    `El tercer día toca algo profundo: el cansancio que nunca dijiste en voz alta. Ese agotamiento mental, emocional y espiritual que escondes de todos.\n\nEsta oración reconoce tu lucha. Honra tu esfuerzo. Y trae renovación para tu alma cansada. No estás solo en esta batalla. Y hoy, recibirás fuerza para continuar.`,
    
    `El día 4 es sobre sanación emocional. Esas emociones antiguas que regresaron no por casualidad - regresaron para ser finalmente sanadas y liberadas.\n\nRencores antiguos, decepciones guardadas, dolores que pensaste que habías superado. Esta oración trae el bálsamo celestial para sanar estas heridas de una vez por todas.`,
    
    `En el quinto día, algo quiere salir de dentro de ti. Una emoción reprimida, una verdad no dicha, un sueño olvidado.\n\nEsta oración crea el espacio sagrado para que puedas liberar lo que necesita ser liberado. Sin juicio, sin miedo, solo el permiso divino para ser auténtico.`,
    
    `El día 6 revela lo que aún vive dentro de tu corazón. Sueños dormidos, deseos profundos, la persona que siempre quisiste ser pero tuviste miedo de convertirte.\n\nEsta oración despierta esas verdades interiores y les da permiso para florecer.`,
    
    `El séptimo día aborda ese peso en el pecho que sientes pero no puedes explicar. Es ansiedad, es preocupación, es el miedo al futuro.\n\nEsta oración trae alivio físico y espiritual, disolviendo esa presión y reemplazándola con paz.`,
    
    `En el octavo día, la grieta finalmente se abre. Las defensas caen. La vulnerabilidad surge. Y es en este momento de honestidad total que la verdadera sanación comienza.\n\nEsta oración te sostiene mientras te abres al proceso de transformación profunda.`,
    
    `El día 9 te invita a enfrentar la verdad que siempre evitaste. Esa realidad difícil sobre tu vida financiera, tus relaciones, tus elecciones.\n\nEsta oración te da valor para mirar de frente y aún así mantener la fe de que todo puede cambiar.`,
    
    `En el décimo día, reconoces lo que se está rompiendo por dentro. Viejos patrones, creencias limitantes, comportamientos autosaboteadores.\n\nEsta oración acelera ese proceso de ruptura, para que lo nuevo pueda nacer.`,
    
    `El día 11 revela la verdadera razón detrás de tu dolor. No es solo falta de dinero, no es solo soledad - es algo más profundo que finalmente sale a la luz.\n\nEsta oración ilumina esa comprensión y trae sabiduría para lidiar con ella.`,
    
    `En el décimo segundo día, la herida que escondiste de todos (incluso de ti mismo) ya no puede esconderse más. Necesita ser vista, reconocida, tratada.\n\nEsta oración trae la medicina espiritual necesaria para comenzar la verdadera sanación.`,
    
    `El día 13 es el punto de inflexión. Dios quiere mostrarte algo importante sobre tu vida, tu propósito, tu futuro.\n\nEsta oración abre tus ojos espirituales para ver lo que lo Divino quiere revelarte.`,
    
    `En el décimo cuarto día, identificas el ciclo que necesita ser roto. Ese patrón repetitivo de fracaso financiero, de relaciones tóxicas, de autosabotaje.\n\nEsta oración te da el poder espiritual para romper ese ciclo de una vez por todas.`,
    
    `El día 15 trae la oración por la fuerza. Ahora que pasaste por la fase de revelación y ruptura, necesitas fuerza para reconstruir.\n\nEsta oración te reviste con la armadura espiritual necesaria para continuar firme.`,
    
    `En el décimo sexto día, recibes claridad. Claridad sobre tus próximos pasos, sobre las decisiones que necesitas tomar, sobre el camino adelante.\n\nEsta oración remueve la niebla de la confusión e ilumina tu camino.`,
    
    `El día 17 es sobre liberación total. Liberación de deudas espirituales, de ataduras emocionales, de prisiones mentales.\n\nEsta oración declara tu libertad en todas las áreas de la vida.`,
    
    `En el décimo octavo día, viene la renovación. Energías renovadas, esperanza renovada, fe renovada.\n\nEsta oración restaura lo que se perdió y multiplica lo que permaneció.`,
    
    `El día 19 fortalece tu perseverancia. Porque el viaje no termina en el día 21 - apenas está comenzando.\n\nEsta oración te prepara para mantener la disciplina espiritual después del desafío.`,
    
    `En el vigésimo día, oras por la unión. Unión familiar, unión en relaciones, unión con Dios.\n\nEsta oración teje los hilos de conexión que crean una vida próspera y feliz.`,
    
    `Día 21 - el último día. La oración de agradecimiento y sellamiento. Agradeces por el viaje, celebras la transformación, y sellas los resultados que vendrán.\n\nEsta oración final te marca como alguien que completó el desafío y está listo para cosechar los frutos de la disciplina espiritual.`,
  ];

  return {
    title: titles[day - 1] || "Oracion del día",
    text: texts[day - 1] || "Texto de la oración no disponible.",
    audioUrl: `/desafio/dia${day}.MP3`,
  };
};

export default function ChallengeDayPage() {
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('Challenge21');
  const user = useAuthStore((state) => state.user);
  
  const day = parseInt(params.day as string);
  const dayData = getDayData(day);

  // Verificar se o usuário comprou o desafio
  const challengePurchase = useMemo(() => {
    if (!user?.purchases) return null;
    return user.purchases.find(
      (p) => p.product_name === "21 Días de Oración y Milagros en Vivo" && p.status === "approved"
    );
  }, [user?.purchases]);

  // Calcular se o dia está liberado
  const dayUnlocked = useMemo(() => {
    if (!challengePurchase?.purchased_at) return false;
    
    const purchaseDate = new Date(challengePurchase.purchased_at);
    const today = new Date();
    const daysSincePurchase = Math.floor((today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return day <= daysSincePurchase;
  }, [challengePurchase, day]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Se não comprou ou dia bloqueado, mostrar tela de bloqueio
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
              {!challengePurchase 
                ? t('needPurchase')
                : t('dayNotUnlocked')}
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
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Player Section */}
      <div className="bg-black text-white border-b border-yellow-500/20">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          {/* Header with back button */}
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

          {/* Album Art - Cardinal Image */}
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

          {/* Song Info */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-yellow-500 text-sm font-medium mb-1">
                  {t('dayLabel', { day })}
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {dayData.title}
                </h1>
                <p className="text-gray-300 text-sm">
                  {t('cardinalName')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden video element */}
        <video
          ref={videoRef}
          src={dayData.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      </div>

      {/* Prayer Text Section */}
      <div>
        {/* Sticky Controls + Progress Bar */}
        <div className="sticky top-0 z-50 bg-black border-b border-yellow-500/20 px-4 py-2">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            {/* Play Button */}
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

            {/* Progress Bar */}
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

        {/* Animated Down Arrow */}
        <div className="flex justify-center py-8 bg-black">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        {/* Prayer Text Content */}
        <div className="max-w-2xl mx-auto px-4 pb-12">
          <div className="bg-gradient-to-b from-yellow-500/5 to-transparent rounded-xl p-8">
            <h2 className="text-xl font-bold text-yellow-500 mb-6 text-center">
              {t('reflectionTitle', { day })}
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              {dayData.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Navigation to next day */}
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
                <p className="text-gray-400 text-sm">
                  {t('keepGoing')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
