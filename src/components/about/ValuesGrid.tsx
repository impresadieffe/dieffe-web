'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Clock, FileText, type LucideIcon } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = value.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
          <Icon size={26} className="text-accent" />
        </div>
        <h3 className="font-bold text-xl text-primary mt-6">{value.title}</h3>
        <p className="text-gray-500 mt-3 leading-relaxed">{value.text}</p>
      </div>
    </motion.div>
  );
}

export default function ValuesGrid() {
  return (
    <section className="py-24 bg-[#F5F5F3]">
      <Container>
        <SectionTitle
          eyebrow="I NOSTRI VALORI"
          title="Cosa ci rende diversi"
          align="center"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {values.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
