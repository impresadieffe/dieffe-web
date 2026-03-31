'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
    >
      <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 ease-out text-center">
        {/* Avatar circolare */}
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-accent/20">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-bold text-xl text-primary mt-4">{member.name}</h3>
        <p className="text-accent text-sm font-semibold uppercase tracking-wide mt-1">
          {member.role}
        </p>
        <p className="text-gray-500 mt-3 leading-relaxed text-sm">{member.bio}</p>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionTitle
          eyebrow="IL NOSTRO TEAM"
          title="Le persone dietro ogni progetto"
          align="center"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {teamData.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
