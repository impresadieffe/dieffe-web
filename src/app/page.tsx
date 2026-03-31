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
