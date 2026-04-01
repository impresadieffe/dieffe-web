import { type Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import GallerySection from '@/components/gallery/GallerySection';

export const metadata: Metadata = {
  title: 'Galleria Lavori | Dieffe Ristrutturazioni',
  description:
    'Sfoglia i nostri lavori di ristrutturazione: bagni, cucine, pavimenti e ristrutturazioni complete a Torino e Piemonte. Qualità che si vede.',
};

export default function GalleriaPage() {
  return (
    <>
      <PageHero
        title="I Nostri Lavori"
        subtitle="Ogni progetto racconta una storia di qualità"
        backgroundImage="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
      />
      <GallerySection />
    </>
  );
}
