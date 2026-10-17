'use strict';

/* Brand assets generated as inline SVG: the favicon and the standalone
   wordmark used in structured data and press kits. */

function markSvg(size = 48, color = '#0E5C56', accent = '#A8452C') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}" role="img" aria-label="TRIXX">
  <path d="M6 44V22a18 18 0 0 1 36 0v22" fill="none" stroke="${color}" stroke-width="2.6"/>
  <path d="M14 44V24a10 10 0 0 1 20 0v20" fill="none" stroke="${color}" stroke-width="1.7" opacity="0.6"/>
  <circle cx="24" cy="16" r="3.6" fill="${accent}"/>
  <path d="M24 22v16" stroke="${accent}" stroke-width="1.7"/>
  <path d="M2 44h44" stroke="${color}" stroke-width="2.6"/>
</svg>`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#0E5C56"/>
  <path d="M14 52V28a18 18 0 0 1 36 0v24" fill="none" stroke="#FBF4E7" stroke-width="3.2"/>
  <path d="M22 52V30a10 10 0 0 1 20 0v22" fill="none" stroke="#FBF4E7" stroke-width="2" opacity="0.6"/>
  <circle cx="32" cy="22" r="4.4" fill="#C08A3E"/>
  <path d="M32 29v19" stroke="#C08A3E" stroke-width="2"/>
  <path d="M10 52h44" stroke="#FBF4E7" stroke-width="3.2"/>
</svg>`;
}

function logoLockup() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80" role="img" aria-label="TRIXX Smart Living">
  <g transform="translate(4 16)">${markSvg(48).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>
  <text x="66" y="46" font-family="Georgia, serif" font-size="30" letter-spacing="4" fill="#14201F">TRIXX</text>
  <text x="67" y="64" font-family="monospace" font-size="9" letter-spacing="3.4" fill="#6C7B77">SMART LIVING</text>
</svg>`;
}

module.exports = { markSvg, favicon, logoLockup };
