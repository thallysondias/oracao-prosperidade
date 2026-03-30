import React from "react";
import { useLocale } from "next-intl";

const content = {
  pt: {
    title: "Oração inspirada em Carlo Acutis",
    subtitle: "Carlo Acutis",
    tags: ["Presença", "Guia", "Reflexão", "Fé"],
    sections: [
      {
        title: "",
        paragraphs: [
          "Hoje quero rezar com simplicidade e recordar o testemunho de Carlo Acutis: uma fé vivida no cotidiano, com alegria, atenção e proximidade com Deus.",
          "Que este momento me ajude a olhar para minha vida com mais honestidade e gratidão. Que eu aprenda a reconhecer os pequenos gestos de bem que já fazem parte do meu caminho.",
          "Acompanha meus passos para que eu também possa viver com mais presença, generosidade e confiança.",
        ],
      },
      {
        title: "Oração de início",
        paragraphs: [
          "Senhor, permite-me começar este tempo com calma. Que a oração me ajude a ordenar meu interior e a permanecer atento àquilo que dá sentido, consolo e direção aos meus dias.",
          "Que eu possa viver com um coração disponível para aprender, agradecer e servir com simplicidade.",
        ],
      },
      {
        title: "Entrega interior",
        paragraphs: [
          "Apresento-te minhas preocupações, minhas dúvidas e meus cansaços. Não para exigir respostas imediatas, mas para aprender a sustentá-los com mais serenidade e confiança.",
        ],
      },
      {
        title: "Caminho cotidiano",
        paragraphs: [
          "Ajuda-me a caminhar com atenção e responsabilidade. Que, no meio da rotina, eu encontre espaço para a fé, a escuta e a bondade para com os outros.",
          "Que eu possa olhar para minha história com compaixão, fazer pausas quando necessário e continuar com mais clareza em minhas decisões.",
          "Ensina-me a descobrir valor no pequeno: uma palavra amável, uma atitude paciente, um gesto de cuidado, um dia vivido com mais consciência.",
          "Que esta experiência fortaleça minha disposição para seguir crescendo na fé de maneira simples e autêntica.",
        ],
      },
      {
        title: "Clausura",
        paragraphs: [
          "Obrigado por este tempo de oração e reflexão. Que ele me ajude a viver com um coração mais atento, uma mente mais tranquila e uma fé mais presente na vida diária.",
          "Que eu possa seguir este caminho com humildade, constância e abertura ao bem.",
        ],
      },
    ],
    amen: "Amém.",
  },
  es: {
    title: "Oración inspirada en Carlo Acutis",
    subtitle: "Carlo Acutis",
    tags: ["Presencia", "Guía", "Reflexión", "Fe"],
    sections: [
      {
        title: "",
        paragraphs: [
          "Hoy quiero rezar con sencillez y recordar el testimonio de Carlo Acutis: una fe vivida en lo cotidiano, con alegría, atención y cercanía con Dios.",
          "Que este momento me ayude a mirar mi vida con más honestidad y gratitud. Que aprenda a reconocer los pequeños gestos de bien que ya forman parte de mi camino.",
          "Acompaña mis pasos para que yo también pueda vivir con más presencia, generosidad y confianza.",
        ],
      },
      {
        title: "Oración de inicio",
        paragraphs: [
          "Señor, permíteme comenzar este tiempo con calma. Que la oración me ayude a ordenar mi interior y a permanecer atento a aquello que da sentido, consuelo y dirección a mis días.",
          "Que pueda vivir con un corazón disponible para aprender, agradecer y servir con sencillez.",
        ],
      },
      {
        title: "Entrega interior",
        paragraphs: [
          "Te presento mis preocupaciones, mis dudas y mis cansancios. No para exigir respuestas inmediatas, sino para aprender a sostenerlos con más serenidad y confianza.",
        ],
      },
      {
        title: "Camino cotidiano",
        paragraphs: [
          "Ayúdame a caminar con atención y responsabilidad. Que, en medio de la rutina, pueda encontrar espacio para la fe, la escucha y la bondad hacia los demás.",
          "Que pueda mirar mi historia con compasión, hacer pausas cuando lo necesite y continuar con más claridad en mis decisiones.",
          "Enséñame a descubrir valor en lo pequeño: una palabra amable, una actitud paciente, un gesto de cuidado, una jornada vivida con más conciencia.",
          "Que esta experiencia fortalezca mi disposición para seguir creciendo en la fe de manera sencilla y auténtica.",
        ],
      },
      {
        title: "Clausura",
        paragraphs: [
          "Gracias por este tiempo de oración y reflexión. Que me ayude a vivir con un corazón más atento, una mente más tranquila y una fe más presente en mi vida diaria.",
          "Que pueda seguir este camino con humildad, constancia y apertura al bien.",
        ],
      },
    ],
    amen: "Amén.",
  },
  en: {
    title: "Prayer inspired by Carlo Acutis",
    subtitle: "Carlo Acutis",
    tags: ["Presence", "Guidance", "Reflection", "Faith"],
    sections: [
      {
        title: "",
        paragraphs: [
          "Today I want to pray with simplicity and remember the witness of Carlo Acutis: a faith lived in daily life, with joy, attentiveness, and closeness to God.",
          "May this moment help me look at my life with more honesty and gratitude. May I learn to recognize the small gestures of goodness that are already part of my path.",
          "Accompany my steps so that I too may live with greater presence, generosity, and trust.",
        ],
      },
      {
        title: "Opening prayer",
        paragraphs: [
          "Lord, allow me to begin this time with calm. May prayer help me order my inner life and remain attentive to what gives meaning, comfort, and direction to my days.",
          "May I live with a heart ready to learn, give thanks, and serve with simplicity.",
        ],
      },
      {
        title: "Inner offering",
        paragraphs: [
          "I place before you my concerns, my doubts, and my fatigue. Not to demand immediate answers, but to learn how to carry them with greater serenity and trust.",
        ],
      },
      {
        title: "Daily path",
        paragraphs: [
          "Help me walk with attention and responsibility. May I find space in the middle of routine for faith, listening, and kindness toward others.",
          "May I look at my story with compassion, pause when needed, and continue with greater clarity in my decisions.",
          "Teach me to discover value in what is small: a kind word, a patient attitude, a caring gesture, a day lived with more awareness.",
          "May this experience strengthen my willingness to keep growing in faith in a simple and authentic way.",
        ],
      },
      {
        title: "Closing",
        paragraphs: [
          "Thank you for this time of prayer and reflection. May it help me live with a more attentive heart, a calmer mind, and a faith more present in daily life.",
          "May I continue on this path with humility, consistency, and openness to what is good.",
        ],
      },
    ],
    amen: "Amen.",
  },
} as const;

export const CarlosAcuti: React.FC = () => {
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

export default CarlosAcuti;
