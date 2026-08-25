# NODU Bridge

NODU Bridge — a nyílt BIM/AEC szoftverintegrációs platform.

## Tartalom

Ez a repository a NODU Bridge projekt tartalmi oldalait és dokumentációját tartalmazza.

### HTML Oldalak

- **index.html** — Főoldal
- **nodu-bridge-dashboard.html** — Dashboard prezentáció
- **nodu-bridge-license-calculator.html** — Licenc kalkulátor
- **nodu-bridge-piackutatas.html** — Piackutatás
- **nodu-bridge-piac-elemzes.html** — Piacelemzés
- **nodu-bridge-roadmap.html** — Termék roadmap
- **nodu-bridge-vezetoi-osszefoglalo.html** — Vezetői összefoglalók
- **nodu-bridge-esettanulmanyok.html** — Esettanulmányok
- **nodu-bridge-speckle-tanulsagok.html** — Speckle tanulságok
- **nodu-bridge-lead-gen.html** — Lead generation oldal
- **bridge-waitlist.html** — Waitlist oldal
- **nodu-bridge-kereso.html** — Dokumentumkereső (jelszóval védett, kliens-oldali keresés a fenti oldalak tartalmában)

## Keresőindex frissítése

A kereső a `../assets/js/search-index.json` fájlból dolgozik. Ha bármelyik dokumentum tartalma változik, futtasd újra:

```
node build-search-index.js
```

Ez újraindexeli a szekciókat, és — ha új címsor került be — automatikusan `id`-t ad neki a mélylinkeléshez.

## Hozzáférés

A repo priváttá téve (2026-07-27) — a korábbi GitHub Pages-link nem érhető el. Publikus hosztolás (Pages) csak jelszó-védelem felülvizsgálata után jöhet szóba.

## Licenc

Saját fejlesztés, 2026.
