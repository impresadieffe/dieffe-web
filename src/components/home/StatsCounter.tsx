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
      className="flex flex-col items-center text-center py-16 px-8"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Unica linea accent sopra il numero */}
      <div className="w-8 h-[2px] bg-accent mb-8 rounded-full" />

      {/* Numero enorme */}
      <div className="flex items-end leading-none">
        <span className="font-black text-8xl text-white tabular-nums leading-none">
          {count}
        </span>
        <span className="font-black text-5xl text-accent ml-1 mb-1 leading-none">
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-white/50 text-sm uppercase tracking-[0.2em] mt-4 font-medium">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsCounter() {
  const stats = homepageData.stats;

  return (
    <section className="py-28 bg-[#1E3A7B] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative">
              {/* Separatore verticale semplice (non sull'ultimo) */}
              {i < stats.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block w-px h-16 bg-white/10" />
              )}
              <StatItem stat={stat} delay={i * 0.15} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
