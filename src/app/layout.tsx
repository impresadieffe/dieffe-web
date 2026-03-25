import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dieffe Ristrutturazioni — Qualità che trasforma i tuoi spazi",
  description:
    "Impresa edile a Moncalieri (TO). Ristrutturazioni bagni, cucine, pavimentazioni, impianti e ristrutturazioni complete in tutto il Piemonte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
