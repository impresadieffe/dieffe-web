'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/ui/Container';

const BADGES = [
  '✓ Preventivo gratuito',
  '✓ Garanzia scritta',
  '✓ Materiali certificati',
];

export default function ServicesIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="bg-white py-16">
      <Container>
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-gray-600 text-xl leading-relaxed">
            Ogni progetto è unico. Per questo offriamo un servizio personalizzato
            che parte dall&apos;ascolto delle tue esigenze fino alla consegna finale,
            con un unico interlocutore che segue ogni fase dei lavori.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="bg-accent/10 text-accent rounded-full px-4 py-2 text-sm font-semibold"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
