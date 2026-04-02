'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/ui/Container';
import teamData from '@/data/team.json';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className="group bg-white rounded-2xl overflow-hidden border border-gray-100
                   hover:shadow-2xl hover:-translate-y-2
                   transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
      >
        {/* Header scuro */}
        <div className="relative bg-[#1A2E4A] p-8 text-center overflow-hidden">
          {/* Blob decorativo accent/20 blur */}
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-accent/20 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Avatar circolare */}
          <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-lg z-10">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <h3 className="font-black text-xl text-primary">
            {member.name}
          </h3>
          <p className="text-accent text-sm font-semibold uppercase tracking-wide mt-1">
            {member.role}
          </p>
          <div className="w-8 h-[2px] bg-accent mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 mt-4 leading-relaxed text-sm">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-50px' });

  return (
    <section className="py-24 bg-white">
      <Container>
        <motion.div
          ref={titleRef}
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">
            Il Nostro Team
          </span>
          <h2 className="font-black text-3xl md:text-4xl text-primary leading-tight">
            Le persone dietro ogni progetto
          </h2>
          <div className="w-12 h-1 bg-accent mt-3 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {teamData.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
