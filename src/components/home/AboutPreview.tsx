'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import homepageData from '@/data/homepage.json';

const keyPoints = [
  'Oltre 20 anni di esperienza nel settore',
  'Materiali di prima qualità certificati',
  'Preventivi gratuiti e trasparenti',
];

export default function AboutPreview() {
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: true, margin: '-80px' });

  return (
    <section className="py-32 bg-[#F5F5F3]">
      <Container>
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Colonna sinistra — immagine */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Cantiere Dieffe Ristrutturazioni"
                fill
                className="object-cover"
              />

              {/* Badge */}
              <div className="absolute top-6 left-6 z-10 bg-accent text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg">
                Dal 2004
              </div>
            </div>
          </motion.div>

          {/* Colonna destra — testo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Chi Siamo
            </span>
            <h2 className="font-black text-5xl text-primary leading-[1.1] mt-3">
              {homepageData.about.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mt-6">
              {homepageData.about.text}
            </p>

            <ul className="mt-10 flex flex-col gap-0">
              {keyPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + i * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="flex gap-3 items-center border-l-2 border-accent pl-4 py-1 mb-4"
                >
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <span className="font-medium text-gray-700">{point}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/chi-siamo"
              className="inline-flex items-center gap-2 mt-10 border-2 border-[#00AEEF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white rounded-full px-8 py-3 font-semibold text-sm transition-all duration-300"
            >
              Scopri la nostra storia
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
