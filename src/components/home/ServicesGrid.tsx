'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import servicesData from '@/data/services.json'

const services = servicesData.filter((s: any) => s.active)

interface ServiceCardProps {
  slug: string
  iconName: string
  title: string
  shortDescription: string
  index: number
}

function ServiceCard({ slug, iconName, title, shortDescription, index }: ServiceCardProps) {
  const Icon = (LucideIcons as any)[
    iconName.charAt(0).toUpperCase() + iconName.slice(1)
  ] || LucideIcons.Wrench

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <Link href={`/servizi#${slug}`} className="block h-full">
        <div
          className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 h-full cursor-pointer
            shadow-[0_4px_24px_rgba(0,0,0,0.06)]
            hover:shadow-[0_32px_80px_rgba(0,0,0,0.12)]
            hover:-translate-y-2
            transition-all duration-500 ease-out"
        >
          {/* Bordo top accent */}
          <div className="absolute top-0 left-6 right-6 h-[2px] bg-[#00AEEF] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

          {/* Glow sottile */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00AEEF]/0 to-[#00AEEF]/0 group-hover:from-[#00AEEF]/[0.04] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

          {/* Contenuto */}
          <div className="p-8 relative z-10">

            {/* Numero decorativo */}
            <span className="absolute top-4 right-6 font-black text-[80px] leading-none text-gray-100 group-hover:text-[#00AEEF]/10 transition-colors duration-500 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icona con movimento leggero */}
            <div className="group-hover:-translate-y-1 transition-transform duration-300">
              <Icon className="w-10 h-10 text-[#00AEEF]" />
            </div>

            {/* Titolo */}
            <h3 className="font-black text-xl text-[#1E3A7B] mt-6">
              {title}
            </h3>

            {/* Descrizione */}
            <p className="text-gray-500 mt-3 leading-relaxed text-sm">
              {shortDescription}
            </p>

            {/* Indicatore visivo */}
            <div className="flex items-center gap-1 mt-6 text-[#00AEEF] font-semibold text-sm translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
              Scopri
              <LucideIcons.ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServicesGrid() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Titolo sezione */}
        <div className="text-center mb-16">
          <span className="text-[#00AEEF] text-xs uppercase tracking-widest font-semibold">
            COSA FACCIAMO
          </span>
          <h2 className="font-black text-5xl text-[#1E3A7B] mt-3 leading-tight">
            I Nostri Servizi
          </h2>
          <div className="w-10 h-[3px] bg-[#00AEEF] rounded-full mx-auto mt-5" />
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Dalla ristrutturazione completa ai piccoli interventi,
            ogni progetto riceve la stessa cura e attenzione
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => (
            <ServiceCard
              key={service.id}
              slug={service.slug}
              iconName={service.icon}
              title={service.title}
              shortDescription={service.shortDescription}
              index={index}
            />
          ))}
        </div>

        {/* Link vedi tutti */}
        <div className="text-center mt-12">
          <Link
            href="/servizi"
            className="inline-flex items-center gap-2 border-2 border-[#1E3A7B] text-[#1E3A7B] hover:bg-[#1E3A7B] hover:text-white rounded-full px-8 py-3 font-semibold transition-all duration-300"
          >
            Vedi tutti i servizi
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
