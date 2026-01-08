'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

type RevealItem = { title: string; text: string };
type Testimonial = { t: string; n: string };

const OracionPadrePio = () => {
  const t = useTranslations('PadrePioSelling');
  const locale = useLocale();
  const searchParams = useSearchParams();

  const fallbackName = t('fallbackName');

  const nombre = useMemo(() => {
    const fname = searchParams.get('FNAME');
    if (fname) {
      const firstName = fname.trim().split(' ')[0];
      return firstName || fallbackName;
    }
    return fallbackName;
  }, [searchParams, fallbackName]);

  const fechaHoy = useMemo(() => {
    const dateLocale = locale === 'en' ? 'en-US' : locale === 'pt' ? 'pt-BR' : 'es-ES';
    return new Date()
      .toLocaleDateString(dateLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .toUpperCase();
  }, [locale]);

  const revealItems = t.raw('revealItems') as RevealItem[];
  const testimonials = t.raw('testimonials') as Testimonial[];

  return (
    <div className="min-h-screen bg-white font-serif text-gray-900">
      <img
        src="/selling_pages/padre-header.png"
        alt={t('headerAlt')}
        className="w-full object-cover mx-auto"
      />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#001a33] py-12 md:py-20 overflow-hidden">
        {/* Luz Dourada de Fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,_rgba(255,215,0,0.15)_0%,_transparent_70%)]"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase tracking-tight">
            <span className="text-yellow-500">{nombre}</span>, {t('heroTitleAfterName')}
          </h1>
          <p className="mt-6 text-yellow-200 text-lg md:text-xl font-medium uppercase tracking-widest">
            {t('heroSubtitle', { date: fechaHoy })}
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
              {t('p1Before')}
              <strong>{t('p1Strong')}</strong>
              {t('p1After')}
            </p>
            <p>
              {t('p2Before')}
              <span className="bg-yellow-100 font-bold px-1">{t('secretPrayer')}</span>{' '}
              {t('p2After')}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 italic text-blue-900">
              {t('callout')}
            </div>

            <p>
              <strong>{nombre}</strong>, {t('p3Before')}
              <span className="text-blue-800 font-bold">{t('keyLabel')}</span>, {t('p3After')}
            </p>

            {/* IMAGEM SUGERIDA */}
            <div className="my-10 flex flex-col items-center">
              <img
                src="/selling_pages/chave.png"
                alt={t('keyAlt')}
                className="w-full h-80 rounded-lg shadow-2xl"
              />
              <p className="text-sm text-gray-500 mt-2 italic">{t('keyCaption')}</p>
            </div>

            <p>{t('p4')}</p>

            <p className="font-bold text-red-600 border-2 border-red-600 p-4 text-center rounded-md uppercase">
              {t('urgency')}
            </p>

            <h2 className="text-2xl font-bold text-blue-900 pt-8 uppercase">
              {t('revealTitle', { name: nombre })}
            </h2>

            {/* SEÑAL DE REVELACIONES */}
            <div className="space-y-8 mt-6">
              {revealItems.map((item, index) => (
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
              <img src="/selling_pages/secret.png" alt={t('secretAlt')} className="w-full h-full object-cover" />
            </div>

            <h2 className="text-2xl font-bold text-red-700 pt-8 text-center uppercase">
              {t('mustSeeTitle', { name: nombre })}
            </h2>

            <p>{t('mustSeeText')}</p>

            <p className="font-bold italic text-center text-xl py-6">"{t('quote')}"</p>
            <div className="hidden lg:block">
              <img src="/selling_pages/arrow-down.png" alt={t('arrowAlt')} className="w-20  object-cover mx-auto" />
              <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-yellow-500 text-center lg:top-6 ">
                <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">{t('priceTitle')}</p>
                <div className="flex justify-center items-center gap-3 my-2">
                  <span className="text-gray-400 line-through text-lg">$49 USD</span>
                  <span className="text-4xl font-black text-green-600">$9 USD</span>
                </div>
                <p className="text-xs text-red-600 font-bold mb-4 uppercase">{t('priceLimit')}</p>
                <Link
                  href="https://donate.stripe.com/9B6cN41SH9lx3NEbwM6kg08"
                  className=" relative  block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded shadow-lg transition-transform hover:scale-105 uppercase text-sm tracking-tighter"
                >
                  {t('cta')}
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* COLUNA DIREITA: SIDEBAR (TESTEMUNHOS + PREÇO) */}
        <aside className="bg-slate-50 p-6 md:p-8 border-l border-gray-100 lg:self-start">
          <img src="/selling_pages/arrow-down.png" alt={t('arrowAlt')} className="w-20  object-cover mx-auto" />
          <div className="space-y-8">
            {/* PREÇO E BOTÃO */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-yellow-500 text-center lg:sticky lg:top-6 z-50">
              <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">{t('priceTitle')}</p>
              <div className="flex justify-center items-center gap-3 my-2">
                <span className="text-gray-400 line-through text-lg">$49 USD</span>
                <span className="text-4xl font-black text-green-600">$9 USD</span>
              </div>
              <p className="text-xs text-red-600 font-bold mb-4 uppercase">{t('priceLimit')}</p>
              <Link
                href="https://donate.stripe.com/9B6cN41SH9lx3NEbwM6kg08"
                className=" relative  block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded shadow-lg transition-transform hover:scale-105 uppercase text-sm tracking-tighter"
              >
                {t('cta')}
              </Link>
            </div>

            {/* TESTEMUNHOS */}
            <div className="space-y-6">
              <h3 className="font-bold uppercase text-blue-900 text-sm border-b pb-2">
                {t('testimonialsTitle')}
              </h3>

              {testimonials.map((test, index) => (
                <div
                  key={`${test.n}-${index}`}
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
              {t('finalNotice')}
            </div>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-12 px-6 text-center text-xs text-gray-500">
        <div className="max-w-4xl mx-auto space-y-4">
          <p>{t('footerRights')}</p>
          <p>{t('footerDisclaimer')}</p>
        </div>
      </footer>
    </div>
  );
};

export default OracionPadrePio;
