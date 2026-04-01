'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import Lightbox from '@/components/gallery/Lightbox';
import galleryData from '@/data/gallery.json';

// Aspect ratio dimensions for masonry variety (width/height approach, not fill)
const DIMS = [
  { width: 800, height: 600 }, // 4:3 — landscape
  { width: 600, height: 800 }, // 3:4 — portrait
  { width: 800, height: 800 }, // 1:1 — square
] as const;

const ALL_LABEL = 'Tutti';

const CATEGORIES = [
  ALL_LABEL,
  ...Array.from(new Set(galleryData.map((item) => item.category))),
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState(ALL_LABEL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeFilter === ALL_LABEL
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  return (
    <section className="bg-background py-24">
      <Container>
        {/* Filter pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={[
                  'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-accent hover:text-accent',
                ].join(' ')}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filteredItems.map((item, i) => {
              const dim = DIMS[i % 3];

              return (
                <motion.div
                  key={item.id}
                  className="break-inside-avoid mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                >
                  <div
                    className="relative group cursor-pointer rounded-2xl overflow-hidden"
                    onClick={() => setLightboxIndex(i)}
                  >
                    {/* Image */}
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={dim.width}
                      height={dim.height}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-4">
                      {/* Category badge — top left */}
                      <div className="flex-shrink-0">
                        <Badge color="accent">{item.category}</Badge>
                      </div>

                      {/* Zoom icon — centered */}
                      <div className="flex-1 flex items-center justify-center">
                        <ZoomIn size={36} className="text-white drop-shadow" />
                      </div>

                      {/* Title — bottom */}
                      <div className="flex-shrink-0">
                        <h3 className="text-white font-bold text-sm leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filteredItems}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
