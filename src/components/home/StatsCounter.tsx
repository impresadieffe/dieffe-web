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

function StatItem({ stat }: { stat: Stat }) {
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
    <div ref={ref} className="flex flex-col items-center py-10 px-8">
      <div className="font-black text-6xl text-white tabular-nums">
        {count}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <div className="text-white/70 text-lg uppercase tracking-wide mt-2 text-center">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={sectionRef}
      className="bg-primary py-20"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {homepageData.stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
