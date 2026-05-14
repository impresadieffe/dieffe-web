'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all duration-400 ease-out h-full flex flex-col">

        {/* Header — sfondo blu con foto circolare centrata */}
        <div className="relative bg-[#1E3A7B] h-48 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-accent/20 blur-2xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none" aria-hidden="true" />
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl z-10">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Body — nome, ruolo, bio */}
        <div className="p-6 text-center flex flex-col flex-grow">
          <h3 className="font-black text-xl text-primary leading-tight">
            {member.name}
          </h3>
          <p className="text-accent text-sm font-semibold uppercase tracking-wide mt-1">
            {member.role}
          </p>
          <div className="w-8 h-[2px] bg-accent mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 mt-4 leading-relaxed text-sm flex-grow">
            {member.bio}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 items-stretch">
          {teamData.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
