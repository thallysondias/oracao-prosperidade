"use client";

import { useState } from "react";
import { Play, Pause, Lock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useTranslations } from "next-intl";

interface DayPrayer {
  day: number;
  title: string;
  reason: string;
  audioUrl: string;
  isCompleted: boolean;
  isLocked: boolean;
}

// Dados das orações (você pode mover para um arquivo separado depois)
const prayers: DayPrayer[] = [
  {
    day: 1,
    title: "Oração de Abertura do Coração",
    reason: "Para nos prepararmos espiritualmente e abrirmos nosso coração à jornada",
    audioUrl: "/audio/day1.mp3",
    isCompleted: true,
    isLocked: false,
  },
  {
    day: 2,
    title: "Oração pela Fé",
    reason: "Fortalece nossa confiança e crença no divino",
    audioUrl: "/audio/day2.mp3",
    isCompleted: false,
    isLocked: false,
  },
  {
    day: 3,
    title: "Oração pela Gratidão",
    reason: "Nos ensina a reconhecer e agradecer pelas bênçãos recebidas",
    audioUrl: "/audio/day3.mp3",
    isCompleted: false,
    isLocked: true,
  },
  // Adicione os demais dias...
];

// Gerar os 21 dias com dados de exemplo
const generateDays = (): DayPrayer[] => {
  const titles = [
    "Oração de Abertura do Coração",
    "Oração pela Fé",
    "Oração pela Gratidão",
    "Oração pela Paz Interior",
    "Oração pela Proteção",
    "Oração pela Sabedoria",
    "Oração pela Paciência",
    "Oração pela Humildade",
    "Oração pela Caridade",
    "Oração pelo Perdão",
    "Oração pela Esperança",
    "Oração pela Cura",
    "Oração pela Família",
    "Oração pela Prosperidade",
    "Oração pela Força",
    "Oração pela Clareza",
    "Oração pela Libertação",
    "Oração pela Renovação",
    "Oração pela Perseverança",
    "Oração pela União",
    "Oração de Agradecimento Final",
  ];

  const reasons = [
    "Para nos prepararmos espiritualmente e abrirmos nosso coração à jornada",
    "Fortalece nossa confiança e crença no divino",
    "Nos ensina a reconhecer e agradecer pelas bênçãos recebidas",
    "Traz serenidade e tranquilidade para nossa alma",
    "Nos guarda de energias negativas e perigos",
    "Nos orienta nas decisões importantes da vida",
    "Desenvolve a capacidade de esperar com tranquilidade",
    "Nos ensina a ser simples e verdadeiros",
    "Desperta o amor ao próximo e a generosidade",
    "Liberta nosso coração de mágoas e ressentimentos",
    "Renova nossa confiança no futuro",
    "Restaura nossa saúde física, mental e espiritual",
    "Abençoa e protege nossos entes queridos",
    "Atrai abundância e realização em todas as áreas",
    "Nos dá coragem para enfrentar os desafios",
    "Ilumina nosso caminho e nos mostra o propósito",
    "Nos liberta de amarras e limitações",
    "Traz novo ânimo e energia para recomeçar",
    "Nos ajuda a continuar firmes na fé",
    "Fortalece os laços de amor e harmonia",
    "Celebra a jornada e sela nosso compromisso espiritual",
  ];

  // Pegar o dia atual do mês
  const currentDayOfMonth = new Date().getDate();

  return Array.from({ length: 21 }, (_, i) => {
    const dayNumber = i + 1;

    return {
      day: dayNumber,
      title: titles[i],
      reason: reasons[i],
      audioUrl: `/audio/day${dayNumber}.mp3`,
      isCompleted: dayNumber < currentDayOfMonth, // Dias anteriores ao atual estão completos
      isLocked: dayNumber > currentDayOfMonth, // Dias futuros ficam bloqueados
    };
  });
};

