import { type Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import GallerySection from '@/components/gallery/GallerySection';

export const metadata: Metadata = {
  title: 'Galleria Lavori | Cantieri a Torino e Provincia',
  description:
    'Foto dei nostri cantieri: rifacimento tetti, facciate, ristrutturazioni interni ed esterni realizzati a Torino e provincia. Vedi la qualità dei lavori Dieffe.',
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
