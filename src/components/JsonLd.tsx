const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dieffe Ristrutturazioni',
  legalName: 'DIEFFE RISTRUTTURAZIONI di Addamo Andrea',
  url: 'https://www.impresadieffe.it',
  telephone: '+393493191144',
  email: 'impresa.dieffe@gmail.com',
  vatID: '13460330015',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Vincenzo Gioberti 17',
    addressLocality: 'Nichelino',
    addressRegion: 'TO',
    postalCode: '10042',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.9933,
    longitude: 7.6486,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  priceRange: '€€',
  areaServed: 'Torino e provincia',
  description:
    'Impresa edile a Nichelino (TO) specializzata in rifacimento tetti, facciate, cappotti termici, ristrutturazioni complete e bioedilizia. Operiamo a Torino e prima cintura.',
  sameAs: ['https://instagram.com/impresadieffe'],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
