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
            {/*
             * Padding
             * mobile  — px-5 py-12 (da px-8 py-24: troppo spazio su mobile)
             * desktop — px-8 py-24  (INVARIATO)
             */}
            <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-24">
              {/*
               * Gap
               * mobile  — gap-8   (staccate ma non enormi)
               * desktop — gap-20  (INVARIATO)
               */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

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

                      {/*
                       * Numero decorativo
                       * mobile  — text-5xl (da text-8xl: troppo ingombrante)
                       * desktop — text-8xl  (INVARIATO)
                       */}
                      <span className={`font-black text-5xl md:text-8xl leading-none block mt-2 ${isEven ? 'text-gray-200' : 'text-gray-300'}`}>
                        {num}
                      </span>

                      {/*
                       * Titolo servizio
                       * mobile  — ~1.75rem / 28px (da text-4xl / 2.25rem)
                       * desktop — text-4xl         (INVARIATO)
                       */}
                      <h2 className="font-black text-[1.75rem] md:text-4xl text-[#1E3A7B] leading-tight">
                        {service.title}
                      </h2>

                      <div className="w-10 h-[3px] bg-accent rounded-full mt-4 sm:mt-5" />

                      <p className="text-gray-600 text-[15px] md:text-base leading-relaxed mt-4 sm:mt-5">
                        {service.fullDescription}
                      </p>

                      <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-3">
                        {service.keyPoints.map((point) => (
                          <li key={point} className="flex gap-3 items-center">
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                            <span className="text-gray-700 text-sm font-medium">{point}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/contatti"
                        className="mt-7 sm:mt-8 inline-flex items-center gap-2 bg-[#1E3A7B] text-white rounded-full px-7 py-3.5 sm:px-8 sm:py-3 font-semibold text-[15px] sm:text-sm hover:bg-[#152d63] transition-colors duration-300 group"
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
