# NODU Bridge — Design Token Referencia

Forrás: a 7 HTML fájl a `C:\NODU\Sales system\OUTPUTS\index\` mappában
(`nodu-bridge-dashboard.html`, `nodu-bridge-piac-elemzes.html`,
`nodu-bridge-speckle-tanulsagok.html`, `nodu-bridge-license-calculator.html`,
`nodu-bridge-esettanulmanyok.html`, `nodu-bridge-piackutatas.html`, `index.html`).

Ez a dokumentum konzervatív extrakció: a meglévő HTML-eket nem módosítottuk,
csak a bennük lévő tokeneket gyűjtöttük és strukturáltuk három CSS modulba
(`nodu-tokens.css`, `nodu-design-system.css`, `nodu-utilities.css`) és egy
JS modulba (`nodu-tokens.js`).

---

## 1. Színek

### 1.1 Alapfelület és szerkezet

| Token | Érték | Minta | Használat |
|---|---|---|---|
| `--bg` | `#FAFAFA` | ▓ | oldalháttér |
| `--card` / `--white` | `#FFFFFF` | ▓ | kártya/panel felület |
| `--topbar` / `--sidebar` | `#17171A` | ▓ | topbar, hero, footer sötét háttér |

### 1.2 Márka-akcentus

| Token | Érték | Minta | Használat |
|---|---|---|---|
| `--accent` / `--orange` | `#F04E23` | ▓ | NODU narancs — elsődleges márkaszín |
| `--orange-h` | `#D94216` | ▓ | narancs hover/active állapot |

### 1.3 Keretek és szöveg

| Token | Érték | Minta | Használat |
|---|---|---|---|
| `--border` | `#E4E4E7` | ▓ | alapértelmezett elválasztóvonal |
| `--border2` | `#D1D5DB` | ▓ | erősebb keret (slider hover) |
| `--text` | `#18181B` | ▓ | elsődleges szövegszín |
| `--muted` | `#71717A` | ▓ | másodlagos/tompított szöveg |
| `--muted2` | `#A1A1AA` | ▓ | harmadlagos tompított szöveg |

### 1.4 Szemantikus státuszszínek

**Amber / figyelmeztetés**

| Token | Érték | Minta |
|---|---|---|
| `--amber` | `#D97706` | ▓ |
| `--amber-bg` | `#FFFBEB` | ▓ |
| `--amber-border` | `#F59E0B` | ▓ |
| `--amber-text` | `#92400E` | ▓ |
| `--amber-text-2` | `#78350F` | ▓ |

**Green / pozitív**

| Token | Érték | Minta |
|---|---|---|
| `--green` | `#16A34A` | ▓ |
| `--green-bg` | `#F0FDF4` | ▓ |
| `--green-border` | `#22C55E` | ▓ |
| `--green-text` | `#14532D` | ▓ |
| `--green-text-2` | `#166534` | ▓ |

**Blue / informatív**

| Token | Érték | Minta |
|---|---|---|
| `--blue` | `#2563EB` | ▓ |
| `--blue-bg` | `#EFF6FF` | ▓ |
| `--blue-border` | `#3B82F6` | ▓ |
| `--blue-text` | `#1E3A5F` | ▓ |
| `--blue-text-2` | `#1E3A8A` | ▓ |

**Purple / Enterprise tier**

| Token | Érték | Minta |
|---|---|---|
| `--purple` | `#7C3AED` | ▓ |
| `--purple-bg` | `#F5F3FF` | ▓ |

**Narancs árnyalatok (paywall chipek, diagramok)**

| Token | Érték | Minta |
|---|---|---|
| `--orange-bg` | `#FFF3F0` | ▓ |
| `--orange-lt` | `#FEE8E2` | ▓ |

### 1.5 Sötét felület kiegészítő tónusai (topbar/hero/footer)

| Token | Érték | Minta | Használat |
|---|---|---|---|
| `--dark-border` | `#2A2A2D` | ▓ | elválasztó sötét háttéren |
| `--dark-border-hover` | `#3A3A3D` | ▓ | topbar nav link hover keret |
| `--dark-text-muted` | `#A1A1AA` | ▓ | alcím/nav szöveg sötét háttéren |
| `--dark-text-meta` | `#71717A` | ▓ | meta szöveg sötét háttéren |
| `--dark-text-faint` | `#52525B` | ▓ | leghalványabb szöveg (footer meta) |

