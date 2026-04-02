'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Bath,
  UtensilsCrossed,
  Layers,
  Zap,
  PaintRoller,
  Home,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Container from '@/components/ui/Container';
import servicesData from '@/data/services.json';

const iconMap: Record<string, LucideIcon> = {
  Bath,
  UtensilsCrossed,
  Layers,
  Zap,
  PaintRoller,
  Home,
};

const activeServices = [...servicesData]
  .filter((s) => s.active)
  .sort((a, b) => a.order - b.order);

interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  active: boolean;
  order: number;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: '-50px' });
  const Icon = iconMap[service.icon] ?? Home;
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className="group relative bg-white rounded-2xl p-8 border border-gray-100 overflow-hidden
                   shadow-[0_4px_24px_rgba(0,0,0,0.06)]
                   hover:-translate-y-2
                   hover:shadow-[0_24px_64px_rgba(0,0,0,0.12)]
                   hover:border-accent/20
                   transition-all duration-500 cursor-pointer"
      >
        {/* Bordo accent sinistro — scaleY da 0 a 1 on hover */}
        <div
          className="absolute left-0 top-8 bottom-8 w-[3px] bg-accent rounded-full
                     scale-y-0 origin-top group-hover:scale-y-100
                     transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        />

        {/* Numero decorativo */}
        <span
          className="absolute top-4 right-6 font-black text-[80px] leading-none select-none
                     text-gray-100 group-hover:text-accent/20
                     transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          {number}
        </span>

        {/* Icona — grande, libera, senza box */}
        <Icon
          className="relative z-10 w-10 h-10 text-accent mt-2
                     group-hover:scale-[1.2] group-hover:rotate-[10deg]
                     transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        />

        <h3 className="relative z-10 font-black text-xl text-primary mt-6">
          {service.title}
        </h3>
        <p className="relative z-10 text-gray-500 mt-3 leading-relaxed text-sm">
          {service.shortDescription}
        </p>

        <Link
          href={`/servizi#${service.slug}`}
          className="relative z-10 inline-flex items-center gap-2 text-accent font-semibold text-sm mt-6 group/link"
        >
          Scopri
          <ArrowRight
            size={15}
            className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                       group-hover/link:translate-x-[6px]"
          />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section className="py-32 bg-white">
      <Container>
        <SectionTitle
          eyebrow="COSA FACCIAMO"
          title="I Nostri Servizi"
          subtitle="Dalla ristrutturazione completa ai piccoli interventi, ogni progetto riceve la stessa cura e attenzione"
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {activeServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
