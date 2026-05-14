'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Container from '@/components/ui/Container';
import homepageData from '@/data/homepage.json';

interface Stat {
  label: string;
  value: number | string;
  suffix: string;
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = Number(stat.value);
    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(latest) {
        setCount(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      /*
       * Padding
       * mobile  — py-6 px-2  (da py-16 px-8: troppo spazio su 3 righe staccate)
       * desktop — py-16 px-8 (INVARIATO)
       */
      className="flex flex-col items-center text-center py-6 px-2 sm:py-16 sm:px-8"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="w-6 sm:w-8 h-[2px] bg-accent mb-4 sm:mb-8 rounded-full" />

      {/*
       * Numero
       * mobile  — 2rem   (~32px, compatto in 3 colonne)
       * desktop — 6rem   (text-8xl, INVARIATO)
       */}
      <div className="flex items-end leading-none">
        <span className="font-black text-[2rem] sm:text-8xl text-white tabular-nums leading-none">
          {count}
        </span>
        <span className="font-black text-xl sm:text-5xl text-accent ml-0.5 sm:ml-1 mb-0.5 sm:mb-1 leading-none">
          {stat.suffix}
        </span>
      </div>

      <p className="text-white/50 text-[11px] sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] mt-2 sm:mt-4 font-medium leading-tight">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsCounter() {
  const stats = homepageData.stats;

  return (
    /*
     * py-14 mobile → py-28 desktop (INVARIATO)
     * Grid: sempre 3 colonne — i valori sono brevi, leggibili anche a 375px
     */
    <section className="py-14 md:py-28 bg-[#1E3A7B] overflow-hidden">
      <Container>
        <div className="grid grid-cols-3">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative">
              {i < stats.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 sm:h-16 bg-white/10" />
              )}
              <StatItem stat={stat} delay={i * 0.15} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
