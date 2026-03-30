import React from "react";
import { useLocale } from "next-intl";

const content = {
  pt: {
    title: "Oração ao Padre Pio",
    subtitle: "Inspirada em seu testemunho de fé",
    tags: ["Reflexão", "Consolo", "Esperança", "Fé"],
    sections: [
      {
        title: "",
        paragraphs: [
          "Padre Pio, hoje faço uma pausa para rezar com serenidade e recordar teu exemplo de confiança, silêncio e entrega. Neste momento quero aquietar minha mente, organizar meus pensamentos e me aproximar de Deus com sinceridade.",
          "Que esta oração seja um espaço de recolhimento. Que ela me ajude a respirar com calma, reconhecer o que estou vivendo e permanecer com mais paciência diante das minhas preocupações de hoje.",
          "Acompanha minha jornada espiritual e ensina-me a viver este tempo com humildade, escuta interior e abertura ao bem.",
        ],
      },
      {
        title: "Tempo de silêncio",
        paragraphs: [
          "Ensina-me a cuidar do meu interior com mais mansidão. Que eu não reaja com pressa a tudo o que me inquieta e que aprenda a reconhecer, sem dureza, aquilo que preciso entregar na oração.",
          "Que este momento me recorde que a fé também se vive no cotidiano: na paciência, na escuta, na caridade e na constância.",
          "Ajuda-me a sustentar o coração com esperança serena, sem exigências nem expectativas, confiando que posso caminhar este dia com mais presença e equilíbrio.",
        ],
      },
      {
        title: "Confiança e presença",
        paragraphs: [
          "Que teu testemunho me inspire a perseverar na oração mesmo nos dias comuns, quando tudo parece silencioso e ainda assim preciso seguir adiante com confiança.",
          "Que eu possa agir com prudência, falar com bondade e tomar decisões com mais consciência. Que eu encontre na fé um lugar de descanso interior e renovação espiritual.",
          "Acompanha também aqueles que amo e ajuda-nos a atravessar cada etapa com respeito, diálogo e serenidade.",
        ],
      },
      {
        title: "Gratidão",
        paragraphs: [
          "Obrigado por este instante de oração. Obrigado pela possibilidade de parar, respirar e voltar ao essencial. Que este conteúdo me ajude a cultivar uma vida interior mais consciente e uma fé mais simples.",
          "Que eu possa sair daqui com mais calma para viver o dia e com disposição para seguir cultivando espaços de reflexão, oração e cuidado interior.",
        ],
      },
    ],
    closing: "Padre Pio, acompanha-nos neste caminho de fé.",
    amen: "Amém.",
  },
  es: {
    title: "Oración al Padre Pío",
    subtitle: "Inspirada en su testimonio de fe",
    tags: ["Reflexión", "Consuelo", "Esperanza", "Fe"],
    sections: [
      {
        title: "",
        paragraphs: [
          "Padre Pío, hoy hago una pausa para rezar con serenidad y recordar tu ejemplo de confianza, silencio y entrega. En este momento quiero aquietar mi mente, ordenar mis pensamientos y acercarme a Dios con sinceridad.",
          "Que esta oración sea un espacio de recogimiento. Que me ayude a respirar con calma, a reconocer lo que estoy viviendo y a permanecer con más paciencia ante mis preocupaciones de hoy.",
          "Acompaña mi jornada espiritual y enséñame a vivir este tiempo con humildad, escucha interior y apertura al bien.",
        ],
      },
      {
        title: "Tiempo de silencio",
        paragraphs: [
          "Enséñame a cuidar mi interior con más mansedumbre. Que no reaccione con prisa ante todo lo que me inquieta y que aprenda a reconocer, sin dureza, aquello que necesito entregar en la oración.",
          "Que este momento me recuerde que la fe también se vive en lo cotidiano: en la paciencia, en la escucha, en la caridad y en la constancia.",
          "Ayúdame a sostener mi corazón con esperanza serena, sin exigencias ni expectativas, confiando en que puedo caminar este día con más presencia y equilibrio.",
        ],
      },
      {
        title: "Confianza y presencia",
        paragraphs: [
          "Que tu testimonio me inspire a perseverar en la oración incluso en los días comunes, cuando todo parece silencioso y aun así necesito seguir adelante con confianza.",
          "Que pueda actuar con prudencia, hablar con bondad y tomar decisiones con más conciencia. Que encuentre en la fe un lugar de descanso interior y de renovación espiritual.",
          "Acompaña también a quienes amo y ayúdanos a atravesar cada etapa con respeto, diálogo y serenidad.",
        ],
      },
      {
        title: "Gratitud",
        paragraphs: [
          "Gracias por este instante de oración. Gracias por la posibilidad de detenerme, respirar y volver a lo esencial. Que este contenido me ayude a cultivar una vida interior más consciente y una fe más sencilla.",
          "Que pueda salir de aquí con más calma para vivir mi día y con disposición para seguir cultivando espacios de reflexión, oración y cuidado interior.",
        ],
      },
    ],
    closing: "Padre Pío, acompáñanos en este camino de fe.",
    amen: "Amén.",
  },
  en: {
    title: "Prayer to Padre Pio",
    subtitle: "Inspired by his witness of faith",
    tags: ["Reflection", "Comfort", "Hope", "Faith"],
    sections: [
      {
        title: "",
        paragraphs: [
          "Padre Pio, today I pause to pray in serenity and remember your example of trust, silence, and devotion. In this moment I want to quiet my mind, gather my thoughts, and draw closer to God with sincerity.",
          "May this prayer be a space of recollection. May it help me breathe calmly, recognize what I am living through, and remain more patient with the concerns of this day.",
          "Accompany my spiritual journey and teach me to live this moment with humility, inner listening, and openness to what is good.",
        ],
      },
      {
        title: "A time of silence",
        paragraphs: [
          "Teach me to care for my inner life with greater gentleness. May I not react in haste to everything that troubles me, and may I learn to recognize, without harshness, what I need to place in prayer.",
          "May this moment remind me that faith is also lived in ordinary life: through patience, listening, kindness, and consistency.",
          "Help me hold my heart with peaceful hope, without demands or expectations, trusting that I can walk through this day with more presence and balance.",
        ],
      },
      {
        title: "Trust and presence",
        paragraphs: [
          "May your witness inspire me to persevere in prayer even on ordinary days, when everything feels quiet and I still need to move forward with trust.",
          "May I act with prudence, speak with kindness, and make decisions with greater awareness. May I find in faith a place of inner rest and spiritual renewal.",
          "Accompany those I love as well, and help us move through each stage with respect, dialogue, and serenity.",
        ],
      },
      {
        title: "Gratitude",
        paragraphs: [
          "Thank you for this moment of prayer. Thank you for the chance to pause, breathe, and return to what is essential. May this content help me cultivate a more conscious inner life and a simpler faith.",
          "May I leave here calmer for the day ahead and willing to keep creating spaces for reflection, prayer, and inner care.",
        ],
      },
    ],
    closing: "Padre Pio, accompany us on this path of faith.",
    amen: "Amen.",
  },
} as const;

export const PadrePio: React.FC = () => {
  const locale = (useLocale() as "pt" | "es" | "en") || "es";
  const copy = content[locale];

  return (
    <div className="max-w-3xl mx-auto p-6 text-white/90 leading-relaxed">
      <h1 className="text-3xl font-bold text-center text-yellow-700 mb-2">{copy.title}</h1>
      <h3 className="text-center text-lg text-white/50 mb-8">{copy.subtitle}</h3>

      <div className="flex justify-center gap-4 text-sm mb-8">
        {copy.tags.map((tag) => (
          <span key={tag} className="bg-white/10 text-yellow-700 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {copy.sections.map((section) => (
        <React.Fragment key={section.title || section.paragraphs[0]}>
          {section.title ? (
            <h2 className="text-2xl font-semibold text-yellow-700 mt-10 mb-4">{section.title}</h2>
          ) : null}
          {section.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={index > 0 ? "mt-3" : undefined}>
              {paragraph}
            </p>
          ))}
        </React.Fragment>
      ))}

      <p className="font-semibold mt-4">{copy.closing}</p>
      <p className="font-semibold">{copy.amen}</p>
    </div>
  );
};

export default PadrePio;
