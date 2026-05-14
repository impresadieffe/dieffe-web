'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-0.5 w-6 rounded-full origin-center transition-all duration-300 ${
                  isSolid ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full origin-center transition-all duration-200 ${
                  isSolid ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full origin-center transition-all duration-300 ${
                  isSolid ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer + overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white flex flex-col shadow-2xl border-l border-black/5"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu di navigazione"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
                <Link
                  href="/"
                  className="relative h-12 w-[140px]"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image
                    src="/logo-colorato.svg"
                    alt="Dieffe Ristrutturazioni"
                    fill
                    className="object-contain object-left"
                  />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-text-muted hover:text-primary transition-colors"
                  aria-label="Chiudi menu"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M15 5L5 15M5 5l10 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors duration-150 ${
                          isActive
                            ? 'bg-accent/10 text-primary border-l-2 border-accent pl-3.5'
                            : 'text-text-muted hover:bg-black/5 hover:text-primary'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer CTA */}
              <div className="p-6 border-t border-black/5">
                <Link
                  href="/contatti"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition-all duration-200 group"
                >
                  Richiedi Preventivo
                  <ArrowRight size={16} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
