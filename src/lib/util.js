'use strict';

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function esc(value) {
  if (value === null || value === undefined || value === false) return '';
  return String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function trim(n) {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function money(value, currency = 'KES') {
  const n = Number(value) || 0;
  if (n >= 1_000_000_000) return `${currency} ${trim(n / 1_000_000_000)}B`;
  if (n >= 1_000_000) return `${currency} ${trim(n / 1_000_000)}M`;
  if (n >= 1_000) return `${currency} ${trim(n / 1_000)}K`;
  return `${currency} ${n}`;
}

function num(value) {
  return Number(value || 0).toLocaleString('en-KE');
}

function moneyFull(value, currency = 'KES') {
  return `${currency} ${num(Math.round(Number(value) || 0))}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function range(count, start = 0) {
  return Array.from({ length: count }, (_, i) => i + start);
}

function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});
}

function unique(items) {
  return Array.from(new Set(items));
}

function readingTime(text) {
  const words = String(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function formatDate(iso, locale = 'en') {
  const d = new Date(String(iso).length === 10 ? iso + 'T00:00:00Z' : iso);
  const months = locale === 'sw'
    ? ['Januari', 'Februari', 'Machi', 'Aprili', 'Mei', 'Juni', 'Julai', 'Agosti', 'Septemba', 'Oktoba', 'Novemba', 'Desemba']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/* Minimal, dependency-free Markdown subset: headings, bold, italic, inline code,
   links, unordered/ordered lists, blockquotes, horizontal rules, paragraphs. */
function markdown(source) {
  const lines = String(source).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let list = null;

  const inline = (text) => esc(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|\W)\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');

  const closeList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };

  for (const line of lines) {
    const text = line.trim();
    if (!text) { closeList(); continue; }

    const heading = text.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    if (/^---+$/.test(text)) { closeList(); out.push('<hr>'); continue; }
    if (/^>\s?/.test(text)) {
      closeList();
      out.push(`<blockquote>${inline(text.replace(/^>\s?/, ''))}</blockquote>`);
      continue;
    }
    const bullet = text.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      if (list !== 'ul') { closeList(); out.push('<ul>'); list = 'ul'; }
      out.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }
    const ordered = text.match(/^\d+\.\s+(.*)$/);
    if (ordered) {
      if (list !== 'ol') { closeList(); out.push('<ol>'); list = 'ol'; }
      out.push(`<li>${inline(ordered[1])}</li>`);
      continue;
    }
    closeList();
    out.push(`<p>${inline(text)}</p>`);
  }
  closeList();
  return out.join('\n');
}

function excerpt(text, length = 180) {
  const clean = String(text).replace(/[#*>`]/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= length) return clean;
  return clean.slice(0, length - 1).replace(/\s+\S*$/, '') + '…';
}

module.exports = {
  esc, slugify, money, moneyFull, num, trim, clamp, range,
  groupBy, unique, readingTime, formatDate, markdown, excerpt,
};
