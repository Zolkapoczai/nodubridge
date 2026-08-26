#!/usr/bin/env node
// Beindexeli a NODU Bridge HTML dokumentumokat kereséshez.
// - Beszúr egy stabil id-t minden h1/h2/h3 címsorra, ha még nincs neki (mentés vissza a fájlba).
// - Kiírja a szekció-szintű szöveges indexet: ../assets/js/search-index.json
//
// Futtatás: node build-search-index.js   (tartalom-frissítés után újra kell futtatni)

const fs = require('fs');
const path = require('path');

const CONTENT_FILES = [
  'bridge-waitlist.html',
  'nodu-bridge-esettanulmanyok.html',
  'nodu-bridge-lead-gen.html',
  'nodu-bridge-license-calculator.html',
  'nodu-bridge-piac-elemzes.html',
  'nodu-bridge-piackutatas.html',
  'nodu-bridge-roadmap.html',
  'nodu-bridge-speckle-tanulsagok.html',
  'nodu-bridge-strategiai-tanulmany.html',
  'nodu-bridge-vezetoi-osszefoglalo.html',
];

const ACCENT_MAP = {
  'á': 'a', 'à': 'a', 'â': 'a', 'ä': 'a', 'ã': 'a',
  'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
  'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
  'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o', 'õ': 'o', 'ő': 'o',
  'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u',
  'ç': 'c', 'ñ': 'n',
};

function deaccent(str) {
  return str.replace(/[áàâäãéèêëíìîïóòôöõőúùûüűçñ]/g, (ch) => ACCENT_MAP[ch] || ch);
}

function slugify(text) {
  let s = deaccent(text.toLowerCase());
  s = s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'szakasz';
}

const NAMED_ENTITIES = {
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'",
  aacute: 'á', Aacute: 'Á', eacute: 'é', Eacute: 'É', iacute: 'í', Iacute: 'Í',
  oacute: 'ó', Oacute: 'Ó', ouml: 'ö', Ouml: 'Ö', uacute: 'ú', Uacute: 'Ú',
  uuml: 'ü', Uuml: 'Ü',
  middot: '·', ndash: '–', mdash: '—', euro: '€', rarr: '→',
  bdquo: '„', rdquo: '”', ldquo: '“', lsquo: '‘', rsquo: '’',
  shy: '', hellip: '…',
};

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (m, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (m, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => (name in NAMED_ENTITIES ? NAMED_ENTITIES[name] : m));
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function stripScriptsAndStyles(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
}

function extractDocTitle(html) {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    return stripTags(titleMatch[1]).replace(/\s*[-–|]\s*NODU Bridge.*$/i, '').trim();
  }
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return h1Match ? stripTags(h1Match[1]) : 'NODU Bridge';
}

// Beszúrja a hiányzó id attribútumokat a h1/h2/h3 tagekbe. Visszaadja a módosított HTML-t.
function assignHeadingIds(html) {
  const usedSlugs = new Set();
  const headingRe = /<(h[1-3])([^>]*)>([\s\S]*?)<\/\1>/gi;

  return html.replace(headingRe, (full, tag, attrs, inner) => {
    const existingId = attrs.match(/\bid=["']([^"']+)["']/i);
    let id;
    if (existingId) {
      id = existingId[1];
      usedSlugs.add(id);
      return full;
    }
    const baseText = stripTags(inner);
    let base = slugify(baseText);
    id = base;
    let n = 2;
    while (usedSlugs.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    usedSlugs.add(id);
    return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
  });
}

// A (már id-vel ellátott) HTML-ből kinyeri a címsor-szegmenseket: {level, id, headingText, text}
function extractSections(html, docTitle) {
  const cleaned = stripScriptsAndStyles(html);
  const headingRe = /<(h[1-3])\s+id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/\1>/gi;

  const headings = [];
  let m;
  while ((m = headingRe.exec(cleaned)) !== null) {
    headings.push({
      level: Number(m[1][1]),
      id: m[2],
      headingText: stripTags(m[3]),
      start: m.index,
      end: m.index + m[0].length,
    });
  }

  const sections = [];
  for (let i = 0; i < headings.length; i += 1) {
    const h = headings[i];
    const bodyStart = h.end;
    const bodyEnd = i + 1 < headings.length ? headings[i + 1].start : cleaned.length;
    const bodyHtml = cleaned.slice(bodyStart, bodyEnd);
    const text = stripTags(bodyHtml);
    sections.push({
      headingId: h.id,
      headingText: h.headingText,
      level: h.level,
      text,
    });
  }
  return sections.map((s) => ({ ...s, docTitle }));
}

function main() {
  const dir = __dirname;
  const outIndex = [];

  for (const file of CONTENT_FILES) {
    const filePath = path.join(dir, file);
    const original = fs.readFileSync(filePath, 'utf8');
    const withIds = assignHeadingIds(original);

    if (withIds !== original) {
      fs.writeFileSync(filePath, withIds, 'utf8');
      console.log(`id-k hozzaadva: ${file}`);
    }

    const docTitle = extractDocTitle(withIds);
    const sections = extractSections(withIds, docTitle);
    for (const s of sections) {
      outIndex.push({ file, ...s });
    }
  }

  const json = JSON.stringify(outIndex, null, 0);

  // JSON: hasznos referenciának / eszközöknek.
  const jsonPath = path.join(dir, '..', 'assets', 'js', 'search-index.json');
  fs.writeFileSync(jsonPath, json, 'utf8');

  // JS: ezt tolti be a bongeszo <script>-kent. A statikus HTML-oldalak
  // gyakran file:// protokollon nyilnak meg (nincs szerver), ahol a fetch()
  // a JSON-ra CORS-hiba miatt elbukna - a <script> tag viszont file://-on is mukodik.
  const jsPath = path.join(dir, '..', 'assets', 'js', 'search-index.js');
  fs.writeFileSync(jsPath, `window.NODU_SEARCH_INDEX = ${json};\n`, 'utf8');

  console.log(`\n${outIndex.length} szekcio indexelve, ${CONTENT_FILES.length} dokumentumbol.`);
  console.log(`Kiirva: ${path.relative(dir, jsonPath)}, ${path.relative(dir, jsPath)}`);
}

main();