### 1.6 Táblázat zebra/hover árnyalatok

| Token | Érték | Minta |
|---|---|---|
| `--table-header-bg` | `#F4F4F5` | ▓ |
| `--table-zebra-bg` | `#FBFBFC` | ▓ |
| `--table-hover-bg` | `#F3F4F6` | ▓ |

### 1.7 Fázis-jelvények (dashboard idővonal)

| Token | Érték |
|---|---|
| `--phase-early-bg` / `--phase-early-text` | `#FFF3F0` / `#C2410C` |
| `--phase-growth-bg` / `--phase-growth-text` | `#EFF6FF` / `#1D4ED8` |
| `--phase-enterprise-bg` / `--phase-enterprise-text` | `#F5F3FF` / `#6D28D9` |

### 1.8 TAM/SAM/SOM tölcsér diagram tónusai

| Token | Érték |
|---|---|
| `--funnel-tam-bar` | `#E2E8F0` |
| `--funnel-tam-text` / `--funnel-tam-text-2` | `#475569` / `#64748B` |
| `--funnel-sam-bar` | `#FDE68A` |
| `--funnel-sam-text` / `--funnel-sam-text-2` | `#92400E` / `#A16207` |
| `--funnel-som-bar` | `var(--accent)` |
| `--funnel-som-text-2` | `#FFE4DC` |

---

## 2. Tipográfia

### 2.1 Alapok

- **Betűcsalád:** `'Inter', system-ui, sans-serif` (Google Fonts CDN, súlyok: 300–800)
- **Gyökér méret:** `html { font-size: 17px; }`
- **Testtörzs igazítás:** `text-align: justify; hyphens: auto;` (minden tartalmi oldalon)

### 2.2 Méretskála (megfigyelt, nem szigorú moduláris skála)

| Token | Érték | Tipikus használat |
|---|---|---|
| `--font-size-xs` | 11px | section-label, hero-label, jelvények |
| `--font-size-sm` | 12px | topbar-meta, hero-meta, source-note |
| `--font-size-sm2` | 13px | topbar-nav linkek |
| `--font-size-base-14` | 14px | callout címek, input címkék |
| `--font-size-base-15` | 15px | feature-list elemek, ltv-table |
| `--font-size-base-16` | 16px | license-calculator törzsszöveg |
| `--font-size-base-17` | 17px | body alap |
| `--font-size-md` | 0.9rem | táblázat törzsszöveg |
| `--font-size-md2` | 0.92rem | callout-ok, táblázat (piac-elemzés) |
| `--font-size-md3` | 0.95rem | section p, hero-subtitle jellegű szöveg |
| `--font-size-lg` | 1rem | section h3 |
| `--font-size-lg2` | 1.05rem | hero-subtitle |
| `--font-size-xl` | 1.5rem | section h2 (dashboard) |
| `--font-size-xl2` | 1.55rem | section h2 (pozicionálás, esettanulmányok) |
| `--font-size-xl3` | 1.6rem | section h2 (piac-elemzés) |
| `--font-size-2xl` | 2.1rem | hero h1 (dashboard, piac-elemzés) |
| `--font-size-2xl2` | 2.2rem | hero h1 (pozicionálás, esettanulmányok) |
| `--font-size-3xl` | 31px | page-header h1 (license-calculator) |

### 2.3 Betűvastagság

