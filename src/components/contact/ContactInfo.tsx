import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import siteData from '@/data/site.json';

const mapsQuery = encodeURIComponent(siteData.address);
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const waHref = `https://wa.me/${siteData.whatsapp}`;
const mapsEmbed =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2821.5!2d7.6868!3d44.9997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDU5JzU5LjkiTiA3wrA0MSc3Mi40IkU!5e0!3m2!1sit!2sit!4v1234567890';

const INFO_CARDS = [
  {
    icon: MapPin,
    title: 'Dove siamo',
    href: mapsHref,
    primary: siteData.address,
    secondary: null,
  },
  {
    icon: Phone,
    title: 'Telefono',
    href: `tel:${siteData.phone.replace(/\s/g, '')}`,
    primary: siteData.phone,
    secondary: siteData.orari,
  },
  {
    icon: Mail,
    title: 'Email',
    href: `mailto:${siteData.email}`,
    primary: siteData.email,
    secondary: 'Risposta entro 24 ore',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    href: waHref,
    primary: 'Scrivici su WhatsApp',
    secondary: 'Risposta rapida garantita',
  },
] as const;

export default function ContactInfo() {
  return (
    <div>
      <h2 className="font-black text-4xl text-primary leading-tight">
        Parliamo del tuo progetto
      </h2>
      <p className="text-gray-600 mt-4 leading-relaxed">
        Che si tratti di una piccola ristrutturazione o di un intervento
        completo, siamo qui per aiutarti. Contattaci per un sopralluogo
        gratuito e senza impegno.
      </p>

      {/* Info cards */}
      <div className="mt-10 flex flex-col gap-4">
        {INFO_CARDS.map(({ icon: Icon, title, href, primary, secondary }) => (
          <a
            key={title}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex gap-4 items-start bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 rounded-xl">
              <Icon size={22} className="text-accent" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {title}
              </p>
              <p className="font-semibold text-gray-900 mt-0.5 group-hover:text-accent transition-colors duration-200">
                {primary}
              </p>
              {secondary && (
                <p className="text-sm text-gray-500 mt-0.5">{secondary}</p>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* Social links */}
      <div className="mt-8 flex gap-3">
        <a
          href={siteData.social.facebook}
          aria-label="Facebook"
          className="p-3 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a
          href={siteData.social.instagram}
          aria-label="Instagram"
          className="p-3 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>

      {/* Google Maps embed */}
      <div className="mt-10 rounded-2xl overflow-hidden h-64">
        <iframe
          src={mapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Posizione Dieffe Ristrutturazioni"
        />
      </div>
    </div>
  );
}
