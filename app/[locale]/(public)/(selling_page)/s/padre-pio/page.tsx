'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const COPY = {
  es: {
    dateLocale: 'es-ES',
    fallbackName: 'hijo',
    heroTitleAfterName: 'UN PUNTO SECRETO EN TU ALMA HA SIDO ACTIVADO POR EL PADRE PÍO',
    heroSubtitle: (date: string) =>
      `QUE REVELA ESTA ORACIÓN SECRETA SOLO HASTA MEDIANOCHE DEL ${date}`,
    p1Before:
      'Anoche, mientras oraba por los nombres de nuestra lista, algo excepcional ocurrió. El espíritu del ',
    p1Strong: 'Padre Pío, el santo de los estigmas',
    p1After: ' me trajo un mensaje urgente y personal para ti.',
    p2Before: 'Una ',
    secretPrayer: 'oración secreta',
    p2After:
      'que él guardaba en su corazón y usaba en privado para invocar su intercesión poderosa — trayendo sanación profunda, protección contra todo mal y milagros que cambian vidas — ha sido revelada de forma rara e intensa en este preciso momento.',
    callout:
      'Invoca la intercesión del santo de los estigmas. El Padre Pío trae sanación, protección y milagros para quienes buscan su ayuda espiritual con fe genuina.',
    keyLabel: 'llave espiritual secreta',
    p3Before: 'esto no es una oración común. Es una ',
    p3After:
      'activada ahora en un momento divino único (al inicio de 2026, cuando las gracias fluyen con máxima intensidad para quien las agarra).',
    keyAlt: 'Padre Pío con estigmas iluminados por la luz divina',
    keyCaption: 'Padre Pío con estigmas iluminados por la luz divina',
    p4:
      'Vi, en oración profunda, cómo esta oración secreta abre puertas que permanecen cerradas para la mayoría. Amor, salud, prosperidad, liberación de cargas pesadas… eventos precisos que no puedes dejar pasar.',
    urgency:
      'Pero hay un detalle que me preocupa por ti: esta ventana de activación es corta. Está abierta solo hasta medianoche de hoy.',
    revealTitle: (name: string) =>
      `${name}, ESTO ES EXACTAMENTE LO QUE LA ORACIÓN SECRETA DEL PADRE PÍO ME MOSTRÓ PARA TI`,
    revealItems: [
      {
        title: 'Localización del punto secreto:',
        text: 'Esta llave actúa solo una vez al año, iluminando lo que normalmente permanece oculto en tu alma.',
      },
      {
        title: 'Introspección en tres capas:',
        text: 'Guía mental (tus pensamientos), emocional (lo que callas) y espiritual (bloqueos de energía).',
      },
      {
        title: 'Roadmap 2026:',
        text: 'Qué invocar en los primeros meses, fechas clave para milagros y cómo alinear tu camino.',
      },
    ],
    secretAlt: 'Oración Secreta del Padre Pío',
    mustSeeTitle: (name: string) =>
      `${name}, DEBES VER ESTA ORACIÓN ANTES DE MEDIANOCHE`,
    mustSeeText:
      'El punto secreto que el Padre Pío ha abierto en tu alma tiene que ser tomado antes de medianoche. Si no, se cierra por un año entero, y lo que no hayas invocado se repetirá con más fuerza.',
    quote: 'No seas quien se arrepienta.',
    priceTitle: 'Precio único hoy',
    priceLimit: 'Solo hasta medianoche',
    cta: 'Recibir mi Oración',
    testimonialsTitle: 'Miles de Personas Satisfechas en Todo el Mundo',
    testimonials: [
      {
        t: 'Querido Padre Juan, no sé cómo funciona exactamente esta oración secreta del Padre Pío, pero realmente funciona. El año pasado fue como un milagro después de recibir la oración personalizada y seguir sus consejos. Mi esposo y yo estábamos pasando por una crisis muy difícil en nuestro matrimonio, y gracias a esta oración encontramos el camino de vuelta el uno al otro. Ahora vivimos en un mundo mejor, lleno de amor y comprensión. La protección que sentimos es real y palpable.',
        n: 'Laura & Marc, California',
      },
      {
        t: 'Recibí mi primera oración personalizada del Padre Pío hace varios meses y luego otra vez hace poco. Debo admitir que era escéptica sobre este tipo de cosas espirituales, pero para mi asombro, ambas veces las cosas sucedieron exactamente como se predijo. Mi salud mejoró de manera que los médicos no podían explicar, y encontré la paz interior que había estado buscando durante años. No creo en tales coincidencias, así que gracias Padre Juan, definitivamente continuaré usando sus servicios en el futuro.',
        n: 'Christine, Países Bajos',
      },
      {
        t: 'El Padre Pío me ayudó a encontrar el camino correcto en mi carrera, que había sido un problema enorme durante toda mi vida. Después de recibir la oración personalizada encontré confianza en mis fortalezas y la capacidad de avanzar, ¡y finalmente pude hacerlo! Todavía vuelvo a mi oración, que es muy perspicaz y útil en la vida cotidiana. La protección espiritual que siento es increíble, y mi trabajo ahora prospera de una manera que nunca pensé posible.',
        n: 'Francis, Irlanda',
      },
      {
        t: 'Hiciste un trabajo extraordinario. Cuando te contacté por primera vez estaba pasando por un momento muy difícil en mi vida y tu guía y la oración del Padre Pío me mostraron cómo resolver las cosas. Ahora estoy viviendo cómodamente, estoy con un hombre absolutamente increíble y tengo todo lo que siempre he querido en mi vida. No sé dónde estaría sin tu ayuda y estoy tan agradecida por guiarme hasta donde estoy ahora. No puedo agradecerte lo suficiente por el maravilloso trabajo que has hecho y también por tu apoyo. Espero que puedas cambiar la vida de muchas personas como has cambiado la mía y quiero animarte a hacerlo.',
        n: 'Kim, Singapur',
      },
    ],
    finalNotice: 'El Padre Pío no negocia. La ventana se cierra pronto.',
    footerRights: '© 2026 Misión Padre Pío. Todos los derechos reservados.',
    footerDisclaimer:
      'Este sitio no forma parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca comercial de FACEBOOK, Inc.',
    headerAlt: 'Padre Pío',
    arrowAlt: 'Padre Pío',
  },
  en: {
    dateLocale: 'en-US',
    fallbackName: 'child',
    heroTitleAfterName: 'A SECRET POINT IN YOUR SOUL HAS BEEN ACTIVATED BY PADRE PIO',
    heroSubtitle: (date: string) =>
      `WHAT THIS SECRET PRAYER REVEALS ONLY UNTIL MIDNIGHT ON ${date}`,
    p1Before:
      'Last night, while I prayed over the names on our list, something exceptional happened. The spirit of ',
    p1Strong: 'Padre Pio, the saint of the stigmata',
    p1After: ' brought me an urgent and personal message for you.',
    p2Before: 'A ',
    secretPrayer: 'secret prayer',
    p2After:
      'that he kept in his heart and used privately to invoke his powerful intercession — bringing deep healing, protection against all evil, and life-changing miracles — has been revealed in a rare and intense way at this very moment.',
    callout:
      'Invoke the intercession of the saint of the stigmata. Padre Pio brings healing, protection, and miracles for those who seek his spiritual help with genuine faith.',
    keyLabel: 'secret spiritual key',
    p3Before: 'this is not a common prayer. It is a ',
    p3After:
      'activated now in a unique divine moment (at the beginning of 2026, when graces flow with maximum intensity for those who seize them).',
    keyAlt: 'Padre Pio with stigmata illuminated by divine light',
    keyCaption: 'Padre Pio with stigmata illuminated by divine light',
    p4:
      'I saw, in deep prayer, how this secret prayer opens doors that remain closed for most. Love, health, prosperity, release from heavy burdens… precise events you cannot afford to miss.',
    urgency:
      'But there is a detail that worries me for you: this activation window is short. It is open only until midnight today.',
    revealTitle: (name: string) =>
      `${name}, THIS IS EXACTLY WHAT PADRE PIO'S SECRET PRAYER SHOWED ME FOR YOU`,
    revealItems: [
      {
        title: 'Location of the secret point:',
        text: 'This key acts only once a year, illuminating what normally remains hidden in your soul.',
      },
      {
        title: 'Three-layer introspection:',
        text: 'Mental guidance (your thoughts), emotional (what you keep silent), and spiritual (energy blockages).',
      },
      {
        title: 'Roadmap 2026:',
        text: 'What to invoke in the first months, key dates for miracles, and how to align your path.',
      },
    ],
    secretAlt: 'Padre Pio Secret Prayer',
    mustSeeTitle: (name: string) =>
      `${name}, YOU MUST SEE THIS PRAYER BEFORE MIDNIGHT`,
    mustSeeText:
      'The secret point that Padre Pio has opened in your soul must be taken before midnight. If not, it closes for a full year, and what you have not invoked will repeat with greater force.',
    quote: "Don't be the one who regrets it.",
    priceTitle: 'One-time price today',
    priceLimit: 'Only until midnight',
    cta: 'Receive my Prayer',
    testimonialsTitle: 'Thousands of Satisfied People Worldwide',
    testimonials: [
      {
        t: "Dear Father Juan, I don't know exactly how this secret prayer of Padre Pio works, but it truly works. Last year felt like a miracle after receiving the personalized prayer and following your guidance. My husband and I were going through a very difficult crisis in our marriage, and thanks to this prayer we found our way back to each other. Now we live in a better world, full of love and understanding. The protection we feel is real and tangible.",
        n: 'Laura & Marc, California',
      },
      {
        t: 'I received my first personalized prayer from Padre Pio several months ago and then again recently. I must admit I was skeptical about these spiritual things, but to my amazement, both times the events happened exactly as predicted. My health improved in ways doctors could not explain, and I found the inner peace I had been searching for for years. I do not believe in such coincidences, so thank you Father Juan, I will definitely keep using your services in the future.',
        n: 'Christine, Netherlands',
      },
      {
        t: 'Padre Pio helped me find the right path in my career, which had been a huge problem throughout my life. After receiving the personalized prayer I found confidence in my strengths and the ability to move forward, and I finally did it! I still return to my prayer, which is very insightful and useful in daily life. The spiritual protection I feel is incredible, and my work now prospers in a way I never thought possible.',
        n: 'Francis, Ireland',
      },
      {
        t: "You did extraordinary work. When I first contacted you I was going through a very difficult time in my life and your guidance and Padre Pio's prayer showed me how to resolve things. Now I am living comfortably, I am with an absolutely amazing man, and I have everything I have always wanted. I don't know where I would be without your help and I am so grateful for guiding me to where I am now. I can't thank you enough for the wonderful work you have done and for your support. I hope you can change many lives as you changed mine, and I want to encourage you to do so.",
        n: 'Kim, Singapore',
      },
    ],
    finalNotice: 'Padre Pio does not negotiate. The window closes soon.',
    footerRights: '© 2026 Padre Pio Mission. All rights reserved.',
    footerDisclaimer:
      'This site is not part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.',
    headerAlt: 'Padre Pio',
    arrowAlt: 'Padre Pio',
  },
};

