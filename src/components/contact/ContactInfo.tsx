import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import siteData from '@/data/site.json';

const mapsQuery = encodeURIComponent(siteData.address);
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const waHref = `https://wa.me/${siteData.whatsapp}`;
const mapsEmbed =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2821.6829530699342!2d7.658999276622426!3d44.99075137107014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4788126c21cf4db3%3A0x99304adcffd8ea75!2sVia%20Vincenzo%20Gioberti%2C%2017%2C%2010042%20Nichelino%20TO!5e0!3m2!1sit!2sit!4v1778528223448!5m2!1sit!2sit';

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
          href={siteData.social.instagram}
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a
          href={waHref}
          aria-label="WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
