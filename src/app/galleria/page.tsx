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
        backgroundImage="/images/hero/sezioneinostrilavori.jpg"
      />
      <GallerySection />
    </>
  );
}
