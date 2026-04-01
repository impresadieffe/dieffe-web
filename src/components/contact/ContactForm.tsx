'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';
import { contactSchema, SERVIZI, type ContactFormData } from '@/lib/contactSchema';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function inputClass(hasError: boolean) {
  const base =
    'w-full border rounded-xl px-4 py-3 text-gray-900 bg-white transition-all duration-200 focus:outline-none focus:ring-2';
  return hasError
    ? `${base} border-red-300 focus:ring-red-200 focus:border-red-400`
    : `${base} border-gray-200 focus:ring-accent/30 focus:border-accent`;
}

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { privacy: false },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
          <h3 className="font-bold text-xl text-green-800">Messaggio inviato!</h3>
          <p className="text-green-600 mt-2">Ti contatteremo entro 24 ore.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
      <h3 className="font-bold text-2xl text-primary">
        Richiedi un preventivo gratuito
      </h3>
      <p className="text-gray-500 text-sm mt-1">
        Compila il form e ti ricontattiamo entro 24 ore
      </p>

      {status === 'error' && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">
            Errore nell&apos;invio. Riprova o chiamaci direttamente.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        {/* Row 1: Nome + Cognome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome <span className="text-accent">*</span>
            </label>
            <input
              id="nome"
              {...register('nome')}
              placeholder="Mario"
              className={inputClass(!!errors.nome)}
            />
            {errors.nome && (
              <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-1">
              Cognome <span className="text-accent">*</span>
            </label>
            <input
              id="cognome"
              {...register('cognome')}
              placeholder="Rossi"
              className={inputClass(!!errors.cognome)}
            />
            {errors.cognome && (
              <p className="text-red-500 text-xs mt-1">{errors.cognome.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Email + Telefono */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="mario@esempio.it"
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
              Telefono
            </label>
            <input
              id="telefono"
              type="tel"
              {...register('telefono')}
              placeholder="+39 011 000 0000"
              className={inputClass(!!errors.telefono)}
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
            )}
          </div>
        </div>

        {/* Row 3: Servizio */}
        <div>
          <label htmlFor="servizio" className="block text-sm font-medium text-gray-700 mb-1">
            Servizio di interesse
          </label>
          <select
            id="servizio"
            {...register('servizio')}
            className={inputClass(!!errors.servizio)}
          >
            <option value="">Seleziona un servizio...</option>
            {SERVIZI.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Row 4: Messaggio */}
        <div>
          <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-1">
            Messaggio <span className="text-accent">*</span>
          </label>
          <textarea
            id="messaggio"
            {...register('messaggio')}
            rows={4}
            placeholder="Descrivi brevemente il tuo progetto..."
            className={inputClass(!!errors.messaggio)}
          />
          {errors.messaggio && (
            <p className="text-red-500 text-xs mt-1">{errors.messaggio.message}</p>
          )}
        </div>

        {/* Row 5: Privacy */}
        <div>
          <div className="flex gap-3 items-start">
            <input
              id="privacy"
              type="checkbox"
              {...register('privacy')}
              className="mt-1 w-4 h-4 accent-accent cursor-pointer flex-shrink-0"
            />
            <label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
              Ho letto e accetto la{' '}
              <Link
                href="/privacy"
                className="text-accent underline underline-offset-2 hover:text-accent-dark"
              >
                Privacy Policy
              </Link>{' '}
              <span className="text-accent">*</span>
            </label>
          </div>
          {errors.privacy && (
            <p className="text-red-500 text-xs mt-1">{errors.privacy.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold py-4 rounded-xl mt-6 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
        >
          {status === 'loading' ? (
            <>
              <Spinner size="sm" color="white" />
              Invio in corso...
            </>
          ) : (
            <>
              Richiedi Preventivo Gratuito
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
