'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

function formatSegment(segment: string): string {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentPage = segments.length > 0 ? formatSegment(segments[segments.length - 1]) : title;

  return (
    <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-primary" />
      )}

      <div className="relative z-10 text-center px-4">
        <h1 className="font-bold text-4xl md:text-5xl text-white leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-white/80 text-lg">{subtitle}</p>
        )}

        <nav aria-label="Breadcrumb" className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <span aria-hidden="true">→</span>
          <span className="text-white font-medium">{currentPage}</span>
        </nav>
      </div>
    </section>
  );
}
