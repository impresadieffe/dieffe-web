import { type Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import StorySection from '@/components/about/StorySection';
import ValuesGrid from '@/components/about/ValuesGrid';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Chi Siamo | Impresa Edile dal 2013',
  description:
    'La storia di Dieffe Ristrutturazioni: impresa edile fondata nel 2013 a Nichelino, Torino. 30 anni di esperienza artigianale, qualità certificata e trasparenza in ogni cantiere.',
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
      <CTABanner />
    </>
  );
}
