'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import homepageData from '@/data/homepage.json';

const titleLines = [
  [{ text: 'Rinnova', accent: false }],
  [
    { text: 'i tuoi', accent: false },
    { text: 'spazi', accent: true },
  ],
];

export default function HeroSection() {
  const stats = homepageData.stats;

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const delay = isMobile ? 300 : 0;
    const timer = setTimeout(() => setShouldAnimate(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    /*
     * min-h-[100dvh] = viewport dinamico su iOS (evita jump con address bar)
     * md:min-h-screen = comportamento desktop invariato
     */
    <section className="relative min-h-[100dvh] md:min-h-screen flex items-center bg-background">

      {/* Layer sfondo — overflow-hidden isolato qui */}
      <div className="absolute inset-0 overflow-hidden gpu-accelerate">

        {/* Immagine di sfondo */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero_01.jpg"
            alt=""
            fill
            className="object-cover opacity-50"
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={75}
            aria-hidden="true"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A7B]/95 via-[#1E3A7B]/80 to-[#1E3A7B]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A7B]/60 via-transparent to-transparent" />

        {/* Dot grid decorativo */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* Blob top-right */}
        <div
          className="absolute -top-32 -right-32 w-150 h-150 rounded-full bg-primary-light/30 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        {/* Blob bottom-left */}
        <div
          className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full bg-primary/40 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

      </div>

      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="max-w-3xl">

          {/* Eyebrow badge — ridotto su mobile */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-accent/10 text-accent border border-accent/40">
              Torino &amp; Provincia · Dal 2013
            </span>
          </motion.div>

          {/*
           * Titolo hero — GRANDE e d'impatto anche su mobile (comportamento voluto)
           * clamp(2.75rem, 11vw, 3.75rem): 41px @ 375px, 48px @ 430px, max 60px
           * sm 640px: 4.5rem | md 768px: 6rem | lg 1024px: 8rem  (DESKTOP — invariati)
           */}
          <h1 className="font-black text-[clamp(2.75rem,11vw,3.75rem)] sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[1.0] sm:leading-[0.9] tracking-tight mt-5 sm:mt-6 overflow-hidden">
            {titleLines.map((line, lineIndex) => (
              <div key={lineIndex} className="block overflow-hidden">
                <motion.div
                  className="flex flex-wrap gap-x-[0.25em]"
                  initial="hidden"
                  animate={shouldAnimate ? 'visible' : 'hidden'}
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

          {/* Sottotitolo — 15px mobile, 20px desktop */}
          <motion.p
            className="text-white/60 text-[15px] md:text-xl max-w-lg mt-5 sm:mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {homepageData.hero.subtitle}
          </motion.p>

          {/* CTA buttons — padding ridotto su mobile */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 sm:mt-10"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-accent hover:bg-accent-light text-white rounded-full font-semibold text-[15px] sm:text-base transition-colors duration-200 group"
            >
              {homepageData.hero.cta_primary}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/servizi"
              className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 border border-white/20 text-white hover:border-white/60 rounded-full font-semibold text-[15px] sm:text-base transition-colors duration-200"
            >
              {homepageData.hero.cta_secondary}
            </Link>
          </motion.div>

          {/* Stats — più compatte su mobile */}
          <motion.div
            className="flex items-center gap-0 mt-10 sm:mt-16"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-8 sm:h-10 bg-white/20 mx-3 sm:mx-6 shrink-0" />
                )}
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl sm:text-2xl leading-none">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="text-white/50 text-[11px] sm:text-sm mt-1">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator — solo sm+ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center"
        aria-hidden="true"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5 text-white/40 -mb-2" />
        <ChevronDown className="w-5 h-5 text-white/20" />
      </motion.div>

    </section>
  );
}
