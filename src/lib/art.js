'use strict';

/* Deterministic SVG art generation.
   Every illustration on the site is produced here so the build carries no
   binary image dependencies: house renders, floor plans, 360 panoramas, app
   screens, the schematic map, construction progress frames and avatars. */

const { range } = require('./util');
const { c, ROOM_KEYS } = require('../data/copy');

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let s = hash(String(seed)) || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

const PALETTES = {
  'swahili-coastal': { sky: '#F6E7D4', skyLow: '#F1D3B2', wall: '#FBF4E7', wallAlt: '#F0E1C8', roof: '#A8452C', accent: '#0E5C56', ground: '#D8C6A8', trim: '#C08A3E' },
  victorian: { sky: '#E8EDF2', skyLow: '#D6E0E9', wall: '#F7F3EC', wallAlt: '#E6DED2', roof: '#3B4A5A', accent: '#7C3A55', ground: '#C9CBBF', trim: '#8C6A3F' },
  'art-deco': { sky: '#F3E4D3', skyLow: '#E9C9A8', wall: '#FDF8F0', wallAlt: '#EFE0C6', roof: '#C4791F', accent: '#1F3A5F', ground: '#D5C3A5', trim: '#D8A33A' },
  contemporary: { sky: '#E7EEEC', skyLow: '#CFE0DC', wall: '#F2F4F1', wallAlt: '#D9E1DD', roof: '#2C3A3A', accent: '#0E5C56', ground: '#BCC7BE', trim: '#9AA8A2' },
  'garden-court': { sky: '#EDF1E6', skyLow: '#D9E4CF', wall: '#F8F6EC', wallAlt: '#E4E6D2', roof: '#4A5540', accent: '#3F6B3A', ground: '#C3CCAF', trim: '#B08C4F' },
  'courtyard-villa': { sky: '#F1E9DE', skyLow: '#E0D0BC', wall: '#FCF7EE', wallAlt: '#EBDFCB', roof: '#5A4636', accent: '#9C5B2E', ground: '#D2C3A6', trim: '#BE9A5C' },
};

function palette(style) {
  return PALETTES[style] || PALETTES.contemporary;
}

function svgAttrs({ w, h, label, cls = '' }) {
  return `viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" ` +
    `xmlns="http://www.w3.org/2000/svg" class="art ${cls}" preserveAspectRatio="xMidYMid slice"`;
}

function skyline(id, p, w, h, horizon, rand) {
  const hills = range(3, 0).map((i) => {
    const y = horizon - 26 - i * 22 - rand() * 14;
    const d = `M -40 ${horizon} Q ${w * (0.2 + i * 0.18)} ${y - 30} ${w * 0.55} ${y} T ${w + 40} ${horizon - i * 8} L ${w + 40} ${horizon + 60} L -40 ${horizon + 60} Z`;
    return `<path d="${d}" fill="${p.accent}" opacity="${(0.07 + i * 0.05).toFixed(2)}"/>`;
  }).join('');
  const sunX = w * (0.18 + rand() * 0.6);
  return `
  <defs>
    <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.sky}"/><stop offset="1" stop-color="${p.skyLow}"/>
    </linearGradient>
    <radialGradient id="${id}-sun" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#FFF3D6" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#FFF3D6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${id}-sky)"/>
  <circle cx="${sunX.toFixed(0)}" cy="${(horizon - 90).toFixed(0)}" r="130" fill="url(#${id}-sun)"/>
  ${hills}
  <rect y="${horizon}" width="${w}" height="${h - horizon}" fill="${p.ground}"/>
  <rect y="${horizon}" width="${w}" height="3" fill="#000" opacity="0.06"/>`;
}

