// @ts-nocheck: Vite plugin typings can disagree between Astro's Vite and @tailwindcss/vite.
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const site = 'https://skylardryden.com';
const base = '/personal-portfolio';

export default defineConfig({
  ...(site ? { site } : {}),
  base,
  trailingSlash: 'always',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  vite: { plugins: [tailwindcss()] },
});
