'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'dieffe-cookie-consent';

interface CookiePrefs {
  analytics: boolean;
  maps: boolean;
}

type ConsentValue = 'all' | 'necessary' | CookiePrefs;

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A7B] ${
        checked ? 'bg-[#1E3A7B]' : 'bg-gray-200'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function CookieBanner() {
  const [isMounted, setIsMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({ analytics: true, maps: true });

  useEffect(() => {
    setIsMounted(true);
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function saveConsent(value: ConsentValue) {
    localStorage.setItem(STORAGE_KEY, typeof value === 'string' ? value : JSON.stringify(value));
    setVisible(false);
    setShowPrefs(false);
  }

  function saveCustom() {
    const isAll = prefs.analytics && prefs.maps;
    const isNone = !prefs.analytics && !prefs.maps;
    saveConsent(isAll ? 'all' : isNone ? 'necessary' : prefs);
  }

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay (preferenze aperte) */}
          <AnimatePresence>
            {showPrefs && (
              <motion.div
                className="fixed inset-0 z-40 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          {/* Banner principale */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.9 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t-4 border-[#1E3A7B]"
            role="dialog"
            aria-label="Gestione preferenze cookie"
            aria-modal="false"
          >
            {/* Pannello preferenze */}
            <AnimatePresence>
              {showPrefs && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden border-b border-gray-100"
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-800">Gestisci le preferenze</h3>
                      <button
                        onClick={() => setShowPrefs(false)}
                        aria-label="Chiudi preferenze"
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Cookie tecnici */}
                      <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">Cookie tecnici necessari</p>
                          <p className="text-xs text-gray-500 mt-0.5">Necessari per il funzionamento del sito. Non possono essere disabilitati.</p>
                        </div>
                        <Toggle checked={true} onChange={() => {}} disabled />
                      </div>

                      {/* Cookie analitici */}
                      <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">Cookie analitici <span className="text-xs font-normal text-gray-400">(Google Analytics)</span></p>
                          <p className="text-xs text-gray-500 mt-0.5">Ci aiutano a capire come usi il sito per migliorarlo.</p>
                        </div>
                        <Toggle
                          checked={prefs.analytics}
                          onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                        />
                      </div>

                      {/* Cookie Google Maps */}
                      <div className="flex items-center justify-between gap-4 py-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">Cookie terze parti <span className="text-xs font-normal text-gray-400">(Google Maps)</span></p>
                          <p className="text-xs text-gray-500 mt-0.5">Necessari per visualizzare la mappa nella pagina contatti.</p>
                        </div>
                        <Toggle
                          checked={prefs.maps}
                          onChange={(v) => setPrefs((p) => ({ ...p, maps: v }))}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={saveCustom}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1E3A7B] text-white text-sm font-semibold hover:bg-[#162d61] transition-colors duration-200"
                      >
                        Salva preferenze
                      </button>
                      <button
                        onClick={() => { setPrefs({ analytics: true, maps: true }); saveConsent('all'); }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors duration-200"
                      >
                        Accetta tutti
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Banner principale */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Utilizziamo cookie tecnici necessari al funzionamento del sito e, con il tuo consenso,
                    cookie analitici per migliorare la navigazione. Leggi la nostra{' '}
                    <Link href="/cookie" className="text-[#1E3A7B] font-semibold hover:underline">
                      Cookie Policy
                    </Link>{' '}
                    e la nostra{' '}
                    <Link href="/privacy" className="text-[#1E3A7B] font-semibold hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center gap-2 shrink-0">
                  <button
                    onClick={() => saveConsent('all')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1E3A7B] text-white text-sm font-semibold hover:bg-[#162d61] transition-colors duration-200 whitespace-nowrap"
                  >
                    Accetta tutti
                  </button>
                  <button
                    onClick={() => saveConsent('necessary')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
                  >
                    Solo necessari
                  </button>
                  <button
                    onClick={() => setShowPrefs((v) => !v)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2.5 text-sm text-[#1E3A7B] font-semibold hover:underline whitespace-nowrap"
                  >
                    Preferenze
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${showPrefs ? '-rotate-90' : 'rotate-90'}`}
                    />
                  </button>
                  <button
                    onClick={() => saveConsent('necessary')}
                    aria-label="Chiudi banner cookie"
                    className="hidden lg:flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X size={16} />
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