function palm(x, baseY, scale, color, flip = 1) {
  const fronds = range(6).map((i) => {
    const a = (-70 + i * 28) * (Math.PI / 180);
    const len = 34 * scale;
    const ex = x + flip * Math.cos(a) * len;
    const ey = baseY - 62 * scale + Math.sin(a) * len * 0.8;
    return `<path d="M ${x} ${baseY - 62 * scale} Q ${(x + ex) / 2 + flip * 8 * scale} ${ey - 12 * scale} ${ex} ${ey}" stroke="${color}" stroke-width="${(2.4 * scale).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
  }).join('');
  return `<g opacity="0.85"><path d="M ${x} ${baseY} Q ${x - 3 * scale * flip} ${baseY - 34 * scale} ${x} ${baseY - 62 * scale}" stroke="${color}" stroke-width="${(3.4 * scale).toFixed(1)}" fill="none" stroke-linecap="round"/>${fronds}</g>`;
}

function foliage(x, y, scale, color) {
  return `<g opacity="0.7"><ellipse cx="${x}" cy="${y}" rx="${16 * scale}" ry="${11 * scale}" fill="${color}"/><ellipse cx="${x - 9 * scale}" cy="${y + 3 * scale}" rx="${10 * scale}" ry="${8 * scale}" fill="${color}" opacity="0.8"/></g>`;
}

function windows(x, y, cols, rows, w, h, gapX, gapY, fill, frame) {
  let out = '';
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const wx = x + c * (w + gapX);
      const wy = y + r * (h + gapY);
      out += `<rect x="${wx}" y="${wy}" width="${w}" height="${h}" rx="2" fill="${fill}"/>`
        + `<rect x="${wx}" y="${wy}" width="${w}" height="${h}" rx="2" fill="none" stroke="${frame}" stroke-width="1.4"/>`
        + `<line x1="${wx + w / 2}" y1="${wy}" x2="${wx + w / 2}" y2="${wy + h}" stroke="${frame}" stroke-width="1.2"/>`;
    }
  }
  return out;
}

const SILHOUETTES = {
  'swahili-coastal'(p, w, h) {
    const baseY = h * 0.72;
    return `
    <path d="M ${w * 0.1} ${baseY} L ${w * 0.1} ${baseY - h * 0.3} L ${w * 0.9} ${baseY - h * 0.3} L ${w * 0.9} ${baseY} Z" fill="${p.wall}"/>
    <path d="M ${w * 0.06} ${baseY - h * 0.3} L ${w * 0.5} ${baseY - h * 0.52} L ${w * 0.94} ${baseY - h * 0.3} Z" fill="${p.roof}"/>
    <path d="M ${w * 0.42} ${baseY} L ${w * 0.42} ${baseY - h * 0.16} A ${w * 0.08} ${w * 0.08} 0 0 1 ${w * 0.58} ${baseY - h * 0.16} L ${w * 0.58} ${baseY} Z" fill="${p.accent}"/>
    <rect x="${w * 0.16}" y="${baseY - h * 0.22}" width="${w * 0.1}" height="${h * 0.1}" fill="${p.accent}" opacity="0.5"/>
    <rect x="${w * 0.74}" y="${baseY - h * 0.22}" width="${w * 0.1}" height="${h * 0.1}" fill="${p.accent}" opacity="0.5"/>
    ${windows(w * 0.2, baseY - h * 0.2, 3, 1, w * 0.05, h * 0.07, w * 0.05, 0, '#2E4A48', p.trim)}
    ${windows(w * 0.62, baseY - h * 0.2, 3, 1, w * 0.05, h * 0.07, w * 0.05, 0, '#2E4A48', p.trim)}
    <rect x="${w * 0.1}" y="${baseY - h * 0.04}" width="${w * 0.8}" height="${h * 0.04}" fill="${p.trim}" opacity="0.5"/>`;
  },
  victorian(p, w, h) {
    const baseY = h * 0.75;
    const roofY = baseY - h * 0.42;
    const gables = range(3).map((i) => {
      const gx = w * (0.22 + i * 0.28);
      return `<path d="M ${gx - w * 0.1} ${roofY + h * 0.1} L ${gx} ${roofY} L ${gx + w * 0.1} ${roofY + h * 0.1} Z" fill="${p.roof}"/>`;
    }).join('');
    return `
    <rect x="${w * 0.14}" y="${roofY + h * 0.1}" width="${w * 0.72}" height="${baseY - roofY - h * 0.1}" fill="${p.wall}"/>
    <rect x="${w * 0.14}" y="${roofY + h * 0.1}" width="${w * 0.72}" height="${h * 0.03}" fill="${p.trim}"/>
    ${gables}
    <rect x="${w * 0.44}" y="${roofY - h * 0.16}" width="${w * 0.06}" height="${h * 0.16}" fill="${p.roof}"/>
    <path d="M ${w * 0.42} ${roofY - h * 0.16} L ${w * 0.47} ${roofY - h * 0.24} L ${w * 0.52} ${roofY - h * 0.16} Z" fill="${p.roof}"/>
    ${windows(w * 0.2, roofY + h * 0.16, 2, 2, w * 0.05, h * 0.08, w * 0.06, h * 0.05, '#3A4A56', p.trim)}
    ${windows(w * 0.58, roofY + h * 0.16, 2, 2, w * 0.05, h * 0.08, w * 0.06, h * 0.05, '#3A4A56', p.trim)}
    <path d="M ${w * 0.44} ${baseY} v -${h * 0.14} h ${w * 0.06} v ${h * 0.14} Z" fill="${p.accent}"/>
    <rect x="${w * 0.12}" y="${baseY - h * 0.06}" width="${w * 0.76}" height="${h * 0.03}" fill="${p.trim}" opacity="0.7"/>`;
  },
  'art-deco'(p, w, h) {
    const baseY = h * 0.74;
    const tiers = range(4).map((i) => {
      const inset = i * w * 0.055;
      const ty = baseY - h * 0.22 - i * h * 0.075;
      return `<rect x="${w * 0.16 + inset}" y="${ty}" width="${w * 0.68 - inset * 2}" height="${h * 0.075}" fill="${i % 2 ? p.wallAlt : p.wall}"/>`;
    }).join('');
    return `
    <rect x="${w * 0.16}" y="${baseY - h * 0.22}" width="${w * 0.68}" height="${h * 0.22}" fill="${p.wall}"/>
    ${tiers}
    <path d="M ${w * 0.46} ${baseY - h * 0.52} L ${w * 0.5} ${baseY - h * 0.6} L ${w * 0.54} ${baseY - h * 0.52} Z" fill="${p.roof}"/>
    <rect x="${w * 0.16}" y="${baseY - h * 0.22}" width="${w * 0.68}" height="${h * 0.012}" fill="${p.roof}"/>
    ${windows(w * 0.22, baseY - h * 0.18, 5, 1, w * 0.045, h * 0.12, w * 0.055, 0, '#2A3550', p.trim)}
    <rect x="${w * 0.42}" y="${baseY - h * 0.12}" width="${w * 0.16}" height="${h * 0.12}" fill="${p.accent}"/>
    <rect x="${w * 0.42}" y="${baseY - h * 0.12}" width="${w * 0.16}" height="${h * 0.12}" fill="none" stroke="${p.trim}" stroke-width="2"/>`;
  },
  contemporary(p, w, h) {
    const baseY = h * 0.76;
    return `
    <rect x="${w * 0.1}" y="${baseY - h * 0.34}" width="${w * 0.36}" height="${h * 0.34}" fill="${p.wall}"/>
    <rect x="${w * 0.46}" y="${baseY - h * 0.48}" width="${w * 0.44}" height="${h * 0.48}" fill="${p.wallAlt}"/>
    <rect x="${w * 0.1}" y="${baseY - h * 0.34}" width="${w * 0.36}" height="${h * 0.34}" fill="none" stroke="${p.roof}" stroke-width="2"/>
    <rect x="${w * 0.46}" y="${baseY - h * 0.48}" width="${w * 0.44}" height="${h * 0.48}" fill="none" stroke="${p.roof}" stroke-width="2"/>
    <rect x="${w * 0.14}" y="${baseY - h * 0.3}" width="${w * 0.28}" height="${h * 0.14}" fill="#2C3A3A" opacity="0.85"/>
    <rect x="${w * 0.5}" y="${baseY - h * 0.44}" width="${w * 0.36}" height="${h * 0.16}" fill="#2C3A3A" opacity="0.85"/>
    <rect x="${w * 0.5}" y="${baseY - h * 0.24}" width="${w * 0.16}" height="${h * 0.24}" fill="#2C3A3A" opacity="0.7"/>
    <rect x="${w * 0.68}" y="${baseY - h * 0.24}" width="${w * 0.18}" height="${h * 0.24}" fill="${p.wall}"/>
    <line x1="${w * 0.1}" y1="${baseY - h * 0.34}" x2="${w * 0.1}" y2="${baseY - h * 0.56}" stroke="${p.roof}" stroke-width="3"/>
    <line x1="${w * 0.1}" y1="${baseY - h * 0.56}" x2="${w * 0.3}" y2="${baseY - h * 0.56}" stroke="${p.roof}" stroke-width="3"/>`;
  },
  'garden-court'(p, w, h) {
    const baseY = h * 0.74;
    return `
    <rect x="${w * 0.2}" y="${baseY - h * 0.28}" width="${w * 0.6}" height="${h * 0.28}" fill="${p.wall}"/>
    <path d="M ${w * 0.16} ${baseY - h * 0.28} L ${w * 0.5} ${baseY - h * 0.46} L ${w * 0.84} ${baseY - h * 0.28} Z" fill="${p.roof}"/>
    <path d="M ${w * 0.16} ${baseY - h * 0.28} L ${w * 0.5} ${baseY - h * 0.46} L ${w * 0.84} ${baseY - h * 0.28}" fill="none" stroke="${p.trim}" stroke-width="2"/>
    <path d="M ${w * 0.36} ${baseY} L ${w * 0.36} ${baseY - h * 0.14} A ${w * 0.06} ${w * 0.06} 0 0 1 ${w * 0.48} ${baseY - h * 0.14} L ${w * 0.48} ${baseY}" fill="${p.accent}"/>
    ${windows(w * 0.56, baseY - h * 0.22, 2, 1, w * 0.07, h * 0.09, w * 0.04, 0, '#3C4A34', p.trim)}
    ${windows(w * 0.22, baseY - h * 0.22, 2, 1, w * 0.04, h * 0.09, w * 0.03, 0, '#3C4A34', p.trim)}
    <rect x="${w * 0.06}" y="${baseY - h * 0.06}" width="${w * 0.88}" height="${h * 0.03}" fill="${p.trim}" opacity="0.45"/>`;
  },
  'courtyard-villa'(p, w, h) {
    const baseY = h * 0.76;
    return `
    <rect x="${w * 0.08}" y="${baseY - h * 0.24}" width="${w * 0.22}" height="${h * 0.24}" fill="${p.wall}"/>
    <rect x="${w * 0.7}" y="${baseY - h * 0.24}" width="${w * 0.22}" height="${h * 0.24}" fill="${p.wall}"/>
    <rect x="${w * 0.3}" y="${baseY - h * 0.36}" width="${w * 0.4}" height="${h * 0.36}" fill="${p.wallAlt}"/>
    <rect x="${w * 0.08}" y="${baseY - h * 0.3}" width="${w * 0.22}" height="${h * 0.06}" fill="${p.roof}"/>
    <rect x="${w * 0.7}" y="${baseY - h * 0.3}" width="${w * 0.22}" height="${h * 0.06}" fill="${p.roof}"/>
    <rect x="${w * 0.28}" y="${baseY - h * 0.42}" width="${w * 0.44}" height="${h * 0.06}" fill="${p.roof}"/>
    <path d="M ${w * 0.44} ${baseY} L ${w * 0.44} ${baseY - h * 0.18} A ${w * 0.06} ${w * 0.06} 0 0 1 ${w * 0.56} ${baseY - h * 0.18} L ${w * 0.56} ${baseY} Z" fill="${p.accent}"/>
    ${windows(w * 0.11, baseY - h * 0.2, 2, 1, w * 0.05, h * 0.08, w * 0.04, 0, '#3A2F26', p.trim)}
    ${windows(w * 0.74, baseY - h * 0.2, 2, 1, w * 0.05, h * 0.08, w * 0.04, 0, '#3A2F26', p.trim)}
    <rect x="${w * 0.3}" y="${baseY}" width="${w * 0.4}" height="${h * 0.05}" fill="${p.trim}" opacity="0.4"/>`;
  },
};

function houseRender(style, opts = {}) {
  const w = opts.w || 1200;
  const h = opts.h || 760;
  const id = `hr-${style}-${hash(opts.seed || style) % 9999}`;
  const p = palette(style);
  const rand = rng(opts.seed || style);
  const horizon = h * 0.74;
  const draw = SILHOUETTES[style] || SILHOUETTES.contemporary;
  const plants = style === 'swahili-coastal'
    ? palm(w * 0.05, h * 0.86, 1.15, '#2F6B4F') + palm(w * 0.96, h * 0.88, 0.95, '#2F6B4F', -1)
    : foliage(w * 0.08, h * 0.8, 1.5, p.accent) + foliage(w * 0.93, h * 0.82, 1.2, p.accent);
  const grain = range(18).map(() => {
    const x = rand() * w;
    return `<circle cx="${x.toFixed(0)}" cy="${(h * 0.78 + rand() * h * 0.2).toFixed(0)}" r="${(0.8 + rand() * 1.6).toFixed(1)}" fill="#000" opacity="0.05"/>`;
  }).join('');

  return `<svg ${svgAttrs({ w, h, label: opts.label || `${style} home render`, cls: opts.cls || '' })}>
  ${skyline(id, p, w, h, horizon, rand)}
  ${draw(p, w, h)}
  ${plants}
  ${grain}
  <rect x="0" y="${h - 4}" width="${w}" height="4" fill="${p.trim}" opacity="0.35"/>
</svg>`;
}

function floorPlan(style, opts = {}) {
  const bedrooms = opts.bedrooms || 3;
  const w = 1200;
  const h = 900;
  const p = palette(style);
  const x = 112;
  const y = 174;
  const iw = 976;
  const publicH = 238;
  const hallY = y + publicH;
  const hallH = 74;
  const bedroomY = hallY + hallH;
  const bedroomH = 250;
  const ink = '#25332F';
  const paper = '#FAF9F4';
  const floor = '#F0EEE6';
  const soft = '#E5EBE3';
  const hasCourtyard = ['swahili-coastal', 'garden-court', 'courtyard-villa'].includes(style);
  const bedroomsCount = Math.max(1, Math.min(6, Math.round(bedrooms)));
  const gradientId = `plan-bg-${bedroomsCount}-${hash(`${style}-${opts.seed || ''}`) % 999999}`;
  const roomWidth = iw / bedroomsCount;
  const roomLabel = (cx, cy, name, size = 18) => `<text x="${cx}" y="${cy}" text-anchor="middle" font-size="${size}" font-family="'IBM Plex Mono',monospace" letter-spacing="1.5" fill="${ink}">${name}</text>`;
  const verticalWall = (px, y1, y2) => `<line x1="${px}" y1="${y1}" x2="${px}" y2="${y2}" stroke="${ink}" stroke-width="7"/>`;
  const furniture = (cx, cy, width, height) => `<g fill="${p.wallAlt}" stroke="${p.accent}" stroke-width="2.5">
    <rect x="${cx - width / 2}" y="${cy - height / 2}" width="${width}" height="${height}" rx="8"/>
    <rect x="${cx - width / 2 + 10}" y="${cy - height / 2 + 9}" width="${width / 2 - 14}" height="27" rx="5" fill="${paper}"/>
    <rect x="${cx + 4}" y="${cy - height / 2 + 9}" width="${width / 2 - 14}" height="27" rx="5" fill="${paper}"/>
  </g>`;

  const bedroomsMarkup = range(bedroomsCount).map((i) => {
    const roomX = x + i * roomWidth;
    const center = roomX + roomWidth / 2;
    const furnitureWidth = Math.min(142, roomWidth * 0.66);
    const label = i === 0 ? 'PRIMARY SUITE' : `BEDROOM 0${i + 1}`;
    return `<rect x="${roomX}" y="${bedroomY}" width="${roomWidth}" height="${bedroomH}" fill="${i === 0 ? soft : paper}"/>
      ${i > 0 ? verticalWall(roomX, bedroomY, bedroomY + bedroomH) : ''}
      ${roomLabel(center, bedroomY + 55, label, bedroomsCount > 4 ? 12 : 15)}
      ${furniture(center, bedroomY + 151, furnitureWidth, 91)}
      <rect x="${center - 30}" y="${bedroomY + 219}" width="60" height="15" rx="3" fill="${p.trim}" opacity=".22"/>
      <circle cx="${roomX + roomWidth - 22}" cy="${bedroomY + 27}" r="7" fill="${p.accent}" opacity=".68"/>`;
  }).join('');

  const bedroomPartitions = range(bedroomsCount - 1).map((i) => {
    const px = x + (i + 1) * roomWidth;
    return `<line x1="${px}" y1="${bedroomY}" x2="${px}" y2="${bedroomY + bedroomH}" stroke="${ink}" stroke-width="7"/>`;
  }).join('');

  const windows = [
    `<line x1="${x + 82}" y1="${y}" x2="${x + 218}" y2="${y}" stroke="${p.accent}" stroke-width="13"/>`,
    `<line x1="${x + iw - 210}" y1="${y}" x2="${x + iw - 74}" y2="${y}" stroke="${p.accent}" stroke-width="13"/>`,
    `<line x1="${x + 118}" y1="${bedroomY + bedroomH}" x2="${x + 242}" y2="${bedroomY + bedroomH}" stroke="${p.accent}" stroke-width="13"/>`,
    `<line x1="${x + iw - 240}" y1="${bedroomY + bedroomH}" x2="${x + iw - 116}" y2="${bedroomY + bedroomH}" stroke="${p.accent}" stroke-width="13"/>`,
  ].join('');

  const bedroomDoorGaps = range(bedroomsCount).map((i) => {
    const center = x + (i + 0.5) * roomWidth;
    return `<line x1="${center - 22}" y1="${bedroomY}" x2="${center + 22}" y2="${bedroomY}" stroke="${paper}" stroke-width="12"/>
      <path d="M ${center - 22} ${bedroomY + 5} v 42 a 42 42 0 0 0 42 -42" fill="none" stroke="${p.trim}" stroke-width="2.5"/>`;
  }).join('');
  const centralRoom = hasCourtyard
    ? `<text x="${x + 503}" y="${y + 40}" text-anchor="middle" font-size="14" font-family="'IBM Plex Mono',monospace" letter-spacing="1.2" fill="${ink}">${style === 'garden-court' ? 'GARDEN COURT' : 'OPEN COURTYARD'}</text>
      <rect x="${x + 410}" y="${y + 68}" width="186" height="150" rx="8" fill="#D8E5D2" stroke="${p.accent}" stroke-width="3"/>
      <rect x="${x + 469}" y="${y + 112}" width="68" height="62" rx="8" fill="#AFCFC4" stroke="${p.accent}" stroke-width="2"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${x + 430 + i * 31}" cy="${y + (i % 2 ? 88 : 198)}" r="8" fill="${p.accent}" opacity=".62"/>`).join('')}`
    : `<text x="${x + 503}" y="${y + 40}" text-anchor="middle" font-size="16" font-family="'IBM Plex Mono',monospace" letter-spacing="1.5" fill="${ink}">DINING</text>
      <rect x="${x + 428}" y="${y + 92}" width="150" height="86" rx="12" fill="${paper}" stroke="${p.accent}" stroke-width="3"/>
      ${range(6).map((i) => {
    const seatX = x + 440 + i * 26;
    const seatY = i < 3 ? y + 78 : y + 183;
    return `<rect x="${seatX}" y="${seatY}" width="18" height="13" rx="4" fill="${p.trim}" opacity=".52"/>`;
  }).join('')}`;

  return `<svg ${svgAttrs({ w, h, label: opts.label || `${bedroomsCount} bedroom conceptual floor plan`, cls: opts.cls || '' })}>
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${paper}"/>
      <stop offset="1" stop-color="${p.wallAlt}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradientId})"/>
  <text x="64" y="67" font-size="17" font-family="'IBM Plex Mono',monospace" letter-spacing="3" fill="${p.accent}">TRIXX  /  HOME STUDY</text>
  <text x="64" y="112" font-size="30" font-family="'Manrope',sans-serif" font-weight="700" fill="${ink}">${bedroomsCount}-BEDROOM CONCEPT PLAN</text>
  <text x="${w - 64}" y="71" text-anchor="end" font-size="17" font-family="'IBM Plex Mono',monospace" fill="${ink}">${opts.area || '—'} m² INDICATIVE</text>
  <circle cx="${w - 84}" cy="116" r="24" fill="${paper}" stroke="${p.accent}" stroke-width="2"/>
  <path d="M ${w - 84} 130 V 101 M ${w - 95} 112 L ${w - 84} 99 L ${w - 73} 112" fill="none" stroke="${p.accent}" stroke-width="3"/>
  <rect x="${x}" y="${y}" width="${iw}" height="${publicH}" fill="${paper}"/>
  <rect x="${x}" y="${y}" width="376" height="${publicH}" fill="${soft}"/>
  <rect x="${x + 376}" y="${y}" width="254" height="${publicH}" fill="${hasCourtyard ? '#DCE8D7' : floor}"/>
  <rect x="${x + 630}" y="${y}" width="${iw - 630}" height="${publicH}" fill="${paper}"/>
  <rect x="${x}" y="${hallY}" width="${iw}" height="${hallH}" fill="${p.wallAlt}" opacity=".42"/>
  <rect x="${x}" y="${bedroomY}" width="${iw}" height="${bedroomH}" fill="${paper}"/>
  <rect x="${x}" y="${y}" width="${iw}" height="${publicH + hallH + bedroomH}" fill="none" stroke="${ink}" stroke-width="11"/>
  ${hasCourtyard ? '' : verticalWall(x + 376, y, hallY)}
  ${hasCourtyard ? '' : verticalWall(x + 630, y, hallY)}
  <line x1="${x}" y1="${hallY}" x2="${x + iw}" y2="${hallY}" stroke="${ink}" stroke-width="7"/>
  <line x1="${x}" y1="${bedroomY}" x2="${x + iw}" y2="${bedroomY}" stroke="${ink}" stroke-width="7"/>
  ${bedroomPartitions}
  ${windows}
  ${roomLabel(x + 188, y + 40, 'LIVING', 17)}
  <rect x="${x + 58}" y="${y + 87}" width="250" height="88" rx="16" fill="${p.wallAlt}" stroke="${p.accent}" stroke-width="3"/>
  <rect x="${x + 76}" y="${y + 98}" width="92" height="65" rx="9" fill="${paper}" stroke="${p.accent}" stroke-width="2"/>
  <rect x="${x + 178}" y="${y + 98}" width="112" height="65" rx="9" fill="${paper}" stroke="${p.accent}" stroke-width="2"/>
  <rect x="${x + 149}" y="${y + 187}" width="84" height="28" rx="8" fill="${p.trim}" opacity=".22"/>
  ${centralRoom}
  ${roomLabel(x + 803, y + 40, 'KITCHEN', 17)}
  <path d="M ${x + 674} ${y + 73} h 350 v 39 h -311 v 57 h -39 Z" fill="${p.wallAlt}" stroke="${p.accent}" stroke-width="3"/>
  <rect x="${x + 738}" y="${y + 169}" width="221" height="40" rx="9" fill="${paper}" stroke="${p.accent}" stroke-width="2"/>
  <line x1="${x + iw - 230}" y1="${hallY}" x2="${x + iw - 230}" y2="${bedroomY}" stroke="${ink}" stroke-width="7"/>
  <text x="${x + (iw - 230) / 2}" y="${hallY + 46}" text-anchor="middle" font-size="15" font-family="'IBM Plex Mono',monospace" letter-spacing="4" fill="${p.accent}">PRIVATE HALL</text>
  <rect x="${x + iw - 220}" y="${hallY + 7}" width="208" height="29" fill="${paper}" stroke="${ink}" stroke-width="2"/>
  <text x="${x + iw - 116}" y="${hallY + 27}" text-anchor="middle" font-size="11" font-family="'IBM Plex Mono',monospace" fill="${ink}">BATH</text>
  <rect x="${x + iw - 220}" y="${hallY + 39}" width="208" height="28" fill="${soft}" stroke="${ink}" stroke-width="2"/>
  <text x="${x + iw - 116}" y="${hallY + 58}" text-anchor="middle" font-size="10" font-family="'IBM Plex Mono',monospace" fill="${ink}">UTILITY</text>
  ${bedroomsMarkup}
  ${bedroomDoorGaps}
  <line x1="${w / 2 - 54}" y1="${bedroomY + bedroomH}" x2="${w / 2 + 54}" y2="${bedroomY + bedroomH}" stroke="${paper}" stroke-width="14"/>
  <path d="M ${w / 2 - 54} ${y + publicH + hallH + bedroomH + 8} v 36 h 108 v -36" fill="none" stroke="${p.accent}" stroke-width="4"/>
  <text x="${w / 2}" y="${y + publicH + hallH + bedroomH + 64}" text-anchor="middle" font-size="15" font-family="'IBM Plex Mono',monospace" letter-spacing="2" fill="${p.accent}">ENTRY</text>
  <line x1="64" y1="824" x2="${w - 64}" y2="824" stroke="${ink}" stroke-opacity=".18"/>
  <text x="64" y="860" font-size="14" font-family="'IBM Plex Mono',monospace" fill="${ink}" opacity=".8">EARLY DESIGN STUDY  ·  NOT TO SCALE  ·  NOT FOR CONSTRUCTION</text>
  <text x="${w - 64}" y="860" text-anchor="end" font-size="14" font-family="'IBM Plex Mono',monospace" fill="${p.accent}">WIDTH ${Number(opts.width || 0).toFixed(1)} m · INDICATIVE</text>
</svg>`;
}

function tourPanorama(style, opts = {}) {
  const w = 1600;
  const h = 800;
  const p = palette(style);
  const shift = ((Number(opts.angle || 0) % 360) + 360) % 360;
  const offset = (shift / 360) * w;
  const wrap = (v) => ((v % w) + w * 2) % w;
  const locale = opts.locale || 'en';

  const rooms = ROOM_KEYS.map((key) => c(locale, key));
  const labels = rooms.map((label, i) => {
    const x = wrap(i * (w / rooms.length) - offset) - w * 0.5;
    return `<g opacity="${x > -220 && x < w + 220 ? 1 : 0}">
      <rect x="${x.toFixed(0)}" y="556" width="240" height="46" rx="23" fill="#0B1A19" opacity="0.55"/>
      <text x="${(x + 120).toFixed(0)}" y="585" text-anchor="middle" font-size="19" font-family="'Archivo',sans-serif" fill="#FBF4E7">${label}</text>
    </g>`;
  }).join('');

  // Window bays repeat horizontally so panning reads as a continuous room.
  const bays = range(9).map((i) => {
    const x = wrap(i * (w / 8) - offset) - w * 0.25;
    return `<g transform="translate(${x.toFixed(0)} 0)">
      <rect x="40" y="180" width="150" height="330" rx="6" fill="${p.wallAlt}"/>
      <rect x="52" y="192" width="126" height="306" rx="4" fill="#7FB8AE" opacity="0.6"/>
      <line x1="115" y1="192" x2="115" y2="498" stroke="${p.wall}" stroke-width="6"/>
      <line x1="52" y1="345" x2="178" y2="345" stroke="${p.wall}" stroke-width="6"/>
      <rect x="30" y="510" width="170" height="16" fill="${p.trim}" opacity="0.6"/>
    </g>`;
  }).join('');

  const furniture = `<g>
    <rect x="${(wrap(w * 0.18 - offset * 0.6) - w * 0.15).toFixed(0)}" y="600" width="320" height="90" rx="12" fill="${p.accent}" opacity="0.75"/>
    <rect x="${(wrap(w * 0.62 - offset * 0.6) - w * 0.15).toFixed(0)}" y="620" width="240" height="70" rx="10" fill="${p.roof}" opacity="0.6"/>
  </g>`;

  return `<svg ${svgAttrs({ w, h, label: opts.label || `360 tour of ${style} home`, cls: opts.cls || '' })}>
  <defs>
    <linearGradient id="pano-${hash(style) % 999}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.sky}"/><stop offset="0.55" stop-color="${p.wall}"/><stop offset="1" stop-color="${p.wallAlt}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#pano-${hash(style) % 999})"/>
  <rect y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="${p.ground}"/>
  <g opacity="0.35">${range(26).map((i) => `<line x1="0" y1="${i * 32}" x2="${w}" y2="${i * 32}" stroke="${p.accent}" stroke-width="0.6"/>`).join('')}</g>
  ${bays}
  <rect x="0" y="140" width="${w}" height="12" fill="${p.trim}" opacity="0.5"/>
  ${furniture}
  ${labels}
  <rect x="0" y="0" width="${w}" height="60" fill="#0B1A19" opacity="0.25"/>
  <text x="34" y="38" font-size="17" font-family="'IBM Plex Mono',monospace" fill="#FBF4E7" opacity="0.85">${shift.toFixed(0)}°</text>
</svg>`;
}

const APP_UI = {
  home: { bg: '#0E5C56', tint: '#FBF4E7', rows: ['Living room lights', 'Front door lock', 'Energy today', 'Garden irrigation'] },
  farm: { bg: '#2F6B4F', tint: '#F2F7EE', rows: ['Soil moisture', 'Irrigation zones', 'Water saved', 'Harvest log'] },
  rent: { bg: '#1F3A5F', tint: '#EFF4FB', rows: ['Rent due 5 Nov', 'Receipts', 'Maintenance', 'My lease'] },
  market: { bg: '#A8452C', tint: '#FDF3EC', rows: ['New today', 'Saved searches', 'Chat with seller', 'My listings'] },
  school: { bg: '#C4791F', tint: '#FEF6E8', rows: ['Timetable', 'Fees balance', 'Report cards', 'Announcements'] },
};

function appScreen(app, opts = {}) {
  const ui = APP_UI[app] || APP_UI.home;
  const w = 420;
  const h = 860;
  const rand = rng(`${app}-${opts.screen || 0}`);
  const rows = ui.rows.map((label, i) => {
    const y = 300 + i * 92;
    const value = app === 'home' && i === 2
      ? `${(2.4 + rand() * 1.6).toFixed(1)} kWh`
      : app === 'farm' && i === 2
        ? `${28 + Math.round(rand() * 40)}%`
        : `${Math.round(60 + rand() * 39)}%`;
    return `<g>
      <rect x="26" y="${y}" width="368" height="76" rx="16" fill="${ui.tint}" opacity="0.14"/>
      <circle cx="62" cy="${y + 38}" r="16" fill="${ui.tint}" opacity="0.85"/>
      <text x="92" y="${y + 32}" font-size="17" font-family="'Archivo',sans-serif" fill="${ui.tint}">${label}</text>
      <text x="92" y="${y + 58}" font-size="15" font-family="'IBM Plex Mono',monospace" fill="${ui.tint}" opacity="0.7">${value}</text>
      <rect x="316" y="${y + 26}" width="52" height="26" rx="13" fill="${i % 2 === 0 ? '#7FE0B0' : ui.tint}" opacity="0.9"/>
    </g>`;
  }).join('');

  const chart = `<g>
    <rect x="26" y="150" width="368" height="120" rx="18" fill="${ui.tint}" opacity="0.12"/>
    ${range(12).map((i) => {
      const bh = 16 + rand() * 76;
      return `<rect x="${44 + i * 29}" y="${(256 - bh).toFixed(0)}" width="16" height="${bh.toFixed(0)}" rx="5" fill="${ui.tint}" opacity="${(0.4 + rand() * 0.5).toFixed(2)}"/>`;
    }).join('')}
    <text x="44" y="176" font-size="14" font-family="'IBM Plex Mono',monospace" fill="${ui.tint}" opacity="0.75">LAST 12 MONTHS</text>
  </g>`;

  return `<svg ${svgAttrs({ w, h, label: opts.label || `TRIXX ${app} app screen`, cls: opts.cls || '' })}>
  <rect width="${w}" height="${h}" rx="44" fill="${ui.bg}"/>
  <rect x="14" y="14" width="${w - 28}" height="${h - 28}" rx="34" fill="none" stroke="${ui.tint}" stroke-width="1.5" opacity="0.25"/>
  <rect x="${w / 2 - 44}" y="26" width="88" height="10" rx="5" fill="${ui.tint}" opacity="0.4"/>
  <text x="26" y="98" font-size="30" font-family="'Bodoni Moda',serif" fill="${ui.tint}">TRIXX ${app[0].toUpperCase() + app.slice(1)}</text>
  <text x="26" y="126" font-size="15" font-family="'IBM Plex Mono',monospace" fill="${ui.tint}" opacity="0.7">${opts.subtitle || 'Nairobi · 17 Oct'}</text>
  ${chart}
  ${rows}
  ${range(4).map((i) => `<circle cx="${60 + i * 100}" cy="${h - 46}" r="${i === 0 ? 9 : 7}" fill="${ui.tint}" opacity="${i === 0 ? 1 : 0.45}"/>`).join('')}
</svg>`;
}

function mapView(listings, opts = {}) {
  const w = 1000;
  const h = 640;
  const rand = rng('map-' + listings.map((l) => l.id).join(','));
  const roads = range(7).map((i) => `<line x1="0" y1="${i * 100 + 20}" x2="${w}" y2="${i * 100 + 40}" stroke="#C9BFA8" stroke-width="${i % 2 ? 3 : 6}"/>`).join('')
    + range(6).map((i) => `<line x1="${i * 180 + 30}" y1="0" x2="${i * 180 + 10}" y2="${h}" stroke="#C9BFA8" stroke-width="${i % 2 ? 3 : 6}"/>`).join('');

  const blocks = range(22).map(() => {
    const x = rand() * w;
    const y = rand() * h;
    const bw = 40 + rand() * 90;
    const bh = 30 + rand() * 70;
    return `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}" rx="4" fill="#DCD3BC" opacity="0.75"/>`;
  }).join('');

  const pins = listings.map((l, i) => {
    const x = 80 + ((i * 137 + 60) % (w - 160));
    const y = 70 + ((i * 97 + 40) % (h - 140));
    const tint = l.tier === 'premium' ? '#0E5C56' : l.tier === 'comfort' ? '#C4791F' : '#A8452C';
    return `<g class="map-pin" data-listing="${l.id}" tabindex="0" role="button" aria-label="${l.title}">
      <circle cx="${x}" cy="${y}" r="19" fill="${tint}" opacity="0.18"/>
      <path d="M ${x} ${y + 6} L ${x - 11} ${y - 9} A 13 13 0 1 1 ${x + 11} ${y - 9} Z" fill="${tint}"/>
      <circle cx="${x}" cy="${y - 11}" r="5" fill="#FBF4E7"/>
      <text x="${x}" y="${y + 30}" text-anchor="middle" font-size="12" font-family="'IBM Plex Mono',monospace" fill="#3A2F26">${l.priceShort}</text>
    </g>`;
  }).join('');

  return `<svg ${svgAttrs({ w, h, label: 'Map of matching properties', cls: opts.cls || 'map-art' })}>
  <rect width="${w}" height="${h}" fill="#EDE7D8"/>
  <g opacity="0.9">${blocks}</g>
  ${roads}
  <path d="M 0 520 Q 260 470 520 540 T 1000 500 L 1000 640 L 0 640 Z" fill="#B7D6CE" opacity="0.8"/>
  <text x="40" y="612" font-size="14" font-family="'IBM Plex Mono',monospace" fill="#2E5A54">INDIAN OCEAN</text>
  <g>${range(14).map(() => {
    const x = rand() * w;
    const y = rand() * h;
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(3 + rand() * 5).toFixed(1)}" fill="#8FA88F" opacity="0.5"/>`;
  }).join('')}</g>
  ${pins}
