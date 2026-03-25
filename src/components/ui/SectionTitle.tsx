'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${alignClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">
          {eyebrow}
        </span>
      )}

      <h2 className="font-bold text-3xl md:text-4xl text-primary leading-tight">
        {title}
      </h2>

      <div className="w-12 h-1 bg-accent mt-3 rounded-full" />

      {subtitle && (
        <p className="text-lg text-gray-600 mt-3 max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}
