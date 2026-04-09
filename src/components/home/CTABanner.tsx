'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import siteData from '@/data/site.json';

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-32 bg-[#1E3A7B] overflow-hidden">

      {/* Blob accent/10 top-right */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {/* Blob white/5 bottom-left */}
      <motion.div
        className="absolute -bottom-20 -left-16 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        aria-hidden="true"
      />
      {/* Blob accent/5 center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        aria-hidden="true"
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <Container>
        <motion.div
          ref={ref}
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span
            className="text-sm font-semibold uppercase tracking-widest text-accent"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Inizia il tuo progetto
          </motion.span>

          <h2 className="font-black text-5xl md:text-6xl text-white mt-4 leading-tight">
            Hai un progetto<br className="hidden sm:block" /> in mente?
          </h2>

          <p className="text-white/60 text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Contattaci per un sopralluogo gratuito e senza impegno.
            <br className="hidden sm:block" />
            Risposta garantita entro 24 ore.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center flex-wrap">
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0090c7] text-white rounded-full px-10 py-4 font-semibold transition-colors duration-300"
            >
              Richiedi Preventivo Gratuito
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href={`tel:${siteData.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white rounded-full px-10 py-4 font-semibold transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              Chiamaci ora
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
