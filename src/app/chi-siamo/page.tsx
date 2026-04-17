import { type Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import StorySection from '@/components/about/StorySection';
import ValuesGrid from '@/components/about/ValuesGrid';
import TeamSection from '@/components/about/TeamSection';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Chi Siamo | Dieffe Ristrutturazioni',
  description:
    'Scopri la storia di Dieffe Ristrutturazioni: 30 anni di esperienza nelle ristrutturazioni a Torino e provincia. Fondati nel 2013 a Moncalieri. Qualità, puntualità e trasparenza.',
};

export default function ChiSiamoPage() {
  return (
    <>
      <PageHero
        title="Chi Siamo"
        subtitle="Trent'anni di passione per il tuo spazio"
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
      />
      <StorySection />
      <ValuesGrid />
      <TeamSection />
      <CTABanner />
    </>
  );
}
