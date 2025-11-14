"use client";

import { useState } from "react";
import { Play, Pause, Lock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

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

  return Array.from({ length: 21 }, (_, i) => ({
    day: i + 1,
    title: titles[i],
    reason: reasons[i],
    audioUrl: `/audio/day${i + 1}.mp3`,
    isCompleted: i === 0, // Apenas o dia 1 completo como exemplo
    isLocked: i > 1, // Dias 3+ bloqueados como exemplo
  }));
};

export function Challenge21Days() {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const days = generateDays();

  const handlePlayPause = (day: number) => {
    if (currentPlaying === day) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(day);
    }
  };

  return (
    <div className="px-4 py-6 pb-20 max-w-2xl mx-auto">
      {/* Introdução */}
      <div className="mb-8 bg-yellow-900/20 border-yellow-700/50 text-yellow-100">
        <div className="space-y-2">
          <p className="font-semibold text-lg">⚠️ Instruções Importantes</p>
          <p className="text-sm leading-relaxed">
            Este é um desafio muito importante e sagrado, respeite-o. Ouça uma
            oração por dia e medite sobre ela por 5 minutos.
          </p>
          <p className="text-sm font-medium text-yellow-200">
            Importante: apenas uma por dia. Não pule etapas.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-linear-to-b from-yellow-500/50 via-yellow-500/30 to-transparent" />

        {/* Lista de dias */}
        <div className="space-y-6">
          {days.map((prayer, index) => (
            <div key={prayer.day} className="relative flex gap-4">
              {/* Círculo do dia */}
              <div className="relative z-10 shrink-0">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  font-bold text-sm transition-all
                  ${
                    prayer.isCompleted
                      ? "bg-green-600 text-white ring-4 ring-green-600/20"
                      : prayer.isLocked
                      ? "bg-gray-700 text-gray-500"
                      : "bg-yellow-600 text-white ring-4 ring-yellow-600/20"
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
              <Card
                className={`
                flex-1 p-4 transition-all
                ${
                  prayer.isLocked
                    ? "bg-gray-900/50 border-gray-800 opacity-60"
                    : "bg-gray-800/80 border-gray-700 hover:border-yellow-600/50"
                }
              `}
              >
                <div className="space-y-3">
                  {/* Cabeçalho */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-yellow-500">
                          Dia {prayer.day}
                        </span>
                        {prayer.isCompleted && (
                          <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">
                            Completo
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-white text-sm">
                        {prayer.title}
                      </h3>
                    </div>

                    {/* Botão de play */}
                    <Button
                      size="sm"
                      disabled={prayer.isLocked}
                      onClick={() => handlePlayPause(prayer.day)}
                      className={`
                        shrink-0 h-9 w-9 rounded-full p-0
                        ${
                          currentPlaying === prayer.day
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-gray-700 hover:bg-gray-600"
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
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {prayer.reason}
                  </p>

                  {/* Player ativo */}
                  {currentPlaying === prayer.day && !prayer.isLocked && (
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 w-1/3 animate-pulse" />
                        </div>
                        <span className="text-xs text-gray-500">2:45</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé motivacional */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-400">
          Continue firme na sua jornada espiritual 🙏
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {days.filter((d) => d.isCompleted).length} de 21 dias completos
        </p>
      </div>
    </div>
  );
}
