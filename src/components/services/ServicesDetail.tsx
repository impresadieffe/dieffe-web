'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/ui/FadeIn';
import servicesData from '@/data/services.json';

export default function ServicesDetail() {
  const services = [...servicesData]
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const num = String(index + 1).padStart(2, '0');

        return (
          <section
            key={service.id}
            id={service.slug}
            className={isEven ? 'bg-white' : 'bg-[#F5F5F3]'}
          >
            <div className="max-w-6xl mx-auto px-8 py-24">
              <div className="grid lg:grid-cols-2 gap-20 items-center">

                {/* Immagine */}
                <div className={isEven ? '' : 'lg:order-2'}>
                  <FadeIn direction="left">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Testo */}
                <div className={isEven ? '' : 'lg:order-1'}>
                  <FadeIn direction="right" delay={0.15}>
                    <div>
                      <span className="text-accent text-xs uppercase tracking-widest font-semibold">
                        I Nostri Servizi
                      </span>

                      <span className={`font-black text-8xl leading-none block mt-2 ${isEven ? 'text-gray-200' : 'text-gray-300'}`}>
                        {num}
                      </span>

                      <h2 className="font-black text-4xl text-[#1A2E4A] leading-tight">
                        {service.title}
                      </h2>

                      <div className="w-10 h-[3px] bg-accent rounded-full mt-5" />

                      <p className="text-gray-600 text-base leading-relaxed mt-5">
                        {service.fullDescription}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {service.keyPoints.map((point) => (
                          <li key={point} className="flex gap-3 items-center">
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                            <span className="text-gray-700 text-sm font-medium">{point}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/contatti"
                        className="mt-8 inline-flex items-center gap-2 bg-[#1A2E4A] text-white rounded-full px-8 py-3 font-semibold text-sm hover:bg-[#0f1e30] transition-colors duration-300 group"
                      >
                        Richiedi Preventivo
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </FadeIn>
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
