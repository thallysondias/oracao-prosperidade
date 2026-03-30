import React from "react";
import { useLocale } from "next-intl";

const content = {
  pt: {
    title: "Oração inspirada em São Bento",
    subtitle: "Um momento de recolhimento e fé",
    tags: ["Fé", "Discernimento", "Calma", "Reflexão"],
    sections: [
      {
        title: "",
        paragraphs: [
          "São Bento, acompanha este momento de oração. Quero fazer uma pausa, aquietar o coração e recordar que a fé também se constrói no silêncio, na constância e na vida cotidiana.",
          "Que este conteúdo me ajude a olhar para minha jornada com mais serenidade e a fortalecer minha disposição para agir com prudência, paciência e bondade.",
          "Não busco fórmulas nem promessas, mas um espaço sincero de reflexão que me aproxime de Deus e me ajude a viver com mais presença.",
        ],
      },
      {
        title: "Início da oração",
        paragraphs: [
          "Ensina-me a reconhecer aquilo que hoje preciso cuidar em meu interior: meus pensamentos, minhas palavras, minhas decisões e a maneira como trato aqueles que me rodeiam.",
          "Que a oração me ajude a sair do ruído e a recuperar um olhar mais simples, mais humilde e mais atento ao essencial.",
          "Que nos momentos de cansaço eu encontre aqui uma pausa para respirar, agradecer e seguir adiante com mais clareza.",
        ],
      },
      {
        title: "Vida cotidiana",
        paragraphs: [
          "Ajuda-me a viver minhas responsabilidades diárias com honestidade, equilíbrio e dedicação. Que eu possa agir com respeito pelo meu próprio processo e pelo caminho dos outros.",
          "Que eu aprenda a observar meus pensamentos com mais calma e a tomar decisões com menos impulso e mais discernimento.",
          "Que a fé me sustente no que é simples: uma palavra amável, uma atitude paciente e a capacidade de recomeçar a cada dia.",
          "Que este tempo de oração não me afaste da realidade, mas me ajude a vivê-la com mais equilíbrio, responsabilidade e esperança.",
        ],
      },
      {
        title: "Relações e convivência",
        paragraphs: [
          "Que eu possa cuidar dos meus vínculos com mais escuta, mansidão e respeito. Que em minhas conversas haja mais verdade, paciência e abertura ao diálogo.",
          "Ajuda-me a reconhecer quando preciso pedir perdão, fazer silêncio ou recomeçar com mais humildade.",
          "Que minha presença seja um sinal de calma e não de pressa, de acolhimento e não de dureza.",
        ],
      },
      {
        title: "Cuidado interior",
        paragraphs: [
          "Que eu aprenda a escutar meu interior sem medo e sem exigir respostas imediatas. Que a oração seja para mim um refúgio de pausa, consciência e confiança.",
          "Dá-me serenidade para atravessar os dias complexos e gratidão para reconhecer os pequenos bens de cada jornada.",
          "Que eu possa sustentar meus processos com paciência e seguir cultivando uma vida espiritual simples e constante.",
        ],
      },
      {
        title: "Gratidão final",
        paragraphs: [
          "Obrigado por este espaço de reflexão. Que o vivido aqui me anime a continuar com uma fé mais serena, um olhar mais consciente e uma disposição mais amável em minha vida diária.",
          "São Bento, inspira-nos a viver com firmeza interior, simplicidade e paz.",
        ],
      },
    ],
    amen: "Amém.",
  },
  es: {
    title: "Oración inspirada en San Benito",
    subtitle: "Un momento de recogimiento y fe",
    tags: ["Fe", "Discernimiento", "Calma", "Reflexión"],
    sections: [
      {
        title: "",
        paragraphs: [
          "San Benito, acompaña este momento de oración. Quiero hacer una pausa, aquietar el corazón y recordar que la fe también se construye en el silencio, en la constancia y en la vida cotidiana.",
          "Que este contenido me ayude a mirar mi jornada con mayor serenidad y a fortalecer mi disposición para actuar con prudencia, paciencia y bondad.",
          "No busco fórmulas ni promesas, sino un espacio sincero de reflexión que me acerque a Dios y me ayude a vivir con más presencia.",
        ],
      },
      {
        title: "Inicio de la oración",
        paragraphs: [
          "Enséñame a reconocer aquello que hoy necesito cuidar en mi interior: mis pensamientos, mis palabras, mis decisiones y la manera en que trato a quienes me rodean.",
          "Que la oración me ayude a salir del ruido y a recuperar una mirada más simple, más humilde y más atenta a lo esencial.",
          "Que en los momentos de cansancio pueda encontrar aquí una pausa para respirar, agradecer y seguir adelante con mayor claridad.",
        ],
      },
      {
        title: "Vida cotidiana",
        paragraphs: [
          "Ayúdame a vivir mis responsabilidades diarias con honestidad, equilibrio y dedicación. Que pueda actuar con respeto hacia mi propio proceso y hacia el camino de los demás.",
          "Que aprenda a observar mis pensamientos con más calma y a tomar decisiones con menos impulso y más discernimiento.",
          "Que la fe me sostenga en lo sencillo: en una palabra amable, en una actitud paciente y en la capacidad de empezar de nuevo cada día.",
          "Que este tiempo de oración no me aparte de la realidad, sino que me ayude a vivirla con más equilibrio, responsabilidad y esperanza.",
        ],
      },
      {
        title: "Relaciones y convivencia",
        paragraphs: [
          "Que pueda cuidar mis vínculos con más escucha, mansedumbre y respeto. Que en mis conversaciones haya más verdad, paciencia y apertura al diálogo.",
          "Ayúdame a reconocer cuándo necesito pedir perdón, hacer silencio o volver a empezar con más humildad.",
          "Que mi presencia sea un signo de calma y no de prisa, de acogida y no de dureza.",
        ],
      },
      {
        title: "Cuidado interior",
        paragraphs: [
          "Que aprenda a escuchar mi interior sin miedo y sin exigirme respuestas inmediatas. Que la oración sea para mí un refugio de pausa, conciencia y confianza.",
          "Dame serenidad para atravesar los días complejos y gratitud para reconocer los pequeños bienes de cada jornada.",
          "Que pueda sostener mis procesos con paciencia y seguir cultivando una vida espiritual simple y constante.",
        ],
      },
      {
        title: "Gratitud final",
        paragraphs: [
          "Gracias por este espacio de reflexión. Que lo vivido aquí me anime a continuar con una fe más serena, una mirada más consciente y una disposición más amable en mi vida diaria.",
          "San Benito, inspíranos a vivir con firmeza interior, sencillez y paz.",
        ],
      },
    ],
    amen: "Amén.",
  },
  en: {
    title: "Prayer inspired by Saint Benedict",
    subtitle: "A moment of recollection and faith",
    tags: ["Faith", "Discernment", "Calm", "Reflection"],
    sections: [
      {
        title: "",
        paragraphs: [
          "Saint Benedict, accompany this moment of prayer. I want to pause, quiet my heart, and remember that faith is also built in silence, in consistency, and in daily life.",
          "May this content help me look at my day with greater serenity and strengthen my willingness to act with prudence, patience, and kindness.",
          "I do not seek formulas or promises, but a sincere space of reflection that brings me closer to God and helps me live with more presence.",
        ],
      },
      {
        title: "Beginning of prayer",
        paragraphs: [
          "Teach me to recognize what I need to care for within today: my thoughts, my words, my decisions, and the way I treat those around me.",
          "May prayer help me step away from noise and recover a simpler, humbler, and more attentive way of seeing what truly matters.",
          "May I find here, in moments of weariness, a pause to breathe, give thanks, and move forward with greater clarity.",
        ],
      },
      {
        title: "Daily life",
        paragraphs: [
          "Help me live my daily responsibilities with honesty, balance, and dedication. May I act with respect for my own process and for the path of others.",
          "May I learn to observe my thoughts more calmly and make decisions with less impulse and more discernment.",
          "May faith sustain me in what is simple: a kind word, a patient attitude, and the ability to begin again each day.",
          "May this time of prayer not pull me away from reality, but help me live it with more balance, responsibility, and hope.",
        ],
      },
      {
        title: "Relationships and coexistence",
        paragraphs: [
          "May I care for my bonds with more listening, gentleness, and respect. May there be more truth, patience, and openness to dialogue in my conversations.",
          "Help me recognize when I need to ask forgiveness, remain silent, or begin again with greater humility.",
          "May my presence be a sign of calm rather than hurry, of welcome rather than harshness.",
        ],
      },
      {
        title: "Inner care",
        paragraphs: [
          "May I learn to listen to my inner life without fear and without demanding immediate answers. May prayer become for me a refuge of pause, awareness, and trust.",
          "Give me serenity to move through difficult days and gratitude to recognize the small gifts of each day.",
          "May I sustain my processes with patience and keep cultivating a simple and steady spiritual life.",
        ],
      },
      {
        title: "Final gratitude",
        paragraphs: [
          "Thank you for this space of reflection. May what is lived here encourage me to continue with a calmer faith, a more conscious outlook, and a kinder disposition in daily life.",
          "Saint Benedict, inspire us to live with inner steadiness, simplicity, and peace.",
        ],
      },
    ],
    amen: "Amen.",
  },
} as const;

export const SanBenitoPrayer: React.FC = () => {
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

      <p className="font-semibold mt-4">{copy.amen}</p>
    </div>
  );
};

export default SanBenitoPrayer;
