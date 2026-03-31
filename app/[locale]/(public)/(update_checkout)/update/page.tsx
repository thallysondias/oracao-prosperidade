'use client';

import { useState } from 'react';

type ResultKind = 'idle' | 'loading' | 'success' | 'error';

const WORKER_URL = 'https://vsl.casaceleste.online/atualizar-url';

export default function UpdateCheckoutPage() {
  const [result, setResult] = useState<string>('');
  const [status, setStatus] = useState<ResultKind>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setResult('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      setResult(text);
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setResult('Erro de conexao. Verifique a internet.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_55%)]" />
        <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-xl space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Atualizar Checkout
              </p>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Troque o link completo da Hotmart
              </h1>
              <p className="text-base text-slate-300 sm:text-lg">
                Cole o novo link e atualize em segundos. Funciona no celular e no desktop.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur sm:p-8"
            >
              <label htmlFor="url" className="text-sm font-medium text-slate-200">
                Novo link completo da Hotmart
              </label>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row">
                <input
                  type="url"
                  id="url"
                  name="url"
                  placeholder="https://pay.hotmart.com/NOVO_ID?checkoutMode=10"
                  required
                  className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-cyan-400 px-6 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === 'loading' ? 'Atualizando...' : 'Atualizar agora'}
                </button>
              </div>

              {status !== 'idle' && result.length > 0 && (
                <div
                  className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
                    status === 'success'
                      ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                      : 'border-rose-400/30 bg-rose-500/10 text-rose-200'
                  }`}
                  role="status"
                >
                  {result}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