</svg>`;
}

function progressFrame(phase, opts = {}) {
  const w = 900;
  const h = 560;
  const p = palette(opts.style || 'contemporary');
  const rand = rng(`progress-${phase}-${opts.seed || ''}`);
  const horizon = h * 0.78;

  if (phase === 'after') {
    return houseRender(opts.style || 'contemporary', { w, h, label: 'Completed home', cls: opts.cls });
  }

  const scene = phase === 'during'
    ? `
      <rect y="${horizon}" width="${w}" height="${h - horizon}" fill="#BFB69C"/>
      <rect x="180" y="${horizon - 210}" width="540" height="210" fill="#D9CFB6"/>
      ${range(6).map((i) => `<line x1="${180 + i * 90}" y1="${horizon - 210}" x2="${180 + i * 90}" y2="${horizon}" stroke="#A79C82" stroke-width="3"/>`).join('')}
      <line x1="120" y1="${horizon}" x2="120" y2="${horizon - 320}" stroke="#C4791F" stroke-width="7"/>
      <line x1="120" y1="${horizon - 320}" x2="640" y2="${horizon - 320}" stroke="#C4791F" stroke-width="6"/>
      <line x1="600" y1="${horizon - 320}" x2="600" y2="${horizon - 240}" stroke="#C4791F" stroke-width="3"/>
      <rect x="576" y="${horizon - 240}" width="48" height="34" fill="#A8452C"/>
      <text x="200" y="${horizon + 60}" font-size="15" font-family="'IBM Plex Mono',monospace" fill="#6B614C">STRUCTURE + ROOF DECK</text>`
    : `
      <rect y="${horizon}" width="${w}" height="${h - horizon}" fill="#C8BFA4"/>
      ${range(9).map(() => {
        const x = rand() * w;
        return `<ellipse cx="${x.toFixed(0)}" cy="${(horizon - 10 - rand() * 20).toFixed(0)}" rx="${(18 + rand() * 22).toFixed(0)}" ry="${(10 + rand() * 10).toFixed(0)}" fill="#8FA88F" opacity="0.6"/>`;
      }).join('')}
      <line x1="60" y1="${horizon}" x2="60" y2="${horizon - 120}" stroke="#8A7F66" stroke-width="4"/>
      <line x1="60" y1="${horizon - 120}" x2="300" y2="${horizon - 120}" stroke="#8A7F66" stroke-width="3" stroke-dasharray="10 8"/>
      <text x="72" y="${horizon - 132}" font-size="15" font-family="'IBM Plex Mono',monospace" fill="#6B614C">SITE SURVEY</text>`;

  return `<svg ${svgAttrs({ w, h, label: `Construction ${phase}`, cls: opts.cls || '' })}>
  <defs><linearGradient id="pg-${phase}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky}"/><stop offset="1" stop-color="${p.skyLow}"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#pg-${phase})"/>
  ${scene}
