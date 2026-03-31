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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = iconMap[service.icon] ?? Home;
  const number = String(index + 1).padStart(2, '0');

  return (
    // motion.div gestisce SOLO il fade-in — nessun transform residuo dopo l'animazione
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* div separato per l'hover: Tailwind gestisce il transform liberamente */}
      <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 hover:border-accent/20 transition-all duration-300 ease-out">
        <span className="font-black text-5xl text-gray-200 leading-none select-none">
          {number}
        </span>
        <div className="mt-2 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
          <Icon size={22} className="text-accent" />
        </div>
        <h3 className="font-bold text-xl text-primary mt-4">{service.title}</h3>
        <p className="text-gray-500 mt-3 leading-relaxed">{service.shortDescription}</p>
        <Link
          href={`/servizi#${service.slug}`}
          className="inline-flex items-center gap-1.5 text-accent font-semibold mt-6 group/link"
        >
          Scopri
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {activeServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
