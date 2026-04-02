import { useRef, useState, useEffect, type CSSProperties } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
}

export function useTilt({ maxTilt = 8, perspective = 1000 }: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [transform, setTransform] = useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
  );
  const [transition, setTransition] = useState(
    'transform 500ms cubic-bezier(0.23,1,0.32,1)',
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const rotateY = ((e.clientX - rect.left) / rect.width * 2 - 1) * maxTilt;
        const rotateX = -(((e.clientY - rect.top) / rect.height) * 2 - 1) * maxTilt;
        setTransition('transform 100ms linear');
        setTransform(
          `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        );
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafRef.current);
      setTransition('transform 500ms cubic-bezier(0.23,1,0.32,1)');
      setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [maxTilt, perspective]);

  const style: CSSProperties = { transform, transition };
  return { ref, style };
}
