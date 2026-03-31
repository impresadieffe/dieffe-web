'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Container from '@/components/ui/Container';
import homepageData from '@/data/homepage.json';

interface Stat {
  label: string;
  value: string;
  suffix: string;
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = parseInt(stat.value, 10);
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
      className="flex flex-col items-center text-center py-12 px-8"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <div className="w-8 h-0.5 bg-accent mb-6" />
      <div className="flex items-end leading-none">
        <span className="font-black text-7xl text-white tabular-nums">{count}</span>
        <span className="font-black text-5xl text-accent ml-1 mb-1">{stat.suffix}</span>
      </div>
      <p className="text-white/60 text-sm uppercase tracking-widest mt-3">{stat.label}</p>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-24 bg-primary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {homepageData.stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 0.15} />
          ))}
        </div>
      </Container>
    </section>
  );
}
