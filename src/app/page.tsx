import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dieffe Ristrutturazioni: Ristrutturazioni Torino e Provincia | Dal 2013',
  description:
    'Ristrutturazione appartamento a Torino, rifacimento tetto, facciate e cappotti termici. Impresa edile a Nichelino con 30 anni di esperienza. Preventivo gratuito.',
};

import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import StatsCounter from '@/components/home/StatsCounter';
import ServicesGrid from '@/components/home/ServicesGrid';
import GalleryPreview from '@/components/home/GalleryPreview';
import CTABanner from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <StatsCounter />
      <ServicesGrid />
      <GalleryPreview />
      <CTABanner />
    </>
  );
}