const OracionPadrePio = () => {
  const locale = useLocale() as 'pt' | 'en' | 'es';
  const copy = locale === 'en' ? COPY.en : COPY.es;
  const searchParams = useSearchParams();

  const nombre = useMemo(() => {
    const fname = searchParams.get('FNAME');
    if (fname) {
      const firstName = fname.trim().split(' ')[0];
      return firstName || copy.fallbackName;
    }
    return copy.fallbackName;
  }, [searchParams, copy.fallbackName]);

  const fechaHoy = useMemo(
    () =>
      new Date()
        .toLocaleDateString(copy.dateLocale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        .toUpperCase(),
    [copy.dateLocale]
  );

  return (
    <div className="min-h-screen bg-white font-serif text-gray-900">
      <img
        src="/selling_pages/padre-header.png"
        alt={copy.headerAlt}
        className="w-full object-cover mx-auto"
      />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#001a33] py-12 md:py-20 overflow-hidden">
        {/* Luz Dourada de Fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,_rgba(255,215,0,0.15)_0%,_transparent_70%)]"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase tracking-tight">
            <span className="text-yellow-500">{nombre}</span>, {copy.heroTitleAfterName}
          </h1>
          <p className="mt-6 text-yellow-200 text-lg md:text-xl font-medium uppercase tracking-widest">
            {copy.heroSubtitle(fechaHoy)}
          </p>
        </div>
      </section>

      {/* --- CONTEÚDO PRINCIPAL + SIDEBAR --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 border-x border-gray-100 shadow-2xl">
        {/* COLUNA ESQUERDA: TEXTO PRINCIPAL */}
        <main className="lg:col-span-2 bg-white p-6 md:p-12 text-lg leading-relaxed">
          <div className="space-y-6">
            <p className="font-bold text-xl">{nombre},</p>
            <p>
              {copy.p1Before}
              <strong>{copy.p1Strong}</strong>
              {copy.p1After}
            </p>
            <p>
              {copy.p2Before}
              <span className="bg-yellow-100 font-bold px-1">{copy.secretPrayer}</span>{' '}
              {copy.p2After}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 italic text-blue-900">
              {copy.callout}
            </div>

            <p>
              <strong>{nombre}</strong>, {copy.p3Before}
              <span className="text-blue-800 font-bold">{copy.keyLabel}</span>, {copy.p3After}
            </p>

            {/* IMAGEM SUGERIDA */}
            <div className="my-10 flex flex-col items-center">
              <img src="/selling_pages/chave.png" alt={copy.keyAlt} className="w-full h-80 rounded-lg shadow-2xl" />
              <p className="text-sm text-gray-500 mt-2 italic">{copy.keyCaption}</p>
            </div>

            <p>{copy.p4}</p>

            <p className="font-bold text-red-600 border-2 border-red-600 p-4 text-center rounded-md uppercase">
              {copy.urgency}
            </p>

            <h2 className="text-2xl font-bold text-blue-900 pt-8 uppercase">
              {copy.revealTitle(nombre)}
            </h2>

            {/* SEÑAL DE REVELACIONES */}
            <div className="space-y-8 mt-6">
              {copy.revealItems.map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-yellow-600 font-bold text-2xl">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <p>
                    <strong>{item.title}</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* IMAGEM SUGERIDA 2 */}
            <div className="my-10 bg-gray-100 h-64 rounded-lg flex items-center justify-center text-7xl grayscale opacity-80 border-2 border-dashed border-gray-300">
              <img src="/selling_pages/secret.png" alt={copy.secretAlt} className="w-full h-full object-cover" />
            </div>

            <h2 className="text-2xl font-bold text-red-700 pt-8 text-center uppercase">
              {copy.mustSeeTitle(nombre)}
            </h2>

            <p>{copy.mustSeeText}</p>

            <p className="font-bold italic text-center text-xl py-6">"{copy.quote}"</p>
            <div className="hidden lg:block">
              <img src="/selling_pages/arrow-down.png" alt={copy.arrowAlt} className="w-20  object-cover mx-auto" />
              <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-yellow-500 text-center lg:top-6 ">
                <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">{copy.priceTitle}</p>
                <div className="flex justify-center items-center gap-3 my-2">
                  <span className="text-gray-400 line-through text-lg">$49 USD</span>
                  <span className="text-4xl font-black text-green-600">$9 USD</span>
                </div>
                <p className="text-xs text-red-600 font-bold mb-4 uppercase">{copy.priceLimit}</p>
                <Link
                  href="https://donate.stripe.com/9B6cN41SH9lx3NEbwM6kg08"
                  className=" relative  block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded shadow-lg transition-transform hover:scale-105 uppercase text-sm tracking-tighter"
                >
                  {copy.cta}
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* COLUNA DIREITA: SIDEBAR (TESTEMUNHOS + PREÇO) */}
        <aside className="bg-slate-50 p-6 md:p-8 border-l border-gray-100 lg:self-start">
          <img src="/selling_pages/arrow-down.png" alt={copy.arrowAlt} className="w-20  object-cover mx-auto" />
          <div className="space-y-8">
            {/* PREÇO E BOTÃO */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-yellow-500 text-center lg:sticky lg:top-6 z-50">
              <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">{copy.priceTitle}</p>
              <div className="flex justify-center items-center gap-3 my-2">
                <span className="text-gray-400 line-through text-lg">$49 USD</span>
                <span className="text-4xl font-black text-green-600">$9 USD</span>
              </div>
              <p className="text-xs text-red-600 font-bold mb-4 uppercase">{copy.priceLimit}</p>
              <Link
                href="https://donate.stripe.com/9B6cN41SH9lx3NEbwM6kg08"
                className=" relative  block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded shadow-lg transition-transform hover:scale-105 uppercase text-sm tracking-tighter"
              >
                {copy.cta}
              </Link>
            </div>

            {/* TESTEMUNHOS */}
            <div className="space-y-6">
              <h3 className="font-bold uppercase text-blue-900 text-sm border-b pb-2">
                {copy.testimonialsTitle}
              </h3>

              {copy.testimonials.map((test) => (
                <div
                  key={test.n}
                  className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200 shadow-sm text-sm leading-relaxed relative"
                >
                  <div className="absolute top-2 left-3 text-blue-300 text-3xl font-serif">"</div>
                  <p className="italic text-gray-800 pl-6 pr-6 pt-2 pb-2">{test.t}</p>
                  <div className="absolute bottom-2 right-3 text-blue-300 text-3xl font-serif rotate-180">"</div>
                  <span className="block font-bold not-italic mt-3 text-orange-700 text-xs text-right pr-2">
                    — {test.n}
                  </span>
                </div>
              ))}
            </div>

            {/* AVISO FINAL */}
            <div className="text-center p-4 bg-yellow-100 rounded text-xs text-yellow-900 font-medium uppercase">
              {copy.finalNotice}
            </div>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-12 px-6 text-center text-xs text-gray-500">
        <div className="max-w-4xl mx-auto space-y-4">
          <p>{copy.footerRights}</p>
          <p>{copy.footerDisclaimer}</p>
        </div>
      </footer>
    </div>
  );
};

export default OracionPadrePio;
