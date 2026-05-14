'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  eyebrow?: string;
}

/* Eyebrow automatica basata sul pathname (mobile) */
const EYEBROW_MAP: Record<string, string> = {
  '/chi-siamo':  'La nostra storia',
  '/servizi':    'Cosa facciamo',
  '/galleria':   'I nostri lavori',
  '/contatti':   'Parliamo insieme',
};

function formatSegment(segment: string): string {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function PageHero({ title, subtitle, backgroundImage, eyebrow }: PageHeroProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentPage = segments.length > 0 ? formatSegment(segments[segments.length - 1]) : title;

  const resolvedEyebrow = eyebrow ?? EYEBROW_MAP[pathname] ?? '';

  return (
    <section className="relative h-72 md:h-80 flex items-center justify-center overflow-hidden">

      {/* ─── Sfondo ─── */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient scuro sopra l'immagine */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A7B]/90 to-[#1E3A7B]/60" />
        </>
      ) : (
        /* Sfondo navy con gradiente diagonale quando non c'è immagine */
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #152d63 0%, #1E3A7B 50%, #2a4d9e 100%)',
          }}
        />
      )}

      {/* ─── Contenuto centrato ─── */}
      <div className="relative z-10 text-center px-5">

        {/* Eyebrow — visibile solo su mobile, riduce la sensazione di "intestazione piatta" */}
        {resolvedEyebrow && (
          <p className="md:hidden text-accent text-[11px] font-semibold uppercase tracking-[1.5px] mb-2">
            {resolvedEyebrow}
          </p>
        )}

        {/* Titolo */}
        <h1 className="font-bold text-[1.875rem] sm:text-4xl md:text-5xl text-white leading-tight">
          {title}
        </h1>

        {/* Sottotitolo */}
        {subtitle && (
          <p className="mt-2 text-white/75 text-[14px] sm:text-base md:text-lg max-w-sm sm:max-w-none mx-auto leading-snug">
            {subtitle}
          </p>
        )}

        {/*
         * Breadcrumb — stile pill/badge su mobile, testo semplice su desktop
         * Due versioni: mobile (pill) e desktop (testo)
         */}

        {/* Mobile breadcrumb — pill */}
        <nav
          aria-label="Breadcrumb"
          className="md:hidden mt-4 flex items-center justify-center gap-1.5"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-3 py-[5px] text-[12px] text-white/70 hover:text-white hover:bg-white/15 transition-colors duration-200"
          >
            <Home size={11} />
            Home
          </Link>
          <ChevronRight size={12} className="text-white/40 shrink-0" />
          <span className="inline-flex items-center bg-white/15 border border-white/20 rounded-full px-3 py-[5px] text-[12px] text-white font-medium">
            {currentPage}
          </span>
        </nav>

        {/* Desktop breadcrumb — testo (invariato) */}
        <nav
          aria-label="Breadcrumb"
          className="hidden md:flex items-center justify-center gap-2 mt-4 text-sm text-white/70"
        >
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <span aria-hidden="true">→</span>
          <span className="text-white font-medium">{currentPage}</span>
        </nav>

      </div>
    </section>
  );
}
