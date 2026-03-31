import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import siteData from '@/data/site.json';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Galleria', href: '/galleria' },
  { label: 'Contatti', href: '/contatti' },
];

const services = [
  { label: 'Ristrutturazione Bagno', slug: 'ristrutturazione-bagno' },
  { label: 'Ristrutturazione Cucina', slug: 'ristrutturazione-cucina' },
  { label: 'Pavimentazioni', slug: 'pavimentazioni' },
  { label: 'Impianti Elettrici', slug: 'impianti-elettrici' },
  { label: 'Tinteggiatura e Intonaci', slug: 'tinteggiatura-intonaci' },
  { label: 'Ristrutturazione Completa', slug: 'ristrutturazione-completa' },
];

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/5">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Colonna 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex flex-col leading-none select-none w-fit">
              <div className="flex items-end">
                <span className="font-black text-2xl tracking-tight text-white">DIEFFE</span>
                <span className="w-2 h-2 bg-accent rounded-full inline-block ml-0.5 mb-2 shrink-0" aria-hidden="true" />
              </div>
              <span className="text-xs text-text-muted tracking-widest uppercase -mt-0.5">
                Ristrutturazioni
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-muted">
              Impresa edile professionale con sede a Moncalieri (TO). Trasformiamo
              i tuoi spazi con qualità artigianale e materiali di prima scelta.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={siteData.social.facebook}
                aria-label="Facebook"
                className="p-2 rounded-lg bg-white/5 text-text-muted hover:bg-accent hover:text-white transition-colors duration-200"
              >
                <FacebookIcon />
              </a>
              <a
                href={siteData.social.instagram}
                aria-label="Instagram"
                className="p-2 rounded-lg bg-white/5 text-text-muted hover:bg-accent hover:text-white transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href={`https://wa.me/${siteData.whatsapp.replace(/\D/g, '')}`}
                aria-label="WhatsApp"
                className="p-2 rounded-lg bg-white/5 text-text-muted hover:bg-green-600 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Colonna 2 — Navigazione */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="h-px w-16 bg-accent mb-3" />
              <h3 className="text-sm font-semibold text-white">
                Navigazione
              </h3>
            </div>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 3 — Servizi */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="h-px w-16 bg-accent mb-3" />
              <h3 className="text-sm font-semibold text-white">
                I Nostri Servizi
              </h3>
            </div>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servizi#${s.slug}`}
                    className="text-sm text-text-muted hover:text-white transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 4 — Contatti */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="h-px w-16 bg-accent mb-3" />
              <h3 className="text-sm font-semibold text-white">
                Contatti
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm text-text-muted">{siteData.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-accent" />
                <a
                  href={`tel:${siteData.phone.replace(/\s/g, '')}`}
                  className="text-sm text-text-muted hover:text-white transition-colors duration-200"
                >
                  {siteData.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-accent" />
                <a
                  href={`mailto:${siteData.email}`}
                  className="text-sm text-text-muted hover:text-white transition-colors duration-200"
                >
                  {siteData.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm text-text-muted">{siteData.orari}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © 2025 Dieffe Ristrutturazioni — P.IVA {siteData.piva}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-xs text-text-muted hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/cookie-policy"
              className="text-xs text-text-muted hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