</svg>`;
}

function avatar(name, opts = {}) {
  const size = 220;
  const rand = rng(name);
  const hue = Math.floor(rand() * 360);
  const initials = String(name).split(/\s+/).slice(0, 2).map((s) => s[0] || '').join('').toUpperCase();
  return `<svg ${svgAttrs({ w: size, h: size, label: `Portrait of ${name}`, cls: opts.cls || 'avatar-art' })}>
  <defs>
    <linearGradient id="av-${hash(name) % 99999}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 32% 32%)"/><stop offset="1" stop-color="hsl(${(hue + 40) % 360} 38% 20%)"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#av-${hash(name) % 99999})"/>
  <g opacity="0.28">${range(7).map(() => `<circle cx="${(rand() * size).toFixed(0)}" cy="${(rand() * size).toFixed(0)}" r="${(20 + rand() * 50).toFixed(0)}" fill="#FBF4E7"/>`).join('')}</g>
  <circle cx="${size / 2}" cy="${size / 2 - 14}" r="42" fill="#FBF4E7" opacity="0.92"/>
  <path d="M ${size / 2 - 62} ${size - 20} a 62 62 0 0 1 124 0 Z" fill="#FBF4E7" opacity="0.92"/>
  <text x="${size / 2}" y="${size / 2 - 2}" text-anchor="middle" font-size="30" font-family="'Bodoni Moda',serif" fill="hsl(${hue} 32% 28%)">${initials}</text>
