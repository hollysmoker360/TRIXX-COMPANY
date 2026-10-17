'use strict';

function markSvg(size = 48) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true">
  <path d="M24 2 46 44H2L24 2Z" fill="currentColor"/>
  <path d="m15 25 18 18M33 25 15 43" fill="none" stroke="var(--brand-surface, #F5F3EC)" stroke-width="6" stroke-linecap="square"/>
</svg>`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#101A19"/>
  <path d="M32 8 56 54H8L32 8Z" fill="#FF4B2B"/>
  <path d="m22 34 20 20M42 34 22 54" fill="none" stroke="#101A19" stroke-width="7" stroke-linecap="square"/>
</svg>`;
}

function logoLockup() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 72" width="360" height="72" role="img" aria-label="TRIXX Property and Technology">
  <g transform="translate(0 12)"><path d="M24 2 46 44H2L24 2Z" fill="#FF4B2B"/><path d="m15 25 18 18M33 25 15 43" fill="none" stroke="#F5F3EC" stroke-width="6" stroke-linecap="square"/></g>
  <text x="62" y="48" font-family="Arial, sans-serif" font-size="43" font-weight="900" letter-spacing="1" fill="#111827">TRI<tspan fill="#FF4B2B">XX</tspan></text>
  <text x="64" y="66" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="2.4" fill="#717B8B">PROPERTY + TECH</text>
</svg>`;
}

function appLogo(slug, name) {
  const suffix = name.replace(/^TRIXX\s*/, '');
  return `<span class="app-logo app-logo--${slug}" role="img" aria-label="${name}">
    <span class="app-logo__tile">${markSvg(40)}</span>
    <span class="app-logo__word" aria-hidden="true"><span>TRI</span><b>XX</b><small>${suffix}</small></span>
  </span>`;
}

module.exports = { markSvg, favicon, logoLockup, appLogo };
