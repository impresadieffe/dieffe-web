import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/ui/FadeIn';
import servicesData from '@/data/services.json';

export default function ServicesDetail() {
  const services = [...servicesData]
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const num = String(index + 1).padStart(2, '0');

        return (
          <section
            key={service.id}
            id={service.slug}
            className={[
              'py-24',
              index > 0 ? 'border-t border-gray-100' : '',
              isEven ? 'bg-white' : 'bg-background',
            ].join(' ')}
          >
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image */}
                <div className={isEven ? '' : 'lg:order-2'}>
                  <FadeIn direction={isEven ? 'left' : 'right'}>
                    <div className="group relative aspect-[4/3] rounded-2xl shadow-xl overflow-hidden">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </FadeIn>
                </div>

                {/* Text */}
                <div className={isEven ? '' : 'lg:order-1'}>
                  <FadeIn direction={isEven ? 'right' : 'left'} delay={0.15}>
                    <div>
                      {/* Decorative number */}
                      <span
                        aria-hidden="true"
                        className="block text-8xl font-black text-gray-100 leading-none -mb-5 select-none"
                      >
                        {num}
                      </span>

                      <span className="text-accent uppercase tracking-widest text-sm font-semibold">
                        I Nostri Servizi
                      </span>

                      <h2 className="font-black text-4xl text-primary leading-tight mt-2">
                        {service.title}
                      </h2>

                      <p className="text-gray-600 leading-relaxed text-lg mt-4">
                        {service.fullDescription}
                      </p>

                      <ul className="mt-8 flex flex-col gap-3">
                        {service.keyPoints.map((point) => (
                          <li key={point} className="flex gap-3 items-start">
                            <CheckCircle2
                              size={20}
                              className="text-accent flex-shrink-0 mt-0.5"
                            />
                            <span className="text-gray-700 font-medium">{point}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/contatti"
                        className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-light transition-colors duration-200 group"
                      >
                        Richiedi Preventivo
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
