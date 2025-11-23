"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { Lock, CheckCircle2, ShoppingCart, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface DayPrayer {
  day: number;
  title: string;
  reason: string;
  audioUrl: string;
  isCompleted: boolean;
  isLocked: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
}

// Depoimentos reais e comoventes
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María Guadalupe Fernández",
    location: "Ciudad de México, México",
    image: "https://i.pravatar.cc/150?img=5",
    text: "Comencé sin mucha fe, pero en el día 7 sentí una paz que nunca había experimentado. En el día 14, recibí una propuesta de trabajo inesperada que cambió mi situación financiera. Hoy, en el día 21, soy otra persona. Mi vida fue completamente transformada por la disciplina espiritual.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carla Alberto Rodríguez",
    location: "Buenos Aires, Argentina",
    image: "https://i.pravatar.cc/150?img=41",
    text: "Estaba desempleado hace 8 meses y con deudas acumuladas. Decidí hacer el desafío sin expectativas. A partir del día 10, las oportunidades comenzaron a aparecer. Hoy tengo un empleo mejor de lo que imaginé y las deudas están siendo pagadas. ¡Esto funciona de verdad!",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Patricia Morales",
    location: "Guadalajara, México",
    image: "https://i.pravatar.cc/150?img=9",
    text: "Mi matrimonio estaba por un hilo y me sentía completamente perdida. Las oraciones del Cardenal Giovanni tocaron mi corazón de una forma que no puedo explicar. Mi esposo comenzó a cambiar, yo comencé a cambiar. Hoy, renovamos nuestros votos y nuestra familia está unida nuevamente.",
    rating: 5,
  },
  {
    id: 4,
    name: "José Luis Ramírez",
    location: "Monterrey, México",
    image: "https://i.pravatar.cc/150?img=15",
    text: "Sufría de ansiedad y depresión durante años. Los médicos me decían que era crónico. Hice el desafío por recomendación de una amiga. Cada oración traía un alivio profundo. Hoy ya no tomo medicamentos y duermo en paz todas las noches. Fue un milagro en mi vida.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lucía Fernanda Torres",
    location: "Bogotá, Colombia",
    image: "https://i.pravatar.cc/150?img=20",
    text: "Tenía un problema de salud serio que los médicos no lograban diagnosticar. Comencé el desafío pidiendo por sanación. En el día 12, los síntomas comenzaron a disminuir. Hice nuevos exámenes y los médicos quedaron sorprendidos - estaba completamente curada. ¡Solo tengo gratitud!",
    rating: 5,
  },
];

// Gerar os 21 dias com dados de exemplo
const generateDays = (purchaseDate?: Date): DayPrayer[] => {
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

  const reasons = [
    "O momento em que sua alma toma a decisão de transformar",
    "Liberte-se do peso que tem carregado sozinho",
    "Reconheça o cansaço profundo que você nunca expressou",
    "Permita que emoções antigas retornem para serem curadas",
    "Deixe sair a emoção que está tentando se libertar",
    "Descubra o que ainda vive dentro do seu coração",
    "Alivie o peso que oprime seu peito",
    "Permita que a rachadura finalmente se abra para a cura",
    "Enfrente a verdade que você sempre evitou",
    "Reconheça o que está se quebrando por dentro",
    "Descubra a verdadeira razão por trás da sua dor",
    "Veja a ferida que não pode mais se esconder",
    "Ouça o que Deus quer revelar a você",
    "Rompa o ciclo que precisa ser quebrado",
    "Nos dá coragem para enfrentar os desafios",
    "Ilumina nosso caminho e nos mostra o propósito",
    "Nos liberta de amarras e limitações",
    "Traz novo ânimo e energia para recomeçar",
    "Nos ajuda a continuar firmes na fé",
    "Fortalece os laços de amor e harmonia",
    "Celebra a jornada e sela nosso compromisso espiritual",
  ];

  // Se não tem data de compra, tudo fica bloqueado
  if (!purchaseDate) {
    return Array.from({ length: 21 }, (_, i) => ({
      day: i + 1,
      title: titles[i],
      reason: reasons[i],
      audioUrl: `/desafio/dia${i + 1}.mp3`,
      isCompleted: false,
      isLocked: true,
    }));
  }

  // Calcular quantos dias se passaram desde a compra
  const today = new Date();
  const timeDiff = today.getTime() - purchaseDate.getTime();
  const daysSincePurchase = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir o dia da compra

  return Array.from({ length: 21 }, (_, i) => {
    const dayNumber = i + 1;

    return {
      day: dayNumber,
      title: titles[i],
      reason: reasons[i],
      audioUrl: `/desafio/dia${dayNumber}.mp3`,
      isCompleted: dayNumber < daysSincePurchase, // Dias anteriores ao atual estão completos
      isLocked: dayNumber > daysSincePurchase, // Dias futuros ficam bloqueados
    };
  });
};

