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
    <section className="relative py-32 bg-primary overflow-hidden">

      {/* Decorativo: cerchio accent sfocato top-right */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      {/* Decorativo: cerchio bianco sfocato bottom-left */}
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      {/* Texture: griglia di punti */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <Container>
        <motion.div
          ref={ref}
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Inizia il tuo progetto
          </span>
          <h2 className="font-black text-5xl md:text-6xl text-white mt-4 leading-tight">
            Hai un progetto in mente?
          </h2>
          <p className="text-white/60 text-xl mt-6 leading-relaxed">
            Contattaci per un sopralluogo gratuito e senza impegno.
            <br className="hidden sm:block" />
            Risposta garantita entro 24 ore.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-accent hover:bg-accent-light text-white rounded-full font-semibold transition-colors duration-200 group"
            >
              Richiedi Preventivo Gratuito
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={`tel:${siteData.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/20 text-white hover:border-white/50 rounded-full font-semibold transition-colors duration-200"
            >
              <Phone size={18} />
              Chiamaci ora
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
