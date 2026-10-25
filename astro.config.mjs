// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://oss.northbound.sh',
  trailingSlash: 'ignore',
  integrations: [react()],
  devToolbar: { enabled: false },
  // short addresses for project sites (GitHub Pages serves those at /<repository-name>/);
  // built as static pages that forward at once (meta refresh + canonical)
  redirects: {
    '/nca': '/NativeNCA/',
  },
  build: { inlineStylesheets: 'always' },
  vite: {
    // the design's CSS relies on declaration fallbacks the minifier merges away (as on northbound.sh)
    build: { cssMinify: false },
  },
});
