'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import Lightbox from '@/components/gallery/Lightbox';
import galleryData from '@/data/gallery.json';

const DIMS = [
  { width: 800, height: 600 },
  { width: 600, height: 800 },
  { width: 800, height: 800 },
] as const;

const ALL_LABEL = 'Tutti';
const CATEGORY_ORDER = ['Tetti', 'Facciate', 'Ristrutturazioni', 'Interni', 'Esterni'];
const CATEGORIES = [
  ALL_LABEL,
  ...CATEGORY_ORDER.filter((cat) => galleryData.some((item) => item.category === cat)),
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState(ALL_LABEL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeFilter === ALL_LABEL
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  return (
    /*
     * py-12 mobile → py-24 desktop (INVARIATO)
     */
    <section className="bg-background py-16 md:py-24">
      <Container>

        {/* ─── Filtri categoria ─── */}
        {/*
         * Gap e padding pill ridotti su mobile per evitare overflow orizzontale
         * Scroll orizzontale abilitato su mobile se le pill non ci stanno
         */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 md:mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={[
                  'px-4 py-2 sm:px-5 rounded-full text-[13px] sm:text-sm font-semibold transition-all duration-200 min-h-[40px]',
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

        {/* ─── Griglia masonry ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            /*
             * Colonne:
             *   mobile  — 1 colonna, gap 4
             *   sm 640px — 2 colonne, gap 5
             *   lg 1024px — 3 colonne, gap 6 (DESKTOP — invariato)
             */
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 lg:gap-6"
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
                  className="break-inside-avoid mb-4 sm:mb-5 lg:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
                >
                  <div
                    className="relative group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden"
                    onClick={() => setLightboxIndex(i)}
                  >
                    {/* Immagine — aspect-ratio fissato dalle dimensioni → no CLS */}
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={dim.width}
                      height={dim.height}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Overlay hover — solo su dispositivi con hover (desktop) */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-4">
                      <div className="flex-shrink-0">
                        <Badge color="accent">{item.category}</Badge>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <ZoomIn size={36} className="text-white drop-shadow" />
                      </div>
                      <div className="flex-shrink-0">
                        <h3 className="text-white font-bold text-sm leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Label categoria su mobile (visible sempre, no hover) */}
                    <div className="sm:hidden absolute top-3 left-3">
                      <Badge color="accent">{item.category}</Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </Container>

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
