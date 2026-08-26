// NODU Bridge - kliens-oldali kulcsszó/relevancia-keresés a dokumentum-indexen.
// Nincs külső könyvtár, nincs hálózati hívás a keresés-index betöltésén kívül.
(function () {
  const ACCENT_MAP = {
    'á': 'a', 'à': 'a', 'â': 'a', 'ä': 'a', 'ã': 'a',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
    'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o', 'õ': 'o', 'ő': 'o',
    'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u',
    'ç': 'c', 'ñ': 'n',
  };

  const STOPWORDS = new Set([
    'a', 'az', 'egy', 'es', 's', 'hogy', 'is', 'nem', 'de', 'ha', 'meg', 'mert',
    'mint', 'vagy', 'mar', 'volt', 'van', 'lesz', 'akkor', 'amely', 'amelyek',
    'ami', 'aki', 'ez', 'azt', 'ezt', 'igy', 'ugy', 'csak', 'mi', 'mik', 'ki',
    'nagyon', 'tobbi', 'illetve', 'pedig', 'sem', 'tehat', 'tovabba',
  ]);

  function deaccent(str) {
    return str.replace(/[áàâäãéèêëíìîïóòôöõőúùûüűçñ]/g, (ch) => ACCENT_MAP[ch] || ch);
  }

  function normalize(str) {
    return deaccent(String(str).toLowerCase());
  }

  function tokenize(str) {
    return normalize(str)
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 1 && !STOPWORDS.has(t));
  }

  function buildEngine(sections) {
    const docs = sections.map((s, idx) => {
      const headingNorm = normalize(s.headingText);
      const textNorm = normalize(s.text);
      return { ...s, idx, headingNorm, textNorm, headingTokens: tokenize(s.headingText) };
    });

    function scoreDoc(doc, queryTokens) {
      let score = 0;
      let matched = 0;
      for (const qt of queryTokens) {
        let hit = false;
        if (doc.headingTokens.some((ht) => ht.includes(qt) || qt.includes(ht))) {
          score += 6;
          hit = true;
        }
        const occurrences = doc.textNorm.split(qt).length - 1;
        if (occurrences > 0) {
          score += Math.min(occurrences, 5) * 1.5;
          hit = true;
        }
        if (hit) matched += 1;
      }
      if (matched === 0) return 0;
      // Bónusz, ha a kifejezés (a kérdés egésze) egybefüggően is előfordul.
      const fullQuery = queryTokens.join(' ');
      if (fullQuery.length > 2 && doc.textNorm.includes(fullQuery)) score += 8;
      // Bónusz a lefedettségért: minél több kérdés-token talál, annál relevánsabb.
      score *= matched / queryTokens.length;
      return score;
    }

    function search(query, limit) {
      const queryTokens = tokenize(query);
      if (queryTokens.length === 0) return [];
      const results = [];
      for (const doc of docs) {
        const score = scoreDoc(doc, queryTokens);
        if (score > 0) results.push({ doc, score });
      }
      results.sort((a, b) => b.score - a.score);
      return results.slice(0, limit || 20).map((r) => ({
        file: r.doc.file,
        docTitle: r.doc.docTitle,
        headingId: r.doc.headingId,
        headingText: r.doc.headingText,
        level: r.doc.level,
        text: r.doc.text,
        score: r.score,
        snippet: buildSnippet(r.doc.text, queryTokens),
      }));
    }

    return { search };
  }

  function buildSnippet(text, queryTokens) {
    const norm = normalize(text);
    let hitPos = -1;
    for (const qt of queryTokens) {
      const pos = norm.indexOf(qt);
      if (pos !== -1 && (hitPos === -1 || pos < hitPos)) hitPos = pos;
    }
    const radius = 110;
    let start = hitPos === -1 ? 0 : Math.max(0, hitPos - radius);
    let end = Math.min(text.length, start + radius * 2);
    let snippet = text.slice(start, end);
    if (start > 0) snippet = '…' + snippet;
    if (end < text.length) snippet += '…';
    return highlightSnippet(snippet, queryTokens);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const ACCENT_CLASS = {
    a: 'aáàâäã', e: 'eéèêë', i: 'iíìîï', o: 'oóòôöõő', u: 'uúùûüű', c: 'cç', n: 'nñ',
  };

  function accentInsensitiveSource(token) {
    return token
      .split('')
      .map((ch) => {
        if (ACCENT_CLASS[ch]) return `[${ACCENT_CLASS[ch]}]`;
        return ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      })
      .join('');
  }

  function highlightSnippet(snippet, queryTokens) {
    const escaped = escapeHtml(snippet);
    if (queryTokens.length === 0) return escaped;
    const pattern = queryTokens
      .slice()
      .sort((a, b) => b.length - a.length)
      .map(accentInsensitiveSource)
      .join('|');
    const re = new RegExp(`(${pattern})`, 'gi');
    return escaped.replace(re, '<mark>$1</mark>');
  }

  async function loadIndex(jsonUrl) {
    // Elsődlegesen a beágyazott assets/js/search-index.js tölti be (window.NODU_SEARCH_INDEX):
    // ez file:// protokollon (nincs helyi szerver) is működik, a fetch() a JSON-ra nem menne CORS miatt.
    if (window.NODU_SEARCH_INDEX) return window.NODU_SEARCH_INDEX;
    const res = await fetch(jsonUrl);
    if (!res.ok) throw new Error(`Nem sikerült betölteni a keresési indexet: ${res.status}`);
    return res.json();
  }

  window.NoduSearch = { buildEngine, loadIndex, tokenize, normalize };
})();
