// NODU Bridge - a kereső oldalról érkező találatra ugrás: a célszakaszra görget,
// rövid kiemelő animációval, és aláhúzza a keresett kifejezés előfordulásait.
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function injectStyle() {
    const style = document.createElement('style');
    style.textContent = `
      .nodu-search-target { animation: nodu-search-pulse 2.2s ease-out 1; border-radius: 6px; }
      @keyframes nodu-search-pulse {
        0%   { box-shadow: 0 0 0 0 rgba(240, 78, 35, 0.35); background-color: rgba(240, 78, 35, 0.10); }
        70%  { box-shadow: 0 0 0 14px rgba(240, 78, 35, 0); background-color: rgba(240, 78, 35, 0.10); }
        100% { box-shadow: 0 0 0 0 rgba(240, 78, 35, 0); background-color: transparent; }
      }
      mark.nodu-search-hit { background: #FEE8E2; color: inherit; border-radius: 2px; padding: 0 1px; }
    `;
    document.head.appendChild(style);
  }

  function highlightMatchesIn(rootEl, queryTokens) {
    if (!queryTokens.length) return;
    const ACCENT_CLASS = {
      a: 'aáàâäã', e: 'eéèêë', i: 'iíìîï', o: 'oóòôöõő', u: 'uúùûüű', c: 'cç', n: 'nñ',
    };
    const source = queryTokens
      .slice()
      .sort((a, b) => b.length - a.length)
      .map((t) => t.split('').map((ch) => (ACCENT_CLASS[ch] ? `[${ACCENT_CLASS[ch]}]` : ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).join(''))
      .join('|');
    const re = new RegExp(`(${source})`, 'gi');

    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && ['SCRIPT', 'STYLE', 'MARK'].includes(node.parentElement.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const targets = [];
    let node;
    while ((node = walker.nextNode())) {
      if (re.test(node.nodeValue)) targets.push(node);
      re.lastIndex = 0;
    }

    for (const textNode of targets) {
      const frag = document.createDocumentFragment();
      const text = textNode.nodeValue;
      let lastIndex = 0;
      let m;
      re.lastIndex = 0;
      while ((m = re.exec(text)) !== null) {
        if (m.index > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
        const mark = document.createElement('mark');
        mark.className = 'nodu-search-hit';
        mark.textContent = m[0];
        frag.appendChild(mark);
        lastIndex = m.index + m[0].length;
      }
      if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      textNode.parentNode.replaceChild(frag, textNode);
    }
  }

  function findSectionEnd(headingEl) {
    const level = Number(headingEl.tagName[1]);
    let el = headingEl.nextElementSibling;
    const stopTags = new Set(['H1', 'H2', 'H3'].filter((t) => Number(t[1]) <= level));
    const collected = [headingEl];
    while (el && !stopTags.has(el.tagName)) {
      collected.push(el);
      el = el.nextElementSibling;
    }
    return collected;
  }

  ready(function () {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;

    injectStyle();

    target.style.scrollMarginTop = '76px';
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    target.classList.add('nodu-search-target');
    setTimeout(() => target.classList.remove('nodu-search-target'), 2400);

    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q && window.NoduSearch) {
      const tokens = window.NoduSearch.tokenize(q);
      for (const el of findSectionEnd(target)) highlightMatchesIn(el, tokens);
    }
  });
})();
