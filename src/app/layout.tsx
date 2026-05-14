import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieBanner from "@/components/ui/CookieBanner";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.impresadieffe.it"),
  title: {
    template: "%s | Dieffe Ristrutturazioni",
    default: "Dieffe Ristrutturazioni — Impresa Edile a Nichelino, Torino",
  },
  description:
    "Impresa edile a Nichelino (TO). Rifacimento tetti, facciate, cappotti termici, ristrutturazioni complete a Torino e provincia. Preventivo gratuito.",
  keywords: [
    "ristrutturazioni Torino",
    "impresa edile Torino",
    "rifacimento tetti Torino",
    "facciate Torino",
    "cappotto termico Torino",
    "ristrutturazione appartamento Torino",
    "impresa edile Nichelino",
    "ristrutturazioni Nichelino",
    "ristrutturazioni prima cintura Torino",
    "bioedilizia Torino",
    "nuove costruzioni Torino",
  ],
  authors: [{ name: "Dieffe Ristrutturazioni" }],
  openGraph: {
    title: "Dieffe Ristrutturazioni",
    description:
      "Impresa edile a Nichelino, Torino e provincia. Rifacimento tetti, facciate, cappotti termici e ristrutturazioni complete dal 2013.",
    url: "https://www.impresadieffe.it",
    siteName: "Dieffe Ristrutturazioni",
    images: [
      {
        url: "https://www.impresadieffe.it/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dieffe Ristrutturazioni - Impresa Edile Torino",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dieffe Ristrutturazioni",
    description:
      "Impresa edile a Nichelino, Torino e provincia. Rifacimento tetti, facciate, cappotti termici e ristrutturazioni complete dal 2013.",
    images: ["https://www.impresadieffe.it/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "INSERISCI_QUI_CODICE_GOOGLE_SEARCH_CONSOLE",
  },
  icons: {
    icon: "/icona_dieffe.svg",
    apple: "/icona_dieffe.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <JsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
