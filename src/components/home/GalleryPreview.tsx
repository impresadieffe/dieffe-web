'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Container from '@/components/ui/Container';
import galleryData from '@/data/gallery.json';

const featured = galleryData.filter((g) => g.featured).slice(0, 3);

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

function GalleryCard({
  item,
  className,
  delay,
}: {
  item: GalleryItem;
  className: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <div className="relative w-full h-full group">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent bg-accent/20 border border-accent/30 rounded-full px-3 py-1">
            {item.category}
          </span>
          <h3 className="text-white font-bold text-lg mt-2 leading-snug">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryPreview() {
  return (
    <section className="py-32 bg-[#F5F5F3]">
      <Container>
        <SectionTitle
          eyebrow="I NOSTRI LAVORI"
          title="Qualità che si vede"
          align="center"
        />

        {/* Griglia asimmetrica — 1 col mobile, 3 col desktop */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:h-[580px]">
          {/* Card grande — 2/3 larghezza, piena altezza */}
          <GalleryCard
            item={featured[0]}
            className="h-72 md:h-auto md:col-span-2 md:row-span-2"
            delay={0}
          />
          {/* Card piccola top-right */}
          <GalleryCard
            item={featured[1]}
            className="h-72 md:h-auto"
            delay={0.1}
          />
          {/* Card piccola bottom-right */}
          <GalleryCard
            item={featured[2]}
            className="h-72 md:h-auto"
            delay={0.2}
          />
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/galleria"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
          >
            Sfoglia tutti i lavori
          </Link>
        </div>
      </Container>
    </section>
  );
}
