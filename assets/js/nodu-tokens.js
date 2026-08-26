/**
 * NODU Bridge — Design Tokens (JS module)
 * Mirrors nodu-tokens.css. Use when tokens need to be read/consumed in JS
 * (e.g. chart color arrays, dynamic style injection, design-system tooling).
 * Extracted from the 7 HTML files in OUTPUTS/index/. Keep in sync with
 * nodu-tokens.css by hand — this is a static snapshot, not a generator.
 *
 * Usage (browser, no bundler):
 *   <script src="nodu-tokens.js"></script>
 *   <script>console.log(NODU_TOKENS.color.accent);</script>
 *
 * Usage (CommonJS):
 *   const { NODU_TOKENS } = require('./nodu-tokens.js');
 *
 * NEM ESM: a fájl szándékosan klasszikus script (UMD), ezért nincs benne
 * `export` utasítás. Egy bare `export` az egész fájlt SyntaxError-ra vinné
 * minden `<script src>`-es oldalon (a 9 OUTPUTS/index oldal mindegyike így
 * tölti be), és akkor a globálisok sem jönnének létre. ESM-igény esetén külön
 * wrapper fájl kell, amely ezt importálja és re-exportálja.
 */

const NODU_TOKENS = {
  color: {
    // Core surface & structure
    bg: '#FAFAFA',
    card: '#FFFFFF',
    white: '#FFFFFF',
    topbar: '#17171A',
    sidebar: '#17171A',

    // Brand accent
    accent: '#F04E23',
    orange: '#F04E23',
    orangeHover: '#D94216',

    // Borders & text
    border: '#E4E4E7',
    border2: '#D1D5DB',
    text: '#18181B',
    muted: '#71717A',
    muted2: '#A1A1AA',

    // Semantic — amber/warning
    amber: '#D97706',
    amberBg: '#FFFBEB',
    amberBorder: '#F59E0B',
    amberText: '#92400E',
    amberText2: '#78350F',

    // Semantic — green/positive
    green: '#16A34A',
    greenBg: '#F0FDF4',
    greenBorder: '#22C55E',
    greenText: '#14532D',
    greenText2: '#166534',

    // Semantic — blue/informational
    blue: '#2563EB',
    blueBg: '#EFF6FF',
    blueBorder: '#3B82F6',
    blueText: '#1E3A5F',
    blueText2: '#1E3A8A',

    // Semantic — purple/enterprise
    purple: '#7C3AED',
    purpleBg: '#F5F3FF',

    // Orange tints (paywall chips, charts)
    orangeBg: '#FFF3F0',
    orangeLt: '#FEE8E2',

    // Dark-surface supporting tones (topbar/hero/footer)
    darkBorder: '#2A2A2D',
    darkBorderHover: '#3A3A3D',
    darkText: '#FFFFFF',
    darkTextMuted: '#A1A1AA',
    darkTextMeta: '#71717A',
    darkTextFaint: '#52525B',

    // Table zebra / hover tints
    tableHeaderBg: '#F4F4F5',
    tableZebraBg: '#FBFBFC',
    tableHoverBg: '#F3F4F6',

    // Phase / status badges (dashboard timeline)
    phaseEarlyBg: '#FFF3F0',
    phaseEarlyText: '#C2410C',
    phaseGrowthBg: '#EFF6FF',
    phaseGrowthText: '#1D4ED8',
    phaseEnterpriseBg: '#F5F3FF',
    phaseEnterpriseText: '#6D28D9',

    // Funnel / TAM-SAM-SOM chart tones
    funnelTamBar: '#E2E8F0',
    funnelTamText: '#475569',
    funnelTamText2: '#64748B',
    funnelSamBar: '#FDE68A',
    funnelSamText: '#92400E',
    funnelSamText2: '#A16207',
    funnelSomBar: '#F04E23', // = accent
    funnelSomText2: '#FFE4DC',
  },

  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSizeRoot: '17px',

    fontSize: {
      xs: '11px',
      sm: '12px',
      sm2: '13px',
      base14: '14px',
      base15: '15px',
      base16: '16px',
      base17: '17px',
      md: '0.9rem',
      md2: '0.92rem',
      md3: '0.95rem',
      lg: '1rem',
      lg2: '1.05rem',
      xl: '1.5rem',
      xl2: '1.55rem',
      xl3: '1.6rem',
      xxl: '2.1rem',
      xxl2: '2.2rem',
      xxxl: '31px',
    },

    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    letterSpacing: {
      tight: '-0.03em',
      tight2: '-0.025em',
      tight3: '-0.02em',
      wide: '0.06em',
      wide2: '0.08em',
      wide3: '0.1em',
      wide4: '0.12em',
    },

    lineHeight: {
      tight: 1.2,
      snug: 1.25,
      normal: 1.3,
      relaxed: 1.55,
      loose: 1.6,
      loose2: 1.65,
      loose3: 1.7,
      loose4: 1.75,
    },
  },

  spacing: {
    1: '4px',
    2: '6px',
    3: '8px',
    4: '10px',
    5: '12px',
    6: '14px',
    7: '16px',
    8: '18px',
    9: '20px',
    10: '22px',
    11: '24px',
    12: '28px',
    13: '32px',
    14: '36px',
    15: '40px',
    16: '56px',
    17: '64px',
    18: '72px',
    19: '80px',
    20: '88px',
    21: '96px',
  },

  container: {
    narrow: '860px',
    base: '880px',
    wide: '1160px',
  },

  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '9px',
    xxl: '10px',
    xxxl: '12px',
    full: '99px',
  },

  shadow: {
    cardHover: '0 4px 18px rgba(0, 0, 0, 0.09)',
  },

  transition: {
    fast: '0.15s',
    base: '0.18s',
    slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  zIndex: {
    sticky: 100,
  },
};

/**
 * Convenience: ordered categorical palette for charts (e.g. tier breakdowns
 * in the license calculator: Professional / Studio / Enterprise / neutral).
 */
const NODU_CHART_PALETTE = [
  NODU_TOKENS.color.orange,  // Professional
  NODU_TOKENS.color.green,   // Studio
  NODU_TOKENS.color.purple,  // Enterprise
  NODU_TOKENS.color.blue,    // secondary/informational series
  NODU_TOKENS.color.muted2,  // neutral/other
];

/**
 * Reads a token's current computed value from a live DOM element's CSS
 * custom properties (useful once nodu-tokens.css is loaded, to avoid the
 * JS/CSS values drifting apart at runtime).
 * @param {string} name - CSS custom property name, with or without leading '--'.
 * @param {Element} [el] - Element to read the computed style from (defaults to <html>).
 * @returns {string} trimmed computed value, or '' if not set.
 */
function getNoduToken(name, el) {
  const prop = name.startsWith('--') ? name : `--${name}`;
  const target = el || document.documentElement;
  return getComputedStyle(target).getPropertyValue(prop).trim();
}

// UMD-style export for script-tag (window globals) and CommonJS consumers.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NODU_TOKENS, NODU_CHART_PALETTE, getNoduToken };
}
if (typeof window !== 'undefined') {
  window.NODU_TOKENS = NODU_TOKENS;
  window.NODU_CHART_PALETTE = NODU_CHART_PALETTE;
  window.getNoduToken = getNoduToken;
}
