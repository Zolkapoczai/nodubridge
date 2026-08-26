// NODU Bridge - globális gyorskereső: Ctrl+F (Cmd+F Mac-en) bárhol felugrik egy
// keresőmezőt a dokumentumok tartalmára, a böngésző natív "keresés az oldalon" helyett.
(function () {
  const INDEX_URL = 'assets/js/search-index.json';
  let engine = null;
  let engineLoading = null;
  let overlayEl = null;
  let inputEl = null;
  let listEl = null;
  let activeIndex = -1;
  let currentResults = [];

  function loadEngine() {
    if (engine) return Promise.resolve(engine);
    if (engineLoading) return engineLoading;
    engineLoading = window.NoduSearch.loadIndex(INDEX_URL).then((sections) => {
      engine = window.NoduSearch.buildEngine(sections);
      return engine;
    });
    return engineLoading;
  }

  function injectStyle() {
    if (document.getElementById('nodu-search-overlay-style')) return;
    const style = document.createElement('style');
    style.id = 'nodu-search-overlay-style';
    style.textContent = `
      #nodu-search-overlay { position: fixed; inset: 0; z-index: 10000; display: none; align-items: flex-start; justify-content: center; padding-top: 12vh; background: rgba(15,15,17,0.55); }
      #nodu-search-overlay.open { display: flex; }
      #nodu-search-overlay .panel { width: min(600px, 92vw); background: #fff; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.35); overflow: hidden; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      #nodu-search-overlay .panel-input-row { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid #E4E4E7; }
      #nodu-search-overlay .panel-input-row svg { flex-shrink: 0; opacity: 0.4; }
      #nodu-search-overlay input { flex: 1; border: none; outline: none; font-size: 1rem; font-family: inherit; color: #18181B; }
      #nodu-search-overlay .panel-hint { font-size: 11px; color: #A1A1AA; border: 1px solid #E4E4E7; border-radius: 4px; padding: 2px 6px; white-space: nowrap; }
      #nodu-search-overlay .panel-results { max-height: 50vh; overflow-y: auto; }
      #nodu-search-overlay .panel-empty { padding: 24px 16px; font-size: 0.85rem; color: #71717A; text-align: center; }
      #nodu-search-overlay .result-item { display: block; padding: 12px 16px; text-decoration: none; border-bottom: 1px solid #F4F4F5; cursor: pointer; }
      #nodu-search-overlay .result-item:last-child { border-bottom: none; }
      #nodu-search-overlay .result-item.active, #nodu-search-overlay .result-item:hover { background: #FFF3F0; }
      #nodu-search-overlay .result-doc { font-size: 11px; font-weight: 600; color: #F04E23; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px; }
      #nodu-search-overlay .result-heading { font-size: 0.92rem; font-weight: 700; color: #18181B; margin-bottom: 2px; }
      #nodu-search-overlay .result-snippet { font-size: 0.8rem; color: #71717A; line-height: 1.5; }
      #nodu-search-overlay .result-snippet mark { background: #FEE8E2; color: inherit; border-radius: 2px; padding: 0 1px; }
      #nodu-search-overlay .panel-footer { display: flex; gap: 14px; padding: 8px 16px; border-top: 1px solid #E4E4E7; font-size: 11px; color: #A1A1AA; }
      #nodu-search-overlay .panel-footer kbd { border: 1px solid #E4E4E7; border-radius: 3px; padding: 1px 5px; font-family: inherit; }
    `;
    document.head.appendChild(style);
  }

  function buildOverlay() {
    if (overlayEl) return;
    injectStyle();
    overlayEl = document.createElement('div');
    overlayEl.id = 'nodu-search-overlay';
    overlayEl.innerHTML = `
      <div class="panel">
        <div class="panel-input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Keresés a NODU Bridge dokumentumokban…" autocomplete="off">
          <span class="panel-hint">Esc</span>
        </div>
        <div class="panel-results"><div class="panel-empty">Kezdj el gépelni a kereséshez…</div></div>
        <div class="panel-footer">
          <span><kbd>&uarr;</kbd><kbd>&darr;</kbd> navigálás</span>
          <span><kbd>Enter</kbd> megnyitás</span>
          <span><kbd>Esc</kbd> bezárás</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlayEl);
    inputEl = overlayEl.querySelector('input');
    listEl = overlayEl.querySelector('.panel-results');

    overlayEl.addEventListener('mousedown', (e) => {
      if (e.target === overlayEl) closeOverlay();
    });
    inputEl.addEventListener('input', () => renderResults(inputEl.value));
    inputEl.addEventListener('keydown', onInputKeydown);
  }

  function escapeAttr(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function renderResults(query) {
    const q = query.trim();
    if (!q) {
      currentResults = [];
      activeIndex = -1;
      listEl.innerHTML = '<div class="panel-empty">Kezdj el gépelni a kereséshez…</div>';
      return;
    }
    if (!engine) {
      listEl.innerHTML = '<div class="panel-empty">Index betöltése…</div>';
      return;
    }
    currentResults = engine.search(q, 8);
    activeIndex = currentResults.length ? 0 : -1;
    if (!currentResults.length) {
      listEl.innerHTML = '<div class="panel-empty">Nincs találat.</div>';
      return;
    }
    listEl.innerHTML = currentResults.map((r, i) => {
      const href = `${r.file}?q=${encodeURIComponent(q)}#${encodeURIComponent(r.headingId)}`;
      return `
        <a class="result-item${i === 0 ? ' active' : ''}" href="${escapeAttr(href)}" data-idx="${i}">
          <div class="result-doc">${escapeAttr(r.docTitle)}</div>
          <div class="result-heading">${escapeAttr(r.headingText)}</div>
          <div class="result-snippet">${r.snippet}</div>
        </a>`;
    }).join('');
  }

  function setActive(idx) {
    const items = listEl.querySelectorAll('.result-item');
    if (!items.length) return;
    activeIndex = (idx + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
    items[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  function onInputKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeOverlay();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentResults.length) setActive(activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentResults.length) setActive(activeIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const items = listEl.querySelectorAll('.result-item');
      if (items.length && activeIndex >= 0) window.location.href = items[activeIndex].getAttribute('href');
    }
  }

  function openOverlay() {
    buildOverlay();
    overlayEl.classList.add('open');
    inputEl.value = '';
    inputEl.focus();
    listEl.innerHTML = '<div class="panel-empty">Kezdj el gépelni a kereséshez…</div>';
    loadEngine().then(() => {
      if (inputEl.value.trim()) renderResults(inputEl.value);
    });
  }

  function closeOverlay() {
    if (overlayEl) overlayEl.classList.remove('open');
  }

  function isOpen() {
    return !!(overlayEl && overlayEl.classList.contains('open'));
  }

  document.addEventListener('keydown', (e) => {
    const isFindShortcut = (e.ctrlKey || e.metaKey) && !e.altKey && (e.key === 'f' || e.key === 'F');
    if (isFindShortcut) {
      e.preventDefault();
      // A dedikált kereső oldalon a meglévő mezőt fókuszáljuk, nem duplikáljuk az overlay-t.
      const dedicatedInput = document.getElementById('searchInput');
      if (dedicatedInput && !isOpen()) {
        dedicatedInput.focus();
        dedicatedInput.select();
        return;
      }
      openOverlay();
      return;
    }
    if (e.key === 'Escape' && isOpen()) {
      closeOverlay();
    }
  });
})();
