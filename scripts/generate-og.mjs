import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const W = 1200;
const H = 630;

// OG image as SVG (1200x630), logo embedded
const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8faff"/>
      <stop offset="100%" stop-color="#eef3fb"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="8" height="${H}" fill="#274992"/>

  <!-- Bottom accent strip -->
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#00B7E9"/>

  <!-- Logo area (top-left quadrant, scaled to ~360x225) -->
  <g transform="translate(60, 80) scale(0.076)">
    ${readFileSync(join(root, "public/logo-colorato.svg"), "utf8")
      .replace(/<\?xml[^>]*\?>/g, "")
      .replace(/<!DOCTYPE[^>]*>/g, "")
      .replace(/<svg[^>]*>/, "")
      .replace(/<\/svg>/, "")}
  </g>

  <!-- Divider line -->
  <line x1="60" y1="340" x2="540" y2="340" stroke="#274992" stroke-width="2" opacity="0.2"/>

  <!-- Tagline below logo -->
  <text x="64" y="380" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" fill="#274992" opacity="0.7" font-weight="400">Impresa Edile dal 2013</text>

  <!-- Right panel: headline text -->
  <text x="620" y="200" font-family="'Helvetica Neue', Arial, sans-serif" font-size="52" font-weight="700" fill="#274992" letter-spacing="-1">Ristrutturazioni</text>
  <text x="620" y="262" font-family="'Helvetica Neue', Arial, sans-serif" font-size="52" font-weight="700" fill="#274992" letter-spacing="-1">a Torino</text>
  <text x="620" y="322" font-family="'Helvetica Neue', Arial, sans-serif" font-size="52" font-weight="700" fill="#00B7E9" letter-spacing="-1">e provincia</text>

  <!-- Services list -->
  <text x="624" y="390" font-family="'Helvetica Neue', Arial, sans-serif" font-size="21" fill="#555" font-weight="400">Tetti · Facciate · Cappotti Termici</text>
  <text x="624" y="422" font-family="'Helvetica Neue', Arial, sans-serif" font-size="21" fill="#555" font-weight="400">Ristrutturazioni Complete · Nuove Costruzioni</text>

  <!-- CTA -->
  <rect x="620" y="460" width="260" height="52" rx="6" fill="#274992"/>
  <text x="750" y="492" font-family="'Helvetica Neue', Arial, sans-serif" font-size="19" fill="white" font-weight="600" text-anchor="middle">Preventivo Gratuito</text>

  <!-- Domain -->
  <text x="${W - 40}" y="${H - 24}" font-family="'Helvetica Neue', Arial, sans-serif" font-size="18" fill="#274992" opacity="0.5" text-anchor="end">impresadieffe.it</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile(join(root, "public/images/og-image.png"));

console.log("OG image generated: public/images/og-image.png");
