'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare,
  FileText,
  Hammer,
  CheckCircle,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import Container from '@/components/ui/Container';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: MessageSquare,
    title: 'Consulenza Gratuita',
    description:
      'Ascoltiamo le tue esigenze e valutiamo gli spazi senza alcun impegno',
  },
  {
    icon: FileText,
    title: 'Preventivo Dettagliato',
    description:
      'Ricevi un preventivo chiaro e trasparente con tutti i costi dettagliati',
  },
  {
    icon: Hammer,
    title: 'Esecuzione Lavori',
    description:
      'Il nostro team esegue i lavori con cura, rispettando tempi e qualità concordati',
  },
  {
    icon: CheckCircle,
    title: 'Consegna e Garanzia',
    description:
      'Verifichiamo insieme il risultato e rilasciamo garanzia scritta su tutti i lavori',
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-primary py-24">
      <Container>
        {/* Title — inline to support white text on dark bg */}
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            COME LAVORIAMO
          </span>
          <h2 className="font-bold text-3xl md:text-4xl text-white leading-tight mt-2">
            Il nostro processo
          </h2>
          <div className="w-12 h-1 bg-accent mt-3 rounded-full" />
          <p className="text-white/60 text-lg mt-3">
            4 semplici passi per trasformare il tuo spazio
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              {/* Arrow connector between steps */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                  <ChevronRight size={20} className="text-white/30" />
                </div>
              )}

              {/* Decorative number */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-4 text-6xl font-black text-accent/20 leading-none select-none"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon box */}
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                <step.icon size={28} className="text-white" />
              </div>

              <h3 className="font-bold text-white text-lg mt-4">{step.title}</h3>
              <p className="text-white/60 mt-2 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