export function Challenge21Days() {
  const t = useTranslations("Challenge21");
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const days = generateDays();
  const currentDayOfMonth = new Date().getDate();

  const handlePlayPause = (day: number) => {
    if (currentPlaying === day) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(day);
    }
  };

  const scrollToDay = (day: number) => {
    const element = document.getElementById(`day-${day}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Iniciar reprodução automaticamente
      setTimeout(() => {
        handlePlayPause(day);
      }, 500);
    }
  };

  // Encontrar a oração do dia atual
  const todayPrayer = days.find(d => d.day === currentDayOfMonth);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header com Cardeal */}
      <div className="relative overflow-hidden -mb-2 rounded-t-3xl ">
        {/* Imagem de fundo com overlay */}
        <div className="relative h-80">
          <img
            src="/cardeal/cardeal.png"
            alt="Cardeal Giovanni Battista Re"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay gradient para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
        </div>

        {/* Conteúdo sobre a imagem */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="space-y-3">
            {/* Título principal */}
            <h1 className="text-3xl font-serif font-bold drop-shadow-2xl">
              {t("headerTitle")}
            </h1>

            {/* Informação do Cardeal */}
            <div className="space-y-1">
              <p className="text-base font-medium drop-shadow-lg">
                {t("headerCardinal")} <span className="font-bold">{t("headerCardinalName")}</span>
              </p>
              <p className="text-sm text-gray-200 drop-shadow-md">
                {t("headerCardinalTitle")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-8 bg-black border border-t border-white/30 rounded-b-3xl shadow-xl ">
          <h3 className="text-lg font-semibold text-white">
            {t("challengeTitle")}
          </h3>

          <div className="space-y-3">

            <p className="text-sm text-white/60 leading-relaxed">
              <span className="font-bold">{t("challengeText1")}</span> {t("challengeText1Emphasis")}
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              <span className="font-bold text-yellow-500">{t("challengeText2")}</span> {t("challengeText2Part1")} <span className="font-semibold">{t("challengeText2Desire")}</span> {t("challengeText2Part2")} <span className="font-semibold">{t("challengeText2Conquers")}</span> {t("challengeText2Part3")}
            </p>
            <div className="pt-6 border-t border-amber-200/50">             
              <Button
              onClick={() => scrollToDay(currentDayOfMonth)}
              className="bg-yellow-500 w-full hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {t("listenPrayer")}
            </Button>
            </div>
          </div>
        </div>



      <div className="px-4">
        {/* CTA da Oração do Dia */}
      
          <div className="mb-8 text-center mt-8">
            <p className="text-sm text-yellow-700 italic text-center font-medium">
                "{t("challengeQuote")}"
              </p>
          </div>
       


      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-linear-to-b from-green-600/40 via-green-500/20 to-transparent" />

        {/* Lista de dias */}
        <div className="space-y-6">
          {days.map((prayer, index) => (
            <div
              key={prayer.day}
              id={`day-${prayer.day}`}
              className="relative flex gap-4"
            >
              {/* Círculo do dia */}
              <div className="relative z-10 shrink-0">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  font-bold text-sm transition-all border-2
                  ${prayer.isCompleted
                      ? "bg-green-700 text-white border-green-600 ring-4 ring-green-600/20"
                      : prayer.isLocked
                        ? "bg-gray-300 text-gray-500 border-gray-400"
                        : "bg-green-600 text-white border-green-500 ring-4 ring-green-500/20"
                    }
                `}
                >
                  {prayer.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : prayer.isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    prayer.day
                  )}
                </div>
              </div>

              {/* Card da oração */}
              <div
                className={`
                flex-1 rounded-lg overflow-hidden transition-all relative
                ${prayer.isLocked
                    ? "opacity-60"
                    : "hover:scale-[1.02]"
                  }
              `}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/prayer/oracione.jpeg')`,
                  }}
                />

                {/* Overlay Verde */}
                <div
                  className={`
                    absolute inset-0 bg-linear-to-br 
                    ${prayer.isLocked
                      ? 'from-gray-400/90 to-gray-500/90'
                      : 'from-green-950/90 to-[#16231A]/90'
                    }
                  `}
                />

                {/* Conteúdo */}
                <div className="relative z-10 p-4 space-y-3">
                  {/* Cabeçalho */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-green-400">
                          {t("day")} {prayer.day}
                        </span>
                        {prayer.isCompleted && (
                          <span className="text-xs bg-green-800/60 text-green-300 px-2 py-0.5 rounded-full border border-green-600/30">
                            {t("completed")}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-white text-sm drop-shadow-lg">
                        {prayer.title}
                      </h3>
                    </div>

                    {/* Botão de play */}
                    <Button
                      size="sm"
                      disabled={prayer.isLocked}
                      onClick={() => handlePlayPause(prayer.day)}
                      className={`
                        shrink-0 h-9 w-9 rounded-full p-0 border transition-all
                        ${currentPlaying === prayer.day
                          ? "bg-yellow-500 hover:bg-yellow-600 border-yellow-400 shadow-lg shadow-yellow-500/50"
                          : prayer.isLocked
                            ? "bg-gray-400 border-gray-500"
                            : "bg-yellow-500/90 hover:bg-yellow-500 border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/30"
                        }
                      `}
                    >
                      {currentPlaying === prayer.day ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </Button>
                  </div>

                  {/* Motivo */}
                  <p className="text-xs text-gray-300/90 leading-relaxed">
                    {prayer.reason}
                  </p>

                  {/* Player ativo */}
                  {currentPlaying === prayer.day && !prayer.isLocked && (
                    <div className="pt-2 border-t border-green-700/50">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-green-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-1/3 animate-pulse" />
                        </div>
                        <span className="text-xs text-gray-300">2:45</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé motivacional */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-700 font-medium">
          {t("motivationalFooter")}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {days.filter((d) => d.isCompleted).length} {t("progressText")}
        </p>
      </div>
    </div>
  );
}