</svg>`;
}

function archPattern(opts = {}) {
  const w = 120;
  const h = 160;
  const c = opts.color || '#0E5C56';
  return `<svg ${svgAttrs({ w, h, label: 'Decorative arch motif', cls: opts.cls || '' })}>
  <path d="M 12 ${h - 10} L 12 62 A 48 48 0 0 1 108 62 L 108 ${h - 10} Z" fill="none" stroke="${c}" stroke-width="2.5"/>
  <path d="M 30 ${h - 10} L 30 68 A 30 30 0 0 1 90 68 L 90 ${h - 10} Z" fill="none" stroke="${c}" stroke-width="1.6" opacity="0.7"/>
  <circle cx="60" cy="52" r="8" fill="${c}" opacity="0.85"/>
  <line x1="60" y1="96" x2="60" y2="${h - 26}" stroke="${c}" stroke-width="1.4" opacity="0.6"/>
</svg>`;
}

function brassLattice(opts = {}) {
  const w = 200;
  const h = 120;
  const c = opts.color || '#C08A3E';
  const cells = range(5).map((i) => range(3).map((j) => {
    const x = 20 + i * 34;
    const y = 20 + j * 34;
    return `<path d="M ${x} ${y + 17} L ${x + 17} ${y} L ${x + 34} ${y + 17} L ${x + 17} ${y + 34} Z" fill="none" stroke="${c}" stroke-width="1.3" opacity="0.8"/>`;
  }).join('')).join('');
  return `<svg ${svgAttrs({ w, h, label: 'Decorative brass lattice', cls: opts.cls || '' })}>${cells}</svg>`;
}

module.exports = {
  hash, rng, palette, PALETTES,
  houseRender, floorPlan, tourPanorama, appScreen, mapView,
  progressFrame, avatar, archPattern, brassLattice,
};
