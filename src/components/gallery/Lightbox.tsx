'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  featured: boolean;
}

interface LightboxProps {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number>(0);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : items.length - 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i < items.length - 1 ? i + 1 : 0));
  }, [items.length]);

  // Keyboard navigation + ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, goPrev, goNext]);

  // Touch swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(deltaX) > 50) {
        deltaX > 0 ? goNext() : goPrev();
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const item = items[currentIndex];

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Top bar: counter + close */}
      <div
        className="flex items-center justify-between px-4 md:px-8 py-4 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10" />
        <span className="text-white/60 text-sm tabular-nums">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
        >
          <X size={20} className="text-white" />
        </button>
      </div>

      {/* Main area: prev + image + next */}
      <div
        className="flex-1 flex items-center justify-center relative px-4 md:px-20 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev button */}
        <button
          onClick={goPrev}
          aria-label="Immagine precedente"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-200"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Image + info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex flex-col items-center w-full max-w-5xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <motion.div
              className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden"
              style={{ height: '70vh' }}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
            </motion.div>

            <div className="mt-4 text-center flex flex-col items-center gap-2">
              <h3 className="text-white font-bold text-lg leading-tight">
                {item.title}
              </h3>
              <Badge color="accent">{item.category}</Badge>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <button
          onClick={goNext}
          aria-label="Immagine successiva"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-200"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
}
