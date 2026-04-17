'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/ui/Container';
import aboutData from '@/data/about.json';

export default function StorySection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: '-80px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' });

  const { storia, timeline } = aboutData;
  const paragraphs = [storia.paragrafo1, storia.paragrafo2, storia.paragrafo3];

  return (
    <section className="py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Colonna sinistra — testo + timeline */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -32 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              La Nostra Storia
            </span>
            <h2 className="font-black text-5xl text-primary leading-[1.1] mt-3">
              {storia.titolo}
            </h2>

            {paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-lg mt-4">
                {p}
              </p>
            ))}

            {/* Timeline */}
            <div className="mt-12">
              {timeline.map((m, i) => (
                <motion.div
                  key={m.anno}
                  className="flex gap-6 items-start mb-8"
                  initial={{ opacity: 0, x: -16 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {/* Punto + linea connettore */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-accent/20 my-2 min-h-[2rem]" />
                    )}
                  </div>
                  <div>
                    <span className="font-black text-accent text-lg leading-none">
                      {m.anno}
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">
                      {m.testo}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Colonna destra — immagine + card stat */}
          <motion.div
            ref={rightRef}
            className="relative"
            initial={{ opacity: 0, x: 32 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="relative">
              {/* Immagine statica */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                  alt="Team Dieffe Ristrutturazioni al lavoro"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card statistica floating */}
              <motion.div
                className="absolute bottom-8 -left-5 z-10
                           bg-white rounded-2xl p-6 shadow-2xl border-l-4 border-accent
                           min-w-[180px]"
                initial={{ opacity: 0, y: 16, x: -8 }}
                animate={rightInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="font-black text-4xl text-primary leading-none">
                  500+
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Progetti completati
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
