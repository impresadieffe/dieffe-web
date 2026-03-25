'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Galleria', href: '/galleria' },
  { label: 'Contatti', href: '/contatti' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTextColor = scrolled ? '#1A2E4A' : '#ffffff';
  const hamColor = scrolled ? '#1A2E4A' : '#ffffff';

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20"
        animate={{
          backgroundColor: scrolled ? '#ffffff' : 'rgba(0,0,0,0)',
          boxShadow: scrolled
            ? '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)'
            : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none select-none">
            <motion.span
              className="font-black text-2xl tracking-tight"
              animate={{ color: navTextColor }}
              transition={{ duration: 0.3 }}
            >
              DIEFFE
            </motion.span>
            <span className="text-sm font-medium text-accent">Ristrutturazioni</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative py-1 text-sm font-medium">
                  <motion.span
                    animate={{ color: navTextColor }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.label}
                  </motion.span>
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
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors duration-200"
            >
              Richiedi Preventivo
            </Link>

            {/* Hamburger button */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block h-0.5 w-6 rounded-full origin-center"
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 8 : 0,
                  backgroundColor: hamColor,
                }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block h-0.5 w-6 rounded-full origin-center"
                animate={{
                  opacity: menuOpen ? 0 : 1,
                  scaleX: menuOpen ? 0 : 1,
                  backgroundColor: hamColor,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-6 rounded-full origin-center"
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -8 : 0,
                  backgroundColor: hamColor,
                }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer + overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu di navigazione"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                <Link
                  href="/"
                  className="flex flex-col leading-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-black text-2xl text-primary tracking-tight">DIEFFE</span>
                  <span className="text-sm font-medium text-accent">Ristrutturazioni</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-primary hover:text-accent transition-colors"
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
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors duration-150 ${
                          isActive
                            ? 'bg-primary/5 text-primary border-l-2 border-accent pl-3.5'
                            : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer CTA */}
              <div className="p-6 border-t border-neutral-100">
                <Link
                  href="/contatti"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full px-5 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors duration-200"
                >
                  Richiedi Preventivo
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
