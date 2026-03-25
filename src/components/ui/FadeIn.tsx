'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Direction = 'up' | 'left' | 'right';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
}

const initialOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  left: { x: -24 },
  right: { x: 24 },
};

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const { x, y } = initialOffset[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: x ?? 0, y: y ?? 0 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
