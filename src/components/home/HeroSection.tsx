'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const titleLines = [
  [{ text: 'Rinnova', accent: false }],
  [
    { text: 'i tuoi', accent: false },
    { text: 'spazi', accent: true },
  ],
];

const stats = [
  { number: '20+', label: 'Anni' },
  { number: '500+', label: 'Progetti' },
  { number: '300+', label: 'Clienti' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-background">

      {/* Background layers — overflow-hidden isolated here so scroll indicator isn't clipped */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Background image — very dark, almost a texture */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-50"
            priority
            aria-hidden="true"
          />
        </div>

        {/* Gradient overlay — scuro a sinistra, trasparente in basso a destra */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E4A]/95 via-[#1A2E4A]/80 to-[#1A2E4A]/15" />
        {/* Secondo layer — protegge la colonna testo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2E4A]/60 via-transparent to-transparent" />

        {/* Decorative: dot grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* Decorative: blurred circle top-right — blue only */}
        <div
          className="absolute -top-32 -right-32 w-150 h-150 rounded-full bg-primary-light/30 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Decorative: blurred circle bottom-left */}
        <div
          className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full bg-primary/40 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/40">
              Torino &amp; Piemonte · Est. 2004
            </span>
          </motion.div>

          {/* Title — word-by-word stagger */}
          <h1 className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight mt-6 overflow-hidden">
            {titleLines.map((line, lineIndex) => (
              <div key={lineIndex} className="block overflow-hidden">
                <motion.div
                  className="flex flex-wrap gap-x-[0.25em]"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.3 + lineIndex * 0.3,
                      },
                    },
                  }}
                >
                  {line.map((segment, segIndex) => (
                    <motion.span
                      key={segIndex}
                      className={segment.accent ? 'text-accent' : 'text-white'}
                      variants={{
                        hidden: { opacity: 0, y: 60 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                    >
                      {segment.text}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/60 text-lg md:text-xl max-w-lg mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Trasformiamo appartamenti, bagni e cucine con oltre vent&apos;anni di
            esperienza artigianale. Qualità senza compromessi, tempi certi,
            risultati che durano.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white rounded-full font-semibold transition-colors duration-200 group"
            >
              Richiedi Preventivo
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/servizi"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white hover:border-white/60 rounded-full font-semibold transition-colors duration-200"
            >
              Scopri i Servizi
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-0 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-10 bg-white/20 mx-6 shrink-0" />
                )}
                <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl leading-none">
                    {stat.number}
                  </span>
                  <span className="text-white/50 text-sm mt-1">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — outside overflow-hidden wrapper, so it's never clipped */}
      <div className="absolute bottom-8 left-8 z-10 flex items-center gap-3" aria-hidden="true">
        <span
          className="text-white/40 text-xs tracking-widest uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scorri
        </span>
        <motion.div
          className="w-px bg-white/40 origin-top"
          initial={{ scaleY: 0, height: 0 }}
          animate={{ height: 48, scaleY: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.5,
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.8,
          }}
        />
      </div>

    </section>
  );
}
