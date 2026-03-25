import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/ui/FadeIn';
import homepageData from '@/data/homepage.json';

const VALUES = [
  'Qualità certificata',
  'Puntualità garantita',
  'Preventivi trasparenti',
];

export default function AboutPreview() {
  const { about } = homepageData;

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <FadeIn direction="left">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl -rotate-2">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="Team Dieffe Ristrutturazioni al lavoro"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Right: Content */}
          <FadeIn direction="right">
            <div>
              <SectionTitle
                eyebrow={about.eyebrow}
                title={about.title}
                align="left"
              />

              <p className="text-gray-600 leading-relaxed mt-6">
                {about.text}
              </p>

              <ul className="mt-6 space-y-3">
                {VALUES.map((value) => (
                  <li key={value} className="flex items-center gap-3">
                    <CheckCircle className="text-accent shrink-0" size={20} />
                    <span className="font-medium text-foreground">{value}</span>
                  </li>
                ))}
              </ul>

              <Button href="/chi-siamo" variant="outline" className="mt-8">
                Scopri la nostra storia
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
