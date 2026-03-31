'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/ui/Container';

const paragraphs = [
  'Dieffe Ristrutturazioni nasce nel 2004 a Moncalieri, alle porte di Torino, dall\'intuizione di Franco Ferraris: offrire un servizio di ristrutturazione residenziale che mettesse al centro la qualità artigianale e il rapporto diretto con il cliente, in un mercato spesso dominato da imprese impersonali.',
  'Nei primi anni ci siamo concentrati sui lavori di quartiere — bagni, cucine, rifacimento pavimenti — costruendo la nostra reputazione cantiere dopo cantiere, con la cura che solo chi ama il proprio mestiere sa mettere. La voce si è sparsa: famiglie, architetti e immobiliaristi hanno iniziato a cercarci per progetti via via più ambiziosi.',
  'Oggi, con un team di professionisti selezionati e una rete di artigiani specializzati, gestiamo ristrutturazioni complete in tutta la provincia di Torino e nel Piemonte. Ogni progetto rimane unico: ascoltiamo, progettiamo, eseguiamo — e consegniamo nei tempi e nei costi concordati.',
];

const milestones = [
  { year: '2004', text: 'Fondazione dell\'impresa a Moncalieri (TO)' },
  { year: '2008', text: 'Espansione in tutta la provincia di Torino' },
  { year: '2015', text: 'Raggiunto il traguardo di 300 progetti completati' },
  { year: '2024', text: '20 anni di attività con oltre 500 lavori realizzati' },
];

export default function StorySection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: '-80px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' });

  return (
    <section className="py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Colonna sinistra — testo + timeline */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -32 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              La Nostra Storia
            </span>
            <h2 className="font-black text-5xl text-primary leading-tight mt-2">
              Dalla passione all&apos;eccellenza
            </h2>

            {paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-lg mt-4">
                {p}
              </p>
            ))}

            {/* Timeline */}
            <div className="mt-12 flex flex-col gap-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4">
                  {/* Colonna anno + linea */}
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-accent text-sm whitespace-nowrap pt-0.5">
                      {m.year}
                    </span>
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-accent/30 my-2" />
                    )}
                  </div>
                  {/* Testo milestone */}
                  <p className="text-gray-600 leading-relaxed pb-6">{m.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Colonna destra — immagini sovrapposte */}
          <motion.div
            ref={rightRef}
            className="relative"
            initial={{ opacity: 0, x: 32 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            {/* Contenitore con padding per le immagini overflow */}
            <div className="relative pb-20 pr-16">
              {/* Immagine grande */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                  alt="Team Dieffe Ristrutturazioni al lavoro"
                  fill
                  className="object-cover"
                />
                {/* Badge Est. 2004 */}
                <div className="absolute top-4 left-4 bg-accent text-white text-sm px-3 py-1 rounded-full font-semibold">
                  Est. 2004
                </div>
              </div>

              {/* Immagine piccola sovrapposta */}
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80"
                  alt="Cantiere Dieffe Ristrutturazioni"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
