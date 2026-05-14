'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, FileText, Hammer, BadgeCheck, type LucideIcon } from 'lucide-react';

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consulenza Gratuita',
    description: 'Ascoltiamo le tue esigenze e valutiamo gli spazi senza alcun impegno',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Preventivo Dettagliato',
    description: 'Costi chiari e trasparenti, tutto documentato prima di iniziare i lavori',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Esecuzione Lavori',
    description: 'Il nostro team lavora con cura rispettando tempi e qualità concordati',
  },
  {
    number: '04',
    icon: BadgeCheck,
    title: 'Consegna e Garanzia',
    description: 'Garanzia scritta su ogni lavoro consegnato, verifichiamo insieme il risultato',
  },
];

// ── Variants ──────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

// Ogni step è un "pass-through": propaga lo stato ai figli e
// sfasa i propri children (cerchio → 0s, contenuto → 0.2s)
const stepVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: 'easeOut' as const },
  },
};

// ── Componente ────────────────────────────────────────────

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const animated = inView ? 'visible' : 'hidden';

  return (
    <section className="bg-[#1E3A7B] py-14 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Titolo */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#00AEEF] text-xs uppercase tracking-widest font-semibold">
            Come Lavoriamo
          </span>
          <h2 className="font-black text-[1.875rem] md:text-5xl text-white mt-3 leading-[1.15] md:leading-none">
            Il nostro processo
          </h2>
          <div className="w-10 h-[3px] bg-[#00AEEF] rounded-full mx-auto mt-5" />
          <p className="text-white/50 mt-4 text-[15px] md:text-lg">
            4 semplici passi per trasformare il tuo spazio
          </p>
        </div>

        {/* ── DESKTOP: timeline orizzontale animata ── */}
        <div ref={containerRef} className="relative hidden lg:block">

          {/* Linea orizzontale — si disegna da sinistra a destra */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={animated}
            className="absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-white/10 origin-left"
          />

          {/* Grid step con stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animated}
            className="grid grid-cols-4 gap-6 relative"
          >
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Cerchio numerato — animato con spring */}
                  <motion.div
                    variants={circleVariants}
                    className="relative z-10 w-14 h-14 rounded-full bg-[#1E3A7B] border-2 border-white/20 flex items-center justify-center mb-6 group-hover:border-[#00AEEF] group-hover:bg-[#00AEEF]/10 transition-colors duration-500"
                  >
                    <span className="font-black text-lg text-white/60 group-hover:text-[#00AEEF] transition-colors duration-500">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Contenuto — appare 0.2s dopo il cerchio */}
                  <motion.div
                    variants={contentVariants}
                    className="flex flex-col items-center"
                  >
                    <Icon className="w-8 h-8 text-[#00AEEF] mb-4" />
                    <h3 className="font-black text-white text-lg mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-[200px] mx-auto">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── MOBILE: timeline verticale ── */}
        <div className="flex flex-col lg:hidden">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.number} className="flex gap-6 items-start">
                {/* Colonna sinistra: cerchio + linea */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center bg-[#1E3A7B]">
                    <span className="font-black text-sm text-white/60">
                      {step.number}
                    </span>
                  </div>
                  {!isLast && (
                    <div className="w-[1px] bg-white/10 mt-2 flex-1 min-h-[60px]" />
                  )}
                </div>

                {/* Colonna destra: contenuto */}
                <div className={isLast ? 'pb-0' : 'pb-10'}>
                  <Icon className="w-8 h-8 text-[#00AEEF] mb-3" />
                  <h3 className="font-black text-white text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
