'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Clock, FileText, type LucideIcon } from 'lucide-react';
import Container from '@/components/ui/Container';

interface Value {
  icon: LucideIcon;
  title: string;
  text: string;
}

const values: Value[] = [
  {
    icon: Shield,
    title: 'Qualità Certificata',
    text: 'Utilizziamo solo materiali di prima scelta, selezionati da fornitori certificati. Ogni lavoro è garantito per iscritto.',
  },
  {
    icon: Clock,
    title: 'Rispetto dei Tempi',
    text: 'Consegniamo nei tempi concordati. Il tuo tempo è prezioso e noi lo rispettiamo con professionalità.',
  },
  {
    icon: FileText,
    title: 'Trasparenza Totale',
    text: 'Preventivi dettagliati senza sorprese. Ogni voce di costo è chiara e documentata prima di iniziare i lavori.',
  },
];

function ValueCard({ value, index }: { value: Value; index: number }) {
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: '-50px' });
  const Icon = value.icon;
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className="group relative bg-white rounded-2xl p-8 border border-gray-100 overflow-hidden
                   shadow-[0_4px_24px_rgba(0,0,0,0.06)]
                   hover:-translate-y-2
                   hover:shadow-[0_24px_64px_rgba(0,0,0,0.12)]
                   hover:border-[#E8540A]/20
                   transition-all duration-500"
      >
        {/* Bordo accent sinistro animato */}
        <div
          className="absolute left-0 top-8 bottom-8 w-[3px] bg-accent rounded-full
                     scale-y-0 origin-top group-hover:scale-y-100
                     transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        />

        {/* Numero decorativo */}
        <span
          className="absolute top-4 right-6 font-black text-[100px] leading-none select-none
                     text-gray-100 group-hover:text-accent/20
                     transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          {number}
        </span>

        {/* Icona — grande, libera, senza box */}
        <Icon
          className="relative z-10 w-10 h-10 text-accent mt-2
                     group-hover:scale-[1.2] group-hover:rotate-[10deg]
                     transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        />

        <h3 className="relative z-10 font-black text-xl text-primary mt-8">
          {value.title}
        </h3>
        <p className="relative z-10 text-gray-500 mt-3 leading-relaxed text-sm">
          {value.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ValuesGrid() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-50px' });

  return (
    <section className="py-24 bg-[#F5F5F3]">
      <Container>
        <motion.div
          ref={titleRef}
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">
            I Nostri Valori
          </span>
          <h2 className="font-black text-3xl md:text-4xl text-primary leading-tight">
            Cosa ci rende diversi
          </h2>
          <div className="w-12 h-1 bg-accent mt-3 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {values.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