| Token | Érték |
|---|---|
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--font-weight-extrabold` | 800 |

### 2.4 Betűköz (letter-spacing)

| Token | Érték | Használat |
|---|---|---|
| `--tracking-tight` | -0.03em | hero h1 |
| `--tracking-tight-2` | -0.025em | section h2 |
| `--tracking-tight-3` | -0.02em | metric-value |
| `--tracking-wide` | 0.06em | nagybetűs címkék |
| `--tracking-wide-2` | 0.08em | nagybetűs címkék, nagyobb |
| `--tracking-wide-3` | 0.1em | section-label, callout-label |
| `--tracking-wide-4` | 0.12em | hero-label, section-label (dashboard) |

### 2.5 Sorköz (line-height)

| Token | Érték | Használat |
|---|---|---|
| `--leading-tight` | 1.2 | metric-value |
| `--leading-snug` | 1.25 | hero h1 |
| `--leading-normal` | 1.3 | section h2 |
| `--leading-relaxed` | 1.55 | táblázat cella szöveg |
| `--leading-loose` | 1.6 | általános törzsszöveg |
| `--leading-loose-2` | 1.65 | hero-subtitle, callout szöveg |
| `--leading-loose-3` | 1.7 | body (dashboard, pozicionálás) |
| `--leading-loose-4` | 1.75 | body (piac-elemzés) |

---

## 3. Spacing skála

A megfigyelt érték-rács kb. 8px-es ritmust követ, de nem szigorúan moduláris — az alábbi táblázat a ténylegesen előforduló értékeket sorolja fel token-névvel.

| Token | Érték | | Token | Érték |
|---|---|---|---|---|
| `--space-1` | 4px | | `--space-12` | 28px |
| `--space-2` | 6px | | `--space-13` | 32px |
| `--space-3` | 8px | | `--space-14` | 36px |
| `--space-4` | 10px | | `--space-15` | 40px |
| `--space-5` | 12px | | `--space-16` | 56px (topbar magasság) |
| `--space-6` | 14px | | `--space-17` | 64px |
| `--space-7` | 16px | | `--space-18` | 72px |
| `--space-8` | 18px | | `--space-19` | 80px |
| `--space-9` | 20px | | `--space-20` | 88px |
| `--space-10` | 22px | | `--space-21` | 96px |
| `--space-11` | 24px | | | |

### Konténer szélességek

| Token | Érték | Használat |
|---|---|---|
| `--container-narrow` | 860px | piac-elemzés, pozicionálás, esettanulmányok |
| `--container-base` | 880px | dashboard |
| `--container-wide` | 1160px | license-calculator `.page` |

### Sarokkerekítés (radius)

| Token | Érték |
|---|---|
| `--radius-sm` | 4px |
| `--radius-md` | 6px |
| `--radius-lg` | 8px |
| `--radius-xl` | 9px |
| `--radius-2xl` | 10px |
| `--radius-3xl` | 12px |

### Egyéb

| Token | Érték | Megjegyzés |
|---|---|---|
| `--shadow-card-hover` | `0 4px 18px rgba(0,0,0,0.09)` | doc-card hover árnyék |
| `--transition-fast` | 0.15s | szín/keret átmenetek |
| `--transition-base` | 0.18s | kártya hover |
| `--transition-slow` | 0.4s cubic-bezier(0.4,0,0.2,1) | progress bar |
| `--z-sticky` | 100 | sticky topbar z-index |

---

## 4. Fájlstruktúra és betöltési sorrend

A három CSS modult **ebben a sorrendben** kell betölteni:

```html
<link rel="stylesheet" href="nodu-tokens.css">
<link rel="stylesheet" href="nodu-design-system.css">
<link rel="stylesheet" href="nodu-utilities.css">
```

1. **`nodu-tokens.css`** — kizárólag `:root` CSS custom property-k. Nincs benne szelektor, csak token-definíció.
2. **`nodu-design-system.css`** — komponens szelektorok (topbar, hero, kártyák, táblázatok, gombok, form controllok, footer), amelyek a fenti tokeneket hivatkozzák. Reset és média-lekérdezések is itt vannak.
3. **`nodu-utilities.css`** — egyetlen célú segéd-osztályok (`u-` prefix), amelyek új oldalak összeállításához hasznosak a meglévő rendszerrel konzisztens módon.
4. **`nodu-tokens.js`** — a token-készlet JS-ből olvasható tükörképe (pl. diagram színpalettákhoz, dinamikus stílus-injektáláshoz). Kézzel tartandó szinkronban a CSS-sel.

## 5. Megjegyzések a kinyeréshez

- A színek, tipográfia és spacing értékek **pontosan** a HTML-fájlokban talált `:root` blokkokból és inline stílusokból származnak; nem lettek kerekítve vagy egy szigorú skálára igazítva.
- Több oldal enyhén eltérő komponens-implementációkat használ ugyanarra a mintára (pl. két topbar-markup variáns, két callout-doboz stílus). Ezeket a `nodu-design-system.css` variáns-osztályokkal (`.box`, `.card`, `.lg`, `.wide` stb.) kezeli, hogy egyik meglévő oldal se törjön, ha ráemeljük a közös modult.
- A forrás-HTML fájlok **nem lettek módosítva** ennek a feladatnak a részeként — a modulok kizárólag dokumentációs/refaktorálási alapként készültek.
