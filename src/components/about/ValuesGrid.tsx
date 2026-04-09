'use client';

import { motion } from 'framer-motion';
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
  const Icon = value.icon;
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="group relative bg-white rounded-2xl p-8 overflow-hidden border border-gray-100
          shadow-[0_4px_24px_rgba(0,0,0,0.06)]
          hover:shadow-[0_32px_80px_rgba(0,0,0,0.12)]
          hover:-translate-y-2
          transition-all duration-500 ease-out"
      >
        {/* Bordo top accent */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

        {/* Glow sottile */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/[0.04] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

        {/* Numero decorativo */}
        <span className="absolute top-4 right-6 font-black text-[100px] leading-none select-none text-gray-100 group-hover:text-accent/10 transition-colors duration-500">
          {number}
        </span>

        {/* Icona */}
        <div className="group-hover:-translate-y-1 transition-transform duration-300">
          <Icon className="relative z-10 w-10 h-10 text-accent mt-2" />
        </div>

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
  return (
    <section className="py-24 bg-[#F5F5F3]">
      <Container>
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
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
