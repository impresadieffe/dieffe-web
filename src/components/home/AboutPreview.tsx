'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import homepageData from '@/data/homepage.json';

const keyPoints = [
  'Oltre 20 anni di esperienza nel settore',
  'Materiali di prima qualità certificati',
  'Preventivi gratuiti e trasparenti',
];

export default function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-32 bg-[#F5F5F3]">
      <Container>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Colonna sinistra — immagine con rotazione */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl"
              style={{ rotate: -2 }}
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="Team Dieffe Ristrutturazioni al lavoro"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-accent text-white text-sm px-3 py-1 rounded-full font-semibold">
                Dal 2004
              </div>
            </motion.div>
          </motion.div>

          {/* Colonna destra — testo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Chi Siamo
            </span>
            <h2 className="font-black text-5xl text-primary leading-tight mt-2">
              {homepageData.about.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mt-6 text-lg">
              {homepageData.about.text}
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {keyPoints.map((point) => (
                <li key={point} className="flex gap-3 items-start">
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>

            <Button href="/chi-siamo" variant="outline" className="mt-10">
              Scopri la nostra storia →
            </Button>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
