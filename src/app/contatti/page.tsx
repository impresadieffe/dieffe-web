import { type Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contatti | Dieffe Ristrutturazioni',
  description:
    'Contatta Dieffe Ristrutturazioni per un preventivo gratuito. Ristrutturazioni a Torino e Piemonte. Rispondiamo entro 24 ore.',
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        title="Contattaci"
        subtitle="Siamo pronti ad ascoltarti"
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
      />

      <section className="bg-background py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
