'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';

const OracionPadrePio = () => {
  const searchParams = useSearchParams();
  
  // Pega o nome da URL e extrai apenas a primeira parte
  const nombre = useMemo(() => {
    const fname = searchParams.get('FNAME');
    if (fname) {
      // Pega apenas a primeira parte do nome (antes do primeiro espaço)
      const firstName = fname.trim().split(' ')[0];
      return firstName || 'filho';
    }
    return 'filho'; // Padrão quando não há nome na URL
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
        <img src="/selling_pages/padre-header.png" alt="Padre Pío" className="w-full object-cover mx-auto" />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#001a33] py-12 md:py-20 overflow-hidden">
        {/* Luz Dourada de Fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,_rgba(255,215,0,0.15)_0%,_transparent_70%)]"></div>
      
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase tracking-tight">
            <span className="text-yellow-500">{nombre}</span>, UN PUNTO SECRETO EN TU ALMA HA SIDO ACTIVADO POR EL <span className="text-yellow-500">PADRE PÍO…</span>
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
              Anoche, mientras oraba por los nombres de nuestra lista, algo excepcional ocurrió… El espíritu del <strong>Padre Pío, el santo de los estigmas</strong>, me trajo un mensaje urgente y personal para ti.
            </p>
            <p>
              Una <span className="bg-yellow-100 font-bold px-1">oración secreta</span> que él guardaba en su corazón y usaba en privado para invocar su intercesión poderosa – trayendo sanación profunda, protección contra todo mal y milagros que cambian vidas – ha sido revelada de forma rara e intensa en este preciso momento.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 italic text-blue-900">
              Invoca la intercesión del santo de los estigmas. El Padre Pío trae sanación, protección y milagros para aquellos que buscan su ayuda espiritual con fe genuina.
            </div>

            <p>
              <strong>{nombre}</strong>, esto no es una oración común. Es una <span className="text-blue-800 font-bold">llave espiritual secreta</span>, activada ahora en un momento divino único (al inicio de 2026, cuando las gracias fluyen con máxima intensidad para quien las agarra).
            </p>

            {/* IMAGEM SUGERIDA */}
            <div className="my-10 flex flex-col items-center">
            <img src="/selling_pages/chave.png" alt="Padre Pío con estigmas iluminados por la luz divina" className="w-full h-80 rounded-lg shadow-2xl" />
              <p className="text-sm text-gray-500 mt-2 italic">Padre Pío con estigmas iluminados por la luz divina</p>
            </div>

            <p>
              Vi, en oración profunda, cómo esta oración secreta abre puertas que permanecen cerradas para la mayoría. Amor, salud, prosperidad, liberación de cargas pesadas… eventos precisos que no puedes dejar pasar.
            </p>

            <p className="font-bold text-red-600 border-2 border-red-600 p-4 text-center rounded-md uppercase">
              Pero hay un detalle que me preocupa por ti: esta ventana de activación es corta. Está abierta solo hasta medianoche de hoy.
            </p>

            <h2 className="text-2xl font-bold text-blue-900 pt-8 uppercase">
              {nombre}, ESTO ES EXACTAMENTE LO QUE LA ORACIÓN SECRETA DEL PADRE PÍO ME MOSTRÓ PARA TI
            </h2>

            {/* SEÇÃO DE REVELAÇÕES */}
            <div className="space-y-8 mt-6">
              <div className="flex gap-4">
                <span className="text-yellow-600 font-bold text-2xl">01.</span>
                <p><strong>Localización del punto secreto:</strong> Esta llave actúa solo una vez al año, iluminando lo que normalmente permanece oculto en tu alma.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-yellow-600 font-bold text-2xl">02.</span>
                <p><strong>Introspección en tres capas:</strong> Guía mental (tus pensamientos), emocional (lo que callas) y espiritual (bloqueos de energía).</p>
              </div>

              <div className="flex gap-4">
                <span className="text-yellow-600 font-bold text-2xl">03.</span>
                <p><strong>Roadmap 2026:</strong> Qué invocar en los primeros meses, fechas clave para milagros y cómo alinear tu camino.</p>
              </div>
            </div>

            {/* IMAGEM SUGERIDA 2 */}
            <div className="my-10 bg-gray-100 h-64 rounded-lg flex items-center justify-center text-7xl grayscale opacity-80 border-2 border-dashed border-gray-300">
              <img src="/selling_pages/secret.png" alt="Oración Secreta del Padre Pío" className="w-full h-full object-cover" />
            </div>

            <h2 className="text-2xl font-bold text-red-700 pt-8 text-center uppercase">
              {nombre}, DEVES VER ESTA ORACIÓN ANTES DE MEDIANOCHE
            </h2>

            <p>
              El punto secreto que el Padre Pío ha abierto en tu alma tiene que ser tomado antes de medianoche. Si no, se cierra por un año entero, y lo que no hayas invocado se repetirá con más fuerza.
            </p>

            <p className="font-bold italic text-center text-xl py-6">
              "No seas quien se arrepienta."
            </p>        

            
          </div>
        </main>

        {/* COLUNA DIREITA: SIDEBAR (TESTEMUNHOS + PREÇO) */}
        <aside className="bg-slate-50 p-6 md:p-8 border-l border-gray-100 lg:self-start">

        <img src="/selling_pages/arrow-down.png" alt="Padre Pío" className="w-20  object-cover mx-auto" />
          <div className="space-y-8">
            
            {/* PREÇO E BOTÃO */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-yellow-500 text-center lg:sticky lg:top-6 z-50">
              <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">Precio único hoy</p>
              <div className="flex justify-center items-center gap-3 my-2">
                <span className="text-gray-400 line-through text-lg">$49 USD</span>
                <span className="text-4xl font-black text-green-600">$9 USD</span>
              </div>
              <p className="text-xs text-red-600 font-bold mb-4 uppercase">Solo hasta medianoche</p>
              <Link href="https://donate.stripe.com/9B6cN41SH9lx3NEbwM6kg08"  className=" relative  block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded shadow-lg transition-transform hover:scale-105 uppercase text-sm tracking-tighter">
              
              Recibir mi Oración
              </Link>


   
  
            </div>

            {/* TESTEMUNHOS */}
            <div className="space-y-6">
              <h3 className="font-bold uppercase text-blue-900 text-sm border-b pb-2">Miles de Personas Satisfechas en Todo el Mundo</h3>
              
              {[
                { 
                  t: "Querido Padre Juan, no sé cómo funciona exactamente esta oración secreta del Padre Pío, pero realmente funciona. El año pasado fue como un milagro después de recibir la oración personalizada y seguir sus consejos. Mi esposo y yo estábamos pasando por una crisis muy difícil en nuestro matrimonio, y gracias a esta oración encontramos el camino de vuelta el uno al otro. Ahora vivimos en un mundo mejor, lleno de amor y comprensión. La protección que sentimos es real y palpable.",
                  n: "Laura & Marc, California"
                },
                { 
                  t: "Recibí mi primera oración personalizada del Padre Pío hace varios meses y luego otra vez hace poco. Debo admitir que era escéptica sobre este tipo de cosas espirituales, pero para mi asombro, ambas veces punto por punto las cosas sucedieron exactamente como se predijo en la oración. Mi salud mejoró de manera que los médicos no podían explicar, y encontré la paz interior que había estado buscando durante años. No creo en tales coincidencias, así que gracias Padre Juan, definitivamente continuaré usando sus servicios en el futuro.",
                  n: "Christine, Países Bajos"
                },
                { 
                  t: "El Padre Pío me ayudó a encontrar el camino correcto en mi carrera, que había sido un problema enorme durante toda mi vida. Después de recibir la oración personalizada encontré confianza en mis fortalezas y la capacidad de avanzar, ¡y finalmente pude hacerlo! Todavía vuelvo a mi oración, que es muy perspicaz y útil en la vida cotidiana. La protección espiritual que siento es increíble, y mi trabajo ahora prospera de una manera que nunca pensé posible.",
                  n: "Francis, Irlanda"
                },
                { 
                  t: "Hiciste un trabajo extraordinario. Cuando te contacté por primera vez estaba pasando por un momento muy difícil en mi vida y tu guía y la oración del Padre Pío me mostraron cómo resolver las cosas. Ahora estoy viviendo cómodamente, estoy con un hombre absolutamente increíble y tengo todo lo que siempre he querido en mi vida. No sé dónde estaría sin tu ayuda y estoy tan agradecida por guiarme hasta donde estoy ahora. No puedo agradecerte lo suficiente por el maravilloso trabajo que has hecho y también por tu apoyo. Espero que puedas cambiar la vida de muchas personas como has cambiado la mía y quiero animarte a hacerlo.",
                  n: "Kim, Singapur"
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
              El Padre Pío no negocia. La ventana se cierra pronto.
            </div>
          </div>
        </aside>
      </div>

 


      {/* FOOTER */}
      <footer className="bg-gray-100 py-12 px-6 text-center text-xs text-gray-500">
        <div className="max-w-4xl mx-auto space-y-4">
          <p>© 2026 Misión Padre Pío. Todos los derechos reservados.</p>
          <p>Este sitio no forma parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca comercial de FACEBOOK, Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default OracionPadrePio;
