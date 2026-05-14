import { type Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ServicesIntro from '@/components/services/ServicesIntro';
import ServicesDetail from '@/components/services/ServicesDetail';
import ProcessSection from '@/components/services/ProcessSection';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Servizi Edili Torino | Tetti Facciate Ristrutturazioni',
  description:
    'Rifacimento tetti, facciate, cappotti termici, ristrutturazioni complete, nuove costruzioni e bioedilizia a Torino e provincia. Impresa edile Nichelino. Preventivo gratuito.',
};

export default function ServiziPage() {
  return (
    <>
      <PageHero
        title="I Nostri Servizi"
        subtitle="Soluzioni complete per ogni esigenza di ristrutturazione"
        backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
      />
      <ServicesIntro />
      <ServicesDetail />
      <ProcessSection />
      <CTABanner />
    </>
  );
}