// Componente de Slider de Depoimentos
function TestimonialsSlider() {
  const t = useTranslations("Challenge21");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] min-w-0 md:flex-[0_0_90%]"
            >
              <Card className="p-6 bg-white border-2 border-yellow-200 shadow-lg">
                {/* Header com foto e info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover aspect-square"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>

                {/* Depoimento */}
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dots de navegação */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "w-8 bg-yellow-500"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={t("testimonialAriaLabel", { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
}

export function Challenge21Days() {
  const t = useTranslations("Challenge21");
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const locale = useLocale();
  
  // Verificar se o usuário comprou o desafio
  const challengePurchase = useMemo(() => {
    if (!user?.purchases) return null;
    
    return user.purchases.find(
      (p) => p.product_name === "21 Días de Oración y Milagros en Vivo" && p.status === "approved"
    );
  }, [user?.purchases]);

  // Extrair a data de compra se existir
  const purchaseDate = useMemo(() => {
    if (!challengePurchase) return undefined;
    
    const purchase = user?.purchases.find(
      (p) => p.product_name === "21 Días de Oración y Milagros en Vivo"
    ) as any;
    
    if (purchase?.purchased_at) {
      return new Date(purchase.purchased_at);
    }
    
    return undefined;
  }, [challengePurchase, user]);

  const hasPurchased = !!challengePurchase;
  const days = generateDays(purchaseDate);
  
  // Encontrar o dia atual do desafio
  const currentChallengeDay = days.find(d => !d.isCompleted && !d.isLocked)?.day || 1;

  const handleDayClick = (day: number, isLocked: boolean) => {
    if (!isLocked) {
      router.push(`/${locale}/challenge/${day}`);
    }
  };

  // Se não comprou, mostrar CTA de compra
  if (!hasPurchased) {
    return (
      <div className="mx-auto p-4">
        {/* Header com Cardeal */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="relative h-96">
            <img
              src="/cardeal/cardeal.png"
              alt="Cardeal Giovanni Battista Re"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl font-serif font-bold drop-shadow-2xl leading-tight">
                {t("ctaTitle")}
              </h1>
              <p className="text-lg text-gray-200 drop-shadow-lg">
                {t("ctaSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Conteúdo de venda emocional */}
        <div className="mt-8 space-y-8 px-4">
          {/* Texto comovente */}
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("ctaHeading")}
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("ctaParagraph1")}
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              {t("ctaParagraph2")}
            </p>

            <p className="text-lg font-semibold text-yellow-700">
              {t("ctaParagraph3")}
            </p>
          </div>

          {/* Benefícios */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              {t("ctaBenefitsTitle")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t("ctaBenefit1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t("ctaBenefit2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t("ctaBenefit3")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t("ctaBenefit4")}</span>
              </li>
            </ul>
          </Card>

          {/* Slider de Depoimentos */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 text-center">
              {t("testimonialsTitle")}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {t("testimonialsSubtitle")}
            </p>
            
            <TestimonialsSlider />
          </div>

          {/* Depoimento/Garantia */}
          <div className="text-center space-y-4 py-6">
            <p className="text-base text-gray-600 italic">
              "{t("ctaTestimonial")}"
            </p>
          </div>

          {/* Botão de CTA */}
          <div className="space-y-4">
            <a
              href={`https://buy.stripe.com/aFa6oG7d169l1FwcAQ6kg01?prefilled_email=${user?.email || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
                <ShoppingCart className="h-6 w-6" />
                {t("ctaButton")}
              </Button>
            </a>

          </div>
        </div>
      </div>
    );
  }

  // Se comprou, mostrar o desafio normal
  return (
    <div className=" mx-auto p-4">
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
              onClick={() => router.push(`/${locale}/challenge/${currentChallengeDay}`)}
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

              {/* Card da oração - Clicável */}
              <button
                onClick={() => handleDayClick(prayer.day, prayer.isLocked)}
                disabled={prayer.isLocked}
                className={`
                  flex-1 rounded-lg overflow-hidden transition-all relative text-left w-full
                  ${prayer.isLocked
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:scale-[1.02] cursor-pointer"
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
                        {!prayer.isLocked && !prayer.isCompleted && (
                          <span className="text-xs bg-yellow-800/60 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-600/30">
                            {t("available")}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-white text-sm drop-shadow-lg">
                        {prayer.title}
                      </h3>
                    </div>

                    {/* Ícone indicativo */}
                    <div className={`
                        shrink-0 h-9 w-9 rounded-full p-0 border flex items-center justify-center
                        ${prayer.isLocked
                            ? "bg-gray-400 border-gray-500"
                            : "bg-yellow-500/90 border-yellow-400/50"
                        }
                      `}
                    >
                      {prayer.isLocked ? (
                        <Lock className="w-4 h-4 text-gray-700" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-black" />
                      )}
                    </div>
                  </div>

                  {/* Motivo */}
                  <p className="text-xs text-gray-300/90 leading-relaxed">
                    {prayer.reason}
                  </p>
                </div>
              </button>
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
