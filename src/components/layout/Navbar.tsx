'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Phone, Mail } from 'lucide-react';
import siteData from '@/data/site.json';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Galleria', href: '/galleria' },
  { label: 'Contatti', href: '/contatti' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const forceSolid = pathname === '/privacy' || pathname === '/cookie';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Blocca lo scroll del body quando il drawer è aperto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isSolid = forceSolid || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-300 ${
          isSolid
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-black/5'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="relative select-none h-12 w-[130px] md:h-16 md:w-[180px]">
            <Image
              src="/logo-bianco.svg"
              alt="Dieffe Ristrutturazioni"
              fill
              className={`object-contain object-left transition-opacity duration-300 ${
                isSolid ? 'opacity-0' : 'opacity-100'
              }`}
              priority
            />
            <Image
              src="/logo-colorato.svg"
              alt="Dieffe Ristrutturazioni"
              fill
              className={`object-contain object-left transition-opacity duration-300 ${
                isSolid ? 'opacity-100' : 'opacity-0'
              }`}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? isSolid ? 'text-primary' : 'text-white'
                      : isSolid
                        ? 'text-primary/60 hover:text-primary'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contatti"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-accent text-accent text-sm font-semibold rounded-lg hover:bg-accent hover:text-white transition-all duration-200 group"
            >
              Richiedi Preventivo
              <ArrowRight
                size={14}
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              />
            </Link>

            {/* Hamburger — 3 linee animate */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2 w-10 h-10"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-[2px] w-[22px] rounded-full origin-center transition-all duration-300 ${
                  isSolid ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
              />
              <span
                className={`block h-[2px] w-[22px] rounded-full origin-center transition-all duration-200 ${
                  isSolid ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
              />
              <span
                className={`block h-[2px] w-[22px] rounded-full origin-center transition-all duration-300 ${
                  isSolid ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Drawer mobile + overlay ─── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay scuro con blur */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer navy — slide da destra */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-[360px] bg-[#1E3A7B] flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu di navigazione"
              style={{ height: '100dvh' }}
            >

              {/* Header drawer: logo bianco + bottone chiusura */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
                <Link
                  href="/"
                  className="relative h-10 w-[130px]"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image
                    src="/logo-bianco.svg"
                    alt="Dieffe Ristrutturazioni"
                    fill
                    className="object-contain object-left"
                  />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-150"
                  aria-label="Chiudi menu"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                      d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Voci di navigazione — scrollabili */}
              <nav className="flex flex-col flex-1 overflow-y-auto py-2">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-6 py-[18px] text-[18px] font-medium border-b border-white/[0.08] transition-colors duration-150 ${
                          isActive
                            ? 'text-white bg-white/[0.06] border-l-[3px] border-l-accent pl-[21px]'
                            : 'text-white/80 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight
                          size={16}
                          className="text-white/40 shrink-0"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer sticky: CTA + contatti */}
              <div className="shrink-0 px-6 py-6 border-t border-white/10 bg-[#1E3A7B]">
                <Link
                  href="/contatti"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-dark text-white font-semibold py-4 rounded-xl text-[15px] transition-colors duration-200"
                >
                  Richiedi Preventivo
                  <ArrowRight size={16} />
                </Link>

                <div className="mt-4 flex flex-col gap-2 items-center">
                  <a
                    href={`tel:${siteData.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-white/60 hover:text-white/90 text-[13px] transition-colors duration-150"
                  >
                    <Phone size={13} />
                    {siteData.phone}
                  </a>
                  <a
                    href={`mailto:${siteData.email}`}
                    className="flex items-center gap-2 text-white/60 hover:text-white/90 text-[13px] transition-colors duration-150"
                  >
                    <Mail size={13} />
                    {siteData.email}
                  </a>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
