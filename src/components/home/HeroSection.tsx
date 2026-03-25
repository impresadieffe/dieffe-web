'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import homepageData from '@/data/homepage.json';

export default function HeroSection() {
  const { hero } = homepageData;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
        alt="Cantiere edile Dieffe Ristrutturazioni"
        fill
        className="object-cover"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />

      {/* Content */}
      <Container className="relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/40">
              Torino &amp; Piemonte · Dal 2004
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-black text-5xl md:text-7xl text-white leading-tight mt-6"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            {hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-white/80 mt-4 max-w-xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button href="/contatti" variant="primary" size="lg">
              {hero.cta_primary}
            </Button>
            <Link
              href="/servizi"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200"
            >
              {hero.cta_secondary}
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="text-white/60 animate-bounce" size={32} />
      </div>
    </section>
  );
}
