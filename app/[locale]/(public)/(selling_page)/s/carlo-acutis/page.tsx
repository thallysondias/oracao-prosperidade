'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';

const OracionCarloAcutis = () => {
  const searchParams = useSearchParams();

  // Pega o nome da URL e extrai apenas a primeira parte
  const nombre = useMemo(() => {
    const fname = searchParams.get('FNAME');
    if (fname) {
      // Pega apenas a primeira parte do nome (antes do primeiro espaço)
      const firstName = fname.trim().split(' ')[0];
      return firstName || 'hijo';
    }
    return 'hijo'; // Padrão quando não há nome na URL
  }, [searchParams]);

  const fechaHoy = useMemo(
    () =>
      new Date()
        .toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        .toUpperCase(),
    []
  );

  const tuNombre = "Padre Juan";

  return (
    <div className="min-h-screen bg-white font-serif text-gray-900">
      <img src="/selling_pages/carlo-header.png" alt="Carlo Acutis" className="w-full object-cover mx-auto" />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#001a33] py-12 md:py-20 overflow-hidden">
        {/* Luz Dourada de Fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,_rgba(255,215,0,0.15)_0%,_transparent_70%)]"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase tracking-tight">
            <span className="text-yellow-500">{nombre}</span>, UN PUNTO SECRETO EN TU ALMA HA SIDO ACTIVADO POR <span className="text-yellow-500">CARLO ACUTIS…</span>
          </h1>
          <p className="mt-6 text-yellow-200 text-lg md:text-xl font-medium uppercase tracking-widest">
            QUÉ REVELA ESTA ORACIÓN SECRETA SOLO HASTA MEDIANOCHE DEL {fechaHoy}
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
              Anoche, mientras oraba por los nombres de nuestra lista, algo excepcional ocurrió… El espíritu de <strong>Carlo Acutis, el beato de la Eucaristía y los milagros modernos</strong>, me trajo un mensaje urgente y personal para ti.
            </p>
            <p>
              Una <span className="bg-yellow-100 font-bold px-1">oración secreta</span> que él guardaba en su corazón y usaba en privado para invocar su intercesión poderosa – trayendo cura de enfermedades, protección espiritual en la era digital y milagros que cambian vidas – ha sido revelada de forma rara e intensa en este preciso momento.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 italic text-blue-900">
              Invoca la intercesión del beato Carlo Acutis. Carlo trae cura, protección y milagros para aquellos que buscan su ayuda espiritual con fe genuina, inspirados en la Eucaristía y la tecnología santa.
            </div>

            <p>
              <strong>{nombre}</strong>, esto no es una oración común. Es una <span className="text-blue-800 font-bold">llave espiritual secreta</span>, activada ahora en un momento divino único (al inicio de 2026, cuando las gracias fluyen con máxima intensidad para quien las agarra).
            </p>

            {/* IMAGEM SUGERIDA */}
            <div className="my-10 flex flex-col items-center">
              <img src="/selling_pages/carlo-chave.png" alt="Carlo Acutis con luz divina y elementos eucarísticos" className="w-full h-80 rounded-lg shadow-2xl" />
              <p className="text-sm text-gray-500 mt-2 italic">Carlo Acutis con luz divina y elementos eucarísticos</p>
            </div>

            <p>
              Vi, en oración profunda, cómo esta oración secreta abre puertas que permanecen cerradas para la mayoría. Cura de cáncer y enfermedades graves, protección contra males modernos, prosperidad espiritual, liberación de cargas pesadas… eventos precisos que no puedes dejar pasar.
            </p>

            <p className="font-bold text-red-600 border-2 border-red-600 p-4 text-center rounded-md uppercase">
              Pero hay un detalle que me preocupa por ti: esta ventana de activación es corta. Está abierta solo hasta medianoche de hoy.
            </p>

            <h2 className="text-2xl font-bold text-blue-900 pt-8 uppercase">
              {nombre}, ESTO ES EXACTAMENTE LO QUE LA ORACIÓN SECRETA DE CARLO ACUTIS ME MOSTRÓ PARA TI
            </h2>

            {/* SEÇÃO DE REVELAÇÕES */}
            <div className="space-y-8 mt-6">
              <div className="flex gap-4">
                <span className="text-yellow-600 font-bold text-2xl">01.</span>
                <p><strong>Localización del punto secreto:</strong> Carlo ilumina tu alma con su devoción eucarística, activando protección y cura que permanecen ocultas.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-yellow-600 font-bold text-2xl">02.</span>
                <p><strong>Introspección en tres capas:</strong> Mental (contra dudas modernas), emocional (cura de heridas) y espiritual (protección eucarística).</p>
              </div>

              <div className="flex gap-4">
                <span className="text-yellow-600 font-bold text-2xl">03.</span>
                <p><strong>Roadmap 2026:</strong> Qué invocar para milagros de cura y protección, fechas clave inspiradas en la vida de Carlo.</p>
              </div>
            </div>

            {/* IMAGEM SUGERIDA 2 */}
            <div className="my-10 bg-gray-100 h-64 rounded-lg flex items-center justify-center text-7xl grayscale opacity-80 border-2 border-dashed border-gray-300">
              <img src="/selling_pages/carlo-secret.png" alt="Oración Secreta de Carlo Acutis" className="w-full h-full object-cover" />
            </div>

            <h2 className="text-2xl font-bold text-red-700 pt-8 text-center uppercase">
              {nombre}, DEVES VER ESTA ORACIÓN ANTES DE MEDIANOCHE
            </h2>

            <p>
              El punto secreto que Carlo Acutis ha abierto en tu alma tiene que ser tomado antes de medianoche. Si no, se cierra por un año entero, y lo que no hayas invocado se repetirá con más fuerza.
            </p>

            <p className="font-bold italic text-center text-xl py-6">
              "No seas quien se arrepienta."
            </p>
            <div className="hidden lg:block">
              <img src="/selling_pages/arrow-down.png" alt="Carlo Acutis" className="w-20 object-cover mx-auto" />
              <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-yellow-500 text-center lg:top-6 ">
                <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">Precio único hoy</p>
                <div className="flex justify-center items-center gap-3 my-2">
                  <span className="text-gray-400 line-through text-lg">$49 USD</span>
                  <span className="text-4xl font-black text-green-600">$9 USD</span>
                </div>
                <p className="text-xs text-red-600 font-bold mb-4 uppercase">Solo hasta medianoche</p>
                <Link href="https://donate.stripe.com/6oUbJ0eFtfJV5VMgR66kg03" className=" relative  block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded shadow-lg transition-transform hover:scale-105 uppercase text-sm tracking-tighter">

                  Recibir mi Oración
                </Link>
              </div>
            </div>


          </div>
        </main>

        {/* COLUNA DIREITA: SIDEBAR (TESTEMUNHOS + PREÇO) */}
        <aside className="bg-slate-50 p-6 md:p-8 border-l border-gray-100 lg:self-start">

          <img src="/selling_pages/arrow-down.png" alt="Carlo Acutis" className="w-20 object-cover mx-auto" />
          <div className="space-y-8">

            {/* PREÇO E BOTÃO */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-yellow-500 text-center lg:sticky lg:top-6 z-50">
              <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">Precio único hoy</p>
              <div className="flex justify-center items-center gap-3 my-2">
                <span className="text-gray-400 line-through text-lg">$49 USD</span>
                <span className="text-4xl font-black text-green-600">$9 USD</span>
              </div>
              <p className="text-xs text-red-600 font-bold mb-4 uppercase">Solo hasta medianoche</p>
              <Link href="https://donate.stripe.com/6oUbJ0eFtfJV5VMgR66kg03" className=" relative  block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded shadow-lg transition-transform hover:scale-105 uppercase text-sm tracking-tighter">

                Recibir mi Oración
              </Link>

              <span>Esta donación de $9 es una contribución simbólica y ayuda a cubrir los costos.<br></br>
                <br />
                Continúa la misión de brindar oración y apoyo espiritual a quienes sufren, llegando a los enfermos y a las familias más necesitadas, siempre al servicio de la Santa Fe.
                <br />
                Su generosidad mantiene viva esta labor.</span>
            </div>

            {/* TESTEMUNHOS */}
            <div className="space-y-6">
              <h3 className="font-bold uppercase text-blue-900 text-sm border-b pb-2">Miles de Personas Satisfechas en Todo el Mundo</h3>

              {[
                {
                  t: "Querido Padre Juan, la oración secreta de Carlo Acutis ha sido un milagro en mi vida. Después de recibirla, sentí una protección espiritual inmediata contra las enfermedades que me acosaban. Mi cáncer remitió de manera inexplicable, y ahora vivo con fe renovada, inspirado en la devoción eucarística de Carlo.",
                  n: "Laura, España"
                },
                {
                  t: "Era escéptico, pero la oración personalizada de Carlo Acutis me abrió los ojos. Mi familia estaba en crisis, y gracias a esta intercesión, encontramos cura emocional y protección en nuestra vida diaria. Carlo, el beato moderno, nos ha bendecido con milagros que los médicos no explican.",
                  n: "Marc, Italia"
                },
                {
                  t: "La oración secreta de Carlo me dio la fuerza para superar una enfermedad grave. Su mensaje de protección en la era digital me ayudó a equilibrar mi vida espiritual y cotidiana. Ahora, mi salud es mejor que nunca, y siento su presencia guiándome cada día.",
                  n: "Christine, Francia"
                },
                {
                  t: "Carlo Acutis me ayudó a encontrar cura y protección en momentos difíciles. Después de la oración, mi hijo se recuperó de una enfermedad que parecía incurable. Estamos eternamente agradecidos por esta intercesión milagrosa y moderna.",
                  n: "Kim, Estados Unidos"
                }
              ].map((test, i) => (
                <div key={i} className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200 shadow-sm text-sm leading-relaxed relative">
                  <div className="absolute top-2 left-3 text-blue-300 text-3xl font-serif">"</div>
                  <p className="italic text-gray-800 pl-6 pr-6 pt-2 pb-2">{test.t}</p>
                  <div className="absolute bottom-2 right-3 text-blue-300 text-3xl font-serif rotate-180">"</div>
                  <span className="block font-bold not-italic mt-3 text-orange-700 text-xs text-right pr-2">— {test.n}</span>
                </div>
              ))}
            </div>

            {/* AVISO FINAL */}
            <div className="text-center p-4 bg-yellow-100 rounded text-xs text-yellow-900 font-medium uppercase">
              Carlo Acutis no negocia. La ventana se cierra pronto.
            </div>
          </div>
        </aside>
      </div>




      {/* FOOTER */}
      <footer className="bg-gray-100 py-12 px-6 text-center text-xs text-gray-500">
        <div className="max-w-4xl mx-auto space-y-4">
          <p>© 2026 Misión Carlo Acutis. Todos los derechos reservados.</p>
          <p>Este sitio no forma parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca comercial de FACEBOOK, Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default OracionCarloAcutis;