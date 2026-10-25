// Bits shared with northbound.sh (NB_Website/src/components/shared.jsx).
import React from 'react';

// Inline styles stay written as CSS strings, exactly as in the canvas.
const sxCache = new Map();
export function sx(str) {
  let o = sxCache.get(str);
  if (o) return o;
  o = {};
  str.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const k = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!k) return;
    const key = k.startsWith('--')
      ? k
      : k.replace(/^-(webkit|moz|ms)-/, (m, p) => p.charAt(0).toUpperCase() + p.slice(1) + '-').replace(/-([a-z])/g, (m, c) => c.toUpperCase());
    o[key] = val;
  });
  sxCache.set(str, o);
  return o;
}

export const LOGO_L = 'M108 60L14 226L106 169L124 82.88Z';
export const LOGO_R = 'M168 24L244 155.6L174 115.19L156 125.58L214 226L115 169L134 82.88Z';

export const Dots = ({ cls }) => (
  <div className={cls} aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => <i key={i} style={sx('--i:' + i)}></i>)}
  </div>
);

// northbound.sh, the company site (in dev: its dev server)
export const NB_URL = import.meta.env.DEV ? 'http://localhost:4321/' : 'https://northbound.sh/';
