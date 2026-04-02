'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: '-50px' });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = ((e.clientX - rect.left - cx) / cx) * 8;
    const y = ((e.clientY - rect.top - cy) / cy) * 8;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={inViewRef}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Immagine con effetto magnetic */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 24, mass: 0.8 }}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Overlay gradient dal basso */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(26,46,74,0.92) 0%, rgba(26,46,74,0.4) 50%, transparent 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Testo che sale dal basso */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest text-accent
                     bg-accent/20 border border-accent/30 rounded-full px-3 py-1"
        >
          {item.category}
        </span>
        <h3 className="text-white font-black text-lg mt-2 leading-snug">
          {item.title}
        </h3>
      </motion.div>
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

        {/* Griglia asimmetrica */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:h-[580px]">
          <GalleryCard
            item={featured[0]}
            className="h-72 md:h-auto md:col-span-2 md:row-span-2"
            delay={0}
          />
          <GalleryCard
            item={featured[1]}
            className="h-72 md:h-auto"
            delay={0.1}
          />
          <GalleryCard
            item={featured[2]}
            className="h-72 md:h-auto"
            delay={0.2}
          />
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/galleria"
            className="inline-flex items-center justify-center gap-2 px-8 py-4
                       border-2 border-primary text-primary font-semibold rounded-full
                       hover:bg-primary hover:text-white
                       transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                       group"
          >
            Sfoglia tutti i lavori
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
